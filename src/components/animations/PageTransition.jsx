import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
