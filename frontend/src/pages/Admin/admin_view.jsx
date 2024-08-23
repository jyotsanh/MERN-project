import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FetchProducts, deleteProduct } from '../../service/api';
import './admin_view.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

function Admin_View() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const [Error, SetError] = useState({});
    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token); // remove when deploying to production
    
        if (!token) {
            navigate('/');
            return; // prevent further execution if no token
        }
    
        try {
            const decoded = jwtDecode(token);
            if (decoded.role === 'admin') {
                setIsAdmin(true);
            } else {
                navigate('/');
                return; // prevent further execution if not an admin
            }
        } catch (error) {
            console.error('Invalid token:', error);
            navigate('/');
            return; // prevent further execution if token is invalid
        }
    
        SetError({}); // make sure this is required here
    
        const fetchData = async () => {
            try {
                const productsData = await FetchProducts();
                const { Product } = productsData;
                setProducts(Product);
            } catch (error) {
                setProducts([]);
                console.error('Error fetching products:', error);
            }
        };
    
        fetchData();
    }, [navigate, setIsAdmin, setProducts]);
    

    const handleEdit = (id) => {
        navigate(`/edit-product/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
            try {
                const token = Cookies.get('token');
                await deleteProduct(id, token);
                setProducts(products.filter(product => product._id !== id));
                SetError({});
            } catch (error) {
                console.error('Error deleting product:', error);
                SetError({
                    msg: error.response.data.msg
                });
            }
        }
    };
    if (!isAdmin) {
        return (
            <>
            </>
        );
    }
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
                            <img src={`${product.imageUrls[0]}`} alt={product.name} className="product-image" />
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
            {Error.msg && <p>{Error.msg}</p>}
        </div>
    );
}

export default Admin_View;
