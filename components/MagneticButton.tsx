import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '', 
  strength = 0.35,
  ...props 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    
    // Magnetic Pull Calculation
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });

    // Spotlight Calculation
    setHoverPosition({ 
        x: clientX - left, 
        y: clientY - top 
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      {...props as any}
    >
        {/* Spotlight / Distortion Layer */}
        <motion.div 
            className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
        >
            <div 
                className="absolute w-32 h-32 bg-white/20 blur-[30px] rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                    left: hoverPosition.x, 
                    top: hoverPosition.y 
                }} 
            />
        </motion.div>

        {/* Content Layer */}
        <div className="relative z-10 pointer-events-none">
            {children}
        </div>
    </motion.button>
  );
};

export default MagneticButton;