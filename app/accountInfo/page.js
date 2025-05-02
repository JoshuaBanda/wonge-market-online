"use client";
import styles from "../Styles/accountInfo.module.css";
import { useState } from "react";
import style from "../Styles/decoratedBorder.module.css";

const AccountInfo = () => {
    const [district, setDistrict] = useState("");
    const [street, setStreet] = useState("");
    const [country, setCountry] = useState("USA"); // example default

    const handleFormSubmission = (e) => {
        e.preventDefault();
        console.log("Submitted:", { country, district, street });
        // Add further handling here
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Complete Your Account Info
            </h2>
            <span>To contiunue we need your contact information</span>
            <form onSubmit={handleFormSubmission} className={styles.formContainer}>
                {/* Dropdown for district or city */}
                <label>
                    District or City:
                    <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                        <option value="">Select a district</option>
                        <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Chicago">Chicago</option>
                        {/* Add more options as needed */}
                    </select>
                </label>
                <label>
                    Street:
                    <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Enter your street"
                    />
                </label>
                <button type="submit"             style={{
              all: 'unset', // resets most styles
              cursor: 'pointer', // optional: brings back pointer cursor
              display: 'inline-block', 
              margin:"10px"
            }}>
                    <div className={style.card}>Continue</div>
                </button>
            </form>
        </div>
    );
};

export default AccountInfo;
