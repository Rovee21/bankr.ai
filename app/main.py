from byaldi import RAGMultiModalModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas.models import QueryRequest
import os
import httpx


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv(
    "PERPLEXITY_API_KEY",
    "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"
)





# Brendan API's go here
########################################################

@app.post("/api/perplexity")
async def perplexity_talk(request: QueryRequest):
    payload = {
        "model": "sonar",
        "messages": [
            {"role": "system", "content": "You are a helpful financial assistant."},
            {"role": "user", "content": request.query},
        ],
    }
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.perplexity.ai/chat/completions",
            headers=headers,
            json=payload,
            timeout=30.0
        )
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()



########################################################