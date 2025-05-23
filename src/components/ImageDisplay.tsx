import React from 'react';
import { ImageIcon, MousePointer, Scan, RefreshCw } from 'lucide-react';

interface ImageDisplayProps {
  imageUrl: string;
  title: string;
  onAction?: () => void;
  actionLabel?: string;
  showRefresh?: boolean;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ 
  imageUrl, 
  title, 
  onAction,
  actionLabel,
  showRefresh,
  onRefresh,
  isLoading
}) => {
  return (
    <div className="p-4 transition-colors duration-300 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </h3>
        {showRefresh && imageUrl && (
          <button
            onClick={onRefresh}
            className="p-1.5 text-blue-600 transition-colors duration-200 rounded-full hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700"
            title="Request second opinion"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-center w-full overflow-hidden bg-gray-100 rounded-md aspect-square dark:bg-gray-700">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center text-gray-400">
              {title === "Original Scan" ? (
                <>
                  <MousePointer className="w-12 h-12 mb-2 opacity-30" />
                  <span className="text-sm">Click below to load scan from PACS</span>
                </>
              ) : (
                <>
                  <Scan className="w-12 h-12 mb-2 opacity-30" />
                  <span className="text-sm">Click below to analyze scan</span>
                </>
              )}
            </div>
          )}
        </div>
        
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            disabled={isLoading}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {isLoading ? (
              <div className="flex items-center">
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </div>
            ) : (
              actionLabel
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;