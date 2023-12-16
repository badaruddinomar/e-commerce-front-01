import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  product: null,
};

const createProductReducer = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    createProductRequest: (state) => {
      state.loading = true;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    createProductFaill: (state) => {
      state.loading = false;
    },
  },
});

export const {
  createProductRequest,
  createProductSuccess,
  createProductFaill,
} = createProductReducer.actions;
export default createProductReducer.reducer;
