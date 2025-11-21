import React, { useState, useRef, useEffect } from 'react';
import { Photo } from '../types';

interface FloatingStickerProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
  index: number;
}

export const FloatingSticker: React.FC<FloatingStickerProps> = ({ photo, onClick, index }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const offsetStartRef = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      setOffset({
        x: offsetStartRef.current.x + dx,
        y: offsetStartRef.current.y + dy
      });

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          hasMoved.current = true;
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setIsSelected(true);
    hasMoved.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    offsetStartRef.current = { ...offset };
  };

  // Deselect when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => setIsSelected(false);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // --- MOBILE SLOT SYSTEM ---
  // Hardcoded positions for the first 6 items to guarantee NO overlap on phone screens.
  // The text area is approximately Top 15% - 45%.
  const mobileSlots = [
    { top: '5%', left: '5%' },   // Top Left
    { top: '5%', left: '75%' },  // Top Right
    { top: '60%', left: '5%' },  // Bottom Left 1
    { top: '60%', left: '72%' }, // Bottom Right 1
    { top: '80%', left: '15%' }, // Bottom Left 2
    { top: '78%', left: '60%' }, // Bottom Right 2
  ];

  const getLayout = () => {
    if (!isMobile) {
      return {
        top: photo.top,
        left: photo.left,
        width: '70px'
      };
    }

    // Assign a specific slot based on index for deterministic placement
    // We use modulo just in case visiblePhotos > slots, though we capped it at 6 in App.tsx
    const slot = mobileSlots[index % mobileSlots.length];

    return {
      top: slot.top,
      left: slot.left,
      width: '65px' 
    };
  };

  const layout = getLayout();

  return (
    <div
      className="absolute flex flex-col items-center gap-1 select-none touch-none group"
      style={{
        top: layout.top,
        left: layout.left,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        zIndex: isDragging ? 100 : photo.zIndex,
        cursor: 'default',
        transition: isDragging ? 'none' : 'top 0.5s ease-in-out, left 0.5s ease-in-out', 
      }}
      onPointerDown={handlePointerDown}
      onClick={(e) => {
        e.stopPropagation();
        if (!hasMoved.current && photo.type === 'image') onClick(photo);
      }}
    >
      {/* Icon Graphic */}
      <div className={`transition-all duration-200 ${isSelected ? 'opacity-80' : 'opacity-100'}`}>
          <div 
            className="bg-white p-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] relative hover:scale-105 transition-transform"
            style={{ width: layout.width }}
          >
             <img src={photo.url} className="w-full h-auto block bg-gray-50 aspect-[4/3] object-cover" draggable={false} alt="" />
          </div>
      </div>

      {/* Label */}
      <div className="mt-1.5 max-w-[90px] text-center leading-tight">
         <span className={`
            px-2 py-0.5 rounded-[4px] text-[10px] font-sans font-medium tracking-wide break-words transition-colors
            ${isSelected 
                ? 'bg-blue-600 text-white' 
                : 'text-black bg-transparent' 
            }
         `}>
           {photo.location}
         </span>
      </div>
    </div>
  );
};