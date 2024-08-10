import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import './cart.css';
import { getCartItems, deleteCartItem } from '../../service/api';
import Cookies from 'js-cookie';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }
        const response = await getCartItems(token);
        const {Cart } = response
        
        console.log(`Cart items: ${JSON.stringify(Cart.items, null, 2)}`);

        if (Array.isArray(Cart.items)) {
            for (const item of Cart.items) {
                console.log(item); // Log each item in the Cart.items array
            }
        } else {
            console.error('Cart.items is not an array');
        }
        dispatch({ type: 'SET_CART_ITEMS', payload: response });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);

        if (error.response) {
          console.error('Response Data:', error.response.data);
          console.error('Response Status:', error.response.status);
          console.error('Response Headers:', error.response.headers);
          setError('Error fetching cart items. Please try again later.');
        } else if (error.request) {
          console.error('Error request:', error.request);
          setError('No response received from the server.');
        } else {
          console.error('Error message:', error.message);
          setError('Error setting up request.');
        }

        setLoading(false);
      }
    };

    fetchCartItems();
  }, [dispatch]);

  const handleRemove = async (productId) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('No token found');
        return;
      }
      await deleteCartItem(productId, token);
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } catch (error) {
      console.error('Error deleting cart item:', error);

      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }

      setError('An error occurred while deleting the item. Please try again later.');
    }
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_CART_ITEM', payload: { id: productId, quantity } });
  };

  const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="cart">
      <h1>Your Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div key={item.productId} className="cart-item">
              <img src={item.imageUrls[0]} alt={item.name} className="cart-item-image" />
              <button className="removebutton" onClick={() => handleRemove(item.productId)}>
                <span className="x-icon">x</span>
              </button>
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>Price: Rs {item.price}</p>
                <div className="quantity">
                  <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
          <div className="total-price">
            <p>Total Price: Rs {totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
