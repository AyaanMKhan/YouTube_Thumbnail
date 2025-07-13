import React, { useState, useRef, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Input submitted:", input);
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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              YouTube Thumbnail Generator
            </h1>
            <p className="text-gray-400">
              Enter your video topic to get started
            </p>
          </div>
          
          <div>
            <label htmlFor="input" className="block text-white text-sm font-medium mb-3">
              Video Topic or Description
            </label>
            <textarea
              ref={textareaRef}
              id="input"
              value={input}
              onChange={handleInputChange}
              placeholder="e.g., How to learn JavaScript in 30 days"
              className="w-full min-h-[80px] px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none overflow-hidden"
              rows="1"
            />
          </div>
          
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Generate Ideas
          </button>
        </form>
      </div>
    </div>
  );
}


export default App;