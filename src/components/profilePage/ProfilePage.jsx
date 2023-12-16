// style file--
import "./profilePage.scss";
// MUI icons--
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// Hooks--
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Components--
import UpdatePassword from "../updatePassword/UpdatePassword";
import ToastNotification from "../ToastNotification/ToastNotification";
import PreLoader from "../preLoader/PreLoader";
import { backendUrl } from "./../../helper";
import MetaData from "./../MetaData";
// store and get data from the redux store--
import {
  deleteFaill,
  deleteStart,
  deleteSuccess,
  loginSuccess,
  signoutSuccess,
  updateFaill,
  updateRequest,
  updateSuccess,
} from "../../reducers/user/userReducer";
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";

const ProfilePage = () => {
  const { user, loading } = useSelector((state) => state.userReducer);
  const { errorMsg, successMsg } = useSelector((state) => state.toastReducer);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get orders list--
  useEffect(() => {
    const fetchHandler = async () => {
      const response = await fetch(`${backendUrl}/api/v1/admin/orders`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setOrders(data.orders);
    };
    fetchHandler();
  }, []);
  const ordersLeft = orders?.filter((order) => {
    return order.orderStatus !== "Delivered";
  });
  // fetching profile data--
  useEffect(() => {
    const fetchHandler = async () => {
      const response = await fetch(`${backendUrl}/api/v1/me`, {
        credentials: "include",
      });
      const data = await response.json();
      setUserData(data?.user);
      setUsername(data?.user?.name);
      setEmail(data?.user?.email);
      if (response.ok) {
        dispatch(loginSuccess(data?.user));
      } else {
        dispatch(signoutSuccess());
      }
    };
    fetchHandler();
  }, [dispatch]);
  // handler function--
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const avatarChangeHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // update profile data--
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const myForm = new FormData();
      myForm.set("name", username);
      myForm.set("email", email);
      if (avatar) {
        myForm.set("avatar", avatar);
      }
      dispatch(updateRequest());
      const response = await fetch(`${backendUrl}/api/v1/updateMyProfile`, {
        method: "PUT",
        body: myForm,
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updateSuccess(data.user));
        dispatch(successMessage(data.message));
      } else {
        dispatch(errorMessage(data.message));
        dispatch(updateFaill());
      }
    } catch (err) {
      dispatch(errorMessage(err?.message));
    }
  };
  // logout functionality --
  const logoutHandler = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/logout`);
      const data = await response.json();
      if (response.ok) {
        dispatch(signoutSuccess());
        dispatch(successMessage(data.message));
        navigate("/");
      } else {
        dispatch(errorMessage(data.message));
      }
    } catch (err) {
      dispatch(errorMessage(err.message));
    }
  };
  // delete my account functionality--
  const deleteAccountHandler = async () => {
    try {
      dispatch(deleteStart());
      const response = await fetch(`${backendUrl}/api/v1/deleteMyProfile`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteSuccess());
        dispatch(successMessage(data.message));
        navigate("/");
      } else {
        dispatch(errorMessage(data.message));
        dispatch(deleteFaill());
      }
    } catch (err) {
      dispatch(errorMessage(err.message));
    }
  };

  return (
    <>
      <MetaData title={"Profile Page"} />
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="profile-page">
          {/* Banner Div-- */}
          <div className="profile-page-banner">
            <h2>Your Profile Page</h2>
          </div>
          {/* Container Div-- */}
          <div className="profile-page-container">
            <Link to={"/myOrder"}>
              <CardGiftcardIcon className="order-confirm-icon" />
            </Link>
            {user.role === "admin" && (
              <Link className="dashboard-link" to={"/admin/dashboard"}>
                <DashboardIcon className="dashboard-icon" />
                <p>{ordersLeft.length}</p>
              </Link>
            )}
            {/* Profile container-- */}
            <div className="profile-form-container">
              <form className="profile-form" onSubmit={updateProfileHandler}>
                <div className="image-div">
                  <input
                    className="file-input"
                    type="file"
                    accept="image/*"
                    onChange={avatarChangeHandler}
                  />
                  <img
                    src={avatar ? avatar : userData?.avatar?.url}
                    alt="profile-picture"
                  />
                  <CameraAltIcon className="camera-icon" />
                </div>
                <div className="input-div">
                  <label htmlFor="username"></label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={usernameChangeHandler}
                  />
                </div>
                <div className="input-div">
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={emailChangeHandler}
                  />
                </div>
                <button type="submit">Save</button>
              </form>
              <UpdatePassword />
              <div className="account-delete">
                <button className="btn" onClick={logoutHandler}>
                  Sign out
                </button>
                <button className="btn" onClick={deleteAccountHandler}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
