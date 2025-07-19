import React from 'react';

const ImageEditor = ({ 
  editInstructions,
  setEditInstructions,
  handleEditImage,
  editLoading,
  setShowEditMode,
  showEditMode 
}) => {
  if (!showEditMode) return null;

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold text-white mb-3">Edit Your Thumbnail</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            What would you like to change?
          </label>
          <textarea
            value={editInstructions}
            onChange={(e) => setEditInstructions(e.target.value)}
            placeholder="e.g., Make the colors more vibrant, add more text, change the background to blue, make the person look more excited..."
            className="w-full h-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
        
        <div className="flex justify-center space-x-3">
          <button
            onClick={handleEditImage}
            disabled={!editInstructions.trim() || editLoading}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
          >
            {editLoading ? "Generating..." : "Apply Changes"}
          </button>
          <button
            onClick={() => {
              setShowEditMode(false);
              setEditInstructions("");
            }}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
