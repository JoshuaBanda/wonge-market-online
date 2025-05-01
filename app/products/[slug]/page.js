// app/products/[slug]/page.js

import ClientFetcher from "./clientFetcher";

export async function generateStaticParams() {
    return [
      { slug: 'Lotion' },
      { slug: 'Earrings' },
      { slug: 'Brochus' },
      { slug: 'Perfume' },
    ];
  }
  
  const products = {
    Lotion: { name: 'Lotion', price: '$20' },
    Earrings: { name: 'Earrings', price: '$30' },
    Brochus: { name: 'Brochus', price: '$50' },
    Perfume: { name: 'Perfume', price: '$50' },
  };
  
  // ✅ Mark as async and await params
  export default async function ProductPage({ params }) {
    const { slug } = await params; // This line avoids the error
    const product = products[slug];
  
    if (!product) return <div>Product not found</div>;
  
    return (
      <div>
        <h1 style={{position:"relative", marginLeft:"30%"}}>{product.name}</h1>
        <ClientFetcher productName={product.name}/>
      </div>
    );
  }
  