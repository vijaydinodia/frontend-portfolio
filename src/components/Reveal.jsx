import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeUp, fadeDown, fadeLeft, fadeRight, scaleIn } from '../utils/animations';

const variantsMap = {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  scaleIn,
};

const Reveal = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  className = '',
  style = {},
  once = true,
  ...props
}) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  const selectedVariant = variantsMap[variant] || fadeUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={selectedVariant}
      custom={{ delay, duration }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
