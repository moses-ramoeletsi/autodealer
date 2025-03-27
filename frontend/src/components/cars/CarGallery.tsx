
import React, { useState } from 'react';

interface CarGalleryProps {
  images: string[];
  title: string;
}

const CarGallery: React.FC<CarGalleryProps> = ({ images, title }) => {
  const [mainImage, setMainImage] = useState(images[0] || '');
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };
  
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  
  if (images.length === 0) {
    return (
      <div className="bg-secondary h-72 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="space-y-3">
        <div
          className="relative rounded-lg overflow-hidden bg-secondary cursor-pointer"
          onClick={toggleFullScreen}
        >
          <img
            src={mainImage}
            alt={title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <button
            className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullScreen();
            }}
            aria-label="Toggle fullscreen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(image)}
              className={`flex-shrink-0 w-20 h-16 md:w-24 md:h-20 rounded overflow-hidden ${
                mainImage === image ? 'ring-2 ring-primary' : 'ring-1 ring-border hover:ring-primary/50'
              } transition-all`}
            >
              <img
                src={image}
                alt={`${title} - view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      
      {isFullScreen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={toggleFullScreen}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
            onClick={toggleFullScreen}
            aria-label="Close fullscreen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={mainImage}
            alt={title}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex justify-center space-x-2 px-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThumbnailClick(image);
                  }}
                  className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-16 rounded overflow-hidden ${
                    mainImage === image ? 'ring-2 ring-primary' : 'ring-1 ring-white/30 hover:ring-white/60'
                  } transition-all`}
                >
                  <img
                    src={image}
                    alt={`${title} - view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarGallery;
