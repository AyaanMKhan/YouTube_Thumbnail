import { useState } from "react";

export default function InputGenerator() {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    console.log("Prompt submitted:", prompt);
    // Insert generation logic here
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 border-b border-gray-800 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-white">YouTube Thumbnail Generator</h1>
      </header>

      {/* Body */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white">Create Amazing Thumbnails</h2>
            <p className="text-gray-400 text-lg">Enter your video topic and generate eye-catching thumbnail ideas</p>
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-white text-sm font-medium">Video Topic or Description</label>
              <input
                type="text"
                placeholder="e.g., How to learn JavaScript in 30 days"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-14 px-6 bg-gray-900 border-2 border-gray-700 rounded-xl placeholder-gray-500 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-base"
              />
            </div>

            {/* Button */}
            <div className="flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg"
              >
                Generate Thumbnail Ideas
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
