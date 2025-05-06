import BottomMenuWrapper from "@/components/BottomMenuWrapper";
import "./globals.css"
import { Amaranth, Lovers_Quarrel,Beau_Rivage,Felipa,Benne, Habibi, Lato, Roboto, Open_Sans, PT_Sans, Merriweather } from "next/font/google";
import { UserProvider } from "./userContext";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata = {
  title: "Wonge Market Online",
  description: "Online Market",
};

const amarath = Merriweather({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-amarath',
});

const loversQuarrel = Lovers_Quarrel({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lovers',
});
const beauRivage=Felipa({
  subsets:['latin'],
  weight:'400',
  variable:'--font-beauRivage',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${amarath.variable} ${loversQuarrel.variable} ${beauRivage.variable}`}>
      <body>
      <UserProvider>
        <div className="blur-wrapper">
          {children}
        </div>
        <BottomMenuWrapper/>
      </UserProvider>
      <ToastProvider/>
      </body>
    </html>
  );
}