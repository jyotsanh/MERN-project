import React, { createContext, useReducer, useContext } from 'react';

// Create a Context for the cart
const CartContext = createContext();

// Define the initial state of the cart
const initialState = {
  items: []
};

// Define a reducer to manage the cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if the item is already in the cart
      const itemExists = state.items.find(item => item.id === action.payload.id);
      if (itemExists) {
        return {
          ...state,
          items: state.items.map(item => 
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        )
      };
    default:
      return state;
  }
};

// Create a provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => {
  return useContext(CartContext);
};