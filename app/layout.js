import "./globals.css";
import BottomMenuWrapper from "@/components/BottomMenuWrapper";
import FadedColor from "@/components/FadedColor";
import { ToastProvider } from "@/components/ToastProvider";
import { UserProvider } from "./userContext";

// Fonts
import {
  Felipa,
  Bonheur_Royale,
  Niconne,Gudea,Poppins
} from "next/font/google";
import Analytics from "./analytics/page";
import Script from "next/script";


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
);
const poppins=Poppins({
  subsets:['latin'],
  weight:'400',
  variable:'--font-poppins'
});
export const metadata = {
  title: "Wonge Market Online",
  description: "Online Market",
};


export default function RootLayout({ children }) {
  const GA_ID = 'G-TVXW0YJ4QY'; // Replace with your actual GA4 ID

  return (
    <html
      lang="en"
      className={` ${beauRivage.variable} ${bonheurRoyale.variable} ${niconne.variable} ${gudea.variable} ${poppins.variable}`}
    >
      <head>
        
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        <UserProvider>
        <Analytics/>
          <div className="blur-wrapper">{children}
          
          </div>
          <BottomMenuWrapper />
        </UserProvider>
        <ToastProvider />
       {/* <FadedColor />*/}
      </body>
    </html>
  );
}
