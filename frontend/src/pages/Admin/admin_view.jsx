import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FetchProducts, deleteProduct } from '../../service/api';
import './admin_view.css';

function Admin_View() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await FetchProducts();
                console.log("productsData", productsData);
                const { Product } = productsData;
                setProducts(Product);
            } catch (error) {
                setProducts([]);
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-product/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="admin-view-container">
            <h1 className="admin-title">Admin View</h1>
            <NavLink to="/admin">
                <button className="back-button">Back to Admin</button>
            </NavLink>

            <div className="product-list">
                {products.length === 0 ? (
                    <p>No products available</p>
                ) : (
                    products.map(product => (
                        <div className="product-card" key={product._id}>
                            <img src={`${product.imageUrl}`} alt={product.name} className="product-image" />
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">Price: {product.price}</p>
                            <p className="product-description">Description: {product.description}</p>
                            <p className="product-category">Category: {product.category}</p>
                            <p className="product-quantity">Quantity: {product.quantity}</p>
                            <div className="product-actions">
                                <button className="edit-button" onClick={() => handleEdit(product._id)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(product._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Admin_View;
