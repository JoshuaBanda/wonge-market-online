"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [person, setPersonState] = useState({
    access_token: "",
    userid: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  // ✅ Only access localStorage in useEffect
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setPersonState(parsedUser);
      //console.log("retrieving person", parsedUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(person));
   // console.log("storing person", person);
  }, [person]);

  const setPerson = (data) => {
    setPersonState(data);
  };

  return (
    <UserContext.Provider value={{ person, setPerson }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
