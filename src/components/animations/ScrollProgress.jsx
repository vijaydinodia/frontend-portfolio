import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent to-secondary origin-left z-[100] pointer-events-none shadow-[0_0_8px_rgba(6,182,212,0.7)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
