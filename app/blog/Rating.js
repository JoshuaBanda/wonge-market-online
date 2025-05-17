"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegStar, FaRegStarHalf, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const Rating = ({initialLikeCount,postId,userId}) => {
    const jwtToken=1;
    const [likes,setLikes]=useState(0);
    
      const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    fetchLikeData();
//console.log("like",likeCount,isLiked);
  }, []);

          const fetchLikeData = async () => {
    try {
      // Fetch like count
      const likeCountResponse = await axios.get(`https://wonge-backend-k569.onrender.com/post-likes/${postId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const fetchedLikeCount = likeCountResponse.data.length;
      //console.log('like count:',fetchedLikeCount);

      // Fetch like status for the current user
      const likeStatusResponse = await axios.get(`https://wonge-backend-k569.onrender.com/post-likes/has-liked/${postId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });


      setLikeCount(fetchedLikeCount);

    } catch (error) {
      console.error("Error fetching like data:", error);
    } finally {
    }
  };



    useEffect(()=>{
        setLikes(likeCount);
    },[likeCount])
    const handleRates=()=>{
        if (likes==0){
            return(
                <>
                    <div style={{
                        position:'absolute',
                        display:'flex'
                    }}>
                        
                    <FaRegStar style={{
                        color:"gold",fontSize:'20px'
                    }}/>
                    <FaRegStar style={{
                        color:"gold",fontSize:'20px'
                    }}/>
                    <FaRegStar style={{
                        color:"gold",fontSize:'20px'
                    }}/>
                    <FaRegStar style={{
                        color:"gold",fontSize:'20px'
                    }}/>
                    </div>
                </>
            );
        }
        else if(likes==1){
            return(
                <div style={{position:'absolute',
                    display:'flex',
                }}>
                    <FaStar style={{
                        color:"gold",fontSize:'20px'
                    }}/>
                    <FaRegStar style={{
                        color:"gold",fontSize:'20px'
                    }}/>
                    <FaRegStar style={{
                        color:"gold",fontSize:'20px'
                    }}/>
                    <FaRegStar style={{
                        color:"gold",fontSize:'20px'
                    }}/>
                </div>
            )
        }
        
        else if(likes>=2&&likes<=5){
            return(
                <div style={{position:'absolute',
                    display:'flex',
                }}>
                    <FaStar style={{
                        color:"gold",fontSize:'20px'
                    }}/>
                    <FaStar style={{
                        color:"gold",fontSize:'20px'
                    }}/>
                    <FaRegStarHalfStroke style={{
                        color:"gold",fontSize:'20px'
                    }}/>
                    <FaRegStar style={{
                        color:"gold",fontSize:'20px'
                    }}/>
                </div>
            )
        }
    }
    return (
        <>
            <div>
                {handleRates()} 
                    <span style={{position:"relative",
                    color:'black',left:"90px",color:'#666'}}>
                       &#40; {likeCount*61} reviews &#41;
                    </span>
            </div>
        </>
    );
}
 
export default Rating;