import React from 'react';
import { ImageIcon } from 'lucide-react';

interface ImageDisplayProps {
  imageUrl: string;
  title: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, title }) => {
  return (
    <div className="p-4 transition-colors duration-300 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        {title}
      </h3>
      
      <div className="flex items-center justify-center w-full overflow-hidden bg-gray-100 rounded-md aspect-square dark:bg-gray-700">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 text-center px-4">
            <ImageIcon className="w-12 h-12 mb-2 opacity-30" />
            <span className="text-sm">
              {title === "Original Scan"
                ? "Click 'Load Image' to see the scan"
                : title === "Marked Scan"
                ? "Click 'Analyze' to view the tumor"
                : "No image loaded"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;