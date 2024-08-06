import React from 'react';
import { useCart } from '../../context/CartContext';
import './cart.css';

const Cart = () => {
  const { cart, dispatch } = useCart();

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, image: product.image } });
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_CART_ITEM', payload: { id, quantity } });
  };

  // Calculate total price
  const totalPrice = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="cart">
      <h1>Your Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
        
             <button className="removebutton" onClick={() => handleRemove(item.id)}>   
                 <span className="x-icon">x</span>
                 </button>
             
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>Price: Rs {item.price}</p>
                <div className="quantity">
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
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