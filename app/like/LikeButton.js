"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You can use axios or fetch for https://wonge-backend.onrender.com requests
import { ClipLoader } from 'react-spinners'; // For a loading spinner
import Rating from './Rating';
import { FaHeart,FaThumbsUp, FaRegHeart,FaFaceGrinHearts } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import styles from "../Styles/like.module.css";
const LikeButton = ({ postId, userId, jwtToken, initialLikeCount,  }) => {
  //console.log(" postId", postId,"userId",userId,"jwtToken",jwtToken,"initialLikeCount",initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLoading, setIsLoading] = useState(false);
 // console.log('postId',postId,'userid ',userId,' jwtToken',jwtToken,'initial like count',initialLikeCount,'inititual like status',initialLikeStatus);

  // Fetch like data when the component mounts
  useEffect(() => {
    fetchLikeData();
//console.log("like",likeCount,isLiked);
  }, [postId,isLiked]);

  // Fetch like count and like status
  const fetchLikeData = async () => {
    setIsLoading(true);
    try {
      // Fetch like count
      const likeCountResponse = await axios.get(`https://wonge-backend.onrender.com/post-likes/${postId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const fetchedLikeCount = likeCountResponse.data.length;
      //console.log('like count:',fetchedLikeCount);

      // Fetch like status for the current user
      const likeStatusResponse = await axios.get(`https://wonge-backend.onrender.com/post-likes/has-liked/${postId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });


      setLikeCount(fetchedLikeCount);

     // console.log('like status response',likeStatusResponse.data,'like count:',likeCount);
      setIsLiked(likeStatusResponse.data);
    } catch (error) {
      console.error("Error fetching like data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle toggling like/unlike
  const toggleLike = async () => {
    if (isLoading) return; // Prevent toggling while loading
    setIsLoading(true);

    try {
      if (isLiked) {
        // Unlike the post
        const response = await axios.delete(`https://wonge-backend.onrender.com/post-likes/${postId}/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        
        //console.log('unlike response',response.status);
        if (response.status === 200||2001) {
          setIsLiked(false);
          setLikeCount(likeCount - 1);
        } else {
          showErrorSnackbar('Failed to unlike the post');
        }
      } else {
        // Like the post
        const response = await axios.post(`https://wonge-backend.onrender.com/post-likes/like`, {
          postId,
          userId,
        }, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        //console.log('like response',response.status);
        if (response.status === 201) {
          setIsLiked(true);
          setLikeCount(likeCount + 1);
        } else {
          showErrorSnackbar('Failed to like the post');
        }
      }
    } catch (error) {
      //console.error("Error toggling like:", error);
      showErrorSnackbar('An error occurred while processing your request');
    } finally {
      setIsLoading(false);
    }
  };

  // Show error message to the user
  const showErrorSnackbar = (message) => {
    //  (message); // You can replace this with a Snackbar component
   // console.log(message);
  };

  return (
    <div style={{ display: 'flex'}}>
      <div style={{ position: 'relative', marginLeft: '1px' }}>
        <button
          onClick={toggleLike}
          disabled={isLoading}
          style={{
            
            background: isLiked ? 'rgba(248, 248, 248, 0.9)' : 'rgba(248, 248, 248, 0.9)',
            border: '1px solid rgba(255,255,255,0.2)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            color: isLiked ? 'black' : 'grey',
            overflow:'visible',width:'80px',
            borderRadius:'10px',
            height:'22px',backdropFilter:'blur(10px)',
            boxShadow:'-1px 1px 1px rgba(0,0,0,0.025)',
          }}
        >
        {
          likeCount==0?(<>
            
          <div>
            <FaHeart size={18}/>
          </div>
          </>

          ):(
            <>
              
          <motion.div
            initial={{x:0,y:10,opacity:0}}
            animate={{x:0,y:-1, opacity:1}}
            transition={{
              type:"tween",
            }}style={{
  position: "relative",
  display: "flex",
  alignItems: "center",      // vertically center items
  justifyContent: "center",
  color:isLiked?"black":"grey"
}}

          >
          <div style={{fontSize:"18px",color:"black"}} className={styles.like}>
          {likeCount}&nbsp;
          </div>
          <div>
          <FaHeart style={{fontSize:"18px"}}/></div>
          </motion.div>
            </>
          )
        }
        </button>
        {isLoading && (
          <ClipLoader
            size={20}
            color="grey"
            loading={isLoading}
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        )}

      </div>
    </div>
  );
};

export default LikeButton;
