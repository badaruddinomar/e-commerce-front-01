import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  review: {},
};

const reviewReducer = createSlice({
  name: "review",
  initialState,
  reducers: {
    reviewRequest: (state) => {
      state.loading = true;
    },
    reviewSuccess: (state, aciton) => {
      state.loading = false;
      state.aciton = aciton.payload;
    },
    reviewFaill: (state) => {
      state.loading = false;
    },
  },
});
export const { reviewRequest, reviewSuccess, reviewFaill } =
  reviewReducer.actions;
export default reviewReducer.reducer;
