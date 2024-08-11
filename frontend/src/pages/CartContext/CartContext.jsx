// import React, { createContext, useReducer, useContext } from 'react';

// const CartContext = createContext();

// const initialState = {
//     items: [],
//     total: 0,
// };

// const cartReducer = (state, action) => {
//     switch (action.type) {
//         case 'ADD_TO_CART': {
//             const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
//             let updatedItems;

//             if (existingItemIndex >= 0) {
//                 updatedItems = state.items.map((item, index) =>
//                     index === existingItemIndex
//                         ? { ...item, quantity: item.quantity + 1 }
//                         : item
//                 );
//             } else {
//                 updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
//             }

//             const updatedTotal = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);

//             return {
//                 items: updatedItems,
//                 total: updatedTotal,
//             };
//         }
//         default:
//             return state;
//     }
// };

// export const CartProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(cartReducer, initialState);

//     return (
//         <CartContext.Provider value={{ cart: state, dispatch }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartContext);
