import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editProduct, FetchProducts } from '../../service/api';
import './edit-product.css'; 

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
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
        e.preventDefault();
        await editProduct(id, product);
        navigate('/admin-view');
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
            </form>
        </div>
    );
}

export default EditProduct;
