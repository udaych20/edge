import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isOpen) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute p-1 text-gray-400 transition-colors duration-200 rounded-full top-4 right-4 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-12 h-12 mb-4 bg-green-100 rounded-full dark:bg-green-900">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Feedback Submitted
          </h3>
          
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Thank you for your feedback. Your input helps improve our analysis system.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Closing in {countdown} seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;