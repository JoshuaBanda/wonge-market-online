import { Geist, Geist_Mono } from "next/font/google";
import "../Styles/globals.css";
import BottomMenuWrapper from "./global/BottomMenuWrapper";
import { Roboto , Meow_Script,Lavishly_Yours,Lobster} from "next/font/google";


export const metadata = {
  title: "Wonge Market Online",
  description: "Online Market",
};

const roboto= Lobster({
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
