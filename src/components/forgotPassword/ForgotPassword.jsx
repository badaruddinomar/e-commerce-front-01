import "./forgotPassword.scss";
import { backendUrl } from "../../helper";
// Hooks--
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Store data into the redux store--
import {
  forgotPasswordFaill,
  forgotPasswordRequest,
  forgotPasswordSuccess,
} from "../../reducers/user/userReducer";
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
// Components--
import PreLoader from "../preLoader/PreLoader";
import ToastNotification from "../ToastNotification/ToastNotification";
import MetaData from "./../MetaData";

const ForgotPassword = () => {
  const { errorMsg, successMsg } = useSelector((state) => state.toastReducer);
  const { loading } = useSelector((state) => state.userReducer);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  // Forgot password handler --
  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(forgotPasswordRequest());
      const response = await fetch(`${backendUrl}/api/v1/password/forgot`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(forgotPasswordSuccess());
        dispatch(successMessage(data.message));
        setEmail("");
      } else {
        dispatch(forgotPasswordFaill());
        dispatch(errorMessage(data.message));
      }
    } catch (err) {
      dispatch(errorMessage(err.message));
    }
  };
  return (
    <>
      <MetaData title={"Forgot Password"} />
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}

      {loading ? (
        <PreLoader />
      ) : (
        <div className="forgot-password-page">
          {/* Banner Div-- */}
          <div className="forgot-password-banner">
            <h2>Forgot Your Password?</h2>
          </div>
          {/* Container-- */}
          <div className="forgot-password-container">
            <div className="heading">
              <h3>If you forgot your password</h3>
              <p>Step 1 : send your email.</p>
            </div>
            <div className="form-container">
              <form
                className="forgot-password-form"
                onSubmit={forgotPasswordHandler}
              >
                <div className="input-div">
                  <label htmlFor="email"></label>
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={emailChangeHandler}
                  />
                </div>
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
