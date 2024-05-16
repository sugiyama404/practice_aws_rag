from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel

app = FastAPI()

class Query(BaseModel):
    query: str

@app.api_route('/', methods=['GET', 'HEAD'])
async def health_check():
    return {"Hello": "World"}

@app.api_route('/', methods=['POST', 'HEAD'])
def post_answer(query: Query):
    if query.query is None:
        return {"message": "Please input query"}
    return {"message": query.query + "humm .. message accept"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
