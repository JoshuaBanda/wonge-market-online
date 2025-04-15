"use client";
import { useEffect, useState } from "react";
import { FaRegStar, FaRegStarHalf, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const Rating = ({likeCount}) => {
    const [likes,setLikes]=useState(0);

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
                        color:"orangered"
                    }}/>
                    <FaRegStar style={{
                        color:"orangered"
                    }}/>
                    <FaRegStar style={{
                        color:"orangered"
                    }}/>
                    <FaRegStar style={{
                        color:"orangered"
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
                        color:"orangered"
                    }}/>
                    <FaRegStar style={{
                        color:"orangered"
                    }}/>
                    <FaRegStar style={{
                        color:"orangered"
                    }}/>
                    <FaRegStar style={{
                        color:"orangered"
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
                        color:"orangered"
                    }}/>
                    <FaStar style={{
                        color:"orangered"
                    }}/>
                    <FaRegStarHalfStroke style={{
                        color:"orangered"
                    }}/>
                    <FaRegStar style={{
                        color:"orangered"
                    }}/>
                </div>
            )
        }
    }
    return (
        <>
            <div>
                {handleRates()}
            </div>
        </>
    );
}
 
export default Rating;