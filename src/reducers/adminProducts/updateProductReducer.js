import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  product: null,
};

const updateProductReducer = createSlice({
  name: "update",
  initialState,
  reducers: {
    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    updateProductFaill: (state) => {
      state.loading = false;
    },
  },
});
export const {
  updateProductRequest,
  updateProductSuccess,
  updateProductFaill,
} = updateProductReducer.actions;
export default updateProductReducer.reducer;
