import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionDivider = ({ className = 'my-4' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref} className={`w-full flex items-center justify-center overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
  );
};

export default SectionDivider;
