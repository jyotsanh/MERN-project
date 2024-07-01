import { useState } from "react";
import {UploadProducts} from "../../service/api";
import './products.css'

import { NavLink } from 'react-router-dom';



function AddProducts(){

        const [message, setMessage] = useState('');
        const [name, setName] = useState('');
        const [price, setPrice] = useState('');
        const [image, setImage] = useState(null);
        const [description, setDescription] = useState('');
        const [category, setCategory] = useState('');
        const [quantity, setQuantity] = useState('');
        const [error,SetError] = useState({});


        const handleSubmit = async (e) => {
        e.preventDefault();
        SetError({});
        

        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('quantity', quantity);
        formData.append('image', image);
        console.log("------------------error------------------------");
        console.log(formData)

          try {
            const response = await UploadProducts(formData);
            console.log(response);
            SetError('')
            setMessage(response.data.msg)
            
            setName("");
            setPrice("");
            setImage('');
            setDescription("");
            setCategory("");
            setQuantity("");
            
          } catch (error) {
            console.log("------------------------------------error------");
            setMessage('');
            console.log(error.response);
            const {name,price, description,category,quantity} = error.response.data
            SetError({ name: name, price: price, description: description,category:category,quantity:quantity });
          }


        }

    return(
        <div className="pro-upload-product-container">
            <h1>Upload Product</h1>
            <form onSubmit={handleSubmit}>

            <div className="pro-form-group">
            <label htmlFor="name">Product Name:</label>
            <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            required 
            />
            {error.name && <p className="error-text">{error.name}</p>}
        </div>

            <div className="pro-form-group">
                <label htmlFor="name">Description:</label>
                <input 
                type="text" 
                id="name" 
                value={description} 
                onChange={(e)=>setDescription(e.target.value)} 
                required 
                />
                {error.description && <p className="error-text">{error.description}</p>}
            </div>

            <div className="pro-form-group">
            <label htmlFor="price">Product Price:</label>
            <input 
            type="number" 
            id="price" 
            value={price} 
            onChange={(e)=>setPrice(e.target.value)} 
            required 
            />
             {error.price && <p className="error-text">{error.price}</p>}
            </div>

            <div className="pro-form-group">
            <label htmlFor="name">Category : </label>
            <input 
            type="text" 
            id="name" 
            value={category} 
            onChange={(e)=>setCategory(e.target.value)} 
            required 
            />
             {error.category && <p className="error-text">{error.category}</p>}
            </div>
            
            <div className="pro-form-group">
            <label htmlFor="name">Quantity : </label>
            <input 
            type="number" 
            id="name" 
            value={quantity} 
            onChange={(e)=>{setQuantity(e.target.value)}} 
            required 
            />
        {error.quantity && <p className="error-text">{error.quantity}</p>}
            </div>

            <div className="pro-form-group">
                <label htmlFor="image">Product Image:</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])} // Correctly set the image file
                    required
                />
            </div>

        <button type="submit">Upload</button>
        </form>
        
        {message && <p> {message} </p>}
        {error && <p> {error.msg} </p>}
        <div>
            <NavLink to="/admin">
                <button>Back to Admin</button>
            </NavLink>
        </div>
    </div>
    );
}

export default AddProducts;