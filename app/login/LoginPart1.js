"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion"; // For animation
import axios from "axios";

const LoginPart = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoading = () => setLoading((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
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
        router.push("/home/HomePage");
      }
    } catch (err) {
      handleLoading();
      setError("Login failed. Please check your credentials.");
      console.error("Error submitting the form:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </motion.div>
  );
};

export default LoginPart;
