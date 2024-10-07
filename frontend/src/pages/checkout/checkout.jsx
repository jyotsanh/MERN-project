import React, { useState } from 'react';
import './checkout.css';
import { useLocation } from 'react-router-dom';
import { placeOrder } from '../../service/api'; // Import the placeOrder function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Cookies from 'js-cookie';

const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { cartItems } = location.state || {}; // Get cart items from state
  const { totalPrice } = location.state || {}; // Get total price from state
  const { productIds } = location.state || {}; // Get product ids from state
  const [paymentMethod, setPaymentMethod] = useState('esewa');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: 'Bagmati',
    zip: '',
    phone: '',
    email: '',
    notes: '',
  });
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token'); // Get token from local storage or any other method
    console.log(productIds)
    const orderData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phone,
      products: cartItems.map((item, index) => ({
        product_id: productIds[index], // Use the product ID from productIds array
        quantity: item.quantity,
        price: item.price
      })),
      payment_method: paymentMethod,
      total_price: totalPrice,
      shipping_address: {
        street: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zip: formData.zip
      },
    };
    console.log(orderData)
    try {
      const response = await placeOrder(orderData, token);
      console.log('Order placed successfully:', response);
      navigate('/'); // Navigate to a success page or any other page
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="checkout-container">
      <form onSubmit={handleSubmit} className="billing-form">
        <h2>Billing Details</h2>
        <div className="form-group">
          <label>First name </label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last name </label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Country / Region</label>
          <input type="text" value="Nepal" disabled />
        </div>
        <div className="form-group">
          <label>Street address </label>
          <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Town / City </label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>State / Zone </label>
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="Province 1">Province 1</option>
            <option value="Province 2">Province 2</option>
            <option value="Bagmati">Bagmati</option>
            <option value="Province 4">Province 4</option>
            <option value="Province 5">Province 5</option>
            <option value="Province 7">Province 7</option>
            {/* Add other options here */}
          </select>
        </div>
        <div className="form-group">
          <label>Postcode / ZIP (optional)</label>
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone </label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            pattern="[0-9]{10}" 
            title="Phone number must be 10 digits"
            maxLength="10"
            required 
          />
        </div>
        <div className="form-group">
          <label>Email address </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Order notes (optional)</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Place Order</button>
      </form>

      <div className="order-summary">
        <h2>Your Order</h2>
  
        <div className="order-items">
          <div className="order-header">
            <div className="order-header-product">Product</div>
            <div className="order-header-subtotal">Subtotal</div>
          </div>
          {cartItems.map((item) => (
            <div className="order-item" key={item.id}>
              <div className="order-product">
                {item.name} × {item.quantity}
              </div>
              <div className="order-subtotal">{item.price * item.quantity}</div>
            </div>
          ))}

          {/* Shipping */}
          <div className="order-item order-summary-item">
            <div className="order-product">Shipping</div>
            <div className="order-subtotal">Free shipping</div>
          </div>

          {/* Total */}
          <div className="order-item order-summary-item">
            <div className="order-product order-total">Total</div>
            <div className="order-subtotal order-total">Rs {totalPrice}</div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-method">
          <h3>Payment Method</h3>
          <label>
            <input 
              type="radio" 
              name="payment" 
              value="Cash on delivery" 
              checked={paymentMethod === 'Cash on delivery'}
              onChange={handlePaymentMethodChange}
            />
            Cash on delivery
          </label>
          <label>
            <input 
              type="radio" 
              name="payment" 
              value="esewa"
              checked={paymentMethod === 'esewa'}
              onChange={handlePaymentMethodChange}
            />
            eSewa
          </label>
          <label>
            <input 
              type="radio" 
              name="payment" 
              value="Khalti"
              checked={paymentMethod === 'Khalti'}
              onChange={handlePaymentMethodChange}
            />
            Khalti
          </label>
        </div>

        <button type="submit" className="order-submit-button" onClick={handleSubmit}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CheckoutForm;
