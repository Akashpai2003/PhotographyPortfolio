import React from 'react';
import { Photo } from '../types';

interface MasonryGridModalProps {
  photos: Photo[];
  onClose: () => void;
  onPhotoClick: (photo: Photo) => void;
}

export const MasonryGridModal: React.FC<MasonryGridModalProps> = ({ photos, onClose, onPhotoClick }) => {
  return (
    <div className="fixed inset-0 z-[90] bg-white overflow-y-auto animate-[fadeIn_0.3s_ease-out]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-sans font-semibold tracking-tight text-black">Gallery Archive</h2>
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      {/* Masonry Layout */}
      <div className="p-4 md:p-8">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="break-inside-avoid mb-4 cursor-pointer group"
              onClick={() => onPhotoClick(photo)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <p className="mt-2 text-[10px] md:text-xs text-gray-500 font-medium truncate pl-1">
                {photo.location}
              </p>
            </div>
          ))}
        </div>
        
        {/* Footer spacer */}
        <div className="h-20 flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest">
          End of Archive
        </div>
      </div>
    </div>
  );
};