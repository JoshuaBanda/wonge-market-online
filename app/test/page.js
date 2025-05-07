"use client";
import Image from "next/image";
import styles from "../Styles/test.module.css"
import AnimatedWord from "@/components/AnimatedWord";
const Test = () => {
    return (
            
        <div className={styles.maskContainer}>

            <div className={styles.aboveMaskBox}>
                <div className={styles.boxWrap}>
                    <span className={styles.tittle}>
                    <AnimatedWord/>
                    </span>
                    
                </div>
            </div>

            <div className={styles.maskBox}>
                <div className={styles.boxWrap}>
                    <div style={{
                        display: "flex",
                        position: "relative",
                        height: "80px"
                    }}>
                        <div>
                            <span className={styles.startYourDay}>
                                Start Your Day
                            </span>
                            <p className={styles.flesh}>
                                flesh
                            </p>
                        </div>
                        <Image
                            src="/avon3_with_no_bg.png"
                            alt="w"
                            quality={100}
                            width={150}
                            height={150}
                            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                            style={{
                                position: "fixed",
                                right: "-30px",
                                top: "14vh",
                                zIndex: 100,
                                display: "block"
                            }}
                        />
                        <Image
                            src="/avon3_with_no_bg.png"
                            alt="w"
                            quality={100}
                            width={120}
                            height={120}
                            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                            style={{
                                position: "fixed",
                                right: "30px",
                                top: "15vh",
                                zIndex: 100,
                                display: "block"
                            }}
                        />
                    </div>

                </div>
            </div>

            <div className={styles.belowMaskBox}>
                <div className={styles.boxWrap}>
                </div>
            </div>

        </div>
    );
}
 
export default Test;
