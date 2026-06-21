import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for tracking outer cursor ring positioning
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the trailing outer ring
  const springConfig = { damping: 40, stiffness: 450, mass: 0.35 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // State for immediate center dot positioning
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setDotPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Check if target or parent has custom cursor attributes
      const cursorAttr = target.getAttribute('data-cursor') || target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button');

      if (cursorAttr) {
        setCursorType(cursorAttr);
        setCursorText(cursorAttr.toUpperCase());
      } else if (isClickable) {
        setCursorType('hover');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(37, 99, 235, 0)',
      border: '2px solid rgba(6, 182, 212, 0.6)',
      borderRadius: '50%',
      backdropFilter: 'blur(0px)',
    },
    hover: {
      width: 52,
      height: 52,
      backgroundColor: 'rgba(37, 99, 235, 0.08)',
      border: '2px solid rgba(37, 99, 235, 0.8)',
      borderRadius: '50%',
      backdropFilter: 'blur(1px)',
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(6, 182, 212, 0.25)',
      border: '1.5px solid rgba(6, 182, 212, 0.9)',
      borderRadius: '50%',
      backdropFilter: 'blur(2px)',
    },
    send: {
      width: 85,
      height: 85,
      backgroundColor: 'rgba(139, 92, 246, 0.25)',
      border: '1.5px solid rgba(139, 92, 246, 0.9)',
      borderRadius: '50%',
      backdropFilter: 'blur(2px)',
    }
  };

  const dotVariants = {
    default: { scale: 1, backgroundColor: '#06B6D4' },
    hover: { scale: 0, backgroundColor: '#2563EB' },
    view: { scale: 0, backgroundColor: '#06B6D4' },
    send: { scale: 0, backgroundColor: '#8B5CF6' }
  };

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 hidden md:flex"
        style={{
          x: springX,
          y: springY,
        }}
        animate={cursorType}
        variants={ringVariants}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-black tracking-widest text-textMain drop-shadow-md select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Immediate Dot */}
      <motion.div
        className="fixed w-2.5 h-2.5 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: dotPos.x,
          top: dotPos.y
        }}
        animate={cursorType}
        variants={dotVariants}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};

export default Cursor;
