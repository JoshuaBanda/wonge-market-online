"use client";
import Image from 'next/image';
import styles from '../Styles/header.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import NavBarItemList from './HeaderItemFlow';
import AnimatedWord from '@/components/AnimatedWord';
const Header = () => {
    return (
        <div className={styles.main}>
        <div className={styles.tittle}>
            <AnimatedWord/>
        </div>
            <div>
                
            <NavBarItemList/>
            </div>
            <div className={styles.imageContainer}>
                    
                <motion.div className={styles.img}
                    initial={{
                        x:-60,y:0,
                    }}
                    animate={{
                        opacity:1,
                        //y:5,
                        scale:[1,1.05],
                    }}
                    transition={{
                        type: 'tween',
                        stiffness: 200,
                        repeat: Infinity, 
                        repeatType:'reverse',
                        duration:2
                        }}
                >
                    <Image
                        src='/wonge5_with_no_bg.png'
                        alt='w'
                        quality={100}
                        width="220"
                        height="160"
                        sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                        priority
                    />
                </motion.div>
                <motion.div className={styles.imageContainerText}
                
                initial={{
                        x:-40,y:100,
                        opacity:0
                    }}
                    animate={{
                        opacity:1,
                        y:0
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 120,
                        }}
                        >
                    Wonge Market Online
                    <p style={{
                        fontWeight:'lighter',
                    }}>
                        Wonge weaves wonder piece by piece.
                        Adornment that speaks. Skincare that soothes.
                    </p>
                </motion.div>

            </div>
            


            
            <div className={styles.imageContainerTwo}>

{/*
            <motion.div className={styles.imageContainerTextTwo}
                
                initial={{
                        x:0,y:100,
                        opacity:0
                    }}
                    animate={{
                        opacity:1,
                        y:0
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 120,
                        }}
                        >
                    <p style={{
                        fontWeight:'lighter',
                    }}>
                        Wonge isn&apos;t just a market. it&apos;s a vibe.
                        Jewelry that speaks. 
                        Skincare that glows. 
                        Creations that connect. 
                        Come market with us today.
                    </p>
                </motion.div>

                    
                <motion.div className={styles.imgTwo}
                    initial={{
                        x:-60,y:0,
                    }}
                    animate={{
                        opacity:1,
                        //y:5,
                        scale:[1,1.05],
                    }}
                    transition={{
                        type: 'tween',
                        stiffness: 200,
                        repeat: Infinity, 
                        repeatType:'reverse',
                        duration:2
                        }}
                >
                    <Image
                        src='/avon4_with_no_bg.png'
                        alt='w'
                        quality={100}
                        width="220"
                        height="190"
                        sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                        priority
                    />
                </motion.div>
*/}
            </div>
            
        </div>
    );
}
 
export default Header;