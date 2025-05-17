"use client";
import { useEffect, useState } from "react";
import { FaBarsStaggered, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "../Styles/LandingPage.module.css";
import style from "../Styles/HomeItems.module.css";
import HomeOptions from "./HomeOptions";
import Image from "next/image";
import HomePage from "./Home";
import { useRouter } from "next/navigation";

const LandingPage = ({user}) => {
  const items = [
    { name: "Lotion",imgSrc:'/wonge3_with_no_bg.png',alt:'pic' },
    { name: "Earrings",imgSrc:'/wonge5_with_no_bg.png',alt:'pic' },
    { name: "Brochus" ,imgSrc:'/wonge3_with_no_bg.png',alt:'pic'},
    { name: "Perfume" ,imgSrc:'/wonge5_with_no_bg.png',alt:'pic'},
  ];
  const route=useRouter();

  const [search, setSearch] = useState("Avon");
  const [listItemBorder, setListItemBorder] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOnClick = (item) => {
    setSelectedItem(item);
    setSearch(item.name);
    
    route.push("/products/Lotion")

    switch (item.name) {
      case "Avon":
        setListItemBorder(0);
        break;
      case "Earrings":
        setListItemBorder(1);
        break;
      case "Brochus":
        setListItemBorder(2);
        break;
      default:
        setListItemBorder(3);
    }
  };

  useEffect(() => {
    const defaultItem = items.find((item) => item.name === "Avon");
    if (defaultItem) handleOnClick(defaultItem);
  }, []);

  return (
    <div className={styles.container}>
      {/* Top Icons */}
      <section className={styles.iconContainer}>
        <div className={styles.icon1} id="customizedbackground">
          <FaBarsStaggered className={styles.inIcon} />
        </div>
        <div className={styles.icon2}>
          <FaUser className={styles.userIcon} />
        </div>
      </section>

      {/* Branding */}
      <div className={styles.topBranding}>
        <span className={styles.welcome}>Welcome,</span>
        <span className={styles.brandName} id="customizedColor">
        Wonge Online Market</span>
      </div>

      {/* Search Bar */}
      <div className={styles.wrapper}>
        <section
          className={styles.sectionSearch}
          role="search"
          aria-label="Search input"
        >
          <label htmlFor="searchInput" className={styles.icon}>
            <FaSearch className={styles.iconSearch} />
          </label>
          <input
            type="text"
            id="searchInput"
            className={styles.inputSearch}
            placeholder="Search..."
            aria-label="Search"
            maxLength={20}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>
      </div>

      {/* List of Items */}
      <section>
        <div className={styles.itemsListContainer}>
          <ul>
            {items.map((item, index) => {
              const isSelected = selectedItem?.name === item.name;
              const myBackgroudColor = isSelected
                ? "rgba(255,255,255)"
                : "rgba(44,54,57)";
              const myTextColor = isSelected ? "#333" : "white";

              return (
                <motion.li id="customizedbackground"
                  key={index}
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleOnClick(item)}
                >

                    
                <div className={styles.HomeOptionText}>
                    <span className={styles.discount}>
                        Get 10% discount
                    </span>
                    <p>On everything today</p>
                    <div className={styles.itemName}>
                        <div 
                            className={`
                                ${listItemBorder === index  ? style.item : style.normalitem}
                            `}>
                               <HomeOptions
                            text={item.name}
                            myBackgroudColor={myBackgroudColor}
                            myTextColor={myTextColor}
                        />
                                
                  </div>
               
                    </div>
                </div> 
                <motion.div className={styles.img}
                    initial={{
                        x:-30,y:60,
                    }}
                    animate={{
                        opacity:0.7,
                        //y:5,
                        scale:[2.0,2.01],
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
                        src={item.imgSrc}
                        alt='w'
                        quality={100}
                        width="120"
                        height="80"
                        sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                        priority
                        style={{zIndex:-10}}
                    />
                </motion.div>


                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>
      <HomePage user={user}/>
    </div>
  );
};

export default LandingPage;
