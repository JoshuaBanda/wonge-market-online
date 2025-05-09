"use client";
import Image from "next/image";
import styles from "../Styles/test.module.css";
import AnimatedWord from "@/components/AnimatedWord";

const Test = () => {
    return (
        <div className={styles.maskContainer} style={{ position: "relative" }}>
            {/* ===================== */}
            {/* SHADOW LAYERS (3 levels) */}
            {/* ===================== */}
            
            {/* Deep ambient shadow */}
            <div className={styles.maskBox} style={{
                position: "absolute",
                zIndex: -3,
                filter: "blur(25px)",
                opacity: 0.4,
                transform: "scale(1.03)",
                pointerEvents: "none",
                background: "linear-gradient(45deg, rgba(0,0,0,0.8), rgba(20,20,20,0.5))"
            }}>
                <div className={styles.boxWrap}>
                    <div style={{ height: "80px" }}>
                        <div>
                            <span style={{ visibility: "hidden" }}>Start Your Day</span>
                            <p style={{ visibility: "hidden" }}>flesh</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core shadow */}
            <div className={styles.maskBox} style={{
                position: "absolute",
                zIndex: -2,
                filter: "blur(12px) brightness(0.6)",
                opacity: 0.7,
                transform: "scale(1.015)",
                pointerEvents: "none",
                background: "url('/blackbackground.jpg')"
            }}>
                <div className={styles.boxWrap}>
                    <div style={{ height: "80px" }}>
                        <div>
                            <span style={{ visibility: "hidden" }}>Start Your Day</span>
                            <p style={{ visibility: "hidden" }}>flesh</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edge accent shadow */}
            <div className={styles.maskBoxShadow} style={{
                zIndex: 1,
                filter: "blur(5px)",
                opacity: 0.9,
                pointerEvents: "none",
                background: "rgba(0,0,0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
            }}></div>

            {/* ===================== */}
            {/* ACTUAL CONTENT */}
            {/* ===================== */}
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

                        <div style={{
                            position: "absolute",
                            top: "-50%",
                            right: "-20px",
                            zIndex: 100,
                            display: "flex",
                            gap: "10px",
                            alignItems: "flex-end",
                        }}>
                            <div style={{
                                width: "120px",
                                height: "50px",
                                position: "relative",
                                right:"-160px"
                            }}>
                                <Image
                                    src="/str.png"
                                    alt="1"
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
                            
                            <div style={{
                                width: "120px",
                                height: "50px",
                                position: "relative",
                                right:"-125px"
                            }}>
                                <Image
                                    src="/str.png"
                                    alt="1"
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

                            <div style={{
                                width: "50px",
                                height: "120px",
                                position: "relative",
                            }}>
                                <Image
                                    src="/avon3_with_no_bg.png"
                                    alt="3"
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
                            
                            <div style={{
                                width: "60px",
                                height: "140px",
                                position: "relative",
                            }}>
                                <Image
                                    src="/avon3_with_no_bg.png"
                                    alt="3"
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
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.belowMaskBox}>
                <div className={styles.boxWrap}></div>
            </div>
        </div>
    );
}

export default Test;