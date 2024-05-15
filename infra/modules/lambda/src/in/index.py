import json
import os

import boto3

index_id = os.getenv("INDEX_ID")

kendra = boto3.client("kendra", region_name="ap-northeast-1")
bedrock_runtime_client = boto3.client("bedrock-runtime", region_name="ap-northeast-1")

def get_retrieval_result(query_text: str, index_id: str) -> list[dict[str, str]]:
    """
    Kendraに質問文を投げて検索結果を取得する

    Args:
        query_text (str): 質問文
        index_id (str): Kendra インデックス ID

    Returns:
        list: 検索結果のリスト
    """
    # Kendra に質問文を投げて検索結果を取得
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

    # 検索結果から上位5つを抽出
    results = response["ResultItems"][:5] if response["ResultItems"] else []

    # 検索結果の中から文章とURIのみを抽出
    extracted_results = []
    for item in results:
        content = item.get("Content")
        document_uri = item.get("DocumentURI")

        extracted_results.append(
            {
                "Content": content,
                "DocumentURI": document_uri,
            }
        )
    return extracted_results

def get_answer_from_bedrock(
    user_prompt: str, kendra_response: list[dict[str, str]]
) -> str:
    """
    Kendraからの検索結果を元にBedrocから質問への回答を取得する

    Args:
        user_prompt (str): 質問文
        kendra_response (list[dict[str, str]]): Kendraからの検索結果
    Returns:
        str: 回答
    """

    # プロンプトの作成
    prompt = f"""\n\nHuman:
    [参考]情報をもとに[質問]に適切に答えてください。
    [質問]
    {user_prompt}
    [参考]
    {kendra_response}
    Assistant:
    """

    # 各種設定
    # modelId = "anthropic.claude-v2"
    modelId = "amazon.titan-text-express-v1"
    accept = "application/json"
    contentType = "application/json"

    body = json.dumps(
        {
            "prompt": prompt,
            "max_tokens_to_sample": 600,
        }
    )

    # bedrockからのレスポンスを受け取る
    response = bedrock_runtime_client.invoke_model(
        modelId=modelId, accept=accept, contentType=contentType, body=body
    )
    response_body = json.loads(response.get("body").read())

    return response_body.get("completion")


def lambda_handler(event: dict, context) -> dict:
    """
    Lambda ハンドラー関数

    Args:
        event (dict): Lambda のイベント
        context : Lambda のコンテキスト

    Returns:
        dict: Lambda のレスポンス
    """
    # Lambda のイベントからユーザーの入力を取得
    user_prompt = event.get("user_prompt")

    # Kendra に質問文を投げて検索結果を取得
    kendra_response = get_retrieval_result(user_prompt, index_id)

    # Bedrockからのレスポンスを受け取る
    response_body = get_answer_from_bedrock(user_prompt, kendra_response)

    return {
        "statusCode": 200,
        "body": json.dumps(response_body, ensure_ascii=False),
    }
