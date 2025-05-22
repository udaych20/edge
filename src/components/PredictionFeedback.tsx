import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Send, RefreshCw } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

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
  const [showReanalysisModal, setShowReanalysisModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
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
      setShowReanalysisModal(false);
      onReanalyze();
      // Store the notes for later feedback submission
      setComments(reanalysisNotes);
      setReanalysisNotes('');
    }
  };

  return (
    <div className="p-4 transition-colors duration-300 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      {/* Feedback Success Modal */}
      <FeedbackModal 
        isOpen={showFeedbackModal} 
        onClose={() => setShowFeedbackModal(false)} 
      />

      {/* Reanalysis Modal */}
      {showReanalysisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Request Second Opinion
            </h3>
            <textarea
              value={reanalysisNotes}
              onChange={(e) => setReanalysisNotes(e.target.value)}
              placeholder="Please enter your observations and reason for requesting a second opinion..."
              className="w-full h-32 px-3 py-2 mb-4 transition-colors duration-200 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReanalysisModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleReanalyze}
                disabled={!reanalysisNotes.trim()}
                className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        Prediction & Feedback
      </h3>
      
      <div className="p-4 mb-4 transition-colors duration-300 border rounded-md dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {isReanalysis ? 'Prediction:' : 'Prediction:'}
          </span>
          
          {prediction !== '-' && !isReanalysis && (
            <button
              onClick={() => setShowReanalysisModal(true)}
              className="flex items-center px-3 py-1 text-sm text-blue-600 transition-colors duration-200 border border-blue-600 rounded-md hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Analyze Again
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