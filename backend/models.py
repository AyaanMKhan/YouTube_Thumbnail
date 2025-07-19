from pydantic import BaseModel
from typing import List

# Request model for generating thumbnail ideas
class ThumbnailRequest(BaseModel):
    prompt: str

# Response model for thumbnail ideas
class ThumbnailResponse(BaseModel):
    ideas: List[str]

# Request model for generating images
class ImageRequest(BaseModel):
    prompt: str
    style: str = "vibrant"  # vibrant, professional, minimalist, bold

# Request model for editing images
class ImageEditRequest(BaseModel):
    original_prompt: str
    edit_instructions: str
    style: str = "vibrant"

# Response model for image operations
class ImageResponse(BaseModel):
    image_url: str
    prompt_used: str


