
import React, { useState, useRef, useEffect } from 'react';
import { FloatingSticker } from './components/FloatingSticker';
import { PhotoModal } from './components/PhotoModal';
import { FolderIcon } from './components/FolderIcon';
import { MasonryGridModal } from './components/MasonryGridModal';
import { INITIAL_PHOTOS, DEFAULT_BG_IMAGE } from './constants';
import { Photo } from './types';

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState<string>(DEFAULT_BG_IMAGE);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile to limit number of photos
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile, slice the array to only show the first 6 items to avoid congestion.
  // The Masonry Grid will allow users to see ALL photos.
  const visiblePhotos = isMobile ? INITIAL_PHOTOS.slice(0, 6) : INITIAL_PHOTOS;

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white select-none font-sans text-black">
      
      {/* --- BACKGROUND --- */}
      {backgroundUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
          style={{ 
            backgroundImage: `url(${backgroundUrl})`,
          }}
        />
      )}

      {/* --- DESKTOP UI LAYER --- */}
      <div className="relative z-10 w-full h-full">
        
        {/* --- CENTER MANIFESTO OVERLAY --- */}
        <div className="absolute top-[15%] md:top-[30%] left-1/2 -translate-x-1/2 md:-translate-y-1/2 flex flex-col items-center md:items-start max-w-[90%] md:max-w-[500px] pointer-events-none z-0 text-center md:text-left">
            
            {/* Floating Sticker */}
            <div className="bg-white text-blue-600 px-5 py-2 mb-6 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-blue-50 font-medium text-sm tracking-wide animate-[float_6s_ease-in-out_infinite]">
                hey, i am akash!
            </div>

            {/* Text Body */}
            <div className="font-sans text-3xl md:text-4xl leading-[1.3] text-gray-900 font-light tracking-tight">
                <span>
                    Chasing the light, freezing time,
                </span>
                <br/>
                <span className="mt-2 inline-block text-gray-400">
                    and telling stories without words.
                </span>
            </div>

            <div className="mt-12 flex items-center justify-center md:justify-start gap-3">
                <div className="w-8 h-[1px] bg-gray-300"></div>
                <p className="text-gray-400 font-sans text-[10px] tracking-[0.2em] uppercase">
                    Akash
                </p>
            </div>
        </div>

        {/* --- FOLDER ICON --- */}
        {/* 
            Desktop: Top-Right (40px from top, 100px from right edge)
            Mobile: Bottom-Center (120px from bottom, centered horizontally)
        */}
        <FolderIcon 
            onClick={() => setIsGridOpen(true)} 
            top={isMobile ? 'calc(100% - 120px)' : '40px'} 
            left={isMobile ? 'calc(50% - 25px)' : 'calc(100% - 100px)'} 
        />

        {/* --- FLOATING PHOTOS --- */}
        {visiblePhotos.map((photo, index) => (
          <FloatingSticker 
            key={photo.id} 
            photo={photo} 
            index={index}
            onClick={handlePhotoClick} 
          />
        ))}

      </div>

      {/* --- MASONRY GRID MODAL --- */}
      {isGridOpen && (
        <MasonryGridModal 
          photos={INITIAL_PHOTOS} 
          onClose={() => setIsGridOpen(false)} 
          onPhotoClick={(photo) => {
            setIsGridOpen(false);
            setSelectedPhoto(photo);
          }}
        />
      )}

      {/* --- PHOTO MODAL (LightBox) --- */}
      {selectedPhoto && (
        <PhotoModal 
          photo={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)} 
        />
      )}
    </div>
  );
}

export default App;
