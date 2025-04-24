"use client";
import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import styles from "../Styles/decoratedBorder.module.css";
// Lazy load components
const LoginPart = dynamic(() => import('./LoginPart'));
const SignUpPage = dynamic(() => import('../userAunthentication/SignUpPage'));

export default function LoginPage() {
  const [selectedSide, setSelectedSide] = useState('left');
  const [showClass, setShowClass] = useState(true);

  useEffect(() => {
    setShowClass(true)
    const timer = setTimeout(() => {
      setShowClass(false);
    }, 3000); // remove after 6 seconds

    return () => clearTimeout(timer); // cleanup on unmount
  }, [selectedSide]);


  const handleSelect = (side) => {
    setSelectedSide(side);
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 50) {
      handleSelect('left');
    } else if (info.offset.x < -50) {
      handleSelect('right');
    }
  };

  // Dynamic styles based on side selection
  const isLeftSelected = selectedSide === 'left';

  const leftStyles = {
    width: isLeftSelected ? '80%' : '25%',
    zIndex: isLeftSelected ? 1 : 0,
    //left: isLeftSelected ? '20px' : '0px',
    borderTopLeftRadius: isLeftSelected ? '20px' : '0px',
    borderBottomLeftRadius: isLeftSelected ? '20px' : '0px',
    borderTopRightRadius: isLeftSelected ? '0px' : '0px',
    borderBottomRightRadius: isLeftSelected ? '0px' : '0px',
    backgroundColor:isLeftSelected?"rgba(0,0,0)": 'rgba(255,255,255,0.9)',
    
    color:isLeftSelected? 'rgba(255,255,255,0.8)':"rgba(0,0,0)",
  };

  const rightStyles = {
    width: isLeftSelected ? '20%' : '75%',
    zIndex: isLeftSelected ? 0 : 1,
   // right: isLeftSelected ? '0px' : '15px',
    borderTopRightRadius: isLeftSelected ? '0px' : '20px',
    borderBottomRightRadius: isLeftSelected ? '0px' : '20px',
    borderTopLeftRadius: isLeftSelected ? '0px' : '0px',
    borderBottomLeftRadius: isLeftSelected ? '0px' : '0px',
    
    backgroundColor:isLeftSelected? 'rgba(255,255,255,0.9)':"rgba(0,0,0)",
    
    color:isLeftSelected? 'rgba(0,0,0)':"rgba(255,255,255,0.9)",
  };

  return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 0,
        }}
      >
        <motion.ul
          style={{
            position: 'relative',
            display: 'flex',
            listStyle: 'none',
            padding: 0,
            height: '450px',
            width: '90%',
            alignItems: 'stretch',
          }}
          className={showClass ? styles.container : ''}
        >
          {/* LEFT PANEL (Login) */}
          <motion.li
            style={{
              ...leftStyles,
            }}
            
            className={isLeftSelected ? styles.inActiveContainer : styles.inActiveContainer}
            onClick={() => handleSelect('left')}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            {isLeftSelected ? (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 20 }}
              >
                <Suspense fallback={<div >Loading Login...</div>}>
                  <LoginPart />
                </Suspense>
              </motion.div>
            ) : (
              <div >Login</div>
            )}
          </motion.li>

          {/* RIGHT PANEL (Sign Up) */}
          <motion.li
            style={{
              backdropFilter: 'blur(15px)',
              height: '100%',
              transition: 'width 0.3s ease, right 0.3s ease',
              textAlign: 'center',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              ...rightStyles,
            }}
            onClick={() => handleSelect('right')}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            {!isLeftSelected ? (
              <motion.div
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 20 }}
              >
                <Suspense fallback={<div style={{ color: 'black' }}>Loading Sign Up...</div>}>
                  <SignUpPage />
                </Suspense>
              </motion.div>
            ) : (
              <div>Sign Up</div>
            )}
          </motion.li>
        </motion.ul>
      </div>
  );
}
