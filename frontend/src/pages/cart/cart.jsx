import React, { useEffect, useState } from 'react';
import './cart.css';
import { getCartItems, deleteCartItem } from '../../service/api';
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
        console.log(items)
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

  const DeleteCartItems = async (productId) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Please Sign-In/Sign-up to see the cart items');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      const response = await deleteCartItem(productId, token);
      console.log(response);

      const updatedItems = response.cart.items.length > 0 ? response.cart.items : null;
      // Initialize quantity for each item
      const itemsWithQuantity = response.cart.items.map((item) => ({
        ...item,
        quantity: 1, // default quantity to 1
      }));
      setCart({ items: itemsWithQuantity });
    } catch (error) {
      console.error('Error deleting cart item:', error);
      setError('Failed to delete item from cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) => {
        const validQuantity = Math.min(Math.max(1, parseInt(newQuantity) || 1), 10); // Limit between 1 and 10
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
    const productIds = cart.items.map(item => item.productId);
    navigate('/checkout', { 
      state: { 
        cartItems: cart.items,
        totalPrice: totalPrice,
        productIds: productIds
      } 
    });
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
              {cart.items.map((item) => {
              // Extract categories from the string
              const categories = item.category[0]?.split(",") || [];

              // Determine the URL based on the categories
              const linkTo = categories.includes("Sunglasses")
                ? `/sunglasses/${item.productId}`
                : categories.includes("Eyeglasses")
                ? `/eyeglasses/${item.productId}`
                : categories.includes("Kidsglasses")
                ? `/kidsglasses/${item.productId}`
                : `/product/${item.productId}`; // Default fallback

              return (
                <tr key={item.productId}>
                  <td className="product-info">
                    <button className="remove-item-button" onClick={() => DeleteCartItems(item.productId)}>✖</button>
                    <img src={item.imageUrl} alt={item.name} className="product-image" />
                    <Link to={linkTo} className="product-name">
                      {item.name}
                    </Link>
                  </td>
                  <td>Rs. {item.price}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      max="10"
                      className="quantity-input"
                      onChange={(e) => updateQuantity(item.productId, e.target.value)}
                    />
                  </td>
                  <td>Rs. {item.quantity * item.price}</td>
                </tr>
              );
            })}

        </tbody>
      </table>

      <div className="coupon-section">
        <input type="text" placeholder="Coupon code" className="coupon-input" />
        <button className="apply-coupon-button">Apply coupon</button>
     
      
      <div className="cart-summary">
        <p>Subtotal: Rs {totalPrice}</p>
        <p>Shipping: Shipping options will be updated during checkout.</p>
        <p>Total: Rs {totalPrice}</p>
        
        <button className="checkout-button" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
      </div>
      </div>
    </div>
  );
};

export default Cart;
