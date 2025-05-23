import React from 'react';
import { motion } from 'framer-motion';

function AnimatedLetter({ letter }) {
  const letterChildVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: [0, 20, 0],
      transition: {
        duration: 1,
        ease: 'easeOut',
        yoyo: Infinity,
      },
    },
  };

  return (
    <motion.span
      variants={letterChildVariants}
      style={{
        position:"relative",
        display: 'inline-block',
        cursor: 'pointer',
        textShadow: '0 -3px 1px rgba(0,0,0,0.3)',
      }}
      whileHover={{ scale: 1.2, color: 'white' }}
    >
      {letter}
    </motion.span>
  );
}

export default AnimatedLetter;
