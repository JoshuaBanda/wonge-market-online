"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "../home/Spinning";
import { useUser } from "../userContext";

const EditProducts = () => {
    const [shopItems, setShopItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');
    const [editForm, setEditForm] = useState({ name: '', price: '', description: '', quantity: '' });

      const {person}=useUser();
        
      const [user,setUser]=useState(person)      
      useEffect(()=>{
        //console.log("updatting");
        setUser(person);
      //  console.log('user',user,"person",person);
      },[person]);

    useEffect(() => {

        
        const fetchShop = async () => {
            if (user) {
                const userId = user.userid; // or however your user object is structured
              
                try {
                  const response = await axios.get('https://wonge-backend-k569.onrender.com/inventory', {
                    headers: {
                      Authorization: `Bearer ${user.access_token}`, // this is enough!
                    },
                  });
                  
                  setShopItems(response.data);
                  setLoading(false);
                } catch (error) {
                  setError('Failed to fetch data, try again later...');
                  console.error("Error fetching data", error);
                }
              }
            }              
        fetchShop();
    }, [user]);

    const handleDelete = async (itemId, publicId) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        setDeletingId(itemId);
        try {
            await axios.delete(`https://wonge-backend-k569.onrender.com/inventory/${itemId}`);
            setShopItems(prevItems => prevItems.filter(item => item.id !== itemId));
            setMessage("Item deleted successfully.");
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to delete item.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleEditClick = (item) => {
        console.log("item",item);
        setEditingId(item.id);
        setEditForm({
            name: item.name,
            price: item.price.toString(),
            description: item.description,
            quantity: item.quantity?.toString() || ''
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;

        setEditForm(prevForm => ({
            ...prevForm,
            [name]: name === 'price' || name === 'quantity'
                ? (/^\d*\.?\d*$/.test(value) ? value : prevForm[name])
                : value,
        }));
    };

    const handleEditSubmit = async (itemId) => {
        const parsedPrice = parseFloat(editForm.price);
        const parsedQuantity = parseInt(editForm.quantity);

        if (isNaN(parsedPrice) || parsedPrice <= 0 || isNaN(parsedQuantity) || parsedQuantity < 0) {
            setMessage("Price and Quantity must be valid non-negative numbers.");
            return;
        }

        try {
            const updatedItem = {
                name: editForm.name,
                price: parsedPrice,
                description: editForm.description,
                quantity: parsedQuantity
            };

            setShopItems(prevItems => 
                prevItems.map(item => item.id === itemId ? { ...item, ...updatedItem } : item)
            );

            await axios.patch(`https://wonge-backend-k569.onrender.com/inventory/${itemId}/description`, updatedItem);
            setMessage("Item updated successfully.");
        } catch (error) {
            console.error("Update failed:", error);
            setMessage("Failed to update item.");
        } finally {
            setEditingId(null);
        }
    };

    if (loading) return <Spinner />;
    if (error) return <p>{error}</p>;

    return (
        <div style={containerStyle}>
            {message && <p style={messageStyle}>{message}</p>}
            <div style={itemsContainerStyle}>
                {shopItems.map((item) => (
                    <div key={item.id} style={itemStyle}>
                        <div style={imageContainerStyle}>
                            {item.photo_url ? (
                                <Image
                                    src={item.photo_url}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                    style={imageStyle}
                                    priority
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                        <div style={infoContainerStyle}>
                            <div>
                                {editingId === item.id ? (
                                    <>
                                    <label htmlFor="productName">Product Name</label>
                                    <input
                                        id="productName"
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleEditChange}
                                        placeholder="Product Name"
                                        style={inputStyle}
                                    />
</>
                                ) : (
                                    <h3 style={titleStyle}>
                                        {item.name} <span style={idStyle}>[ID: {item.id}]</span>
                                    </h3>
                                )}
                            </div>
                            <div>
                                {editingId === item.id ? (
                                    <>
                                    <label htmlFor="price">Product Price</label> 
                                    <input
                                        type="number"
                                        name="price"
                                        value={editForm.price}
                                        onChange={handleEditChange}
                                        placeholder="Price"
                                        style={inputStyle}
                                    />

                                    </>
                                ) : (
                                    <p style={priceStyle}>MK{item.price}</p>
                                )}
                            </div>
                            <div>
                                {editingId === item.id ? (
                                    <>
                                    <label htmlFor="Quantity">Product Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={editForm.quantity}
                                        onChange={handleEditChange}
                                        placeholder="Quantity"
                                        style={inputStyle}
                                    /></>
                                ) : (
                                    <p style={priceStyle}>Qty: {item.quantity}</p>
                                )}
                            </div>
                            <div>
                                {editingId === item.id ? (
                                    <>
                                    <label htmlFor="Description">Product Description</label>
                                    
                                    <textarea
                                        name="description"
                                        value={editForm.description}
                                        onChange={handleEditChange}
                                        placeholder="Description"
                                        style={textareaStyle}
                                    /></>
                                ) : (
                                    <p style={descriptionStyle}>{item.description}</p>
                                )}
                            </div>
                            <div>
                                {editingId === item.id ? (
                                    <>
                                        <button onClick={() => handleEditSubmit(item.id)} style={buttonStyle(false)}>Save</button>
                                        <button onClick={() => setEditingId(null)} style={buttonStyle(false)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditClick(item)} style={buttonStyle(false)}>Edit</button>
                                        <button
                                            style={buttonStyle(deletingId === item.id)}
                                            onClick={() => handleDelete(item.id, item.publicId)}
                                            disabled={deletingId === item.id}
                                        >
                                            {deletingId === item.id ? "Deleting..." : "Delete"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginBottom: "120px" }}></div>
        </div>
    );
};

// Styles
const containerStyle = {
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "0 auto",
    marginTop: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

const messageStyle = {
    color: "green",
    fontWeight: "bold",
    marginBottom: "10px",
};

const itemsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginTop: '20px',
    color: "black"
};

const itemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottom: '1px solid #ccc',
    padding: '10px',
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(219, 219, 219, 0.7)",
    margin:"0 auto",
    with:"200px",
    maxWidth:"200px",
    border:"1px solid black",
    borderRadius:"10px"

};

const imageContainerStyle = {
    marginRight: '15px',
};

const infoContainerStyle = {
    flex: 1,
};

const imageStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '5px',
};

const titleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

const idStyle = {
    fontSize: "0.8em",
    fontWeight: "normal",
};

const priceStyle = {
    fontWeight: 'bold',
};

const descriptionStyle = {};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const textareaStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'none',
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const buttonStyle = (isDeleting) => ({
    backgroundColor: isDeleting ? "#d9534f" : "#5cb85c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: isDeleting ? "not-allowed" : "pointer",
    margin: "0 5px",
});

export default EditProducts;
