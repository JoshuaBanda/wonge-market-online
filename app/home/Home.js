"use client"
import { useEffect, useState } from "react";
import HomeOptions from "./HomeOptions";
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import ShopItems from "./ShopItems";
import { useInView } from "react-intersection-observer";
import styles from '../Styles/home.module.css' ; 
import style from "../Styles/HomeItems.module.css";
import { useUser } from "../userContext";
import BestProducts from "./BestProducts";
import Test from "../test/page";

const HomePage = ({user}) => {
  const {person}=useUser();
  //console.log("hi",person.firstname)
  const [userState,setUserState]=useState(person);
  
  const { ref: listRef, inView: listInView } = useInView({
    threshold: 0.15,
  });

  const { ref: shopRef, inView: shopInView } = useInView({
    threshold: 0.3,
  });

  const { ref: shopNowRef, inView: shopNowInView } = useInView({
    threshold: 0.5,
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
    //console.log("item",item);
    if(item=="Avon"){
      setListItemBorder(0);
    }
    else if (item=="Earrings") {
      setListItemBorder(1);
    } else if(item==="Brochus") {
      setListItemBorder(2);
    }
    else{
      setListItemBorder(3);
    }
  };

  useEffect(() => {
    // Pre-select an item on initial load
    handleOnClick('Avon');
  }, []);
  useEffect(()=>{
    
  setUserState(user)
  },[])

  return (
    <>
      <div className={styles.container}>


      
      <Test/>

      <div className={styles.itemsListContainer}>
          <ul>
            {items.map((item, index) => {
              const isSelected = selectedItem === item;
              const myBackgroudColor = isSelected ? "rgba(255,255,255)" : "rgba(44,54,57)"
              const myTextColor = isSelected ? "#333" : "white";

              return (
                <motion.li
                  key={index}
                  
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 300}}
                  onClick={() => handleOnClick(item)} // Handle item click
                  className={`
                    ${listItemBorder === index  ? style.item : style.normalitem}
                  `}
                  style={{
                    //...(isSelected&&{backgroundColor:myBackgroudColor})
                    color:"black"
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
        
      
        <BestProducts/>
        
        {/*  
        <Carousel />
*/}   {/*
        <div className={styles.paperTextContainer}>
          <PaperText />
        </div>*/}
        <div 
          style={{
            position: 'relative',
            margin: '20px 0px 0px 0px',
            bottom:'0px',
            textAlign: 'center',
            fontSize: '30px',
            fontWeight: 'bold',
            //fontFamily: 'DM Sans, sans-serif',
            //color: 'rgba(255, 255, 255, 0.9)',
          }}
          className="myColor">
           Top {selectedItem}
          </div>
          
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
        <ShopItems searchItem={selectedItem} />
          </motion.div>
        </AnimatePresence>
        
      </div>
    </>
  );
};

export default HomePage;
