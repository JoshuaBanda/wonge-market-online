"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

const CreateAccountPage = () => {
  const router = useRouter();
  const { email, password } = router.query;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("female");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);  // state for profile picture file
  const [error, setError] = useState("");

 // console.log('firstname',firstName);

  useEffect(() => {
    // If email and password are not present in the query, redirect back to the signup page
    if (!email || !password) {
      router.push("/signup");
    }
  }, [email, password, router]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];  // Get the selected file
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !dateOfBirth || !profilePicture) {
      setError("Please fill out all fields and select a profile picture.");
      return;
    }

    try {
      // Create a FormData object to send the data including the file
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("firstname", firstName);
      formData.append("lastname", lastName);
      formData.append("phonenumber", phone);
      formData.append("sex", sex);
      formData.append("dateofbirth", dateOfBirth);
      formData.append("file", profilePicture);  // Append the profile picture file

      // Send the complete data to the backend
      const response = await axios.post("https://wonge-backend.onrender.com/users/create-user", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // This is important for file uploads
        },
      });

      // If the request is successful
      
      router.push('/home/HomePage');
    } catch (error) {
      // Handle error
      console.error("Error creating user:", error.message);
      setError(error.message); // Set the error message to display in UI
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Background Image with Blur */}
      <Image
        src="/wonge1.jpg"
        alt="createaccountimage"
        fill
        priority
        quality={100}
        style={{
          objectFit: "cover", // Cover the entire area
          filter: "blur(1px)", // Apply blur effect to the background image only
          zIndex: -1, // Ensure the image stays in the background
        }}
      />

      {/* Dark overlay on top of the blurred image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/*<div
          style={{
            position: "relative",
            width: "90%",
            maxWidth: "500px",
            margin: "auto",
            border: "1px solid black",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            borderRadius: "20px",
          }}
        >*/}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: "15px",
            }}
          >
            {/* First Name Input */}
            <label
              htmlFor="firstName"
              style={{
                color: "white",
                marginBottom: "5px",
                fontSize: "14px",
                textAlign: "left",
                width: "80%",
                maxWidth: "400px",
              }}
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={{
                padding: "10px",
                width: "80%",
                maxWidth: "400px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "50px",
                fontSize: "16px",
                border: "1px solid grey",
                color: "rgba(0, 0, 0, 0.7)",
              }}
            />

            {/* Last Name Input */}
            <label
              htmlFor="lastName"
              style={{
                color: "white",
                marginBottom: "5px",
                fontSize: "14px",
                textAlign: "left",
                width: "80%",
                maxWidth: "400px",
              }}
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={{
                padding: "10px",
                width: "80%",
                maxWidth: "400px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "50px",
                fontSize: "16px",
                border: "1px solid grey",
                color: "rgba(0, 0, 0, 0.7)",
              }}
            />

            {/* Phone Number Input */}
            <label
              htmlFor="phone"
              style={{
                color: "white",
                marginBottom: "5px",
                fontSize: "14px",
                textAlign: "left",
                width: "80%",
                maxWidth: "400px",
              }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{
                padding: "10px",
                width: "80%",
                maxWidth: "400px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "50px",
                fontSize: "16px",
                border: "1px solid grey",
                color: "white",
              }}
            />

            {/* Sex (Dropdown) */}
            <label
              htmlFor="sex"
              style={{
                color: "white",
                marginBottom: "5px",
                fontSize: "14px",
                textAlign: "left",
                width: "80%",
                maxWidth: "400px",
              }}
            >
              Sex
            </label>
            <select
              id="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              required
              style={{
                padding: "10px",
                width: "80%",
                maxWidth: "400px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "50px",
                fontSize: "16px",
                border: "1px solid grey",
                color: "rgb(255, 255, 255)",
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* Date of Birth Input */}
            <label
              htmlFor="dateOfBirth"
              style={{
                color: "white",
                marginBottom: "5px",
                fontSize: "14px",
                textAlign: "left",
                width: "80%",
                maxWidth: "400px",
              }}
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              style={{
                padding: "10px",
                width: "80%",
                maxWidth: "400px",
                marginBottom: "20px",
                border: "1px solid #ddd",
                borderRadius: "50px",
                fontSize: "16px",
                border: "1px solid grey",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            />

            {/* Profile Picture Input */}
            <label
              htmlFor="profilePicture"
              style={{
                color: "white",
                marginBottom: "5px",
                fontSize: "14px",
                textAlign: "left",
                width: "80%",
                maxWidth: "400px",
              }}
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              required
              style={{
                padding: "10px",
                width: "80%",
                maxWidth: "400px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "50px",
                fontSize: "16px",
                backgroundColor: "rgba(255,255,255,0.5)",
                border: "1px solid grey",
                color: "rgba(0, 0, 0, 0.7)",
              }}
            />

            {/* Error Message */}
            {error && (
              <p style={{ color: "red", fontSize: "14px", margin: "0 auto" }}>
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "rgba(255,255,255)",
                color: "black",
                border: "none",
                borderRadius: "50px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Create Account
            </button>
          </form>
        {/*</div>*/}
      </div>
    </div>
  );
};

export default CreateAccountPage;
