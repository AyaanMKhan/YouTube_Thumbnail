# YouTube Thumbnail Generator

## Overview
The YouTube Thumbnail Generator is an AI-powered web application that automates the creation of high-impact, visually engaging thumbnails for YouTube videos. It leverages natural language processing and image generation models to streamline the content creator workflow.

## Tech Stack
- **Frontend**: React with TailwindCSS
- **Backend**: FastAPI (Python)
- **AI Models**:
  - `gpt-3.5-turbo` – used for prompt generation and intelligent captioning
  - `DALL·E 3` – used for generating thumbnail images from textual prompts


## Key Features
- 🎯 **Prompt-Based Thumbnail Generation** – Input a video title or description and generate AI-driven thumbnails using OpenAI models.
- 💡 **Thumbnail Ideation** – Get creative suggestions and concepts for thumbnails tailored to your content.
- 🛠 **Edit Existing Thumbnails** – Modify and iterate on previously generated thumbnails for refinement.
- ⬇️ **Download Capability** – Seamlessly download your finalized thumbnails for use in your videos.
- 🧠 **Caption Assistance** – Generate compelling thumbnail text using GPT-3.5 to enhance viewer engagement.
- 🖼 **High-Resolution Image Output** – Create studio-quality visuals with DALL·E 3.
- ⚡ **FastAPI Backend** – High-performance, asynchronous backend architecture.
- 🌐 **Modern UI** – Built with React for responsive, intuitive user interaction.


## Usage
1. Input a YouTube video title or description.
2. The system generates a context-aware prompt using GPT-3.5.
3. DALL·E 3 generates a thumbnail based on the enhanced prompt.
4. The final image is rendered on the frontend.
5. Edit image until you are satisfied.
6. Download the image!

## Setup Instructions

### Backend (FastAPI)
```bash
cd backend/
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

```requirements.txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
openai==1.3.8
python-dotenv==1.0.0
pydantic==2.5.0
```

### Frontend (React)
```bash
cd frontend/
npm install
npm start
```

## Future Enhancements
- 🧩 **Drag-and-Drop Editor** – Integrate a canvas-based thumbnail editor with layer control, text positioning, and overlays.
- 🗂 **Template Library** – Pre-built thumbnail styles tailored for common YouTube niches (e.g., tech, vlogs, education).
- 📊 **A/B Testing Integration** – Connect with YouTube API to test and compare thumbnail performance.
- 🔁 **History & Versioning** – Store previously generated thumbnails and edits for quick reversion or reuse.
- ☁️ **Cloud Storage Integration** – Optional export to Google Drive or Dropbox.
- 🔧 **Custom Prompt Tuning** – Allow users to fine-tune prompt inputs for better creative control.
- 🎯 **Niche-Based Prompt Suggestions** – Intelligent prompt suggestions based on selected content category.
