import React from 'react';
import ImageDisplay from './ImageDisplay';
import PredictionFeedback from './PredictionFeedback';

interface ImageAnalysisPanelProps {
  currentImage: string;
  maskedImage: string;
  prediction: string;
  submitFeedback: (comments: string) => void;
}

const ImageAnalysisPanel: React.FC<ImageAnalysisPanelProps> = ({
  currentImage,
  maskedImage,
  prediction,
  submitFeedback
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <ImageDisplay 
        imageUrl={currentImage} 
        title="Original Scan" 
      />
      
      <ImageDisplay 
        imageUrl={maskedImage} 
        title="Marked Scan" 
      />
      
      <PredictionFeedback 
        prediction={prediction} 
        submitFeedback={submitFeedback} 
      />
    </div>
  );
};

export default ImageAnalysisPanel;