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

            <div className="admin-view-container">
   
    <table className="product-table">
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {products.length === 0 ? (
                <tr>
                    <td colSpan="7">No products available</td>
                </tr>
            ) : (
                products.map(product => (
                    <tr key={product._id}>
                        <td>
                            <img src={product.imageUrls[0]} alt={product.name} className="product-image-table" />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.quantity}</td>
                        <td className="product-actions-table">
                        <button className="edit-button" onClick={() => handleEdit(product._id)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(product._id)}>Delete</button>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
</div>

        </div>
    );
}

export default Admin_View;
