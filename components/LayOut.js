import BottomMenuWrapper from "./BottomMenuWrapper";

const LayOut = ({children}) => {
    return ( 
        <html>
                
            <body>
            {children}
            <BottomMenuWrapper/>
            </body>
        </html> 
    );
}
 
export default LayOut;