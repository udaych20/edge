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
  isPredicting: boolean;
}

const ImageAnalysisPanel: React.FC<ImageAnalysisPanelProps> = ({
  currentImage,
  maskedImage,
  prediction,
  submitFeedback,
  onReanalyze,
  isReanalysis,
  isPredicting
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
        onReanalyze={onReanalyze}
        isReanalysis={isReanalysis}
        isPredicting={isPredicting}
      />
    </div>
  );
};

export default ImageAnalysisPanel