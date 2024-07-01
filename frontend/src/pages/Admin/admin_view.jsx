import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { FetchProducts } from '../../service/api';

function Admin_View(){
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await FetchProducts();
                console.log("productsData",productsData)
                const { Product } = productsData;
                setProducts(Product);
                
            } catch (error) {
                setProducts([]);
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);
    

    return(
        <>
            <h1>Admin View</h1>
            <br />
            <br />
            <NavLink to="/admin">
                <button>Back to Admin</button>
            </NavLink>

            <div>
                {products.length == 0 ? (
                    <p>No products available</p>
                ) : (
                    <ul>
                        {
                            products.map(
                            product => (
                            <li key={product._id}>
                            <h2>{product.name}</h2>
                            <p>Price: {product.price}</p>
                            <p>Description: {product.description}</p>
                            <p>Category: {product.category}</p>
                            <p>Quantity: {product.quantity}</p>
                            <img src={`http://localhost:3000/${product.imageUrl}`} alt={product.name} width="100" />
                            </li>
                            )
                                )
                        }
                    </ul>
                )}
            </div>
        </>

    );
}

export default Admin_View;