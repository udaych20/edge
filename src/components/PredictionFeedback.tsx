import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Send, RefreshCw } from 'lucide-react';

interface PredictionFeedbackProps {
  prediction: string;
  submitFeedback: (comments: string) => void;
  onReanalyze: () => void;
  isReanalysis: boolean;
}

const PredictionFeedback: React.FC<PredictionFeedbackProps> = ({
  prediction,
  submitFeedback,
  onReanalyze,
  isReanalysis
}) => {
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await submitFeedback(comments);
    setComments('');
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 transition-colors duration-300 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        Prediction & Feedback
      </h3>
      
      <div className="p-4 mb-4 transition-colors duration-300 border rounded-md dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {isReanalysis ? 'Second Opinion:' : 'Initial Prediction:'}
          </span>
          
          {prediction !== '-' && !isReanalysis && (
            <button
              onClick={onReanalyze}
              className="flex items-center px-3 py-1 text-sm text-blue-600 transition-colors duration-200 border border-blue-600 rounded-md hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Get Second Opinion
            </button>
          )}
        </div>
        
        <div className="flex items-center">
          {prediction.includes('Anomaly') ? (
            <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
          ) : prediction !== '-' ? (
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
          ) : null}
          
          <span className={`font-medium ${
            prediction.includes('Anomaly') 
              ? 'text-red-600 dark:text-red-400' 
              : prediction !== '-' 
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-500 dark:text-gray-400'
          }`}>
            {prediction}
          </span>
        </div>
      </div>
      
      <div>
        <label htmlFor="commentBox" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Doctor's Comments
        </label>
        
        <textarea
          id="commentBox"
          rows={4}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Enter your medical observations and feedback here..."
          className="w-full px-3 py-2 transition-colors duration-200 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !comments.trim()}
          className="flex items-center justify-center w-full px-4 py-2 mt-3 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          {isSubmitting ? (
            <>Submitting...</>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PredictionFeedback;