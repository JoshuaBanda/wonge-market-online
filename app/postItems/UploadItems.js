"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../userContext';

const UploadItems = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [items, setItems] = useState([]);
  const [typeOfProduct, setTypeOfProduct] = useState('');
  const [price, setPrice] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [quantity,setQuantity]=useState('');



  const {person}=useUser();
    
  const [user,setUser]=useState(person)      
  useEffect(()=>{
    //console.log("updatting");
    setUser(person);
  //  console.log('user',user,"person",person);
  },[person]);
  const handleFileChange = (event) => {


    
    const selectedFile = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add allowed file types

    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      setSubmitError('Please upload a valid image file (JPG, PNG, GIF).');
    } else {
      setFile(selectedFile);
      setSubmitError(null); // Reset error message if file is valid
    }
  };

  const handleTypeChange = (event) => setTypeOfProduct(event.target.value);
  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) setPrice(value);
  };
  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) setQuantity(value);
  };
  const handleWhatsappMessageChange = (event) => setWhatsappMessage(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return setSubmitError('Please enter the name of the product.');
    if (!description) return setSubmitError('Please enter a description.');
    if (!file) return setSubmitError('Please upload a photo.');
    if (!price) return setSubmitError('Please enter a valid price.');

    setUploading(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('type', typeOfProduct);
    formData.append('quantity',quantity);
    formData.append('price', price);
    formData.append('whatsappmessage', whatsappMessage);
    formData.append('user_id', user.userid); // Assuming user ID is static for now
    try {
      const response = await axios.post('https://wonge-backend-k569.onrender.com/inventory/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);
      resetForm();
    } catch (error) {
      setSubmitError(error.message);
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setFile(null);
    setTypeOfProduct('');
    setPrice('');
    setWhatsappMessage('');
    setQuantity('')
  };

  useEffect(() => {
  }, []
);

  if (loading) {
    return <p>Loading items...</p>;
  }

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Upload New Item</h2>
        <div style={formGroupStyle}>
          <label htmlFor="name" style={labelStyle}>Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            placeholder='Enter name of Product'
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="description" style={labelStyle}>Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
            
            placeholder='Enter Description of the Product'
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="photo" style={labelStyle}>Upload Photo:</label>
          <input type="file" id="photo" onChange={handleFileChange} style={fileInputStyle} />
          {file && (
            <div>
              <h4>Preview:</h4>
              <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '200px', height: 'auto' }} />
            </div>
          )}
          {uploading && <p style={statusStyle}>Uploading...</p>}
          {submitError && <p style={errorStyle}>Error: {submitError}</p>}
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="price" style={labelStyle}>Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
            placeholder="Enter price"
            style={inputStyle}
          />
        </div>
        
        <div style={formGroupStyle}>
          <label htmlFor="Quantity" style={labelStyle}>Quantity:</label>
          <input
            type="text"
            id="Quantity"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Enter Quantity"
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="whatsappMessage" style={labelStyle}>Whatsapp Message:</label>
          <input
            type="text"
            id="whatsappMessage"
            value={whatsappMessage}
            onChange={handleWhatsappMessageChange}
            placeholder="Enter Whatsapp message"
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Type:</label>
          <div style={radioGroupStyle}>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="type"
                value="Avon product"
                checked={typeOfProduct === 'Avon product'}
                onChange={handleTypeChange}
              />
              Avon
            </label>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="type"
                value="Earrings"
                checked={typeOfProduct === 'Earrings'}
                onChange={handleTypeChange}
              />
              Earrings
            </label>
            
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="type"
                value="Brochus"
                checked={typeOfProduct === 'Brochus'}
                onChange={handleTypeChange}
              />
              Brochus
            </label>
            
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="type"
                value="Perfume"
                checked={typeOfProduct === 'Perfume'}
                onChange={handleTypeChange}
              />
              Perfume
            </label>
          </div>
        </div>
        <button type="submit" disabled={uploading} style={submitButtonStyle} id='customizedbackground'>
          {uploading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

    </div>
  );
};

// Styles
const containerStyle = {
  //maxWidth: '600px',
  //marginTop:"10px",
  padding: '20px',
  borderRadius: '20px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
  marging:"0 auto",
  display:"flex",
};

const formStyle = {
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
  margin:"0 auto",
  width:"500px"

};

const headingStyle = {
  textAlign: 'center',
};

const formGroupStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  backgroundColor:"rgba(255,255,255,0.2)",
  color:"white",
};

const fileInputStyle = {
  padding: '10px',
};

const radioGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const radioLabelStyle = {
  marginBottom: '5px',
};

const submitButtonStyle = {
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '100%',
  fontSize: '16px',
  marginTop: '10px',
  transition: 'background-color 0.3s',
};

const submitButtonHoverStyle = {
  backgroundColor: '#45a049',
};

const statusStyle = {
  color: 'blue',
};

const errorStyle = {
  color: 'red',
};

export default UploadItems;
