from pydantic import BaseModel


class UserInput(BaseModel):
    input: str
    model: str = "gpt-4"


