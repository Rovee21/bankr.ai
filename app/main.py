from byaldi import RAGMultiModalModel
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import torch
import shutil
import os
from app.schemas.models import GetMostRelevantQuery
from app.model_manager import ModelManager


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

@app.post("get_most_relevant_images")
def get_most_relevant_images(query: GetMostRelevantQuery):
    pass

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

# Brendan API's go here
########################################################





########################################################


if __name__ == "__main__":
    
    
    delete_and_recreate_index()