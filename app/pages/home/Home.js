"use client"
import { useEffect, useState } from "react";
import HomeOptions from "./HomeOptions";
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import ShopItems from "./ShopItems";
import { useInView } from "react-intersection-observer";
import styles from '../../styles/home.module.css' ; 

const HomePage = () => {
  const { ref: listRef, inView: listInView } = useInView({
    threshold: 0.6,
  });

  const { ref: shopRef, inView: shopInView } = useInView({
    threshold: 0.4,
  });

  const { ref: shopNowRef, inView: shopNowInView } = useInView({
    threshold: 0.3,
  });
  const items = ["Avon", "Earrings", "Brochus", 'Perfume'];

  // State to keep track of selected item
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("Avon");

  // Handle when an item is clicked
  const handleOnClick = (item) => {
    setSelectedItem(item);
    setSearch(item); // Update search when an item is clicked
  };

  useEffect(() => {
    // Pre-select an item on initial load
    handleOnClick('Avon');
  }, []);

  return (
    <>
      <div className={styles.container}>


        <div className={styles.itemsListContainer}>
          <ul>
            {items.map((item, index) => {
              const isSelected = selectedItem === item;
              const myBackgroudColor = isSelected ? "#333" : "white";
              const myTextColor = isSelected ? "white" : "#333";

              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'keyframes', stiffness: 100, duration: 2 }}
                  onClick={() => handleOnClick(item)} // Handle item click
                >
                  <HomeOptions 
                    text={item} 
                    myBackgroudColor={myBackgroudColor} 
                    myTextColor={myTextColor} 
                  />
                </motion.li>
              );
            })}
          </ul>
        </div>
        {/*  
        <Carousel />
*/}   {/*
        <div className={styles.paperTextContainer}>
          <PaperText />
        </div>*/}
        
       <AnimatePresence>
          <motion.div
            ref={listRef}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: listInView ? 1 : 0,
              y: listInView ? 0 : 50,
              visibility: listInView ? 'visible' : 'hidden',
            }}
            transition={{
              type: 'keyframes',
              stiffness: 200,
              duration: 1,
            }}
          >
        <ShopItems searchItem={selectedItem} />
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          ref={shopNowRef}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: shopNowInView ? 1 : 0.2,
            y: shopNowInView ? 0 : 50,
            visibility: shopNowInView ? 'visible' : 'hidden',
          }}
          transition={{
            type: 'keyframes',
            stiffness: 300,
            duration: 2,
          }}
          style={{
            position: 'relative',
            margin: '0px 0px 50px 0px',
            bottom:'50px',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'DM Sans, sans-serif',
            color: '#333',
          }}
        >
          Shopping made easy
          <div
            style={{
              position: 'relative',
              margin: '20px auto', 
              width: '150px',
              height: '45px',
              borderRadius: '25px',
              backgroundColor: '#333', 
              display: 'flex',
              justifyContent: 'center', // Center the text inside button
              alignItems: 'center', // Vertically center the text
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Shadow for depth
              transition: 'all 0.3s ease', // Smooth transition for hover effects
              fontSize: '20px',
            }}
          >
            <div
              style={{
                position: 'relative',
                margin: '5px',
                fontSize: '16px',
                fontWeight: '600',
                color:'white'
              }}
            >
              Start Now
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HomePage;
