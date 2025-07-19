import React from 'react';

const ThumbnailIdeas = ({ ideas }) => {
  if (ideas.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        🎨 AI-Generated Thumbnail Ideas
      </h2>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {ideas.map((idea, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-100 leading-relaxed">{idea}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailIdeas;
