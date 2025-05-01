import EditProducts from "./EditProducts";
import UploadItems from "./UploadItems";


const ManageInventory = () => {
    return (
        <>
            <div style={{
                position:"relative",
                marginTop:"10px",
                marginBottom:"100px",
            }}>
            <UploadItems/>
            <EditProducts/>

            </div>
        </>
    );
}
 
export default ManageInventory;