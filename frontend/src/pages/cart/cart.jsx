import React, { useEffect, useState } from 'react';
import './cart.css';
import { getCartItems } from '../../service/api';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [datalist, setDatalist] = useState([]);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

        // Initialize quantity for each item
        const itemsWithQuantity = items.map((item) => ({
          ...item,
          quantity: 1, // default quantity to 1
        }));

        setCart({ items: itemsWithQuantity });
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('No items in Cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) => {
        const validQuantity = Number(newQuantity) > 0 ? Number(newQuantity) : 0;
        return item.productId === productId
          ? { ...item, quantity: validQuantity }
          : item;
      });

      return { ...prevCart, items: updatedItems };
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { cartItems: cart.items,totalPrice: totalPrice } });
  };
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item.productId}>
              <td className="product-info">
                <button className="remove-item-button">✖</button>
                <img src={item.imageUrl} alt={item.name} className="product-image" />
                <Link to={`/product/${item.productId}`} className="product-name">
                  {item.name}
                </Link>
              </td>
              <td>Rs. {item.price}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  max="5"
                  className="quantity-input"
                  onChange={(e) => updateQuantity(item.productId, e.target.value)}
                />
              </td>
              <td>Rs. {item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="coupon-section">
        <input type="text" placeholder="Coupon code" className="coupon-input" />
        <button className="apply-coupon-button">Apply coupon</button>
      </div>
      
      <div className="cart-summary">
        <p>Subtotal: Rs {totalPrice}</p>
        <p>Shipping: Shipping options will be updated during checkout.</p>
        <p>Total: Rs {totalPrice}</p>
        
        <button className="checkout-button" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
