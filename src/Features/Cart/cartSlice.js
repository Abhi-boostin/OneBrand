import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const MAX_QUANTITY = 20;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      const items = action.payload || [];
      state.items = items;
      state.totalAmount = items.reduce(
        (sum, item) => sum + (item.productPrice || 0) * (item.quantity || 0),
        0
      );
    },
    addToCart(state, action) {
      const product = action.payload;
      if (!product || product.productID === undefined || product.productPrice === undefined) {
        return;
      }
      const existingItem = state.items.find(
        (item) => item.productID === product.productID
      );
      if (existingItem) {
        if (existingItem.quantity < MAX_QUANTITY) {
          existingItem.quantity += 1;
          state.totalAmount += product.productPrice;
        }
      } else {
        state.items.push({ ...product, quantity: 1 });
        state.totalAmount += product.productPrice;
      }
    },
    updateQuantity(state, action) {
      const { productID, quantity } = action.payload || {};
      const itemToUpdate = state.items.find(
        (item) => item.productID === productID
      );
      if (itemToUpdate && typeof quantity === "number") {
        const clampedQty = Math.min(Math.max(quantity, 1), MAX_QUANTITY);
        const difference = clampedQty - itemToUpdate.quantity;
        itemToUpdate.quantity = clampedQty;
        state.totalAmount += difference * itemToUpdate.productPrice;
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const itemToRemove = state.items.find(
        (item) => item.productID === productId
      );
      if (itemToRemove) {
        state.totalAmount -= itemToRemove.productPrice * itemToRemove.quantity;
        state.items = state.items.filter(
          (item) => item.productID !== productId
        );
      }
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
