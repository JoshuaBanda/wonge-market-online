import { Geist, Geist_Mono } from "next/font/google";
import "../Styles/globals.css";
import BottomMenuWrapper from "./global/BottomMenuWrapper";
import {Pirata_One,Amaranth} from "next/font/google";


export const metadata = {
  title: "Wonge Market Online",
  description: "Online Market",
};

const roboto= Amaranth({
  subsets:['latin'],
  weight:'400',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className }>
        <div  className="blur-wrapper">
          
        {children}
        

        </div>
        <BottomMenuWrapper/>
      </body>
    </html>
  );
}
