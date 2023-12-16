import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMsg: null,
  successMsg: null,
};
export const toastReducer = createSlice({
  name: "toast",
  initialState,
  reducers: {
    errorMessage: (state, action) => {
      state.errorMsg = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMsg = null;
    },
    successMessage: (state, action) => {
      state.successMsg = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMsg = null;
    },
  },
});
export const {
  errorMessage,
  clearErrorMessage,
  successMessage,
  clearSuccessMessage,
} = toastReducer.actions;
export default toastReducer.reducer;
