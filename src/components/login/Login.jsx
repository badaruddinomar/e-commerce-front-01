// style file--
import "./login.scss";
// Hooks--
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Store data to the Redux--
import {
  loginSuccess,
  loginRequest,
  loginFail,
} from "../../reducers/user/userReducer";
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
// Components--
import PasswordInputBox from "../passwordInputBox/PasswordInputBox";
import { backendUrl } from "../../helper";
import ToastNotification from "../ToastNotification/ToastNotification";
import PreLoader from "../preLoader/PreLoader";
import GoogleAuth from "../googleAuth/GoogleAuth";
import MetaData from "./../MetaData";

const Login = () => {
  const { errorMsg } = useSelector((state) => state.toastReducer);
  const { loading } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (initialPassword) => {
    setPassword(initialPassword);
  };

  // Post Login informations--
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginRequest());
      const response = await fetch(`${backendUrl}/api/v1/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess(data.user));
        dispatch(successMessage(data.message));
        navigate("/");
      } else {
        dispatch(loginFail());
        dispatch(errorMessage(data.message));
      }
    } catch (err) {
      dispatch(loginFail());
      dispatch(errorMessage(err?.message));
    }
  };

  return (
    <>
      <MetaData title={"Login Page"} />
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="login-section">
          {/* Banner Div-- */}
          <div className="login-banner">
            <h2>Login to Get Started</h2>
          </div>
          {/* Conainer-- */}
          <div className="login-container">
            <form onSubmit={submitHandler} className="login-form">
              <div className="input-div">
                <label htmlFor="useremail"></label>
                <input
                  type="email"
                  id="useremail"
                  placeholder="enter your email"
                  value={email}
                  onChange={emailChangeHandler}
                />
              </div>
              <PasswordInputBox
                initialPassword={password}
                passwordHandler={passwordChangeHandler}
                placeholder={"Enter your password"}
                id={"password"}
              />
              <button>Login</button>
            </form>
            <GoogleAuth />
            <div className="have-account">
              <Link to={"/forgotPassword"} className="link">
                Forgot Password?
              </Link>
              <Link to={"/signup"} className="link">
                Signup
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

// start from  7.58  minutes
