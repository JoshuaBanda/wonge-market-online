import BottomMenuWrapper from "@/components/BottomMenuWrapper";
import "./globals.css"
import { Amaranth, Lovers_Quarrel,Beau_Rivage } from "next/font/google";

export const metadata = {
  title: "Wonge Market Online",
  description: "Online Market",
};

const amarath = Amaranth({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-amarath',
});

const loversQuarrel = Lovers_Quarrel({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lovers',
});
const beauRivage=Beau_Rivage({
  subsets:['latin'],
  weight:'400',
  variable:'--font-beauRivage',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${amarath.variable} ${loversQuarrel.variable} ${beauRivage.variable}`}>
      <body>
        <div className="blur-wrapper">
          {children}
        </div>
        <BottomMenuWrapper/>
      </body>
    </html>
  );
}