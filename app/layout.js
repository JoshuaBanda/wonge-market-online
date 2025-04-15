import { Geist, Geist_Mono } from "next/font/google";
import "../Styles/globals.css";
import BottomMenu from "./global/bottomMenu";
import BottomMenuWrapper from "./global/BottomMenuWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wonge Market Online",
  description: "Online Market",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div  className="blur-wrapper">
          
        {children}
        

        </div>
        <BottomMenuWrapper/>
      </body>
    </html>
  );
}
