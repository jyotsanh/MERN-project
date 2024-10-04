import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './AllOrders.css';
import { jwtDecode } from "jwt-decode";
import { getAdminOrders, adminUpdateOrderStatus } from '../../service/api';

function isTokenExpired(token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

function AllOrders() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusUpdating, setStatusUpdating] = useState({});
    const [changedStatuses, setChangedStatuses] = useState({});

    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token) // remove when deploying to production
        if (!token) {
            navigate('/admin-login');
        }else if(isTokenExpired(token)){
            navigate('/admin-login');
        }
         else {
            try {
                const decoded = jwtDecode(token);
                if (decoded.role === 'admin') {
                    const fetchOrders = async (token) => {
                        try {
                            const response = await getAdminOrders(token);
                            setOrders(response);
                            setLoading(false);
                        } catch (error) {
                            console.error('Error fetching orders:', error);
                            setError('Failed to fetch orders. Please try again.');
                            setLoading(false);
                        }
                    };
                    fetchOrders(token);
                    setIsAdmin(true);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Invalid token:', error);
                navigate('/');
            }
        
        }
        
    }, [navigate]);

    const handleStatusChange = (orderId, newStatus) => {
        if (newStatus === orders.find(order => order._id === orderId).status) {
            // If the new status is the same as the original status, remove it from changedStatuses
            setChangedStatuses(prev => {
                const newState = { ...prev };
                delete newState[orderId];
                return newState;
            });
        } else {
            // Otherwise, update changedStatuses
            setChangedStatuses(prev => ({ ...prev, [orderId]: newStatus }));
        }
    };

    const updateOrderStatus = async (orderId) => {
        const token = Cookies.get('token');
        if(!token){
            navigate('/admin-login');
        }else if(isTokenExpired(token)){
            navigate('/admin-login');
        }else{
            setStatusUpdating(prev => ({ ...prev, [orderId]: true }));
            try {
                // Implement the API call to update the status
                await adminUpdateOrderStatus(orderId, changedStatuses[orderId], token);
                
                // Update the local state
                setOrders(orders.map(order => 
                    order._id === orderId ? { ...order, status: changedStatuses[orderId] } : order
                ));

                // Clear the changed status for this order
                setChangedStatuses(prev => {
                    const newState = { ...prev };
                    delete newState[orderId];
                    return newState;
                });
            } catch (error) {
                console.error('Error updating order status:', error);
                // Optionally show an error message to the user
            } finally {
                setStatusUpdating(prev => ({ ...prev, [orderId]: false }));
            }
        }
    };

    if (!isAdmin) {
        return (
            <>
            <div className='admin-container'>
                What the hell are you doing here?
            </div>
            </>
        );
    }

    if (loading) {
        return <div className="admin-container">Loading...</div>;
    }

    if (error) {
        return <div className="admin-container">{error}</div>;
    }

    return (
        <div className="admin-container">
            <h1>All Orders</h1>
            {orders.map((order) => (
                <div key={order._id} className="order-card">
                    <h2>Order ID: {order._id}</h2>
                    <p>Customer: {order.first_name} {order.last_name}</p>
                    <p>Phone: {order.phone_number}</p>
                    <div className="status-dropdown">
                        <label htmlFor={`status-${order._id}`}>Status: </label>
                        <select
                            id={`status-${order._id}`}
                            value={changedStatuses[order._id] || order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            disabled={statusUpdating[order._id]}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Delivering">Delivering</option>
                            <option value="Completed">Completed</option>
                        </select>
                        {changedStatuses[order._id] && (
                            <button 
                                onClick={() => updateOrderStatus(order._id)}
                                disabled={statusUpdating[order._id]}
                            >
                                Update Status
                            </button>
                        )}
                        {statusUpdating[order._id] && <span className="updating-status"> Updating...</span>}
                    </div>
                    <p>Total Price: ${order.total_price}</p>
                    <p>Payment Method: {order.payment_method}</p>
                    <h3>Products:</h3>
                    <ul>
                        {order.products.map((product) => (
                            <li key={product._id}>
                                Product ID: {product.product_id}, Quantity: {product.quantity}, Price: ${product.price}
                            </li>
                        ))}
                    </ul>
                    <h3>Shipping Address:</h3>
                    <p>{order.shipping_address.street}, {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}</p>
                    <p>Order Date: {new Date(order.created_at).toLocaleString()}</p>
                    <br />
                </div>
            ))}
        </div>
    );
}

export default AllOrders;
