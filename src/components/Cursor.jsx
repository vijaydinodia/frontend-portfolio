import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' || 
        e.target.tagName === 'BUTTON' || 
        e.target.closest('a') || 
        e.target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 800,
        damping: 30,
      }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(37, 99, 235, 0.2)",
      border: "1px solid rgba(37, 99, 235, 0.5)",
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 800,
        damping: 30,
      }
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999] mix-blend-screen hidden md:block"
      variants={variants}
      animate={isHovering ? "hover" : "default"}
    />
  );
};

export default Cursor;
