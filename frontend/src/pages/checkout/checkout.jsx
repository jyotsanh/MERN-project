import React, { useState } from 'react';
import './checkout.css';
import { useLocation } from 'react-router-dom';
const CheckoutForm = () => {
  const location = useLocation();
  const { cartItems } = location.state || {}; // Get cart items from state
  const { totalPrice } = location.state || {}; // Get cart items from state
  console.log("cart-items")
  console.log(totalPrice)
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
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
            <option value="Bagmati">Province 1</option>
            <option value="Bagmati">Province 2</option>
            <option value="Bagmati">Bagmati</option>
            <option value="Bagmati">Province 4</option>
            <option value="Bagmati">Province 5</option>
            <option value="Bagmati">Province 7</option>
            {/* Add other options here */}
          </select>
        </div>
        <div className="form-group">
          <label>Postcode / ZIP (optional)</label>
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone </label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email address </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Order notes (optional)</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
        </div>
        {/* <button type="submit">Place Order</button> */}
      </form>

      <div className="order-summary">
        <h2>Your Order</h2>
  
        <div className="order-items">
          <div className="order-header">
            <div className="order-header-product">Product</div>
            <div className="order-header-subtotal">Subtotal</div>
          </div>
          {cartItems.map((item) => (
            <div className="order-item">
              <div className="order-product">
                {item.name} × {item.quantity}
              </div>
              <div className="order-subtotal">{item.price*item.quantity}</div>
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
            <input type="radio" name="payment" value="cod" defaultChecked />
            Cash on delivery
          </label>
          <label>
            <input type="radio" name="payment" value="esewa" />
            eSewa
          </label>
          <label>
            <input type="radio" name="payment" value="card" />
            Visa / Master Card
          </label>
        </div>

        <button type="submit" className="order-submit-button">Proceed to Payment</button>
      </div>

    </div>
  );
};

export default CheckoutForm;
