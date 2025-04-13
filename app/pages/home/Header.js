"use client";
import Image from 'next/image';
import styles from '../../Styles/header.module.css'
import NavBarItemList from './HeaderItemFlow';
import { motion, AnimatePresence } from 'framer-motion';
const Header = () => {
    return (
        <div className={styles.main}>
        <h2 style={{
            position:'relative',top:'50px',left:'30%'
        }}>Wonge Market Online</h2>
            <div>
                
            <NavBarItemList/>
            </div>
            <div className={styles.imageContainer}>
                    
                <motion.div className={styles.img}
                    initial={{
                        x:0,y:0,
                    }}
                    animate={{
                        opacity:1,
                        y:10,
                        scale:[1,1.2],x:10
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
                        src='/avon_with_no_bg.png'
                        alt='w'
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                </motion.div>
                <motion.div className={styles.imageContainerText}
                
                initial={{
                        x:0,y:0,
                    }}
                    animate={{
                        opacity:1,
                        x:20
                    }}
                    transition={{
                        type: 'tween',
                        stiffness: 20,
                        repeat: Infinity, 
                        repeatType:'reverse',
                        duration:2
                        }}
                        >
                    Wonge Market Online
                    <p style={{
                        width:'350px',
                        fontWeight:'lighter'
                    }}>
                        Our team of got you covered
                        from earrings brocho 
                        body lotion soap.
                        Say anything to make you
                        look outstanding.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
 
export default Header;