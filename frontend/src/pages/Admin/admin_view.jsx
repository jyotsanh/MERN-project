import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { FetchProducts, deleteProduct } from '../../service/api';
import './admin_view.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

function Admin_View() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});  // State to store search filters
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
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

        SetError({});

        const fetchData = async (currentPage, searchFilters = {}) => {
            try {
                const productsData = await FetchProducts(currentPage, 8, searchFilters);
                const { Product, totalPages } = productsData;
                setProducts(Product);
                setTotalPages(totalPages);
            } catch (error) {
                setProducts([]);
                console.error('Error fetching products:', error);
            }
        };

        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
        setPage(pageFromUrl);
        fetchData(pageFromUrl, filters);  // Fetch products based on current page and filters
    }, [searchParams, filters, navigate, setIsAdmin, setProducts]);

    const handleEdit = (id,pageNumber) => {
        console.log(`Editing product with ID: ${id}`);
        navigate(`/edit-product/${id}?page=${pageNumber}`);
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

    const handleNextPage = () => {
        if (page < totalPages) {
            navigate(`/admin-view?page=${page + 1}`);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            navigate(`/admin-view?page=${page - 1}`);
        }
    };

    const handleSearchChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);  // Reset to first page on search
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="admin-view-container">
            <h1 className="admin-title">Admin View</h1>
            <NavLink to="/admin">
                <button className="back-button">Back to Admin</button>
            </NavLink>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="search-bar">
    <input
        type="text"
        name="name"
        placeholder="Search by Name"
        value={filters.name || ''}  // Change this to filters
        onChange={handleSearchChange}
    />
    <input
        type="text"
        name="category"
        placeholder="Search by Category"
        value={filters.category || ''}  // Change this to filters
        onChange={handleSearchChange}
    />
    <input
        type="text"
        name="frameShape"
        placeholder="Search by Frame Shape"
        value={filters.frameShape || ''}  // Change this to filters
        onChange={handleSearchChange}
    />
    <input
        type="text"
        name="frameMaterial"
        placeholder="Search by Frame Material"
        value={filters.frameMaterial || ''}  // Change this to filters
        onChange={handleSearchChange}
    />
    <input
        type="text"
        name="lensMaterial"
        placeholder="Search by Lens Material"
        value={filters.lensMaterial || ''}  // Change this to filters
        onChange={handleSearchChange}
    />
    <button type="submit">Search</button>
</form>

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
    {Array.isArray(products) && products.length === 0 ? (
        <tr>
            <td colSpan="7">No products available</td>
        </tr>
    ) : (
        Array.isArray(products) && products.map(product => (
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
                    <button className="edit-button" onClick={() => handleEdit(product._id,page)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
            </tr>
        ))
    )}
</tbody>

                </table>

                {/* Pagination Controls */}
                <div className="pagination-controls">
                    <button
                        className="pagination-button"
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span className="pagination-info">Page {page} of {totalPages}</span>
                    <button
                        className="pagination-button"
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Admin_View;
