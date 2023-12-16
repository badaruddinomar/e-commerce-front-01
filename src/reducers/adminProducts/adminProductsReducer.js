import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
};

const adminProductsReducer = createSlice({
  name: "adminproducts",
  initialState,
  reducers: {
    getAllAdminProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { getAllAdminProducts } = adminProductsReducer.actions;
export default adminProductsReducer.reducer;
