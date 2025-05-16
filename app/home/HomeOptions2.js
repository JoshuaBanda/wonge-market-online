"use client";
import { useState } from "react";
import styles from "../Styles/decoratedBorder.module.css";

const HomeOptions = ({text,myBackgroudColor,myTextColor}) => {
    return (
        <>
            <div>
                        
                <div style={{
                    //position:"relative",
                    //width:"90px",
                    //height:"35px",
                    //border:"1px solid rgba(164, 120, 100, 0.1)",
                    //borderRadius:"20px",
                    //backgroundColor:myBackgroudColor,
                    //color:myTextColor,
                    //padding:"4px 10px",
                    //margin:"0px 0px 0px 0px",
                    //fontSize:'18px'

                }}
                //className={styles.card}
                >
                    {text}
                </div>
            </div>
        </>
    );
}
 
export default HomeOptions;