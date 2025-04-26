from pydantic import BaseModel

class Test(BaseModel):
    test: str
    
    
class GetMostRelevantQuery(BaseModel):
    query: str