"use client";
import { useEffect, useState } from "react";
import styles from "../Styles/cart.module.css";
import { useRouter } from "next/navigation";
import { useUser } from "../userContext";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const Cart = () => {
    
    const [cartItems,setCartItems]=useState([]);
    const {person}=useUser();
    const [user,setUser]=useState(person)
    //console.log("user",user);
    //const currentUserId=person.userId;
    //console.log("currentUserId",currentUserId);
    //console.log(cartItems);
    const router=useRouter();
      useEffect(()=>{
        //console.log("updatting");
        setUser(person);
      //  console.log('user',user,"person",person);
      },[person]);

      
      useEffect(()=>{
        //fetch cart items
        const fetchData=async()=>{
            try{
                
                const res=await axios.get(`https://wonge-backend.onrender.com/cart/get-cart-items/${user.userid}`);
                setCartItems(res.data)
                console.log("fetching",res.data);
            }catch(error){
                console.error("error fetching cart",error);
            }

        }
        fetchData();
      },[/*this should update when items in a cart changes i.e when an order is made*/
        user
      ]);

      const updateCart=async()=>{
        try{
            const res=await axios.get(`https://wonge-backend.onrender.com/`);
        }
        catch(error){
            console.error("error updating cart",error);
        }
      }
      const itemsInCart=cartItems.map((item,index)=>{
        return(
            <li key={index}>
                
                <motion.div className={styles.imgTwo}
                    /*initial={{
                        x:0,y:0,
                    }}
                    animate={{
                        opacity:1,
                        //y:5,
                        scale:[1,1.05],
                    }}
                    transition={{
                        type: 'tween',
                        stiffness: 200,
                        repeat: Infinity, 
                        repeatType:'reverse',
                        duration:2
                        }}*/
                >
                    <Image
                        src={item.inventory.photo_url}
                        alt='w'
                        quality={100}
                        width="120"
                        height="120"
                        sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                        priority
                    />
                </motion.div>
                                   
                <div className={styles.itemText}>
                    <span className={styles.name}>
                        {item.inventory.name}
                    </span>

                    <div className={styles.price}>
                        Price: Mk {item.inventory.price*item.quantity}
                    </div>

                    <div className={styles.options}>

                      
                        <div className={styles.order}>
                            order
                        </div>
                        <div className={styles.quantityIn}>
                            <div>
                                <FaArrowLeft/>
                            </div>
                            <div>
                                {item.quantity}
                            </div>
                            <div>
                                <FaArrowRight/>
                            </div>
                        </div>
                              
                    </div>

                   
                </div> 
                    
            </li>
        );
      })
    return (
        <div className={styles.container}>
            <h2 className={styles.tittle}> CART </h2>
            <div className={styles.orderall}>
                ORDER Now
            </div>
            <ul className={styles.unorderedlist}>
                
                {itemsInCart}
            </ul>
        </div>
    );
}
 
export default Cart;