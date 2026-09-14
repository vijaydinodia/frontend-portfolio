import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const TiltCard = ({ children, className = '', containerClassName = 'h-full w-full' }) => {
  const cardRef = useRef(null);

  // Scale motion values for tracking zoom-in hover effect
  const scale = useMotionValue(1);

  // Spring animations for high responsiveness and fluid motion
  const springConfig = { damping: 25, stiffness: 250, mass: 0.6 };
  const springScale = useSpring(scale, springConfig);

  const handleMouseEnter = () => {
    scale.set(1.02); // Zoom in / scale up slightly on hover
  };

  const handleMouseLeave = () => {
    scale.set(1); // Restore original scale
  };

  return (
    <div className={containerClassName}>
      <motion.div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          scale: springScale,
        }}
        className={`h-full w-full ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TiltCard;
