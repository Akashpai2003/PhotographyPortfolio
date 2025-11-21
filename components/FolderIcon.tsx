
import React, { useState, useRef, useEffect } from 'react';

interface FolderIconProps {
  onClick: () => void;
  label?: string;
  top?: string;
  left?: string;
}

export const FolderIcon: React.FC<FolderIconProps> = ({ onClick, label = "Gallery", top = "5%", left = "5%" }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const offsetStartRef = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  // Global event listeners for dragging (captures movement outside the element)
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

  return (
    <div 
      className="absolute flex flex-col items-center gap-1 group z-50 touch-none select-none"
      style={{ 
        top, 
        left,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 100 : 50
      }}
      onPointerDown={handlePointerDown}
      onClick={(e) => {
        e.stopPropagation();
        // Only open gallery if it was a click, not a drag
        if (!hasMoved.current) {
            setIsSelected(true);
            onClick();
            setTimeout(() => setIsSelected(false), 200);
        }
      }}
    >
      {/* Folder SVG */}
      <div className={`transition-opacity duration-100 ${isSelected ? 'opacity-60' : 'opacity-100'} hover:scale-105 transition-transform`}>
        <svg width="50" height="45" viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          {/* Back tab */}
          <path d="M5 15C5 9.47715 9.47715 5 15 5H35C37.6522 5 40.1957 6.05357 42.0711 7.92893L47.0711 12.9289C48.9464 14.8043 51.4899 15.8579 54.1421 15.8579H85C90.5228 15.8579 95 20.335 95 25.8579V75C95 80.5228 90.5228 85 85 85H15C9.47715 85 5 80.5228 5 75V15Z" fill="#60A5FA" />
          {/* Front flap */}
          <path d="M5 28C5 22.4772 9.47715 18 15 18H85C90.5228 18 95 22.4772 95 28V75C95 80.5228 90.5228 85 85 85H15C9.47715 85 5 80.5228 5 75V28Z" fill="#93C5FD" stroke="#60A5FA" strokeWidth="2"/>
        </svg>
      </div>

      {/* Label */}
      <span className={`
          px-2 py-0.5 rounded-[4px] text-[10px] font-sans font-medium tracking-wide transition-colors
          ${isSelected ? 'bg-blue-600 text-white' : 'text-black bg-transparent'}
      `}>
        {label}
      </span>
    </div>
  );
};
