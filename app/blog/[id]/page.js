"use client";// pages/products/[id].js
import { useRouter } from 'next/navigation'; // ✅ Fixed import
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight, FaCartPlus, FaShoppingCart } from 'react-icons/fa';
import { use } from 'react';
import Spinner from '@/app/home/Spinning';
import { useUser } from '@/app/userContext';
import { toast } from 'react-toastify';
import styles from "../../Styles/ProductPage.module.css"
import AnimatedWord from '@/components/AnimatedWord';
import LikeButton from '@/app/like/LikeButton';
import ItemLikeButton from './itemLikeButton';
import Rating from '../Rating';

const item = ({params}) => {

  const {person}=useUser();
  
  const [user,setUser]=useState(person)


  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {id}=use(params);
  const [quantity,setQuantity]=useState(1);
  

  const [likeCount, setLikeCount] = useState(0);

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
        const response = await axios.get(`https://wonge-backend-k569.onrender.com/inventory/${id}`);
        setProduct(response.data);
        //console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart= async()=>{
    try{
      const res=await axios.post(`https://wonge-backend-k569.onrender.com/cart/add-to-cart`,
        {
          
      user_id:user.userid,
      inventory_id:id,
      quantity:quantity,
      status:"active"

        }
      );
      console.log("status",res.status);
      if (res.status==201){
        toast.success(
          
        `Dear ${user.firstname} ${user.lastname}, You successfully added ${product.name} to your cart. click here to view your item in cart`,
          {
            onClick: () => {
              router.push('/cart'); // Navigate to cart
            },
            closeOnClick: true, // Optional: don't auto-close on click
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
          closeOnClick: true, // Optional: don't auto-close on click
          draggable: true,
          autoClose: 12000,
        }
      );
    
    //alert(` Dear ${user.firstname}, you already have ${product.name} added, to cart. For more information view your cart `);
      //console.error("error adding item to cart");
    }
  }
  const handleQuantityIncrement = () => {
  setQuantity(prevQuantity => {
    if (prevQuantity < product.quantity) {
      return prevQuantity + 1;
    }
    return prevQuantity; // Do not increment if limit reached
  });
};
const handleQuantityReduction = () => {
  setQuantity(prevQuantity => {
    if (prevQuantity > 1) {
      return prevQuantity - 1;
    }
    return prevQuantity; // Keep it at 1 if it's already at minimum
  });
};


  if (loading) return <div className={styles.loader}><Spinner/></div>;
  if (!product) return <div className={styles.error}>Product not found</div>;

  return (
    <div  className={styles.container} >
      <div>
        {/* Header*/}
        <section className={styles.header}>
            <span>
              <AnimatedWord/>
            </span>
                <div
                className={styles.prevButton}
                id="customizedbackground"
                onClick={() => router.back()}
                style={{ cursor: "pointer" }}
              >
                <FaArrowLeft color="white" />
              </div>
            <div className={styles.cartButton} id='customizedbackground' onClick={()=>{
              router.push('/cart')
            }}>
              <FaShoppingCart color='white'/>
            </div>
            <div className={styles.likeButton} id='customizedbackground'>
              
             <ItemLikeButton postId={product.id} userId={product.user_id} initialLikeCount={likeCount} /*initialLikeStatus={isLiked}*/ />
            </div>
        </section>
        <div className={styles.productInfo}>
          <img
            className={styles.productImage}
            src={product.photo_url}
            alt={product.name}
            quality={100}
            width="200"
            height="200"
            sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
          />

          <div className={styles.productDetails} id=''>
            <h1 className={styles.productName}>{product.name}</h1>
            
             <div className={styles.rating}>
                <Rating  initialLikeCount={0} postId={product.id} userId={product.user_id}/>
             </div>
             <div className={styles.productDescription}>
              <span>
                Description
              </span>
              <p >{product.description}</p>
             </div>
            <p className={styles.productPrice}>
              ${product.price}
            </p>

            {/*Quantity */}
            
            <div className={styles.quantityIn}>
              <div onClick={()=>handleQuantityReduction(item,index)}>
                <FaArrowLeft/>
              </div>
              <div>
                {quantity}
              </div>
              <div onClick={()=>handleQuantityIncrement()}>
                <FaArrowRight/>
              </div>
            </div>
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
