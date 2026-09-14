import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onLoaded }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fast, subtle initial load sequence (~800ms)
    const timer = setTimeout(() => {
      setLoading(false);
      if (onLoaded) onLoaded();
    }, 800);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } 
          }}
          className="fixed inset-0 z-[99999] bg-[#0B1120] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          {/* Subtle background ambient pulse */}
          <div className="absolute w-72 h-72 rounded-full bg-primary/20 blur-[100px] animate-pulse"></div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo / Avatar pulse */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative mb-5"
            >
              <div className="w-16 h-16 rounded-2xl p-0.5 bg-gradient-to-tr from-primary via-accent to-secondary animate-gradient bg-300% shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                <div className="w-full h-full bg-[#0B1120] rounded-[14px] flex items-center justify-center overflow-hidden">
                  <img
                    src="/vijay_profile.png"
                    alt="Vijay Dinodia"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>

            {/* Developer Name & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-center"
            >
              <h2 className="text-lg font-bold text-white tracking-wider">
                VIJAY DINODIA
              </h2>
              <p className="text-xs text-accent font-medium tracking-widest uppercase mt-0.5">
                MERN Stack Developer
              </p>
            </motion.div>

            {/* Minimal Progress Bar */}
            <div className="w-36 h-[2px] bg-white/10 rounded-full mt-5 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-accent to-primary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
