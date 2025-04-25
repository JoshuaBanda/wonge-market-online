"use client"
import { useEffect, useState } from "react";
import HomeOptions from "./HomeOptions";
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import ShopItems from "./ShopItems";
import { useInView } from "react-intersection-observer";
import styles from '../Styles/home.module.css' ; 
import style from "../Styles/decoratedBorder.module.css";

const HomePage = ({user}) => {
  const [userState,setUserState]=useState(user);
  
  const { ref: listRef, inView: listInView } = useInView({
    threshold: 0.3,
  });

  const { ref: shopRef, inView: shopInView } = useInView({
    threshold: 0.3,
  });

  const { ref: shopNowRef, inView: shopNowInView } = useInView({
    threshold: 0.3,
  });
  const items = ["Avon", "Earrings", "Brochus", 'Perfume'];

  // State to keep track of selected item
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("Avon");
  const [listItemBorder,setListItemBorder]=useState(0);
  // Handle when an item is clicked
  const handleOnClick = (item) => {
    setSelectedItem(item);
    setSearch(item); // Update search when an item is clicked
  };

  useEffect(() => {
    // Pre-select an item on initial load
    handleOnClick('Avon');
  }, []);
  useEffect(()=>{
    
  setUserState(user)
  },[user])

  useEffect(() => {
    const interval = setInterval(() => {
      if(listItemBorder<=2){
        
      setListItemBorder(prev => prev + 1);

      }else{
        setListItemBorder(0)
      }
    }, 6000);
    return () => clearInterval(interval); // Cleanup
  }, [listItemBorder]);
  return (
    <>
      <div className={styles.container}>


        <div className={styles.itemsListContainer}>
          <ul>
            {items.map((item, index) => {
              const isSelected = selectedItem === item;
              const myBackgroudColor = isSelected ? "rgba(255,255,255)" : "#333";
              const myTextColor = isSelected ? "#333" : "white";

              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'keyframes', stiffness: 100, duration: 2 }}
                  onClick={() => handleOnClick(item)} // Handle item click
                  className={`
                    ${listItemBorder === index ? style.item : style.normalitem}
                  `}
                  style={{
                    ...(isSelected&&{backgroundColor:myBackgroudColor})
                  }}
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
        <div 
          style={{
            position: 'relative',
            margin: '0px 0px -20px 0px',
            bottom:'0px',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            //fontFamily: 'DM Sans, sans-serif',
            color: 'rgba(255, 255, 255, 0.9)',
          }}>
            OUR BEST PRODUCTS
          </div>
          
        <motion.div
          ref={shopNowRef}
          initial={{ opacity: 0, x: -100 }}
          animate={{
            opacity: shopNowInView ? 1 : 0.2,
            x: shopNowInView ? 0 : 300,
            visibility: shopNowInView ? 'visible' : 'hidden',
          }}
          transition={{
            type: 'keyframes',
            duration: 2,
          }}
          style={{
            position: 'relative',
            margin: '20px 0px 0px 0px',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            //fontFamily: 'DM Sans, sans-serif',
            color: 'rgba(255,255,255,0.8)',
            justifyContent:'center'
          }}
        >
          Shopping made easy
        </motion.div>
       <AnimatePresence>
          <motion.div
            ref={listRef}
            initial={{ opacity: 0, x: -200 }}
            animate={{
              opacity: listInView ? 1 : 0,
              x: listInView ? 0 : -200,
              visibility: listInView ? 'visible' : 'hidden',
            }}
            transition={{
              type: 'keyframes',
              stiffness: 200,
              duration: 1,
            }}
          >
        <ShopItems searchItem={selectedItem} userState={userState} />
          </motion.div>
        </AnimatePresence>
        
      </div>
    </>
  );
};

export default HomePage;
