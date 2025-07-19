import React from "react";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import ImageGenerator from "./components/ImageGenerator";
import ErrorDisplay from "./components/ErrorDisplay";
import GeneratedImage from "./components/GeneratedImage";
import ThumbnailIdeas from "./components/ThumbnailIdeas";
import useThumbnailGenerator from "./hooks/useThumbnailGenerator";

function App() {
  const {
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
  } = useThumbnailGenerator();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <Header />
        
        <InputForm
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
          textareaRef={textareaRef}
        />

        <ImageGenerator
          input={input}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          handleGenerateImage={handleGenerateImage}
          imageLoading={imageLoading}
        />

        <ErrorDisplay error={error} imageError={imageError} />

        <GeneratedImage
          generatedImage={generatedImage}
          showEditMode={showEditMode}
          setShowEditMode={setShowEditMode}
          editInstructions={editInstructions}
          setEditInstructions={setEditInstructions}
          handleEditImage={handleEditImage}
          editLoading={editLoading}
        />

        <ThumbnailIdeas ideas={ideas} />
      </div>
    </div>
  );
}

export default App;