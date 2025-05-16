"use client";
import styles from "../Styles/bestProducts.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation"; 

// Dummy placeholders for missing functions and components
const checkNameLength = (name) => name.length <= 10;

const BestProducts = () => {

    const route=useRouter();
  const items = [
    { name: "Lotion", photourl: "/avon3_with_no_bg.png", alt: "avon", price: 150 },
    { name: "Perfume", photourl: "/perfume11.png", alt: "perfume", price: 300 },
    { name: "Earrings", photourl: "/earring2.png", alt: "earrings", price: 100 },
    { name: "Soap", photourl: "/soap.png", alt: "soap", price: 50 },
  ];

  const handleRouting=(name)=>{
    if(name=="Lotion"){
        route.push("/products/Lotion")
    }else if(name=="Earrings"){
        route.push("/products/Earrings")
    }
    else if(name=="Brochus"){
        route.push("/products/Brochus")
    }else if(name=="Perfume"){
        route.push("/products/Perfume")
    }else if(name=="Soap"){
        route.push("/products/Soap")
    }
}

  const homeItems = Array.isArray(items) &&
    items.map((item, index) => (
      <motion.div
        key={index}
        style={{left:"30px"}}
        className={styles.container} id="customizedbackground"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        onClick={()=>handleRouting(item.name)}
      ><div className={styles.picContainer}>
            <div className={styles.txt}>
                <h3 style={{ height: "20px" }}>
                {checkNameLength(item.name) ? item.name : `${item.name.slice(0, 10)}...`}
                </h3>
            </div>

            <Image
                src={item.photourl}
                alt={item.alt}
                width={50}
                height={50}
                style={{
                marginBottom: "0px",
                position: "relative",
                top: "10px",
                left: "5px",
                }}
                className={styles.pic}
                sizes="(max-width:768px)100vw, (max-width:1200px)50vw, 33vw"
            />
            </div>

      </motion.div>
    ));
 return(
    
    <>
      
<div 
  style={{
    position: 'relative',
    margin: '20px 0px ',
    padding: '15px',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    color: 'black', // Default dark color
    textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
    borderRadius: '4px'
  }}
  className="myColor"
>
  Best Products
  <span style={{
    fontWeight: 'normal',
    color: 'black',
    maxWidth: '80%',
    lineHeight: '1.4'
  }}
  className={styles.explore}>
    explore the most recent bought products
  </span>
</div>
      <div
        style={{
          position: "relative",
          margin:"0px 0px",
          display: "flex",
          overflowX: "auto", // Allows horizontal scrolling
          flexWrap: "nowrap", // Prevents wrapping
          paddingBottom: "10px", // Optional, adds space for the scrollbar
          scrollbarWidth: "none", // Firefox
          WebkitOverflowScrolling: "touch", // iOS smooth scrolling
        }}
        className="scroll-container"
      >

          
        {homeItems.length > 0 ? homeItems : <div style={{position:'relative',margin:'170px auto',}}><Spinner /></div> }
      </div>

    </>
 );
};

export default BestProducts;
