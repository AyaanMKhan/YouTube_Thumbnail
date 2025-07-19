import React from 'react';

const ErrorDisplay = ({ error, imageError }) => {
  if (!error && !imageError) return null;

  return (
    <>
      {/* General Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Image Error Message */}
      {imageError && (
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
            <p className="text-red-300">{imageError}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorDisplay;
