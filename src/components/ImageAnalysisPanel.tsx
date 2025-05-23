import React from 'react';
import ImageDisplay from './ImageDisplay';
import PredictionFeedback from './PredictionFeedback';

interface ImageAnalysisPanelProps {
  currentImage: string;
  maskedImage: string;
  prediction: string;
  submitFeedback: (comments: string) => void;
  onReanalyze: () => void;
  isReanalysis: boolean;
  isAnalyzing: boolean;
  loadImage: () => void;
  analyzeImage: () => void;
}

const ImageAnalysisPanel: React.FC<ImageAnalysisPanelProps> = ({
  currentImage,
  maskedImage,
  prediction,
  submitFeedback,
  onReanalyze,
  isReanalysis,
  isAnalyzing,
  loadImage,
  analyzeImage
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <ImageDisplay 
        imageUrl={currentImage} 
        title="Original Scan"
        onAction={!currentImage ? loadImage : undefined}
        actionLabel={!currentImage ? "Load Image" : undefined}
        showRefresh={!!currentImage}
        onRefresh={loadImage}
        isLoading={false}
      />
      
      <ImageDisplay 
        imageUrl={maskedImage} 
        title="Annotated Scan"
        onAction={currentImage && !maskedImage ? analyzeImage : undefined}
        actionLabel={currentImage && !maskedImage ? "Analyze" : undefined}
        showRefresh={!!maskedImage}
        onRefresh={onReanalyze}
        isLoading={isAnalyzing}
      />
      
      <PredictionFeedback 
        prediction={prediction}
        submitFeedback={submitFeedback}
        onReanalyze={onReanalyze}
        isReanalysis={isReanalysis}
        isAnalyzing={isAnalyzing}
      />
    </div>
  );
};

export default ImageAnalysisPanel;