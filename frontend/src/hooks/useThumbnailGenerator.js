import { useState, useRef, useEffect } from 'react';

// Custom hook for managing thumbnail generation state and actions
// This hook encapsulates all the logic related to generating and editing thumbnails  
const useThumbnailGenerator = () => {
  // State variables
  // This state holds the user input for thumbnail generation
  const [input, setInput] = useState("");
  // This state holds the generated thumbnail ideas
  const [ideas, setIdeas] = useState([]);
  // This state indicates if the initial loading of ideas is in progress
  const [loading, setLoading] = useState(false);
  // This state holds any error messages related to idea generation
  const [error, setError] = useState("");
  // This state holds the generated image data
  const [generatedImage, setGeneratedImage] = useState(null);
  // This state indicates if the image generation is in progress
  const [imageLoading, setImageLoading] = useState(false);
  // This state holds any error messages related to image generation
  const [imageError, setImageError] = useState("");
  // This state holds the selected style for the thumbnail
  // Default style is set to "vibrant"
  const [selectedStyle, setSelectedStyle] = useState("vibrant");
  // This state indicates if the edit mode for the generated image is active
  const [showEditMode, setShowEditMode] = useState(false);
  // This state holds the instructions for editing the image
  const [editInstructions, setEditInstructions] = useState("");
  // This state indicates if the image editing is in progress
  const [editLoading, setEditLoading] = useState(false);
  // Reference to the textarea for auto-resizing
  const textareaRef = useRef(null);

  // Function to handle form submission for generating thumbnail ideas
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setIdeas([]);

    // Log the input to debug if needed
    try {
      console.log('Sending request to backend...');
      const response = await fetch('http://localhost:8000/generate-thumbnail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`Failed to generate ideas: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      setIdeas(data.ideas);
    } catch (err) {
      console.error('Full error:', err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Cannot connect to backend server. Make sure it\'s running on port 8000.');
      } else {
        setError(`Failed to generate thumbnail ideas: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle image generation based on user input and selected style
  const handleGenerateImage = async () => {
    if (!input.trim()) return;

    setImageLoading(true);
    setImageError("");
    setGeneratedImage(null);

    try {
      console.log('Generating image with DALL-E...');
      // fetching the image from the backend
      const response = await fetch('http://localhost:8000/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: input,
          style: selectedStyle 
        }),
      });
      
      // If response is bad, throw an error
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Image generation error:', errorText);
        throw new Error(`Failed to generate image: ${response.status}`);
      }

      // Parse the response data
      const data = await response.json();
      console.log('Generated image data:', data);
      // Set the generated image data
      setGeneratedImage(data);
    } catch (err) {
      console.error('Image generation error:', err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setImageError('Cannot connect to backend server. Make sure it\'s running on port 8000.');
      } else {
        setImageError(`Failed to generate image: ${err.message}`);
      }
    } finally {
      setImageLoading(false);
    }
  };

  const handleEditImage = async () => {
    // Check if edit instructions are provided and an image is generated
    if (!editInstructions.trim() || !generatedImage) return;

    setEditLoading(true);
    setImageError("");

    try {
      // Fetching the edit image from the backend
      console.log('Editing image with instructions:', editInstructions);
      const response = await fetch('http://localhost:8000/edit-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          original_prompt: input,
          edit_instructions: editInstructions,
          style: selectedStyle 
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Image edit error:', errorText);
        throw new Error(`Failed to edit image: ${response.status}`);
      }

      const data = await response.json();
      console.log('Edited image data:', data);
      // Set the edited image data
      setGeneratedImage(data);
      // Clear edit instructions and hide edit mode
      setEditInstructions("");
      setShowEditMode(false);
    } catch (err) {
      console.error('Image edit error:', err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setImageError('Cannot connect to backend server. Make sure it\'s running on port 8000.');
      } else {
        setImageError(`Failed to edit image: ${err.message}`);
      }
    } finally {
      setEditLoading(false);
    }
  };

  const handleInputChange = (e) => {
    // Update the input state with the new value
    setInput(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  // Set initial height for the textarea
  useEffect(() => {
    // Set initial height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, []);

  return {
    // State
    input,
    ideas,
    loading,
    error,
    generatedImage,
    imageLoading,
    imageError,
    selectedStyle,
    showEditMode,
    editInstructions,
    editLoading,
    textareaRef,
    
    // Actions
    handleSubmit,
    handleGenerateImage,
    handleEditImage,
    handleInputChange,
    setSelectedStyle,
    setShowEditMode,
    setEditInstructions
  };
};

export default useThumbnailGenerator;
