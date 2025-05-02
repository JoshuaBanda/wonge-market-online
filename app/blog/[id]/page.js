"use client";// pages/products/[id].js
import { useRouter } from 'next/navigation'; // ✅ Fixed import
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../Styles//ProductPage.module.css';
import { FaCartPlus } from 'react-icons/fa';
import { use } from 'react';
import Spinner from '@/app/home/Spinning';
import { useUser } from '@/app/userContext';

const item = ({params}) => {

  const {person}=useUser();
  
  const [user,setUser]=useState(person)


  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {id}=use(params);
  


  useEffect(()=>{
    //console.log("updatting");
    setUser(person);
  //  console.log('user',user,"person",person);
  },[person]);





  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://wonge-backend.onrender.com/inventory/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart= async()=>{
    try{
      const res=await axios.post(`https://wonge-backend.onrender.com//cart/add-to-cart`,
        {
          
      user_id:user.userid,
      inventory_id:id,
      quantity:1,
      status:"active"

        }
      );
    } catch(error){
      console.error("error adding item to cart");
    }
  }

  if (loading) return <div className={styles.loader}><Spinner/></div>;
  if (!product) return <div className={styles.error}>Product not found</div>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.productInfo}>
          <img
            className={styles.productImage}
            src={product.photo_url}
            alt={product.name}
          />
          <div className={styles.productDetails}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>${product.price}</p>
            <button className={styles.addToCartBtn} onClick={addToCart}>
              <div>Add to Cart</div>
              <div><FaCartPlus /></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default item;
