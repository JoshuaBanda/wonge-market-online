"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "../Styles/BottomMain.module.css"
import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";
import { FaCartShopping, FaBars } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const BottomMenu = () => {
  const router = useRouter();
  const [showMenuPopUp, setShowMenPopUp] = useState(false);
  const menuRef = useRef(null); // Ref to detect outside click

  const handleHomeClick = () => {
    router.push("/");
  };

  const menu = ["Products", "Settings", "Profile","login"];
  const handleMenuPopItems=(item)=>{
    if (item=="login"){
      router.push("/login/LoginPage")
    }
  }
  const menuPopUp = menu.map((item, index) => (
    <li key={index} onClick={() => handleMenuPopItems(item)}>
      {item}
    </li>
  ));
  

  const handleMenuToggle = () => {
    setShowMenPopUp(!showMenuPopUp);
  };

  // 🔁 Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenPopUp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart",handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart",handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.div className={styles.main}>
        <div onClick={handleHomeClick}>
          <FaHome className={styles.icons} />
        </div>

        <div>
          <FaSearch className={styles.icons} />
        </div>

        <div>
          <FaCartShopping className={styles.icons} />
        </div>

        <div ref={menuRef} onClick={handleMenuToggle}>
          <FaBars className={styles.icons} />
          {/* Menu Pop Up */}
          {showMenuPopUp && (
            <ul className={styles.menuPopUp}>{menuPopUp}</ul>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default BottomMenu;
