from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
import time

app = FastAPI()

class Query(BaseModel):
    user_query: str

@app.api_route('/', methods=['GET', 'HEAD'])
async def health_check():
    return {"Hello": "World"}

@app.api_route('/', methods=['POST', 'HEAD'])
def post_answer(query: Query):
    time.sleep(3)
    if query.user_query is None:
        return {"answer": "Please input query"}
    ans = "従業員の自宅から職場までの通常の通勤にかかる費用を支給する。\
        通勤手当の支給額は社員の通勤距離に基づき会社が定める基準に従って支給する。\
        \n[参考資料]\nhttps://document/休暇規程.txt"
    return {"answer": ans}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
