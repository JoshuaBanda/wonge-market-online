"use client";
import styles from "../../Styles/LoginPage.module.css";
import LoginPart from "./LoginPart";
const LoginPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.loginPart}>
                    <LoginPart/>
                </div>
                <div className={styles.SignPart}></div>
                
            </div>
        </div>
    );
}
 
export default LoginPage;