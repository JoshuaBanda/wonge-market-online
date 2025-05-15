"use client";
import React, { useState, useEffect } from 'react';
import styles from '../Styles/headerItemFlow.module.css';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Pentagon from './Pentagon';
import PentagonTwo from './PentagonTwo';

const NavBarItemList = () => {
    const [items, setItems] = useState([
        { id: 1, src: '/avon3_with_no_bg.png', alt: 'Avon Lotion', text: 'K15,000' },
        { id: 2, src: '/soap.png', alt: 'Perfume', text: 'K15,000' },
        { id: 3, src: '/avon3_with_no_bg.png', alt: 'Earrings', text: 'K15,000' },
 { id: 4, src: '/avon4_with_no_bg.png', alt: 'Brochures', text: 'K15,000' },//
        
        { id: 5, src: '/soap.png', alt: 'Perfume', text: 'K5,000' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems((prevItems) => {
                const [first, ...rest] = prevItems;
                return [...rest, first]; // Move the first item to the end
            });
        }, 6000); // Rotate every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div className={styles.container}>
            <div style={{
                position:'relative',right:'20px',
                 width:'400px',height:'250px',
                overflow:'hidden',
            }}>
                    
                <motion.ul className={styles.listItems}>
                    <AnimatePresence>
                        {items.map((item, index) => (
                            <motion.li
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: 0, y: 0 }} // Start off to the right
                                animate={{
                                    scale:index===0?1.5: 1,
                                    x:index===1?-60:220,
                                    opacity:index===0?1:0,
                                    y:index===1?100:150,

                                    
                                }}
                                exit={{ 
                                    opacity:index===3?0:1,
                                x: 100, scale: 0.5 }} // Exit to the right
                                transition={{
                                    duration: 1, // Duration of animation
                                    ease: "linear",
                                    duration:'2' // Linear easing for smooth transition
                                }}
                            >
                                <div
                                    className={styles.item}
                                    style={{
                                        position: index === 1 ? 'relative' : 'static', // Allow overflow only for index 1
                                        overflow: index === 1 ? 'visible' : 'hidden', 
                                        zIndex: index === 1 ? 1 : 0, // Ensure the item at index 1 stays on top
                                    }}
                                >
                                    <div className={styles.photoContainer}>
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            quality={100}
                                            priority
                                            //style={{ objectFit: 'cover' }} // Ensures the image covers the container
                                            sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                                        />
                                    </div>
                                    <div style={{alignContent:'center'}}>
                                    {index === 0 ? (
                                        <>
                                            <p></p>
                                        </>
                                        ) : (
                                        <></>
                                        )}

                                    </div>
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </motion.ul>
                <div style={{position:'relative',top:'-100px', left:'-20px'}}>
                    
                    <Pentagon/>
                    <motion.div 
                        initial={{scale:0.6}}
                        style={{
                            position:'absolute',top:'40px',left:'80px'
                        }}>
                        <PentagonTwo/>
                    </motion.div>
                    <div className={styles.blurcircl}>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBarItemList;
