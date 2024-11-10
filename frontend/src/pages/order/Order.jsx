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
    const [orders, setOrders] = useState([]); // Change to plural for multiple orders
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    setError('Please Log-In');
                    return;
                }else if(isTokenExpired(token)){
                    setError('Please Logs-In');
                    return;
                }else{
                    const decoded = jwtDecode(token);
                    if (decoded.role === 'admin') {
                        setError('Admin is not supposed to see this page');
                        return;
                    }
                }
                const response = await getUserOrder(token);
                console.log(response.data.Order);
                if (response.data.Order && response.data.Order.length > 0) {
                    setOrders(response.data.Order); // Set all orders
                } else {
                    setError('You have no orders yet.');
                }
            } catch (error) {
                setError('Failed to fetch orders. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className='admin-container'>{error} to see your orders</div>;
    }

    return (
        <div className="order-page">
            <h2>Your Orders</h2>
            {error && <p className="error">{error}</p>}
            {orders.map((order, index) => (
                <>
                <h1>Order Details</h1>
                <div className="order-info">
                    <p>Order Placed: {new Date(order.created_at).toLocaleString()}</p>
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
                </>
            ))}
        </div>
    );
};

export default Order;