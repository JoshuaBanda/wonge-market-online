import { Geist, Geist_Mono } from "next/font/google";
import "../Styles/globals.css";
import BottomMenuWrapper from "./global/BottomMenuWrapper";
import {Pirata_One} from "next/font/google";


export const metadata = {
  title: "Wonge Market Online",
  description: "Online Market",
};

const roboto= Pirata_One({
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
