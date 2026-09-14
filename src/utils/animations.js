// Premium animation variants and easing curves for software developer portfolio

export const EASE = [0.25, 0.1, 0.25, 1.0]; // Standard smooth cubic bezier
export const SPRING = { type: 'spring', stiffness: 260, damping: 20 };
export const GENTLE_SPRING = { type: 'spring', stiffness: 120, damping: 14 };

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: EASE,
    }
  })
};

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: EASE,
    }
  })
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: EASE,
    }
  })
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: EASE,
    }
  })
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration || 0.5,
      delay: custom.delay || 0,
      ease: EASE,
    }
  })
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    }
  }
});

export const buttonMotion = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -2, transition: { duration: 0.2, ease: 'easeOut' } },
  tap: { scale: 0.97, y: 0, transition: { duration: 0.1, ease: 'easeIn' } }
};

export const cardHoverMotion = {
  rest: { y: 0, scale: 1 },
  hover: { 
    y: -5, 
    scale: 1.015,
    transition: { duration: 0.3, ease: 'easeOut' } 
  }
};
