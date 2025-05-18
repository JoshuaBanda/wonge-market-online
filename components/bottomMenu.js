"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../app/Styles/BottomMain.module.css";
import {
  FaAddressBook,
  FaBook,
  FaBox,
  FaCog,
  FaHome,
  FaReceipt,
  FaSearch,
  FaSignInAlt,
  FaUser
} from "react-icons/fa";
import { FaCartShopping, FaBars } from "react-icons/fa6";
import { motion } from "framer-motion";

const BottomMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showMenuPopUp, setShowMenPopUp] = useState(false);
  const menuRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Define nav items
  const navItems = [
    { label: "Home", icon: <FaHome />, route: "/home" },
    { label: "Search", icon: <FaSearch />, route: "/search" },
    { label: "Cart", icon: <FaCartShopping />, route: "/cart" },
    { label: "Records", icon: <FaReceipt />, route: "/records" },
    { label: "Menu", icon: <FaBars />, action: () => setShowMenPopUp((prev) => !prev) }
  ];

  // Define popup menu items
  const menu = ["Products", "Settings", "Profile", "PurchaseHistory", "SignIn"];
  const menuIcons = {
    Products: <FaBox />,
    Settings: <FaCog />,
    Profile: <FaUser />,
    PurchaseHistory: <FaAddressBook />,
    SignIn: <FaSignInAlt />
  };

  const handleMenuToggle = useCallback(() => {
    setShowMenPopUp((prev) => !prev);
  }, []);

  const handleMenuPopItems = useCallback((item) => {
    switch (item) {
      case "SignIn":
        router.push("/login");
        break;
      case "Products":
        router.push("/productList");
        break;
      case "Settings":
        router.push("/postItems");
        break;
      case "PurchaseHistory":
        router.push("/purchaseHistory");
        break;
      case "Profile":
        router.push("/profile");
        break;
    }
    setShowMenPopUp(false);
  }, [router]);

  const menuPopUp = useMemo(() =>
    menu.map((item, index) => (
      <li key={index} onClick={() => handleMenuPopItems(item)} className={styles.menuItem}>
        <span className={styles.menuIcon}>{menuIcons[item]}</span>
        <span>
          {item === "SignIn" ? "Sign In" :
            item === "PurchaseHistory" ? "Purchase History" :
              item}
        </span>
      </li>
    ))
  , [handleMenuPopItems]);

  const handleOnClick = useCallback((item, index) => {
    setActiveIndex(index);
    if (item.route) {
      router.push(item.route);
    } else if (item.action) {
      item.action();
    }
  }, [router]);

  // Update active tab based on pathname
  useEffect(() => {
    const index = navItems.findIndex(item => item.route && pathname.startsWith(item.route));
    if (index !== -1) setActiveIndex(index);
  }, [pathname]);

  // Detect outside click to close menu popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenPopUp(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <motion.div className={styles.navigation} id="customizedbackground">
      <ul>
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`${styles.list} ${activeIndex === index ? styles.active : ""}`}
            onClick={() => handleOnClick(item, index)}
          >
            <div>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.text}>{item.label}</span>

              {/* Show popup only for the "Menu" item */}
              {item.label === "Menu" && showMenuPopUp && (
                <ul className={styles.menuPopUp} ref={menuRef}>
                  {menuPopUp}
                </ul>
              )}
            </div>
          </li>
        ))}
        <div
          className={styles.indicator}
          style={{ transform: `translateX(${activeIndex * 70}px)` }}
          id="customizedbackground"
        ></div>
      </ul>
    </motion.div>
  );
};

export default BottomMenu;
