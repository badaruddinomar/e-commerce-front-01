import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  order: null,
  myOrders: [],
  singleOrder: {},
};

const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderRequest: (state) => {
      state.loading = true;
    },
    orderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    orderFaill: (state) => {
      state.loading = false;
    },
    getMyOrderRequest: (state) => {
      state.loading = true;
    },
    getMyOrderSuccess: (state, action) => {
      state.loading = false;
      state.myOrders = action.payload;
    },
    getMyOrderFaill: (state) => {
      state.loading = false;
    },
    getSingleOrderRequest: (state) => {
      state.loading = true;
    },
    getSingleOrderSuccess: (state, action) => {
      state.loading = false;
      state.singleOrder = action.payload;
    },
    getSingleOrderFaill: (state) => {
      state.loading = false;
    },
  },
});
export const {
  orderRequest,
  orderSuccess,
  orderFaill,
  getMyOrderRequest,
  getMyOrderSuccess,
  getMyOrderFaill,
  getSingleOrderRequest,
  getSingleOrderSuccess,
  getSingleOrderFaill,
} = orderReducer.actions;
export default orderReducer.reducer;
