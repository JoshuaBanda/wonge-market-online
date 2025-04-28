// context/UserContext.js
"use client";
import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [person, setPerson] = useState({
    access_token: "",
    userid: 0,
    firstname: "",
    lastname: "",
    email: "",
  });
//console.log("hi",person.firstname);
  return (
    <UserContext.Provider value={{ person, setPerson }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
