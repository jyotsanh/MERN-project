import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editProduct, FetchProducts } from '../../service/api';

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
        <form onSubmit={handleSubmit}>
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
                <input type="text" name="category" value={product.category} onChange={handleChange} />
            </label>
            <label>
                Quantity:
                <input type="number" name="quantity" value={product.quantity} onChange={handleChange} />
            </label>
            <button type="submit">Update Product</button>
        </form>
    );
}

export default EditProduct;
