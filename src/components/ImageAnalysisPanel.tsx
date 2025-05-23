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
        onAction={loadImage}
        actionLabel="Load Image"
      />
      
      <ImageDisplay 
        imageUrl={maskedImage} 
        title="Marked Scan"
        onAction={currentImage ? analyzeImage : undefined}
        actionLabel={currentImage ? "Analyze" : undefined}
        showRefresh={maskedImage && !isReanalysis}
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