"use client";
import Image from "next/image";
import styles from "../Styles/test.module.css";
import AnimatedWord from "@/components/AnimatedWord";

const Test = () => {
    return (
        <div className={styles.maskContainer} style={{ position: "relative" }}>
            {/* Header Section */}
            <div className={styles.aboveMaskBox}>
                <div className={styles.boxWrap}>
                    <span className={styles.tittle}>
                        <AnimatedWord/>
                    </span>
                </div>
            </div>

            {/* Main Content Section */}
            <div className={styles.maskBox}>
                <div className={styles.boxWrap}>
                    <div style={{
                        display: "flex",
                        position: "relative",
                        height: "80px"
                    }}>
                        {/* Text Content */}
                        <div>
                            <span className={styles.startYourDay}>
                                Start Your Day
                            </span>
                            <p className={styles.flesh}>
                                Flesh
                            </p>
                        </div>

                        {/* Image Gallery */}
                        <div style={{
                            position: "absolute",
                            top: "-50%",
                            right: "-20px",
                            zIndex: 100,
                            display: "flex",
                            gap: "10px",
                            alignItems: "flex-end",
                        }}>
                            <ImageContainer 
                                width={120} 
                                height={50} 
                                rightOffset={220}
                                src="/str.png"
                                alt="Product 1"
                            />
                            
                            <ImageContainer 
                                width={120} 
                                height={50} 
                                rightOffset={125}
                                src="/str.png"
                                alt="Product 2"
                            />

                            <ImageContainer 
                                width={50} 
                                height={120}
                                src="/avon3_with_no_bg.png"
                                alt="Product 3"
                            />
                            
                            <ImageContainer 
                                width={60} 
                                height={140}
                                src="/avon3_with_no_bg.png"
                                alt="Product 4"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className={styles.belowMaskBox}>
                <div className={styles.boxWrap}></div>
            </div>
        </div>
    );
}

// Image container component for cleaner code
const ImageContainer = ({ width, height, rightOffset = 0, src, alt }) => (
    <div style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
        ...(rightOffset && { right: `-${rightOffset}px` })
    }}>
        <Image
            src={src}
            alt={alt}
            width={120}
            height={120}
            style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
            }}
            className={styles.pic}
            sizes="(max-width:768px)100vw, (max-width:1200px)50vw, 33vw"
        />
    </div>
);

export default Test;