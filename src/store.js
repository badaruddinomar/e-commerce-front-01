import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./reducers/products/productsReducer";
import productDetailsReducer from "./reducers/products/productDetailsReducer";
import userReducer from "./reducers/user/userReducer";
import toastReducer from "./reducers/toastMessage/toastReducer";
import cartReducer from "./reducers/cart/cartReducer";
import orderReducer from "./reducers/order/orderReducer";
import reviewReducer from "./reducers/review/reviewReducer";
import adminProductsReducer from "./reducers/adminProducts/adminProductsReducer";
import createProductReducer from "./reducers/adminProducts/createProductReducer";
import updateProductReducer from "./reducers/adminProducts/updateProductReducer";

const rootReducer = combineReducers({
  userReducer,
  productReducer,
  productDetailsReducer,
  toastReducer,
  cartReducer,
  orderReducer,
  reviewReducer,
  adminProductsReducer,
  createProductReducer,
  updateProductReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer", "cartReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
export default store;
