"use client";
import { useState } from "react";
import { useRouter } from "next/router";

const FirstNameInput = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");

  const handleNext = () => {
    // Pass the value of the input to the next page via query params or router.push
    router.push({
      pathname: "/create-account/lastName",
      query: { firstName },
    });
  };

  return (
    <div>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default FirstNameInput;
