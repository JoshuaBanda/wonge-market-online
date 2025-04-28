// ShopItems Component
"use client";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Image from "next/image";
import Link from "next/link";  // Import Link from Next.js
import styles from '../Styles/shopItems.module.css'
import Spinner from "./Spinning";
import LikeButton from "../like/LikeButton";
import { motion } from "framer-motion";
import { useUser } from "../userContext";
import { useRouter } from "next/navigation";

// Function to fetch like data for a specific post
const fetchLikeData = async (jwtToken, postId, currentUserId, apiService, setLikeCount, setIsLiked, setErrorMessage) => {
  try {
    // Fetch the like count from the API
    const fetchedLikeCount = await apiService.fetchLikesForPost(jwtToken, postId);
    
    // Fetch the like status for the current user
    const fetchedIsLiked = await apiService.isUserLikedPost(jwtToken, postId, currentUserId);
    
    setLikeCount(fetchedLikeCount);
    setIsLiked(fetchedIsLiked);
  } catch (e) {
    // Show error message to the user
    setErrorMessage("Failed to load like data. Please try again.");
  }
};

const ShopItems = ({ searchItem, jwtToken='1', post='', currentUserId, apiService,userState }) => {
 // console.log('user',userState);
 const {person}=useUser();
 //console.log("user",person);
  
  const [items, setItems] = useState([]); // Initialize as an empty array
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user,setUser]=useState(person)
  const router=useRouter();

  const handleBuyNow=(item)=>{
    if(person.access_token){
      console.log(person.access_token);
    router.push(`/blog/${item.id}`)
    }
    else{
      console.log("not authorized");
      router.push('login')
  }
  }


  // Fetch items from the API based on the search term
  useEffect(()=>{
    setUser(user);
    console.log('user',user);
  },[person])
  useEffect(() => {
    const search = async () => {
      if (searchItem) {
        try {
          //console.log('Searching for:', searchItem);

          // Make API call to search for items
          const response = await axios.get(
            `https://wonge-backend.onrender.com/search/search?name=${searchItem}`
          );

          // Access the 'products' array in the response and set it to items state
          setItems(Array.isArray(response.data.products) ? response.data.products : []); 
        } catch (error) {
          console.error("Error fetching data", error);
        }
      } else {
        setItems([]); // Reset items if there's no search term
      }
    };

    search(); // Call the search function whenever searchItem changes
  }, [searchItem]); // Effect depends on the searchItem prop

  // Use effect to fetch like data for the specific post
  useEffect(() => {
    fetchLikeData(jwtToken, post.postId, currentUserId, apiService, setLikeCount, setIsLiked, setErrorMessage);
  }, [jwtToken, post.postId, currentUserId, apiService]);

  const checkDescriptionLength = (str) => str.length <= 25;

  const checkNameLength = (str) => str.length <= 10;

  // Map over the items to create the list of items
  const homeItems = Array.isArray(items) && items.map((item,index) => (
    <motion.div key={item.id} className={styles.container}
      initial={{
        x:0,y:0
      }}
      animate={{
        
      }}
    >
      {/* Check if photo_url exists and display the image */}
      {item.photo_url ? (
        <div className={styles.picContainer}>
          <Image
            src={item.photo_url} // Use the photo_url from the API
            alt={item.name}
            width={120} // Adjust width as needed
            height={120} // Adjust height as needed
            style={{ borderRadius: "5px", marginBottom: "0px",position:'relative',top:'45px',left:'20px', }}
            className={styles.pic}
            prioritysizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
          />
          <div className={styles.likeButton}>
            <div>
              <LikeButton postId={item.id} userId='1' initialLikeCount={likeCount} initialLikeStatus={isLiked} />
            </div>
          </div>
        </div>
      ) : (
        <p>No image available</p>
      )}
      <div onClick={() => handleBuyNow(item)}>

        <div className={styles.txt}>
          <h3 style={{ height: '20px' }}>
            {checkNameLength(item.name) ? item.name : `${item.name.slice(0, 10)}...`}  {/* Truncate if name is too long */}
          </h3>
          
          
  {/*    <p style={{ height: '40px' }}>
            {checkDescriptionLength(item.description) ? item.description : `${item.description.slice(0, 25)}...`}  
            </p>*/}
            <div style={{
              position:'relative',top:'65px',
              display:'flex'
            }}>
              <div className={styles.price}>
                <p>${item.price}</p>
              </div>
              <div className={styles.buyNow}>
                Buy Now
              </div>
            </div>
          
          {/* Add Link to individual product page */}


        </div>
        
      </div>

    </motion.div>
  ));

  return (
    <>

      <div
        style={{
          position: "relative",
          margin: "0px 0px 10px 10px",
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

export default ShopItems;
