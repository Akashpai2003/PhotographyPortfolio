import React, { useState, useRef, useEffect } from 'react';
import { FloatingSticker } from './components/FloatingSticker';
import { PhotoModal } from './components/PhotoModal';
import { INITIAL_PHOTOS, DEFAULT_BG_IMAGE } from './constants';
import { Photo } from './types';

function App() {
  const [photos] = useState<Photo[]>(INITIAL_PHOTOS);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [backgroundUrl, setBackgroundUrl] = useState<string>(DEFAULT_BG_IMAGE);

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
        
        {/* --- CENTER MANIFESTO OVERLAY (Minimal) --- */}
        {/* Mobile: Fixed top 15%, Centered items. Desktop: Centered Vertically/Horizontally, Left aligned items */}
        <div className="absolute top-[15%] md:top-[30%] left-1/2 -translate-x-1/2 md:-translate-y-1/2 flex flex-col items-center md:items-start max-w-[90%] md:max-w-[500px] pointer-events-none z-0 text-center md:text-left">
            
            {/* Floating Sticker - Personalized */}
            <div className="bg-white text-blue-600 px-5 py-2 mb-6 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-blue-50 font-medium text-sm tracking-wide animate-[float_6s_ease-in-out_infinite]">
                hey, i am akash!
            </div>

            {/* Text Body (Clean & Minimal) */}
            <div className="font-sans text-3xl md:text-4xl leading-[1.3] text-gray-900 font-light tracking-tight">
                <span>
                    I'm gathering the lessons, the light, the grit, the tears, the strength,
                </span>
                <br/>
                <span className="mt-2 inline-block text-gray-400">
                    and turning them into gold.
                </span>
            </div>

            <div className="mt-12 flex items-center justify-center md:justify-start gap-3">
                <div className="w-8 h-[1px] bg-gray-300"></div>
                <p className="text-gray-400 font-sans text-[10px] tracking-[0.2em] uppercase">
                    Akash
                </p>
            </div>
        </div>

        {/* --- DESKTOP ICONS --- */}
        {photos.map((photo, index) => (
          <FloatingSticker 
            key={photo.id} 
            photo={photo} 
            index={index}
            onClick={handlePhotoClick} 
          />
        ))}

      </div>

      {/* --- MODAL --- */}
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