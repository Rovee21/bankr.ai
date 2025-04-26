from pydantic import BaseModel
from typing import Optional
class Test(BaseModel):
    test: str
    
    
class QueryRequest(BaseModel):
    query: str
    
    
class PersonalInfo(BaseModel):
    user_name: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    credit_score: Optional[int] = None
    date_of_birth: Optional[str] = None