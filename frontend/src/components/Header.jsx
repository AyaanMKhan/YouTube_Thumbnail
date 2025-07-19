import React from 'react';

// Header Component
// This component displays the main title and description for the application
const Header = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">
        YouTube Thumbnail Generator
      </h1>
      <p className="text-gray-400">
        Enter your video topic to get AI-powered thumbnail ideas
      </p>
    </div>
  );
};

export default Header;
