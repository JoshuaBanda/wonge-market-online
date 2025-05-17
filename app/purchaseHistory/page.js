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
  const [cartItems, setCartItems] = useState([]);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);

  const { person } = useUser();
  const [user, setUser] = useState(person);

  const router = useRouter();

  // Set user on person change
  useEffect(() => {
    setUser(person);
  }, [person]);

  // Fetch cart items
  useEffect(() => {
                   if (!user?.userid) {
    // Optionally display a loading or error message if `user.userid` is not available yet
          return;
        }
    const fetchData = async () => {
      if (!user?.userid) return;
console.log("hi")
      try {
        const res = await axios.get(
          `https://wonge-backend-k569.onrender.com/cart/get-cart-items/${user.userid}/history`
        );
        if (Array.isArray(res.data)) {
          setCartItems(res.data);
        } else {
          console.warn("Cart data is not an array:", res.data);
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchData();
  }, [user, cartUpdated]);

  // API to update quantity
  const updateRequest = async (inventoryId, newQuantity, cartId) => {
    try {
      await axios.patch("https://wonge-backend.onrender.com/cart/cart-quantity", {
        inventory_id: inventoryId,
        quantity: newQuantity,
        id: cartId,
      });
      return true;
    } catch (error) {
      console.error("Error updating item quantity:", error.response?.data || error.message);
      return false;
    }
  };

  // Handle quantity increase
  const handleQuantityIncrement = async (itemToUpdate) => {
    if (itemToUpdate.quantity >= 10) {
      console.warn("Quantity can't be greater than 10");
      return;
    }

    const previousCart = [...cartItems];
    const updatedCart = cartItems.map((item) =>
      item.id === itemToUpdate.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);

    const updatedItem = updatedCart.find((item) => item.id === itemToUpdate.id);

    try {
      const success = await updateRequest(updatedItem.inventory_id, updatedItem.quantity, updatedItem.id);
      if (!success) {
        setCartItems(previousCart); // rollback
      }
    } catch (error) {
      setCartItems(previousCart); // rollback on error
    }
  };

  // Handle quantity decrease
  const handleQuantityReduction = async (itemToUpdate) => {
    if (itemToUpdate.quantity <= 1) {
      console.warn("Quantity can't be less than 1");
      return;
    }

    const previousCart = [...cartItems];
    const updatedCart = cartItems.map((item) =>
      item.id === itemToUpdate.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);

    const updatedItem = updatedCart.find((item) => item.id === itemToUpdate.id);

    try {
      const success = await updateRequest(updatedItem.inventory_id, updatedItem.quantity, updatedItem.id);
      if (!success) {
        setCartItems(previousCart); // rollback
      }
    } catch (error) {
      setCartItems(previousCart); // rollback on error
    }
  };

  // Handle full order
  const makeOrder = async () => {
    setLoadingOrder(true);

    const inventoryIds = cartItems
      .filter((item) => item.status === "active")
      .map((item) => item.inventory.id);

    if (inventoryIds.length < 1) {
      console.warn("No items to order");
      setLoadingOrder(false);
      return;
    }

    try {
      const res = await axios.patch(`https://wonge-backend.onrender.com/cart/order/`, {
        user: user.userid,
        status: "ordered",
        inventory_ids: inventoryIds,
      });

      const updatedMap = new Map(res.data.map((item) => [item.id, item.status]));

      setCartItems((prev) =>
        prev.map((item) =>
          updatedMap.has(item.id)
            ? { ...item, status: updatedMap.get(item.id) }
            : item
        )
      );
      setCartUpdated((prev) => !prev);
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoadingOrder(false);
    }
  };

  
    const totalCost = cartItems.reduce((total, item) => {
      return total + (item.inventory.price * item.quantity);
    }, 0);

  const itemsInCart = cartItems.map((item, index) => (
    <li key={index}>
      <motion.div className={styles.imgTwo} 
        onClick={() => handleBuyNow(item)}
        style={{margin:"0px 20px"}}
      >
        <Image
          src={item.inventory.photo_url}
          alt="product"
          quality={100}
          width={100}
          height={100}
          sizes="(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw"
          priority
        />
      </motion.div>

      <div className={styles.itemText}>
        <span className={styles.name}>{item.inventory.name}</span>
        <div className={styles.price}>Price: MK {item.inventory.price * item.quantity}</div>
        <div className={styles.status}>
          Status: {item.status === "active" ? <span>Not yet ordered</span> : <span>{item.status}</span>}
        </div>
        <div className={styles.availableNow}>Current stock: {item.inventory.quantity}</div>

      </div>
    </li>
  ));

  
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
  return (
    <div className={styles.container}>
      <h2 className={styles.tittle}>Purchase History</h2>
      <div className={styles.totalcost}>
                        <strong>Total Cost:</strong> Mk {totalCost.toLocaleString()}
                      </div>
      {cartItems.length > 0 ? (
        <>
          <ul className={styles.unorderedlist}>
            {itemsInCart}
            <div style={{ position: "relative", height: "150px", backgroundColor: "transparent" }}></div>
          </ul>
        </>
      ) : (
        
        <div>
                        <h3 style={{
                          position:"relative",margin:"20px",display:"flex",color:"black"
                        }}>
                        Your Purchase history is empty. order Item
                        </h3>
                        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
