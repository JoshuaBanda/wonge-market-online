"use client";
import Image from "next/image";
import styles from "../Styles/productList.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const productList = () => {
    
      const route = useRouter();

    const products=[
        {name:"Lotion",photo:'/avon3_with_no_bg.png',background:"rgba(122, 121, 121, 0.767)"},
        {name:"Earrings",photo:'/avon3_with_no_bg.png',background:"rgba(163, 163, 163, 0.7)"},
        {name:"Brochus",photo:'/avon4_with_no_bg.png',background:"rgba(34, 54, 57, 0.59)"},
        {name:"Perfume",photo:'/avon4_with_no_bg.png',background:"rgba(41, 154, 206, 0.5)"},
    ];
    const handleRouting=(name)=>{
        if(name=="Lotion"){
            route.push("/products/Lotion")
        }else if(name=="Earrings"){
            route.push("/products/Earrings")
        }
        else if(name=="Brochus"){
            route.push("/products/Brochus")
        }else if(name=="Perfume"){
            route.push("/products/Perfume")
        }
    }
    const items=products.map((item,index)=>{
        return (
            <li key={index} style={{background:item.background}}
                onClick={()=>handleRouting(item.name)}
            >
                   
                <div className={styles.itemText}>
                    <span>
                        {item.name}
                    </span>
                </div> 
                    
                <motion.div className={styles.imgTwo}
                    /*initial={{
                        x:0,y:0,
                    }}
                    animate={{
                        opacity:1,
                        //y:5,
                        scale:[1,1.05],
                    }}
                    transition={{
                        type: 'tween',
                        stiffness: 200,
                        repeat: Infinity, 
                        repeatType:'reverse',
                        duration:2
                        }}*/
                >
                    <Image
                        src={item.photo}
                        alt='w'
                        quality={100}
                        width="120"
                        height="120"
                        sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                        priority
                    />
                </motion.div>
            </li>
        )
    })
    return (
        <div>
        <div className="containerlist">
            <h2 className={styles.tittle}>
                What are you looking for
            </h2>
            <ul className={styles.displayedItems}>
                {items}
            </ul>

        </div>
        </div>
    );
}
 
export default productList;