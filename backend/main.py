from dotenv import load_dotenv
import os
from fastapi import FastAPI
import uvicorn
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from models import ThumbnailRequest, ThumbnailResponse, ImageRequest, ImageEditRequest, ImageResponse

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise Exception("OPENAI_API_KEY is not set in the environment variables.")

# Initialize OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

# Root endpoint to check if the API is running
@app.get("/")
def read_root():
    return {"message": "Welcome to the YouTube Thumbnail Generator API!"}

# Test endpoint to verify the API is running
@app.get("/test")
def test_endpoint():
    """Test endpoint that works with GET requests"""
    sample_ideas = [
        "Bold text overlay with bright background",
        "Split screen design showing before/after",
        "Emotional face reaction",
        "Arrow pointing to key element",
        "Question format with curious expression"
    ]
    return {"ideas": sample_ideas}

# Endpoint to generate thumbnail ideas using OpenAI
@app.post("/generate-thumbnail", response_model=ThumbnailResponse)
def generate_thumbnail(request: ThumbnailRequest):
    """
    Generate thumbnail ideas based on the provided prompt using OpenAI
    """

    
    try:
        # Create a prompt for OpenAI to generate thumbnail ideas
        response = client.chat.completions.create(
            # Model is set to gpt-3.5-turbo for generating creative text
            model="gpt-3.5-turbo",
            # Messages to guide the AI in generating thumbnail ideas
            messages=[
                {
                    # System message to set the context for the AI
                    "role": "system",
                    "content": "You are a YouTube thumbnail expert. Generate 5 creative, eye-catching thumbnail ideas that would get high click-through rates. Focus on visual elements, text overlays, colors, and composition. Return each idea on a separate line."
                },
                {
                    # User message with the prompt provided by the user
                    "role": "user",
                    "content": f"Generate 5 thumbnail ideas for a YouTube video about: {request.prompt}"
                }
            ],
            temperature=0.8,
            max_tokens=500
        )
        
        # Parse the response to extract ideas
        ai_response = response.choices[0].message.content
        # Split the response into individual ideas
        ideas = [idea.strip() for idea in ai_response.split('\n') if idea.strip() and not idea.strip().startswith('#')]
        
        # Clean up ideas and ensure we have exactly 5
        #
        clean_ideas = []
        for idea in ideas:
            if idea and not idea.startswith(('#', '*', '-')):
                clean_ideas.append(idea.strip('1234567890. '))
        
        # If we don't get enough ideas, pad with fallback ideas
        if len(clean_ideas) < 5:
            fallback_ideas = [
                f"Bold text overlay: '{request.prompt}' with bright background",
                f"Split screen design showing before/after for '{request.prompt}'",
                f"Emotional face reaction related to '{request.prompt}'",
                f"Arrow pointing to key element about '{request.prompt}'",
                f"Question format: 'How to {request.prompt}?' with curious expression"
            ]
            clean_ideas.extend(fallback_ideas[len(clean_ideas):])
        
        return ThumbnailResponse(ideas=clean_ideas[:5])
    
    # Handle exceptions and provide fallback ideas
    except Exception as e:
        # Fallback to sample ideas if OpenAI fails
        sample_ideas = [
            f"Bold text overlay: '{request.prompt}' with bright background",
            f"Split screen design showing before/after for '{request.prompt}'",
            f"Emotional face reaction related to '{request.prompt}'",
            f"Arrow pointing to key element about '{request.prompt}'",
            f"Question format: 'How to {request.prompt}?' with curious expression"
        ]
        return ThumbnailResponse(ideas=sample_ideas)

@app.post("/generate-image", response_model=ImageResponse)
def generate_thumbnail_image(request: ImageRequest):
    """
    Generate an actual thumbnail image using DALL-E based on the provided prompt
    """
    
    try:
        # Create a detailed prompt for DALL-E optimized for YouTube thumbnails
        style_prompts = {
            "vibrant": "vibrant colors, high contrast, eye-catching",
            "professional": "clean, professional, minimalist design",
            "minimalist": "simple, clean, minimal elements",
            "bold": "bold, dramatic, high-energy"
        }
        
        # Get the style description based on the user's choice
        style_desc = style_prompts.get(request.style, "vibrant colors, high contrast, eye-catching")
        
        # Create a prompt for DALL-E to generate the thumbnail image
        dalle_prompt = f"""YouTube thumbnail image for '{request.prompt}'. 
        Style: {style_desc}. 
        Requirements: 16:9 aspect ratio, readable text if any, compelling visual that encourages clicks, 
        professional quality, suitable for YouTube platform, high contrast for visibility on mobile devices.
        No inappropriate content."""
        
        # Generate the image using DALL-E
        response = client.images.generate(
            # model is set to DALL-E 3 for image generation
            model="dall-e-3",
            # Use the prompt created above
            prompt=dalle_prompt,
            size="1792x1024",  # 16:9 aspect ratio perfect for YouTube thumbnails
            quality="standard",
            n=1,
        )
        
        # Extract the image URL from the response
        image_url = response.data[0].url
        
        # Return the image URL and the prompt used
        return ImageResponse(
            image_url=image_url,
            prompt_used=dalle_prompt
        )
    
    # Handle exceptions and provide error information
    except Exception as e:
        # Return error information
        raise Exception(f"Failed to generate image: {str(e)}")


@app.post("/edit-image", response_model=ImageResponse)
def edit_thumbnail_image(request: ImageEditRequest):
    """
    Edit/refine an existing thumbnail concept based on user feedback
    """
    try:
        # Create a detailed prompt for DALL-E that incorporates the edit instructions
        style_prompts = {
            "vibrant": "vibrant colors, high contrast, eye-catching",
            "professional": "clean, professional, minimalist design",
            "minimalist": "simple, clean, minimal elements",
            "bold": "bold, dramatic, high-energy"
        }
        
        # Get the style description based on the user's choice
        style_desc = style_prompts.get(request.style, "vibrant colors, high contrast, eye-catching")
         
         # Original prompt for the image to be edited
        dalle_prompt = f"""YouTube thumbnail image for '{request.original_prompt}'. Style: {style_desc}. 
        
        IMPORTANT MODIFICATIONS: {request.edit_instructions}
        
        Requirements: 16:9 aspect ratio, readable text if any, compelling visual that encourages clicks, 
        professional quality, suitable for YouTube platform, high contrast for visibility on mobile devices.
        No inappropriate content.
        
        Apply the requested modifications while maintaining thumbnail best practices."""
        
        
        response = client.images.generate(
            model="dall-e-3",
            prompt=dalle_prompt,
            size="1792x1024",  # 16:9 aspect ratio perfect for YouTube thumbnails
            quality="standard",
            n=1,
        )
        
        # Extract the image URL from the response
        image_url = response.data[0].url
        
        return ImageResponse(
            image_url=image_url,
            prompt_used=dalle_prompt
        )
        
    except Exception as e:
        # Return error information
        raise Exception(f"Failed to edit image: {str(e)}")

# Run the FastAPI application
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    