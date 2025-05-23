import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Send, RefreshCw, Loader2 } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

interface PredictionFeedbackProps {
  prediction: string;
  submitFeedback: (comments: string) => void;
  onReanalyze: () => void;
  isReanalysis: boolean;
  isAnalyzing: boolean;
}

const PredictionFeedback: React.FC<PredictionFeedbackProps> = ({
  prediction,
  submitFeedback,
  onReanalyze,
  isReanalysis,
  isAnalyzing
}) => {
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showReanalysisInput, setShowReanalysisInput] = useState(false);
  const [reanalysisNotes, setReanalysisNotes] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await submitFeedback(comments);
    setComments('');
    setIsSubmitting(false);
    setShowFeedbackModal(true);
  };

  const handleReanalyze = () => {
    if (reanalysisNotes.trim()) {
      setShowReanalysisInput(false);
      onReanalyze();
      setComments(reanalysisNotes);
      setReanalysisNotes('');
    }
  };

  return (
    <div className="p-4 transition-colors duration-300 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <FeedbackModal 
        isOpen={showFeedbackModal} 
        onClose={() => setShowFeedbackModal(false)} 
      />

      <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        Prediction & Feedback
      </h3>
      
      <div className="p-4 mb-4 transition-colors duration-300 border rounded-md dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {showReanalysisInput ? 'Annotate:' : 'Prediction:'}
          </span>
          
          {prediction !== '-' && !isReanalysis && !isAnalyzing && !showReanalysisInput && (
            <button
              onClick={() => setShowReanalysisInput(true)}
              className="flex items-center px-3 py-1 text-sm text-blue-600 transition-colors duration-200 border border-blue-600 rounded-md hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Analyze Again
            </button>
          )}
        </div>
        
        {showReanalysisInput ? (
          <div className="space-y-3">
            <textarea
              value={reanalysisNotes}
              onChange={(e) => setReanalysisNotes(e.target.value)}
              placeholder="Please enter your observations and reason for requesting a reanalysis..."
              className="w-full h-24 px-3 py-2 text-sm transition-colors duration-200 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowReanalysisInput(false);
                  setReanalysisNotes('');
                }}
                className="px-3 py-1 text-sm text-gray-600 transition-colors duration-200 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleReanalyze}
                disabled={!reanalysisNotes.trim()}
                className="flex items-center px-3 py-1 text-sm text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Proceed
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 text-blue-500 animate-spin" />
                <span className="text-blue-600 dark:text-blue-400">Processing...</span>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="commentBox" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Feedback
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