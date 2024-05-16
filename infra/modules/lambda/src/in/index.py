import json
import os

import boto3

index_id = os.getenv("INDEX_ID")

kendra = boto3.client("kendra", region_name="ap-northeast-1")
bedrock_runtime_client = boto3.client("bedrock-runtime", region_name="ap-northeast-1")

def get_answer_from_kendra(query_text: str, index_id: str) -> dict[str, str]:
    response = kendra.retrieve(
        QueryText=query_text,
        IndexId=index_id,
        AttributeFilter={
            "EqualsTo": {
                "Key": "_language_code",
                "Value": {"StringValue": "ja"},
            },
        },
    )

    result = response["ResultItems"][0] if response["ResultItems"] else []
    if result:
        answer = {
            "Content": result.get("Content"),
            "DocumentURI": result.get("DocumentURI"),
        }
    else:
        answer = {}
    return answer

def get_answer_from_bedrock(user_query: str, kendra_response: dict[str, str]) -> str:
    prompt = f"""
    [参考資料]を文末に付けた上で,[参考情報]に基づき簡潔に[質問]に答えてください。
    [質問]
    {user_query}
    [参考情報]
    {kendra_response["Content"]}
    [参考資料]
    {kendra_response["DocumentURI"]}
    """

    body = json.dumps(
        {
            "inputText": prompt,
        }
    )
    response = bedrock_runtime_client.invoke_model(
        modelId="amazon.titan-text-express-v1",
        accept="application/json",
        contentType="application/json",
        body=body
    )
    response_body = json.loads(response.get("body").read())
    return response_body['results'][0]['outputText']

def create_response_dict(status_code:int, body:str):
  return {
      "statusCode": status_code,
      "body": body,
  }

def lambda_handler(event, context):
    user_query = event.get("user_query")
    if not user_query:
        return create_response_dict(400,  "Missing user query parameter")

    kendra_answer = get_answer_from_kendra(user_query, index_id)
    if not kendra_answer:
        return create_response_dict(200, "humm... Document not founding...")

    bedrock_answer = get_answer_from_bedrock(user_query, kendra_answer)
    return create_response_dict(200, json.dumps(bedrock_answer, ensure_ascii=False))

