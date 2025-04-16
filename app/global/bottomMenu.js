"use client";
import React from "react";
import styles from "../../Styles/BottomMain.module.css"
import Link from "next/link";
import { FaBimobject, FaHome, FaObjectGroup, FaSearch, FaShoppingBag, FaShoppingBasket, FaShoppingCart } from "react-icons/fa";
import { FaBagShopping, FaBars, FaBarsProgress, FaBasketShopping, FaCartShopping } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
const BottomMenu = () => {
    
    const router = useRouter();

   const handleHomeClick=()=>{
        router.push('/')
    }
    return (
        <>
        <motion.div className={styles.main}
        >
            <div onClick={handleHomeClick}>
                <FaHome className={styles.icons}/>
            </div>
            
            <div>
                <FaSearch className={styles.icons}/>
            </div>

            <div>
                <FaCartShopping className={styles.icons}/>
            </div>
            <div>
                <FaBars className={styles.icons}/>
            </div>
        </motion.div>
        </>
    );
}
 
export default BottomMenu;