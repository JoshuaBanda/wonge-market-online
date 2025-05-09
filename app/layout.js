import "./globals.css";
import BottomMenuWrapper from "@/components/BottomMenuWrapper";
import FadedColor from "@/components/FadedColor";
import { ToastProvider } from "@/components/ToastProvider";
import { UserProvider } from "./userContext";

// Fonts
import {
  Felipa,
  Bonheur_Royale,
  Niconne,Gudea
} from "next/font/google";


const beauRivage = Felipa({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-beauRivage',
});

const bonheurRoyale = Niconne({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bonheurRoyale', // fixed
});

const niconne=Niconne({
  subsets:['latin'],
  weight:'400',
  variable:'--font-niccone'
})
const gudea=Gudea(
  {
    subsets:['latin'],
    weight:'400',
    variable:'--font-gudea'
  }
)
export const metadata = {
  title: "Wonge Market Online",
  description: "Online Market",
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` ${beauRivage.variable} ${bonheurRoyale.variable} ${niconne.variable} ${gudea.variable}`}
    >
      <body>
        <UserProvider>
          <div className="blur-wrapper">{children}</div>
          <BottomMenuWrapper />
        </UserProvider>
        <ToastProvider />
        <FadedColor />
      </body>
    </html>
  );
}
