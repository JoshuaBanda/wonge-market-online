"use client";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaSeedling } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import router for navigation
import styles from "../Styles/decoratedBorder.module.css";
import { useUser } from "../userContext";
//users/otp/send

const SignUpPage = () => {
  
  const {person,setPerson}=useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("female");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(""); // For form-wide errors
  const router = useRouter(); // Initialize router

  const [showClass, setShowClass] = useState(false);
  /*setTimeout(()=>{
    setShowClass(!showClass);
  },6000)*/
  const [verifyOtpOption,setVerifyOtpOption]=useState(true);
  const [isEmailVerified,setIsEmailVerified]=useState(false);
  const [otp,setOtp]=useState("");
  const steps = [
    { label: "Email", value: email, setValue: setEmail, type: "email", placeholder: "Email" },
    { label: "Password", value: password, setValue: setPassword, type: "password", placeholder: "Password" },
    { label: "First Name", value: firstName, setValue: setFirstName, type: "text", placeholder: "First Name" },
    { label: "Last Name", value: lastName, setValue: setLastName, type: "text", placeholder: "Last Name" },
    { label: "Phone Number", value: phone, setValue: setPhone, type: "tel", placeholder: "Phone Number" },
    { label: "Sex", value: sex, setValue: setSex, type: "select", placeholder: "Sex" },
    { label: "Date of Birth", value: dateOfBirth, setValue: setDateOfBirth, type: "date", placeholder: "Date of Birth" },
    { label: "Profile Picture", value: profilePicture, setValue: setProfilePicture, type: "file", placeholder: "Profile Picture" },
  ];

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "email":
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          error = "Invalid email address";
        }
        break;
      case "password":
        if (value.length < 8) {
          error = "Password must be at least 8 characters";
        }
        break;
      case "phone":
        if (!value.match(/^\d{10}$/)) {
          error = "Invalid phone number";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleNext = () => {
    const currentField = steps[currentStep].label.toLowerCase().replace(" ", "");
    const error = validateField(currentField, steps[currentStep].value);
    if (error) {
      setErrors({ ...errors, [currentField]: error });
    } else if (steps[currentStep].value) {
      setErrors({ ...errors, [currentField]: "" });
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setErrors({ ...errors, [currentField]: "This field is required" });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const sendOtpVerification=async()=>{
    console.log("sending for otp",email);
    
    if (!firstName || !lastName || !phone || !dateOfBirth || !profilePicture) {
      setFormError("Please fill out all fields and select a profile picture.");
      return;
    }
    
    try {
      const response = await axios.post(
        "https://wonge-backend.onrender.com/users/otp/send",
        { email }, // Must be an object with the key 'email'
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
    
      if (response.status === 200 || response.status === 201) {
        console.log('OTP sent successfully');
        setVerifyOtpOption(!verifyOtpOption);
      } else {
        console.log("Email not verified");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data || error.message);
    }
    
  }
  const handleOtpVerification=async(e)=>{
    e.preventDefault();
    console.log('verifying otp');
    
    if (!firstName || !lastName || !phone || !dateOfBirth || !profilePicture) {
      console.log("***");
      setFormError("Please fill out all fields and select a profile picture.");
      return;
    }
    try{
      const formData=new FormData();
      formData.append("otp",otp);
      
      const response = await axios.post(
        "https://wonge-backend.onrender.com/users/otp/verify",
        { email,otp},
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      if(response.status==200||201){
        console.log('successifuly verified email',response);
        handleSubmitAfterOtp();
      }else{
        console.log("email not verified");
      }
    }
    catch(error){
      console.error("error verifying otp",error);
    }
  }
  const handleSubmitAfterOtp = async (e) => {
    if(e){e.preventDefault();}
    console.log('submitting')
    // Validate all fields before submission
    const newErrors = {};
    steps.forEach((step) => {
      const field = step.label.toLowerCase().replace(" ", "");
      const error = validateField(field, step.value);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!firstName || !lastName || !phone || !dateOfBirth || !profilePicture) {
      setFormError("Please fill out all fields and select a profile picture.");
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
      formData.append("file", profilePicture); // Append the profile picture file

      // Send the complete data to the backend
      const response = await axios.post("https://wonge-backend.onrender.com/users/create-user", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      // If the request is successful
      console.log("Account created successfully");
      setPerson({
        ...person,
        firstname: result.user.firstname,
        lastname: result.user.lastname,
        email: result.user.email,
        userid: result.user.userid,
        access_token: result.result.access_token, // adjust if it's result.user.accessTocken
      });
      router.push("/home"); // Redirect to the home page
    } catch (error) {
      // Handle error
      console.error("Error creating user:", error.message);
      setFormError(error.message); // Set the error message to display in UI
    }
  };
  useEffect(()=>{
    console.log("verify",verifyOtpOption);
  },[verifyOtpOption])
  return (
    <>
      {verifyOtpOption?(
        
    <div 
    style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      height:"450px"
    }}
        className={showClass ? styles.containR : ''}
    >
    {/* Title text */}
                <p
                  style={{
                    fontSize: "25px",
                    marginBottom: "10px",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  WONGE MARKET ONLINE
                </p>
                <div>
                    
                <FaSeedling size={60} />
                </div> 
      <form onSubmit={handleSubmitAfterOtp} style={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", }}>
        {steps.map((step, index) => (
          <div key={step.label} style={{ display: currentStep === index ? "block" : "none" }}>
            <label>{step.label}</label>
            {step.type === "select" ? (
              <select
                value={step.value}
                onChange={(e) => step.setValue(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : step.type === "file" ? (
              <input
                type="file"
                onChange={(e) => step.setValue(e.target.files[0])}
                style={{ width: "100%", padding: "10px" ,borderRadius:'20px'}}
              />
            ) : (
              <div style={{ position: "relative" }}>
                <input
                  type={step.type === "password" && !showPassword ? "password" : step.type}
                  value={step.value}
                  onChange={(e) => step.setValue(e.target.value)}
                  placeholder={step.placeholder}
                  style={{ width: "200px", padding: "10px", borderRadius: "20px", border: "1px solid #ccc" }}
                />
                {step.type === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      background: "none",
                      border: "none",
                      color: "gray",
                      cursor: "pointer",
                      width:'120px'
                    }}
                  >
                    {showPassword ? <FaEyeSlash size={20} style={{position:'relative',top:'-10px',right:'-40px',color:"red"}}/> : <FaEye size={20} style={{position:'relative',top:'-10px',right:'-40px'}} />}
                  </button>
                )}
              </div>
            )}
            {errors[step.label.toLowerCase().replace(" ", "")] && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {errors[step.label.toLowerCase().replace(" ", "")]}
              </p>
            )}
          </div>
        ))}

        {formError && (
          <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>
            {formError}
          </p>
        )}

        {(currentStep === steps.length - 1 && isEmailVerified) ? (
          <button
            style={{
              all: 'unset', // resets most styles
              cursor: 'pointer', // optional: brings back pointer cursor
              display: 'inline-block', 
            }}
            type="submit"
          >
            Submit
          </button>
        ) : null}
        {(currentStep === steps.length - 1 && !isEmailVerified) ? (
          <motion.button
            type="button"
              onClick={()=>{
                setErrors({});
                setFormError("");
                sendOtpVerification()}}
              
            style={{
              all: 'unset', // resets most styles
              cursor: 'pointer', // optional: brings back pointer cursor
              display: 'inline-block', 
              marginTop:"20px"
            }}
              >
              

              <div className={showClass?styles.cardTw:styles.cardT}>
                Confirm Email
              </div>
            </motion.button>
        ) : null}

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px",padding:"20px" }}>
          {currentStep > 0 && (
            <motion.button
            type="button"
              onClick={handlePrev}
              
            style={{
              all: 'unset', // resets most styles
              cursor: 'pointer', // optional: brings back pointer cursor
              display: 'inline-block', 
              margin:"0px 20px"
            }}
              >
              

              <div className={showClass?styles.cardTw:styles.cards}>
                Prev
              </div>
            </motion.button>
            
          )}
          {currentStep < steps.length - 1 && (
            <motion.button
              onClick={handleNext}
              type="button"
                
              style={{
                all: 'unset', // resets most styles
                cursor: 'pointer', // optional: brings back pointer cursor
                display: 'inline-block', 
              }}
              >
              
              <div className={showClass?styles.cardTw:styles.cards}>
                Next
              </div>
            </motion.button>
            
          )}
        </div>
      </form>
    </div>
      ):(
        <div  
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          height:"450px",
          color:"white"
        }}>
          <div>
            <h3 style={{
              margin:"20px"
            }}>
              Email Verification
            </h3>
            <p>We have sent an email to</p>
            <p style={{
              color:'rgb(2, 182, 236)'
            }}>{email}</p>
            <span style={{fontWeight:"normal"}}>OTP expires in 10 minutes</span>
          </div>
          <form onSubmit={()=>{handleOtpVerification(e)}} style={{color:"white"}}> 
              <input  label="OTP" placeholder="Enter OTP" type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} 
                style={{width:"200px",height:"30px",backgroundColor:"rgba(73, 73, 73, 0.5)",border:"1px solid white",
                borderRadius:"20px",padding:"20px 5px",fontSize:"20px",color:"white",margin:"20px"
                }}
              />
              <div>
                
              <motion.button
              type="button"
                onClick={handleOtpVerification}
              style={{
                all: 'unset', // resets most styles
                cursor: 'pointer', // optional: brings back pointer cursor
                display: 'inline-block', 
              }}
              >
              
              <div className={showClass?styles.cardTw:styles.cards}>
                Confirm
              </div>
            </motion.button>
              <motion.button
              type="button"
              onClick={()=>{
                console.log('deleting otp');
                setOtp("");
                setErrors({});
                setFormError("");
                setVerifyOtpOption(!verifyOtpOption)}}
                
              style={{
                all: 'unset', // resets most styles
                cursor: 'pointer', // optional: brings back pointer cursor
                display: 'inline-block',
                margin:"20px" 
              }}
              >
              
              <div className={showClass?styles.cardTw:styles.cards}>
                Resend
              </div>
            </motion.button>
              </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpPage;