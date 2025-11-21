
import React from 'react';
import { Photo } from '../types';

interface PhotoModalProps {
  photo: Photo | null;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-[fadeIn_0.2s_ease-out]">
      
      {/* Backdrop - Light & Blurred for Focus */}
      <div 
        className="absolute inset-0 bg-white/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-black/40 hover:text-black transition-colors w-8 h-8 flex items-center justify-center bg-gray-100/50 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-full max-h-full pointer-events-none">
        
        {/* Image */}
        <div className="relative overflow-hidden rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.15)] pointer-events-auto mb-6">
            <img 
                src={photo.url} 
                alt={photo.caption} 
                className="max-w-[90vw] max-h-[70vh] object-contain block select-none"
            />
        </div>

        {/* Description - Apple Message Bubble Style */}
        <div className="flex flex-col items-center animate-[slideUp_0.3s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards] pointer-events-auto">
            
            {/* Timestamp/Location Label */}
            <span className="text-[11px] text-gray-400 font-medium mb-1.5 tracking-wide">
                {photo.location}
            </span>

            {/* Blue Bubble */}
            <div className="relative bg-[#007AFF] text-white px-4 py-2.5 rounded-[18px] rounded-tr-md max-w-sm shadow-sm">
                <p className="text-[15px] font-sans font-normal leading-snug">
                    {photo.caption}
                </p>
            </div>

        </div>

      </div>
    </div>
  );
};
