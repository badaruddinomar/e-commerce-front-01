import { Route, Routes } from "react-router-dom";
import "./app.scss";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import ProductDetails from "./components/productDetails/ProductDetails";
import Products from "./components/products/Products";
import SearchBar from "./components/searchBar/SearchBar";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import ResetPassword from "./components/resetPassword/ResetPassword";
import ProfilePage from "./components/profilePage/ProfilePage";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import { useSelector } from "react-redux";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";
import ProductCart from "./components/productCart/ProductCart";
import Shipping from "./components/shipping/Shipping";
import ConfirmOrder from "./components/confirmOrder/ConfirmOrder";
import CheckOut from "./components/checkOut/CheckOut";
import OrderSuccess from "./components/orderSuccess/OrderSuccess";
import MyOrder from "./components/myOrder/MyOrder";
import GetSingleOrder from "./components/getSIngleOrder/GetSingleOrder";
import Dashboard from "./components/dashboard/Dashboard";
import AdminProductList from "./components/dashboard/AdminProductList";
import CreateProduct from "./components/dashboard/CreateProduct";
import UpdateProduct from "./components/dashboard/UpdateProduct";
import Orders from "./components/dashboard/OrdersList.jsx";
import OrderDetails from "./components/dashboard/OrderDetails.jsx";
import UserList from "./components/dashboard/UserList.jsx";
import UpdateUserRole from "./components/dashboard/UpdateUserRole.jsx";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.userReducer);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<ProductCart />} />
        {isAuthenticated ? (
          <>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/confirmOrder" element={<ConfirmOrder />} />
            <Route path="/paymentProcess" element={<CheckOut />} />
            <Route path="/orderSuccess" element={<OrderSuccess />} />
            <Route path="/myOrder" element={<MyOrder />} />
            <Route path="/singleOrder/:id" element={<GetSingleOrder />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        {isAuthenticated && user.role === "admin" && (
          <>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<AdminProductList />} />
            <Route path="/admin/create/product" element={<CreateProduct />} />
            <Route
              path="/admin/update/product/:id"
              element={<UpdateProduct />}
            />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/order/details/:id" element={<OrderDetails />} />
            <Route path="/admin/user/list" element={<UserList />} />
            <Route path="/admin/update/role/:id" element={<UpdateUserRole />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
