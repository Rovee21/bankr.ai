from byaldi import RAGMultiModalModel
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import torch
import shutil
import os
from app.schemas.models import QueryRequest, PersonalInfo
from app.model_manager import ModelManager
from elevenlabs import ElevenLabs
from google import genai
from google.genai import types
import httpx
from io import BytesIO
import base64
from PIL import Image
import mysql.connector
from dotenv import load_dotenv
import os

# Change path to the correct location
# load_dotenv(dotenv_path="/Users/yahiasalman/Desktop/personal_projects/dragonhacksbackend/app/.env")
load_dotenv()

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="moneybuddy",
    port=8889
)

cursor = db.cursor()



eleven_labs_client = ElevenLabs(api_key=os.getenv("ELEVEN_LABS_KEY"))
gemini_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["localhost:3000", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_manager = ModelManager()

@app.post("/add_file_to_index")
async def add_file_to_index(file: UploadFile = File(...)):
    with open(f"./temp_documents/{file.filename}", "wb") as f:
        f.write(await file.read())
    
    # RAG = RAGMultiModalModel.from_index(
    #     index_path=f"test_index",
    #     index_root="./indexes",
    #     device="cuda" if torch.cuda.is_available() else "mps",
    # )
    RAG = model_manager.get_model(device="cuda" if torch.cuda.is_available() else "mps")
    # RAG.index(input_path="./temp_documents", index_name="test_index")
    RAG.add_to_index(
        input_item=f"./temp_documents/{file.filename}",
        store_collection_with_index=True
    )
    return {"message": "File added to index"}

@app.post("/search_documents")
def search_documents(query: QueryRequest):
    RAG = model_manager.get_model(device="cuda" if torch.cuda.is_available() else "mps")
    response = RAG.search(
        query=query.query,
        k=10,
    )
    base64_images = [item["base64"] for item in response]
    # gemini-2.5-pro-exp-03-25
    images = []
    for image in base64_images:
        images.append(Image.open(BytesIO(base64.b64decode(image))))
    
    final_query = f"You will answer questions about this query based off of the given images. If the images have nothing to do with the query just say that. Here is the query: {query.query}"
    
    images.append(final_query)
    response = gemini_client.models.generate_content(
        model="gemini-2.5-pro-exp-03-25",
        contents=images
    )
    return {"answer": response.text}

def delete_and_recreate_index():
    # Create indexes directory if it doesn't exist
    if not os.path.exists("./indexes"):
        os.makedirs("./indexes")
    
    # Remove the index folder if it exists
    if os.path.exists("./indexes/test_index"):
        shutil.rmtree("./indexes/test_index")
    
    # Recreate the index
    # RAG = model_manager.get_model(device="cuda" if torch.cuda.is_available() else "mps")
    RAG = RAGMultiModalModel.from_pretrained(
        "vidore/colpali-v1.3",
        index_root="./indexes",
        device="cuda" if torch.cuda.is_available() else "mps",
    )
    RAG.index(input_path="./blank_docs", index_name="test_index", store_collection_with_index=True)
    return {"message": "Index recreated"}

@app.post("/replace_first_message_and_system_prompt")
async def replace_first_message_and_system_prompt(name_of_company: str):
    
    response = eleven_labs_client.conversational_ai.update_agent(
        agent_id="PrnPkuRxNus6wjn9jPmE",
        conversation_config = {
            "agent": {
                "first_message": f"Hello, I'm Maya from {name_of_company} how can I help you today?",
                "prompt": {
                    "prompt": f"You are a helpful customer service agent for {name_of_company}, You are given a index that you can RAG from to check different information and from there. You can answer general questions like 'what does {name_of_company} do?' without querying the index but if there is something that you need to know, you can query the index. If you cannot find the information you can say that. "
                }
            }
        }
    )
    
    
# Maya API's go here
########################################################

@app.post("/change_personal_info")
def change_personal_info(info: PersonalInfo):
    cursor = db.cursor()
    
    try:
        if not info.user_name:
            raise HTTPException(status_code=400, detail="User name is required")
        
        #get the current personal info
        cursor.execute("SELECT * FROM personal_info WHERE user_name = %s", (info.user_name,))
        results = cursor.fetchall()
        
        if len(results) == 0:
            raise HTTPException(status_code=404, detail=f"No record found with user_name: {info.user_name}")
        
        #info may not have all the fields so we need to check for each one and if it is none, we use the old value
        old_info = results[0]
        address = info.address if info.address is not None else old_info[1]
        email = info.email if info.email is not None else old_info[2]
        phone_number = info.phone_number if info.phone_number is not None else old_info[3]
        first_name = info.first_name if info.first_name is not None else old_info[4]
        last_name = info.last_name if info.last_name is not None else old_info[5]
        credit_score = info.credit_score if info.credit_score is not None else old_info[6]
        date_of_birth = info.date_of_birth if info.date_of_birth is not None else old_info[7]
        
        cursor.execute(
            "UPDATE personal_info SET address = %s, email = %s, phone_number = %s, first_name = %s, last_name = %s, credit_score = %s, date_of_birth = %s WHERE user_name = %s",
            (
                address,
                email,
                phone_number,
                first_name,
                last_name,
                credit_score,
                date_of_birth,
                info.user_name
            )
        )
        
        db.commit()
        
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail=f"No record found with user_name: {info.user_name}")
        
        return {"message": "Personal information updated successfully"}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()

@app.get("/get_personal_info")
def get_personal_info():
    
    cursor = db.cursor(dictionary=True)
    
    try:
        cursor.execute("SELECT * FROM personal_info")
        results = cursor.fetchall()
        
        return PersonalInfo(**results[0])
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()

########################################################

# Brendan API's go here
########################################################

@app.post("/perplexity")
async def perplexity_talk(request: QueryRequest):
    payload = {
        "model": "sonar",
        "messages": [
            {"role": "system", "content": "Be Precise and Concise."},
            {"role": "user", "content": request.query},
        ],
    }
    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
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
    # return response.json()
    result = response.json()
    return {"answer": result["choices"][0]["message"]["content"]}



########################################################


if __name__ == "__main__":
    
    
    delete_and_recreate_index()