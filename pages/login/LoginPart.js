"use client";
import { useState } from "react";
import { FaSeedling } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPart = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Added error state for better user experience

  const handleLoading = () => {
    setLoading((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before submitting
    handleLoading();

    try {
      const response = await axios.post(
        "https://wonge-backend.onrender.com/users/logi-n",
        { email, password },
        { timeout: 120000 }
      );

      handleLoading();

      if (response.status === 201) {
        console.log("Authentication successful:", response.data);
        router.push("/home/FrontPage");
      }
    } catch (error) {
      handleLoading();
      setError("Login failed. Please check your credentials.");
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <>
      {/* Login content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        {/* Title text */}
        <p
          style={{
            color: "wheat",
            fontSize: "25px",
            marginBottom: "10px",
            textAlign: "center",
            position: "relative", // Ensure text is clear and not blurred
            zIndex: 1,
          }}
        >
          WONGE ENTERPRISE
        </p>

        <div>
          <FaSeedling size={60} color="wheat" />
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: "15px",
            color: "wheat",
          }}
        >
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "10px",
              width: "100%",
              maxWidth: "500px",
              marginBottom: "10px",
              border: "1px solid wheat",
              borderRadius: "50px",
              fontSize: "16px",
            }}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "10px",
              width: "100%",
              maxWidth: "500px",
              marginBottom: "20px",
              border: "1px solid wheat",
              borderRadius: "50px",
              fontSize: "16px",
            }}
          />

          {/* Error message */}
          {error && (
            <p style={{ color: "red", textAlign: "center", fontSize: "14px" }}>
              {error}
            </p>
          )}

          {/* Submit Button */}
          <motion.button
            style={{
              margin: "0 auto",
              height: "40px",
              width: "200px",
              textAlign: "center",
              color: "wheat",
              lineHeight: "30px",
              borderRadius: "50px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid transparent",
              fontSize: "22px",
              position: "relative",
              overflow: "hidden",
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          >
            {loading ? (
              <p style={{ color: "wheat", fontSize: "15px", margin: "5px auto" }}>
                Loading ...
              </p>
            ) : (
              <p style={{ color: "wheat", fontSize: "20px", margin: "5px auto" }}>
                Login
              </p>
            )}
          </motion.button>
        </form>
      </div>
    </>
  );
};

export default LoginPart;
