import { createSlice } from '@reduxjs/toolkit';

// Initial cart state
const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

// Create a cart slice using createSlice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const item = action.payload;

      // Check if the item is already in the cart
      const existingItemIndex = state.cartItems.findIndex(
        (i) => i.id === item.id
      );
      const existingItem = state.cartItems[existingItemIndex];

      // If item is already in cart, update its quantity
      if (existingItem) {
        existingItem.quantity += item.quantity;
        state.cartItems.splice(existingItemIndex, 1, existingItem);
      } else {
        // If item is not in cart, add it
        state.cartItems.push(item);
      }

      // Save cart items to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    // Remove item from cart
    removeFromCart: (state, action) => {
      const {itemId} = action.payload;

      
      // Filter out the item with given id
      state.cartItems = state.cartItems.filter((i) => i.id !== itemId);

      // Save cart items to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    // Clear cart
    clearCart: (state) => {
      state.cartItems = [];

      // Save cart items to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
