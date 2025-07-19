import React from 'react';

const InputForm = ({ 
  input, 
  handleInputChange, 
  handleSubmit, 
  loading, 
  textareaRef 
}) => {
  return (
    
    // This component handles user input for generating thumbnail ideas
    <form onSubmit={handleSubmit} className="space-y-6 mb-8">
      <div className="max-w-lg mx-auto">
        <label htmlFor="input" className="block text-white text-sm font-medium mb-3">
          Video Topic or Description
        </label>
        <textarea
          ref={textareaRef}
          id="input"
          value={input}
          // Handle changes to the input field
          onChange={handleInputChange}
          placeholder="e.g., How to learn JavaScript in 30 days"
          className="w-full min-h-[80px] px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none overflow-hidden"
          rows="1"
        />
      </div>
      
      <div className="flex justify-center">
        <button
          type="submit"
          // Handle form submission to generate thumbnail ideas
          disabled={!input.trim() || loading}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          {loading ? "Generating..." : "Generate Ideas"}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
