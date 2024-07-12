import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editProduct, FetchProducts } from '../../service/api';
import './edit-product.css'; 
import Cookies from 'js-cookie';


function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Error,SetError] = useState({});
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        quantity: '',
        frame_material: '',
        lens_material: '',
        frame_shape: '',
        imageUrl: ''
    });

    useEffect(() => {
        
        const fetchProduct = async () => {
            const productsData = await FetchProducts();
            const productToEdit = productsData.Product.find(p => p._id == id);
            setProduct(productToEdit);
            
        };
        fetchProduct();
       
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        const token = Cookies.get('token');
        e.preventDefault();
        try{
            console.log(`Products data ${product.category}`)
            const response = await editProduct(id, product,token);
            navigate('/admin-view');
        }catch(error){
            console.log(error.response);
            const {name,price, description,category,quantity,frame_material,lens_material,frame_shape} = error.response.data

            SetError({
                name: name, 
                price: price, 
                description: description,
                category:category,
                quantity:quantity,
                frame_material:frame_material,
                lens_material:lens_material,
                frame_shape:frame_shape,
                msg: error.response.data.msg
            })
        }
        
    };

    return (
        <div className="edit-product-container">
            <form onSubmit={handleSubmit} className="edit-product-form">
                <label>
                    Name:
                    <input type="text" name="name" value={product.name} onChange={handleChange} />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={product.price} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={product.description} onChange={handleChange} />
                </label>
                <label htmlFor="frame-material">Frame Material: </label>
                    <select
                        id="frame-material"
                        name='frame_material'
                        value={product.frame_material}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Frame Category</option>
                        <option value="Aluminium">Aluminium</option>
                        <option value="Titanium">Titanium</option>
                        <option value="Stainless Steel">Stainless Steel</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Carbon Fiber">Carbon Fiber</option>
                        <option value="Wood">Wood</option>
                        <option value="Leather">Leather</option>
                        <option value="TR-90">TR-90</option>
                    </select>
                    {Error.frame_material && <p className="error-text">{Error.frame_material}</p>}
                <label htmlFor="frame-shape">Frame Shape: </label>
                    <select
                        name='frame_shape'
                        id="frame-shape"
                        value={product.frame_shape}
                        onChange={handleChange}
                        required
                    >
                    <option value="">Select a Frame Shape</option>
                    <option value="Rectangular">Rectangular</option>
                    <option value="Round">Round</option>
                    <option value="Square">Square</option>
                    <option value="Oval">Oval</option>
                    <option value="Cat-Eye">Cat-Eye</option>
                    <option value="Aviator">Aviator</option>
                    <option value="Browline/Clubmaster">Browline/Clubmaster</option>
                    <option value="Wayfarer">Wayfarer</option>
                    <option value="Oversized">Oversized</option>
                    <option value="Geometric">Geometric</option>
                    <option value="Rimless">Rimless</option>
                    </select>
                    {Error.frame_shape && <p className="error-text">{Error.frame_shape}</p>}
                <label htmlFor="lens-material">Lens Material: </label>
                    <select
                        id="lens-material"
                        value={product.lens_material}
                        onChange={handleChange}
                        name='lens_material'
                        required
                    >
                    <option value="">Select a Lens Material</option>
                    <option value="Polycarbonate">Polycarbonate</option>
                    <option value="Glass">Glass</option>
                    <option value="Plastic">Plastic</option>
                    </select>
                    {Error.lens_material && <p className="error-text">{Error.lens_material}</p>}
                <label htmlFor="Category">Category:</label>
                <select 
                    name="category" 
                    value={product.category} 
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a category</option>
                    <option value="prescription">Prescription</option>
                    <option value="reading">Reading</option>
                    <option value="blue-light">Blue Light</option>
                    <option value="progressive">Progressive</option>
                    <option value="sunglasses">Sunglasses</option>
                    <option value="bifocal">Bifocal</option>
                    <option value="sports">Sports</option>
                    <option value="fashion">Fashion</option>
                    </select>
                    {Error.category && <p className="error-text">{Error.category}</p>}
                <label>
                    Quantity:
                    <input type="number" name="quantity" value={product.quantity} onChange={handleChange} />
                </label>
                {Error.quantity && <p className="error-text">{Error.quantity}</p>}
                <button type="submit">Update Product</button>
                {Error.msg && <p> {Error.msg} </p>}
            </form>
        </div>
    );
}

export default EditProduct;
