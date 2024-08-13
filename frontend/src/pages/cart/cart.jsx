import React, { useEffect, useState } from 'react';
import './cart.css';
import { getCartItems } from '../../service/api';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          setError('Please Sign-In/Sign-up to see the cart items');
          setLoading(false);
          return;
        }
        setLoading(true); // Start loading before fetching
        setError(null); // Clear any previous error
        const response = await getCartItems(token);
        const { Cart } = response;
        const { items } = Cart;
        console.log(items);
        setCart({ items });
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('No items in Cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
  if(cart){
  return (
    <div className="cart">
      <div className="cart-items">
        {cart.items.map((item) => (
          <Link to={`/product/${item.productId}`} key={item.productId} className="product-card-link">
            <div key={item.productId} className="cart-item">
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}  // Inline CSS for fixed size
            />
            <div>
              Product Name: {item.name}
              <br />
              Price: Rs.{item.price}
              <br />
            </div>
          
          </div>
        </Link>
        ))}
      </div>
      <div className="cart-summary">
        <p>Subtotal ({cart.items.length} items): Rs {totalPrice}</p>
        <button className="cart-buy-now-button">Proceed To Checkout</button>
      </div>
    </div>
  );
}
};

export default Cart;
