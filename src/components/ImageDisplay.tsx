import React from 'react';
import { ImageIcon, MousePointer, Scan } from 'lucide-react';

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
          <div className="flex flex-col items-center justify-center p-4 text-center text-gray-400">
            {title === "Original Scan" ? (
              <>
                <MousePointer className="w-12 h-12 mb-2 opacity-30" />
                <span className="text-sm">Click "Load Image" to load scan from PACS system</span>
              </>
            ) : (
              <>
                <Scan className="w-12 h-12 mb-2 opacity-30" />
                <span className="text-sm">Click "Analyze" to identify tumor regions</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;