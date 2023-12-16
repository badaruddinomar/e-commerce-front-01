import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  shippingInfo: {},
  proceedToPayment: {},
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const isItemExist = state.cartItems.find(
        (item) => item.productId === newItem.productId
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((item) => {
          return item.productId === isItemExist.productId ? newItem : item;
        });
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => {
        return item.productId !== action.payload;
      });
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    saveProceedToPayment: (state, action) => {
      state.proceedToPayment = action.payload;
    },
  },
});
export const {
  addToCart,
  removeCartItem,
  saveShippingInfo,
  saveProceedToPayment,
} = cartReducer.actions;
export default cartReducer.reducer;
