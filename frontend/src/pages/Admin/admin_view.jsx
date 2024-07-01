import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FetchProducts, deleteProduct } from '../../service/api';

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
        <>
            <h1>Admin View</h1>
            <br />
            <br />
            <NavLink to="/admin">
                <button>Back to Admin</button>
            </NavLink>

            <div>
                {products.length === 0 ? (
                    <p>No products available</p>
                ) : (
                    <ul>
                        {products.map(product => (
                            <li key={product._id}>

                            <img src={`${product.imageUrl}`} alt={product.name} width="100" />
                            <h2>{product.name}</h2>
                            <p>Price: {product.price}</p>
                            <p>Description: {product.description}</p>
                            <p>Category: {product.category}</p>
                            <p>Quantity: {product.quantity}</p>
                            

                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default Admin_View;
