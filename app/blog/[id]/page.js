"use client";// pages/products/[id].js
import { useRouter } from 'next/navigation'; // ✅ Fixed import
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../Styles//ProductPage.module.css';
import { FaCartPlus } from 'react-icons/fa';
import { use } from 'react';
import Spinner from '@/app/home/Spinning';
import { useUser } from '@/app/userContext';
import { toast } from 'react-toastify';

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
    //console.log("id:",id);
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
      const res=await axios.post(`https://wonge-backend.onrender.com/cart/add-to-cart`,
        {
          
      user_id:user.userid,
      inventory_id:id,
      quantity:1,
      status:"active"

        }
      );
      console.log("status",res.status);
      if (res.status==201){
        toast.success(
          
        `Dear ${user.firstname} ${user.lastname}, You successfully added"${product.name} to your cart. You can now make an order to purchase ${product.name}`,
          {
            onClick: () => {
              router.push('/cart'); // Navigate to cart
            },
            closeOnClick: false, // Optional: don't auto-close on click
            draggable: true,
            autoClose: 10000,
          }
        );
      }
    } catch(error){
      toast.error(
        `${user.firstname}, you already have ${product.name} in your cart. Click to view cart.`,
        {
          onClick: () => {
            router.push('/cart'); // Navigate to cart
          },
          closeOnClick: false, // Optional: don't auto-close on click
          draggable: true,
          autoClose: 12000,
        }
      );
    
    //alert(` Dear ${user.firstname}, you already have ${product.name} added, to cart. For more information view your cart `);
      //console.error("error adding item to cart");
    }
  }

  if (loading) return <div className={styles.loader}><Spinner/></div>;
  if (!product) return <div className={styles.error}>Product not found</div>;

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.productInfo}>
          <img
            className={styles.productImage}
            src={product.photo_url}
            alt={product.name}

            
                        quality={100}
                        width="250"
                        height="250"
                        sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                        priority
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
