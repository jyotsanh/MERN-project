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
        imageUrl: ''
    });

    useEffect(() => {
        
        const fetchProduct = async () => {
            const productsData = await FetchProducts();
            const productToEdit = productsData.Product.find(p => p._id === id);
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
            const response = await editProduct(id, product,token);
            navigate('/admin-view');
        }catch(error){
            console.log(error.response);
            SetError({
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
                <label>
                    Category:
                    <select name="category" value={product.category} onChange={handleChange}>
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
                </label>
                <label>
                    Quantity:
                    <input type="number" name="quantity" value={product.quantity} onChange={handleChange} />
                </label>
                <button type="submit">Update Product</button>
                {Error.msg && <p> {Error.msg} </p>}
            </form>
        </div>
    );
}

export default EditProduct;
