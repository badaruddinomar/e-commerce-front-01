// style file--
import "./signup.scss";
// hooks--
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Images--
import avatarImage from "../../img/avatar.png";
// store and get data from the redux store--
import {
  loginSuccess,
  loginFail,
  loginRequest,
} from "../../reducers/user/userReducer";
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
// components--
import PasswordInputBox from "./../passwordInputBox/PasswordInputBox";
import { backendUrl } from "./../../helper";
import ToastNotification from "./../ToastNotification/ToastNotification";
import PreLoader from "../preLoader/PreLoader";
import GoogleAuth from "../googleAuth/GoogleAuth";
import MetaData from "../MetaData";

const Signup = () => {
  const { loading } = useSelector((state) => state.userReducer);
  const { errorMsg } = useSelector((state) => state.toastReducer);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avataPreview, setAvataPreview] = useState(avatarImage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (initialPassword) => {
    setPassword(initialPassword);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const avatarChangeHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvataPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // sign up handler--
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const myForm = new FormData();
      myForm.set("name", username);
      myForm.set("password", password);
      myForm.set("email", email);
      myForm.set("avatar", avatar);

      dispatch(loginRequest());
      const response = await fetch(`${backendUrl}/api/v1/register`, {
        method: "POST",
        body: myForm,
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
      <MetaData title={"Signup Page"} />
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="signup-section">
          <div className="signup-banner">
            <h2>Signup to Get Started</h2>
          </div>
          <div className="signup-container">
            <form onSubmit={submitHandler} className="signup-form">
              <div className="input-div">
                <label htmlFor="user"></label>
                <input
                  type="text"
                  id="user"
                  placeholder="Enter your user"
                  value={username}
                  onChange={usernameChangeHandler}
                />
              </div>
              <PasswordInputBox
                initialPassword={password}
                passwordHandler={passwordChangeHandler}
                placeholder={"Enter your  password"}
                id={"password"}
              />
              <div className="input-div">
                <label htmlFor="email"></label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={emailChangeHandler}
                />
              </div>
              <div className="input-div file-input-div">
                <label htmlFor="userphoto"></label>
                <input
                  type="file"
                  accept="image/*"
                  id="userphoto"
                  name="avatar"
                  className="file-input"
                  onChange={avatarChangeHandler}
                />
              </div>
              <div className="image-preview-div">
                <img
                  className="image-preview"
                  src={avataPreview}
                  alt="avatar-preview"
                />
              </div>

              <button>Signup</button>
            </form>
            <GoogleAuth />
            <div className="have-account">
              <p>Do you have account?</p>
              <Link className="link" to={"/login"}>
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
