"use client";
import { useEffect, useState } from "react";
import styles from "../Styles/cart.module.css";
import { useRouter } from "next/navigation";
import { useUser } from "../userContext";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const PurchaseHistory = () => {
    
    const [cartItems,setCartItems]=useState([]);
    const {person}=useUser();
    const [user,setUser]=useState(person)
    //console.log("user",user);
    //const currentUserId=person.userId;
    //console.log("currentUserId",currentUserId);
    //console.log(cartItems);


    const [loadingOrder,setLoadingOrder]=useState(false);

    const router=useRouter();


    const [quantity,setQuantity]=useState(null);


    const handleQuantityReduction = async (itemToUpdate, indexToUpdate) => {
      if (itemToUpdate.quantity <= 1) {
        console.warn("Quantity can't be less than 1");
        return;
      }
    
      const updatedCart = cartItems.map(item =>
        item.id === itemToUpdate.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    
      const updatedItem = updatedCart.find(item => item.id === itemToUpdate.id);
      console.log("updated item", updatedItem);
    
      setCartItems(updatedCart);
    
      try {
        const result = await updateRequest(updatedItem.inventory_id, updatedItem.quantity,updatedItem.id);
        if (result) {
          console.log("Update succeeded");
        } else {
          // Optional: rollback state if backend failed but no error thrown
          setCartItems(cartItems); // reset to original
          console.warn("Update failed without error");
        }
      } catch (error) {
        // Rollback state on failure
        setCartItems(cartItems); // reset to original
        console.error("Update failed, rolled back", error);
      }
    };
    
    const handleQuantityIncrement = async (itemToUpdate, indexToUpdate) => {
      if (itemToUpdate.quantity >= 100) {
        console.warn("Quantity can't be greter than 10");
        return;
      }
    
      const updatedCart = cartItems.map(item =>
        item.id === itemToUpdate.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    
      const updatedItem = updatedCart.find(item => item.id === itemToUpdate.id);
      console.log("updated item", updatedItem);
    
      setCartItems(updatedCart);
    
      try {
        const result = await updateRequest(updatedItem.inventory_id, updatedItem.quantity,updatedItem.id);
        if (result) {
          console.log("Update succeeded");
        } else {
          // Optional: rollback state if backend failed but no error thrown
          setCartItems(cartItems); // reset to original
          console.warn("Update failed without error");
        }
      } catch (error) {
        // Rollback state on failure
        setCartItems(cartItems); // reset to original
        console.error("Update failed, rolled back", error);
      }
    };


    const updateRequest = async (inventoryId, newQuantity,cartId) => {
      try {
        const response = await axios.patch("https://wonge-backend.onrender.com/cart/cart-quantity", {
          inventory_id: inventoryId,
          quantity: newQuantity,
          id:cartId,
          
        });
    
        console.log("Successfully updated:", response.data);
        return true;
      } catch (error) {
        console.error("Error updating item quantity:", error.response?.data || error.message);
      }
    };
    

    
    
      useEffect(()=>{
        //console.log("updatting");
        setUser(person);
      //  console.log('user',user,"person",person);
      },[person]);
      console.log(cartItems)

      
      useEffect(()=>{
        //fetch cart items
        const fetchData=async()=>{
            try{
                
                const res=await axios.get(`https://wonge-backend.onrender.com/cart/get-cart-items/${user.userid}`);
                if (Array.isArray(res.data)) {
                  setCartItems(res.data);
                } else {
                  console.warn("Cart data is not an array:", res.data);
                  setCartItems([]); // fallback to empty array
               // console.log("fetching",res.data);
                }
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
            const res=await axios.get(`http://localhost3001/cart`);
        }
        catch(error){
            console.error("error updating cart",error);
        }
      }


      const makeOrder = async () => {
          
        setLoadingOrder(true);
        const inventoryIds = cartItems
          .filter(item => item.status === "ordered")
          .map(item => item.inventory.id);
          if (inventoryIds.length<1){
            
         // console.log(inventoryIds,"no");
          setLoadingOrder(false);
          return
          }
    
        
        try {
          const res = await axios.patch(`https://wonge-backend.onrender.com/cart/order/`, {
            user: user.userid,
            status: "ordered",
            inventory_ids: inventoryIds,
          });
      
        //  console.log("response", res.data);
          
          // Create a map of updated items from the response for quick lookup
          const updatedItemsMap = new Map(
            res.data.map(item => [item.id, item.status])
          );
          
          // Update cart items where IDs match the response
          setCartItems(
            cartItems.map(item => {
              // If item is in the response, update its status
              if (updatedItemsMap.has(item.id)) {
                return {
                  ...item,
                  status: updatedItemsMap.get(item.id)
                };
              }
              return item;
            })
          );
          
        } catch (error) {
          console.error("error updating cart", error);
        } finally {
          setLoadingOrder(false);
        }
      };
     // console.log("length",cartItems.length);
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
                    <div className={styles.status}>
                      status:{" "}
                      {item.status === "active" ? (
                        <span>Not yet ordered</span>
                      ) : (
                        <span>{item.status}</span>
                      )}
                      </div>

                    <div className={styles.availableNow}>
                      Available now : {item.inventory.quantity}
                    </div>
                    {/*<div className={styles.options}>

                      
                        <div className={styles.order}>
                            order
                        </div>
                        <div className={styles.quantityIn}>
                            <div onClick={()=>handleQuantityReduction(item,index)}>
                                <FaArrowLeft/>
                            </div>
                            <div>
                                {item.quantity}
                            </div>
                            <div onClick={()=>handleQuantityIncrement(item,index)}>
                                <FaArrowRight/>
                            </div>
                        </div>
                              
                    </div>*/}

                   
                </div> 
                    
            </li>
        );
      })
    return (
        <div className={styles.container}>
            <h2 className={styles.tittle}> CART </h2>
            {
                (cartItems.length>0)?(
                    <>
                                  
                      <div className={styles.orderall} onClick={makeOrder}>
                      {loadingOrder?(<>LOADING ...</>):
                          (<>ORDER NOW </>)
                      }
                      </div>
                      <ul className={styles.unorderedlist}>
                          
                          {itemsInCart}
                          
                        <div style={{position:"relative",height:"150px",backgroundColor:"rgba(255,255,255,0)"}}></div>
                      </ul>
                      
                    </>
                ):(
                    <>
                        <div>
                        <h3 className={styles.tittle}>
                        Your Cart is empty
                        </h3>
                        </div>
                    </>
                )
            }
        </div>
    );
}
 
export default PurchaseHistory;