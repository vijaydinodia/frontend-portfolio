import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // Motion values for tracking outer cursor ring positioning
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth, snappy spring physics for trailing outer ring
  const springConfig = { damping: 32, stiffness: 400, mass: 0.25 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // State for immediate center dot positioning
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // Check for touch device or reduced motion preferences
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (hasTouch || prefersReducedMotion || !canHover) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

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

      const cursorAttr = target.getAttribute('data-cursor') || target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isSupported || !isVisible) return null;

  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(37, 99, 235, 0)',
      border: '1.5px solid rgba(6, 182, 212, 0.55)',
      borderRadius: '50%',
      backdropFilter: 'blur(0px)',
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(6, 182, 212, 0.08)',
      border: '2px solid rgba(6, 182, 212, 0.85)',
      borderRadius: '50%',
      backdropFilter: 'blur(1px)',
    },
    view: {
      width: 76,
      height: 76,
      backgroundColor: 'rgba(6, 182, 212, 0.22)',
      border: '1.5px solid rgba(6, 182, 212, 0.9)',
      borderRadius: '50%',
      backdropFilter: 'blur(2px)',
    },
    send: {
      width: 76,
      height: 76,
      backgroundColor: 'rgba(139, 92, 246, 0.22)',
      border: '1.5px solid rgba(139, 92, 246, 0.9)',
      borderRadius: '50%',
      backdropFilter: 'blur(2px)',
    }
  };

  const dotVariants = {
    default: { scale: 1, backgroundColor: '#06B6D4' },
    hover: { scale: 0.5, backgroundColor: '#2563EB' },
    view: { scale: 0, backgroundColor: '#06B6D4' },
    send: { scale: 0, backgroundColor: '#8B5CF6' }
  };

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: springX,
          y: springY,
        }}
        animate={cursorType}
        variants={ringVariants}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-black tracking-widest text-textMain drop-shadow-md select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Immediate Dot */}
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
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
