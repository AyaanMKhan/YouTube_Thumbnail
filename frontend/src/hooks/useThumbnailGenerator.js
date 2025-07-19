import { useState, useRef, useEffect } from 'react';

const useThumbnailGenerator = () => {
  const [input, setInput] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("vibrant");
  const [showEditMode, setShowEditMode] = useState(false);
  const [editInstructions, setEditInstructions] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setIdeas([]);

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

  const handleGenerateImage = async () => {
    if (!input.trim()) return;

    setImageLoading(true);
    setImageError("");
    setGeneratedImage(null);

    try {
      console.log('Generating image with DALL-E...');
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

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Image generation error:', errorText);
        throw new Error(`Failed to generate image: ${response.status}`);
      }

      const data = await response.json();
      console.log('Generated image data:', data);
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
    if (!editInstructions.trim() || !generatedImage) return;

    setEditLoading(true);
    setImageError("");

    try {
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
      setGeneratedImage(data);
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
    setInput(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

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
