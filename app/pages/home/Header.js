"use client";
import Image from 'next/image';
import styles from '../../Styles/header.module.css'
import NavBarItemList from './HeaderItemFlow';
import { motion, AnimatePresence } from 'framer-motion';
const Header = () => {
    return (
        <div className={styles.main}>
        <h2 style={{
            position:'relative',top:'30px',left:'0px',margin:'0px 30px'
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
                        scale:[1,1.15],x:10
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
                        fill
                        quality={100}
                    />
                </motion.div>
                <motion.div className={styles.imageContainerText}
                
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
                    Wonge Market Online
                    <p style={{
                        fontWeight:'lighter',color:''
                    }}>
                        Wonge got you covered
                        from earrings brocho
                        body lotion soap.
                        Market with us tooday.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
 
export default Header;