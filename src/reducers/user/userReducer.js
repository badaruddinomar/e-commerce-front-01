import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};
export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loginFail: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    //--
    signoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    //--
    updateRequest: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    updateFaill: (state) => {
      state.loading = false;
    },
    //--
    deleteStart: (state) => {
      state.loading = true;
    },
    deleteSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    deleteFaill: (state) => {
      state.loading = false;
    },
    //--
    forgotPasswordRequest: (state) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state) => {
      state.loading = false;
    },
    forgotPasswordFaill: (state) => {
      state.loading = false;
    },
    //--
    resetPasswordRequest: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.user = action.user;
    },
    resetPasswordFail: (state) => {
      state.loading = false;
    },
  },
});
export const {
  loginSuccess,
  loginFail,
  loginRequest,
  signoutSuccess,
  updateRequest,
  updateSuccess,
  updateFaill,
  deleteStart,
  deleteSuccess,
  deleteFaill,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFaill,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} = userReducer.actions;
export default userReducer.reducer;
