import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: null,
  error: null,
  product: {},
};

export const productDetailsReducer = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    productDetailsRequest: (state) => {
      state.loading = true;
    },
    productDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    productDetailsFaill: (state) => {
      state.loading = true;
    },
  },
});
export const {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFaill,
} = productDetailsReducer.actions;
export default productDetailsReducer.reducer;
// start from 7.53 ninute
