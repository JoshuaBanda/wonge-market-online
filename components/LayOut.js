
import Footer from "./Footer";
import Navbar from "./Navbar";

const LayOut = ({children}) => {
    return (  
        <>
        <Navbar/>
        {children}


        hi
        <Footer/>
        </>
    );
}
 
export default LayOut;