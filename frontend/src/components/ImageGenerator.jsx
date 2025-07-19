import React from 'react';

const ImageGenerator = ({ 
  input,
  selectedStyle,
  setSelectedStyle,
  handleGenerateImage,
  imageLoading 
}) => {
  return (
    <div className="max-w-lg mx-auto mb-8 p-6 bg-gray-900 border border-gray-700 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4 text-center">
        🎨 Generate Actual Thumbnail Image
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Style
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="vibrant">Vibrant & Eye-catching</option>
            <option value="professional">Professional & Clean</option>
            <option value="minimalist">Minimalist & Simple</option>
            <option value="bold">Bold & Dramatic</option>
          </select>
        </div>
        
        <button
          onClick={handleGenerateImage}
          disabled={!input.trim() || imageLoading}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200"
        >
          {imageLoading ? "Generating Image..." : "Generate Thumbnail Image"}
        </button>
      </div>
    </div>
  );
};

export default ImageGenerator;
