import React, { createContext, useReducer, useContext } from 'react';

// Create a Context for the cart
const CartContext = createContext();

// Define the initial state of the cart
const initialState = {
  items: [],
  itemCount: 0,
};

// Define a reducer to manage the cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    // case 'ADD_TO_CART':
    //   // Check if the item is already in the cart
    //   const itemExists = state.items.find(item => item.id === action.payload.id);
    //   if (itemExists) {
    //     return {
    //       ...state,
    //       items: state.items.map(item => 
    //         item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
    //       ),
    //       itemCount: state.itemCount + 1,
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       items: [...state.items, { ...action.payload, quantity: 1 }],
    //       itemCount: state.itemCount + 1,
    //     };
    //   }
  //   case 'ADD_TO_CART':
  // // Check if the item is already in the cart based on the unique product id
  // const existingItem = state.items.find(item => item.id === action.payload.id);

  // if (existingItem) {
  //   // Item exists, increase its quantity
  //   return {
  //     ...state,
  //     items: state.items.map(item =>
  //       item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
  //     ),
  //     itemCount: state.itemCount + 1,
  //   };
  // } else {
  //   // Item does not exist, add it as a new entry
  //   return {
  //     ...state,
  //     items: [...state.items, { ...action.payload, quantity: 1 }],
  //     itemCount: state.itemCount + 1,
  //   };
  // }


  // new imp


  // case 'ADD_TO_CART':
  //   console.log('Attempting to add product to cart:', action.payload);
  //   // Check if the item is already in the cart based on the unique product id
  //   const existingItem = state.items.find(item => item.id === action.payload.id);
  
  //   if (existingItem) {
  //     // Item exists, increase its quantity
  //     console.log(`Item with id ${action.payload.id} already exists. Increasing quantity.`);
  //     return {
  //       ...state,
  //       items: state.items.map(item =>
  //         item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
  //       ),
  //       itemCount: state.itemCount + 1,
  //     };
  //   } else {
  //     // Item does not exist, add it as a new entry
  //     console.log(`Adding new item with id ${action.payload.id} to cart.`);
  //     return {
  //       ...state,
  //       items: [...state.items, { ...action.payload, quantity: 1 }],
  //       itemCount: state.itemCount + 1,
  //     };
  //   }
  
  case 'ADD_TO_CART':
  console.log('Current Cart State:', state);
  console.log('Product being added:', action.payload);
  const existingItem = state.items.find(item => item.id === action.payload.id);

  if (existingItem) {
    console.log(`Item with id ${action.payload.id} already exists. Increasing quantity.`);
    return {
      ...state,
      items: state.items.map(item =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
      ),
      itemCount: state.itemCount + 1,
    };
  } else {
    console.log(`Adding new item with id ${action.payload.id} to cart.`);
    return {
      ...state,
      items: [...state.items, { ...action.payload, quantity: 1 }],
      itemCount: state.itemCount + 1,
    };
  }


      
    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        itemCount: state.itemCount - itemToRemove.quantity,
      };

    case 'UPDATE_CART_ITEM':
      const quantityDifference = action.payload.quantity - state.items.find(item => item.id === action.payload.id).quantity;
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
        itemCount: state.itemCount + quantityDifference,
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
