import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsCount: null,
  resultPerPage: null,
};

const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    allProductSuccess: (state, action) => {
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
    },
  },
});
export const { allProductSuccess } = productReducer.actions;
export default productReducer.reducer;
