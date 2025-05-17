// app/products/[slug]/ClientFetcher.js
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import LikeButton from '@/app/like/LikeButton';
import styles from "../../Styles/clientFetcher.module.css";
import { useUser } from '@/app/userContext';
import { FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ClientFetcher({ productName }) {
  const [items, setItems] = useState([]);

  const [page,setPage]=useState(1);
  const limit=10;
  
   const {person}=useUser();
 const currentUserId=person.userid;
 const router=useRouter();

 
 const checkDescriptionLength = (str) => str.length <= 25;

 const checkNameLength = (str) => str.length <= 10;
  //console.log("product name",productName);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `https://wonge-backend-k569.onrender.com/inventory/products/${productName}/${page}/${limit}`
        );
        
       // console.log("response",response.data);console.log("items",items);
        setItems(Array.isArray(response.data) ? response.data : []);
       // Array.isArray(response.data) ?console.log("yeeeeeeeeeea"):console.log("noooooooooo");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, [page]);
  //console.log("iteeeeeems",items);
  const handleBuyNow=(item)=>{
    if(person.access_token){
     // console.log(person.access_token);
    router.push(`/blog/${item.id}`)
    }
    else{
      console.log("not authorized");
      router.push('login')
  }
  }

  const Products=items.map((item,index)=>{
    return(
        <li key={index}>
            <motion.div key={item.id} className={styles.container} id='customizedborder'
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
                        priority
                        prioritysizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                    />
                    <div className={styles.likeButton}>
                        <div>
                        <LikeButton postId={item.id} userId={currentUserId} /*initialLikeStatus={isLiked}*/ />
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
                        position:'relative',top:'48px',left:"20%",
                        alignContent:"center"
                        //display:'flex'
                        }}>
                        <div className={styles.price}>
                            <p>MK{item.price}</p>
                        </div>
                        <div className={styles.addToCart} id='customizedbackground'>
                            Add to cart <FaShoppingCart style={{
                            fontSize:"18px",margin:"1px 1px 1px 0px"
                            }}/>
                        </div>
                        </div>
                    
                    {/* Add Link to individual product page */}


                    </div>
                    
                </div>

            </motion.div>
        </li>
    );
  })

  
  return (
    <div>
      <ul className={styles.unorderdlist}>
      {Products}
      </ul>
    </div>
  );
}
