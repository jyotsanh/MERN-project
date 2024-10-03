import React, { useEffect, useState } from 'react';
import { getUserOrder } from '../../service/api';
import './order.css';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';


function isTokenExpired(token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true; // If there's an error decoding, assume the token is invalid
    }
  }

const Order = () => {
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    setError('Please Log-In');
                    return;
                }else if(isTokenExpired(token)){
                    setError('Please Logs-In');
                    return;
                }
                const response = await getUserOrder(token);
                setOrder(response.data.Order[0]);
            } catch (error) {
                console.log(error);
                setError('Please Log-In');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="order-container">
            <h1>Order Details</h1>
            <div className="order-info">
                <p>Your Phone Number: {order.phone_number}</p>
                <p>Shipping Address: {order.shipping_address.street}, {order.shipping_address.city}, {order.shipping_address.state}, {order.shipping_address.zip}</p>
                <p>Payment Method: {order.payment_method}</p>
            </div>
            <h3>Products</h3>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products.map(product => (
                        <tr key={product._id}>
                            <td>{product.product_id}</td>
                            <td>{product.quantity}</td>
                            <td>Rs.{product.price}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3 className="total-price">Total Price: Rs.{order.total_price}</h3>
        </div>
    );
};

export default Order;