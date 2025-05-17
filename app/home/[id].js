// pages/products/[id].js
"use client";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../Styles/ProductPage.module.css';
import { FaCartPlus } from 'react-icons/fa';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query; 

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://wonge-backend-k569.onrender.com/inventory/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (!product) return <div className={styles.error}>Product not found</div>;

  return (
    <div className={styles.page}>
      
    <div className={styles.container}>
      <div className={styles.productInfo}>
        <img style={{border:'1px soilid pink'}} className={styles.productImage} src={product.photo_url} alt={product.name} />
        <div className={styles.productDetails}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.productPrice}>${product.price}</p>
          <button className={styles.addToCartBtn}>
            <div>
                Add to Cart 
            </div>
            <div>
                <FaCartPlus/>
            </div>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductPage;
