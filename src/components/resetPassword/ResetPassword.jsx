// style file--
import "./resetPassword.scss";
// components--
import PasswordInputBox from "./../passwordInputBox/PasswordInputBox";
import { backendUrl } from "../../helper";
import ToastNotification from "../ToastNotification/ToastNotification";
import PreLoader from "../preLoader/PreLoader";
// hooks--
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// store and get data from redux store--
import {
  resetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
} from "../../reducers/user/userReducer";
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";

const ResetPassword = () => {
  const { errorMsg } = useSelector((state) => state.toastReducer);
  const { loading } = useSelector((state) => state.userReducer);
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const newPasswordChangeHandler = (initialPassword) => {
    setNewPassword(initialPassword);
  };
  const confirmPasswordHandler = (initialPassword) => {
    setConfirmPassword(initialPassword);
  };
  // reset password handler--
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(resetPasswordRequest());
      const response = await fetch(
        `${backendUrl}/api/v1/password/reset/${token}`,
        {
          method: "PUT",
          body: JSON.stringify({ email, newPassword, confirmPassword }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(resetPasswordSuccess(data.user));
        dispatch(successMessage(data.message));
        navigate("/login");
      } else {
        dispatch(resetPasswordFail());
        dispatch(errorMessage(data.message));
      }
      console.log(data);
    } catch (err) {
      dispatch(resetPasswordFail());
      dispatch(errorMessage(err.message));
    }
  };
  return (
    <>
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="reset-password-page">
          {/* banner div */}
          <div className="reset-password-banner">
            <h2>Reset Your Password</h2>
          </div>
          {/* container- */}
          <div className="reset-password-container">
            <form
              className="reset-password-form"
              onSubmit={resetPasswordHandler}
            >
              <div className="input-div">
                <label htmlFor="email"></label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={emailChangeHandler}
                />
              </div>
              <PasswordInputBox
                initialPassword={newPassword}
                passwordHandler={newPasswordChangeHandler}
                placeholder={"Enter your new password"}
                id={"new-password"}
              />
              <PasswordInputBox
                initialPassword={confirmPassword}
                passwordHandler={confirmPasswordHandler}
                placeholder={"Confirm password"}
                id={"confirm-password"}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
