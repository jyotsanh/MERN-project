// Cart.js
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
        const { Cart } = response;
        dispatch({ type: 'ADD_TO_CART', payload: response });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Error fetching cart items. Please try again later.');
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
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.productId} className="cart-item">
            <img src={item.imageUrls[0]} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h2>{item.name}</h2>
              <p>Price: Rs {item.price}</p>
              <div className="cart-quantity">
                <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>+</button>
              </div>
            </div>
            <button className="cart-removebutton" onClick={() => handleRemove(item.productId)}>
              <span className="cart-x-icon">🗑️</span>
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Subtotal ({cart.items.length} items)</p>
        <p>Rs{totalPrice}</p>
        <button className="cart-buy-now-button">Proceed To Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
