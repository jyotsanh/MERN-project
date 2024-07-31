import React, { useState } from 'react';
import './checkout.css';

const CheckoutForm = () => {
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
        <div className="order-item">
          <div>Product</div>
          <div>Subtotal</div>
        </div>
        <div className="order-item">
          <div>EYemate</div>
          <div>Rs 1260</div>
        </div>
        <div className="order-item">
          <div>Subtotal</div>
          <div>Rs 1260</div>
        </div>
        <div className="order-item">
          <div>Shipping</div>
          <div>Free shipping</div>
        </div>
        <div className="order-item">
          <div>Total</div>
          <div>Rs 1260</div>
        </div>
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
        <button type="submit">Place Order</button>
      </div>
    </div>
  );
};

export default CheckoutForm;
