// style file--
import "./updatePassword.scss";
// hooks--
import { useState } from "react";
import { useDispatch } from "react-redux";
// components--
import PasswordInputBox from "../passwordInputBox/PasswordInputBox";
import { backendUrl } from "../../helper";
// store and get data from the redux store--
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
import {
  updateFaill,
  updateRequest,
  updateSuccess,
} from "../../reducers/user/userReducer";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const oldPasswordChangeHandler = (initialPassword) => {
    setOldPassword(initialPassword);
  };
  const newPasswordChangeHandler = (initialPassword) => {
    setNewPassword(initialPassword);
  };
  const confimrPasswordChangeHandler = (initialPassword) => {
    setConfirmPassword(initialPassword);
  };
  // update password functionality--
  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateRequest());
      const response = await fetch(`${backendUrl}/api/v1/password/update`, {
        method: "PUT",
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(updateSuccess(data.user));
        dispatch(successMessage(data.message));
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        dispatch(errorMessage(data.message));
        dispatch(updateFaill());
      }
    } catch (err) {
      dispatch(errorMessage(err.message));
    }
  };
  return (
    <div className="update-password-page">
      <div className="update-password-heading">
        <h2>Update Your Password</h2>
      </div>
      <div className="update-password-container">
        <form className="update-password-form">
          <PasswordInputBox
            initialPassword={oldPassword}
            passwordHandler={oldPasswordChangeHandler}
            placeholder={"Enter your old password"}
            id={"old-password"}
          />
          <PasswordInputBox
            initialPassword={newPassword}
            passwordHandler={newPasswordChangeHandler}
            placeholder={"Enter your new password"}
            id={"new-password"}
          />
          <PasswordInputBox
            initialPassword={confirmPassword}
            passwordHandler={confimrPasswordChangeHandler}
            placeholder={"Confirm password"}
            id={"confimr-password"}
          />
          <button type="submit" onClick={updatePasswordHandler}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
