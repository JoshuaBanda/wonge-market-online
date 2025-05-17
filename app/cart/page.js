"use client";
import { useEffect, useState } from "react";
import styles from "../Styles/cart.module.css";
import { useRouter } from "next/navigation";
import { useUser } from "../userContext";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import Spinner from "../home/Spinning";
const Cart = () => {
    
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
    
  const [deleteOption,setIsdeleteOption]=useState(null);

  const handleDoubleClick=(itemIndex)=>{
    setIsdeleteOption(itemIndex);
    console.log('handleClick',deleteOption);
  }
    const handleQuantityReduction = async (itemToUpdate, indexToUpdate) => {
  // Prevent modifying ordered items
  if (itemToUpdate.status === "ordered") {
    console.warn("Cannot modify an ordered item.");
    return;
  }

  // Prevent quantity from going below 1
  if (itemToUpdate.quantity <= 1) {
    console.warn("Quantity can't be less than 1");
    return;
  }

  // Optimistically update local state (UI update)
  const updatedCart = cartItems.map(item =>
    item.id === itemToUpdate.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );

  // Get the updated item from the cart after the optimistic update
  const updatedItem = updatedCart.find(item => item.id === itemToUpdate.id);
 // console.log("Updated item after optimistic update:", updatedItem);

  // Set the new cart state
  setCartItems(updatedCart);

  try {
    // 1. Send update request to server
    const result = await updateRequest(updatedItem.inventory_id, updatedItem.quantity, updatedItem.id);

    // Log the server response for debugging
   // console.log(`Server response: ${JSON.stringify(result, null, 2)}`);

    // 2. Handle the server response (which is an array of items)
    if (Array.isArray(result) && result.length > 0) {
      const updatedServerItem = result[0]; // Assuming there's only one updated item in the array
     // console.log("Server update successful, updating cart...");

      // Update cart with the server's response
      const updatedCartFromServer = cartItems.map(item =>
        item.id === updatedServerItem.id
          ? { ...item, quantity: updatedServerItem.quantity }  // Assuming `updatedServerItem` contains the updated quantity
          : item
      );
      setCartItems(updatedCartFromServer);
     // console.log("Update succeeded and UI synced with server:", JSON.stringify(updatedCartFromServer, null, 2));
    } else {
      // Rollback if backend update fails silently (or if result doesn't have the expected structure)
      console.warn("Update failed, rolling back to optimistic state");
      setCartItems(cartItems);  // Rollback
    }
  } catch (error) {
    // Rollback in case of error
    setCartItems(cartItems);
    console.error("Update failed, rolled back", error);
  }
};

const handleQuantityIncrement = async (itemToUpdate, indexToUpdate) => {
  // Prevent modifying ordered items
  if (itemToUpdate.status === "ordered") {
    console.warn("Cannot modify an ordered item.");
    return;
  }

  // Prevent quantity exceeding limit
  if (itemToUpdate.quantity >= 100) {
    console.warn("Quantity can't be greater than 100");
    return;
  }

  // Optimistically update local state (UI update)
  const optimisticCart = cartItems.map(item =>
    item.id === itemToUpdate.id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
  setCartItems(optimisticCart);
 // console.log("Optimistically updated local cart:", JSON.stringify(optimisticCart, null, 2));

  try {
    // 1. Send update request to server
    const result = await updateRequest(
      itemToUpdate.inventory_id,
      itemToUpdate.quantity + 1,
      itemToUpdate.id
    );
    
    // Log the response from the server
    //console.log(`Server response: ${JSON.stringify(result, null, 2)}`);

    // 2. Handle server response, which is an array of items
    if (Array.isArray(result) && result.length > 0) {
      const updatedItem = result[0]; // Assuming there's only one updated item in the array
     // console.log("Server update successful, updating cart...");

      // Update cart with the server's response
      const updatedCartFromServer = cartItems.map(item =>
        item.id === updatedItem.id
          ? { ...item, quantity: updatedItem.quantity }  // Assuming `updatedItem` contains the updated quantity
          : item
      );
      setCartItems(updatedCartFromServer);
      //console.log("Update succeeded and UI synced with server:", JSON.stringify(updatedCartFromServer, null, 2));
    } else {
      // Rollback if backend update fails silently (or if result doesn't have the expected structure)
      console.warn("Update failed, rolling back to optimistic state");
      setCartItems(cartItems);  // Rollback
    }
  } catch (error) {
    // Rollback in case of error
    setCartItems(cartItems);
    console.error("Update failed, rolled back", error);
  }
};



    const updateRequest = async (inventoryId, newQuantity,cartId) => {
try {
  const response = await axios.patch("https://wonge-backend-k569.onrender.com/cart/cart-quantity", {
    inventory_id: inventoryId,
    quantity: newQuantity,
    id: cartId,
  });

  // Check if response indicates success
  if (response.status === 200) {
   // console.log("Successfully updated:", response.data);
    return response.data;
  } else {
    console.error("Unexpected response status:", response.status, response.data);
  }
} catch (error) {
  // Enhanced error handling
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error("Error updating item quantity:", error.response.data);
  } else if (error.request) {
    // No response was received
    console.error("No response received from server:", error.request);
  } else {
    // Something else went wrong during the setup
    console.error("Error during request setup:", error.message);
  }
}
    };
    

    
    
      useEffect(()=>{
        //console.log("updatting");
        setUser(person);
      //  console.log('user',user,"person",person);
      },[person]);
    //  console.log(cartItems)

      
      useEffect(()=>{
        //fetch cart items
               if (!user?.userid) {
    // Optionally display a loading or error message if `user.userid` is not available yet
          return;
        }
        const fetchData=async()=>{
            try{
                
                const res=await axios.get(`https://wonge-backend-k569.onrender.com/cart/get-cart-items/${user.userid}`);
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

 


      const notifyCustomer= async(inventoryIds)=>{
          console.log(inventoryIds);
            try {
              const response=await axios.post(`https://wonge-backend-k569.onrender.com/notifications/notify-customer`, {
                user_id: user.userid,
                inventory_ids: inventoryIds,
              });
             // console.log(`item id ${inventoryIds}`)
              //console.log('Customer notified successfully.');
            } catch (notificationError) {
              console.error('Error notifying customer:', notificationError);
              // Optionally handle rollback or retry logic here
            }
          
      }

      const makeOrder = async () => {
          
        setLoadingOrder(true);
        const inventoryIds = cartItems
          .filter(item => item.status === "active")
          .map(item => item.inventory.id);
          if (inventoryIds.length<1){
            
         // console.log(inventoryIds,"no");
          setLoadingOrder(false);
          return
          }
    
        
        try {
          const res = await axios.patch(`https://wonge-backend-k569.onrender.com/cart/order/`, {
            user_id: user.userid,
            status: "ordered",
            inventory_ids: inventoryIds,
          });
          

          
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
          if (res.status === 200 || res.status === 201) {
            await notifyCustomer(inventoryIds);
            console.log("notifying customer");
            }

        } catch (error) {
          console.error("error updating cart", error);
        } finally {
          setLoadingOrder(false);
        }
      };
     // console.log("length",cartItems.length);


     const handleBuyNow=(item)=>{
      if(person.access_token){
       // console.log(person.access_token);
       //console.log("item",item.inventory.id );
      router.push(`/blog/${item.inventory.id}`)
      }
      else{
        console.log("not authorized");
        router.push('login')
    }
    }


    const orderItem = async (itemToBeOrdered) => {
      console.log("orderItem", itemToBeOrdered);
      setLoadingOrder(true);
    
      try {
        const res = await axios.patch(`https://wonge-backend-k569.onrender.com/cart/order-one-item/`, {
          user_id: user.userid,
          status: "ordered",
          cart_id: itemToBeOrdered.id,
        });
    
        // Create a map of updated items from the response
        const updatedItemsMap = new Map(
          res.data.map(item => [item.id, item.status])
        );
    
        // Update cart items where IDs match
        setCartItems(
          cartItems.map(item => {
            if (updatedItemsMap.has(item.id)) {
              return {
                ...item,
                status: updatedItemsMap.get(item.id)
              };
            }
            return item;
          })
        );
        
          if (res.status === 200 || res.status === 201) {
            await notifyCustomer([itemToBeOrdered.inventory_id]);
            console.log("notifying customer");
            }

      } catch (error) {
        console.error("error updating cart", error);
      } finally {
        setLoadingOrder(false);
      }
    };
    const totalCost = cartItems.reduce((total, item) => {
      return total + (item.inventory.price * item.quantity);
    }, 0);

    
    

     const handleDelete = async (cartId) => {
      //check if iem is not ordered yet
        try {
            // Optimistically remove the item from the state
            setCartItems(cartItems.filter(item => item.id !== cartId));

            // Send DELETE request to the backend
            const response = await axios.delete(`https://wonge-backend-k569.onrender.com/cart/remove-item/${user.userid}/${cartId}`);

            // If successful, the item is deleted
            if (response.status === 200) {
                console.log("Item deleted successfully");
            } else {
                // If something went wrong, re-fetch the cart items to get the correct state
                const res = await axios.get(`https://wonge-backend-k569.onrender.com/cart/get-cart-items/${user.userid}`);
                setCartItems(res.data);
            }
        } catch (error) {
            console.error("Error deleting cart item:", error);
            // Revert the optimistic update if there's an error
            const res = await axios.get(`https://wonge-backend-k569.onrender.com/cart/get-cart-items/${user.userid}`);
            setCartItems(res.data);
        }
    };
    
      const itemsInCart=cartItems.map((item,index)=>{
        return(
            <li key={index}
            onDoubleClick={()=>handleDoubleClick(index)}
            >
                
                <motion.div className={styles.imgTwo}
                 style={{
                  margin:(deleteOption!==index)&&"0 20px"
                 }} 
                >
                    <Image
                        src={item.inventory.photo_url}
                        alt='w'
                        quality={100}
                        width="120"
                        height="120"
                        sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                        priority
                        onClick={() => handleBuyNow(item)}
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
                        <span>Pending ...</span>
                      ) : (
                        <span>{item.status}</span>
                      )}
                      </div>

                    <div className={styles.availableNow}>
                      Available now : {item.inventory.quantity}
                    </div>
                    <div className={styles.options}>

                      
                        <div className={styles.order}
                          onClick={()=>{orderItem(item)}}
                        >
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
                    </div>


                              
                   
                </div> 
                {
                  (index==deleteOption)&&(
                    
                  <motion.div  
                  initial={{
                        x:0,y:-50,opacity:0
                    }}
                    animate={{
                        opacity:1,
                        y:0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        }}
                      className={styles.deleteButton}
                  >
                    <div 
                      onClick={() => handleDelete(item.id)}
                      
                      id="customizedbackground">
                      
                      <FaTrash color="#fff"/> 
                    </div>
                    
                  </motion.div>
                  )
                }
            </li>
        );
      })

    return (
        <div className={styles.container}>
            <h2 className={styles.tittle}> CART </h2>
            {
                (cartItems.length>0)?(
                    <>
                    
                      <div className={styles.heading}>
                      <div className={styles.totalcost}>
                        <strong>Total Cost:</strong> Mk {totalCost.toLocaleString()}
                      </div>
                      <div className={styles.orderall} onClick={makeOrder} id="customizedbackground">
                      {loadingOrder?(<>LOADING ...</>):
                          (<>ORDER NOW </>)
                      }
                      </div>
                      </div>
                      <ul className={styles.unorderedlist}>
                          
                          {itemsInCart}
                          
                        <div style={{position:"relative",padding:"150px",}}></div>
                      </ul>
                      
                    </>
                ):(
                    <>
                        <div>
                        <h3 style={{
                          position:"relative",margin:"20px",display:"flex",
                        }}>
                        Your Cart is empty
                        <div style={{margin:"80px -20px"}}> <Spinner/></div>
                        </h3>
                        </div>
                    </>
                )
            }
        </div>
    );
}
 
export default Cart;