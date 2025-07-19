import React from 'react';
import ImageEditor from './ImageEditor';

// GeneratedImage Component
// This component displays the generated thumbnail image and provides options to download, copy URL, and edit
const GeneratedImage = ({ 
  generatedImage,
  showEditMode,
  setShowEditMode,
  editInstructions,
  setEditInstructions,
  handleEditImage,
  editLoading 
}) => {
  if (!generatedImage) return null;

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        🖼️ Generated Thumbnail Image
      </h2>
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="text-center">
          <img 
            src={generatedImage.image_url} 
            alt="Generated YouTube Thumbnail"
            className="max-w-full h-auto rounded-lg shadow-lg mb-4 mx-auto"
            style={{ maxHeight: '400px' }}
          />
          <div className="text-sm text-gray-400 mb-4">
            {/* Display the prompt used for generating the image */}
            <p><strong>Prompt used:</strong> {generatedImage.prompt_used}</p>
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <a
              href={generatedImage.image_url}
              download="youtube-thumbnail.png"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Download Image
            </a>
            <button
            // Copy the image URL to clipboard
              onClick={() => navigator.clipboard.writeText(generatedImage.image_url)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
            >
              Copy URL
            </button>
            <button
            // Toggle edit mode for the image
              onClick={() => setShowEditMode(!showEditMode)}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200"
            >
              {showEditMode ? "Cancel Edit" : "Edit Image"}
            </button>
          </div>
          
          <ImageEditor
            editInstructions={editInstructions}
            setEditInstructions={setEditInstructions}
            handleEditImage={handleEditImage}
            editLoading={editLoading}
            setShowEditMode={setShowEditMode}
            showEditMode={showEditMode}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneratedImage;
