import Header from "./Header";
import HomePage from "./Home";
import '../../Styles/globals.css'


import {Pirata_One,Amaranth} from "next/font/google";


export const metadata = {
  title: "Wonge Market Online",
  description: "Online Market",
};

const roboto= Amaranth({
  subsets:['latin'],
  weight:'400',
});
const FrontPage = () => {
    return (
      <html lang="en">
        <body className={roboto.className }>
          <div  className="blur-wrapper">
            
          <Header/>
          <HomePage/>
          
  
          </div>
          
        </body>
      </html>
    );
}
 
export default FrontPage;