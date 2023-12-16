// imported packages for google authentication--
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
// Hooks
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Store data into the Redux Store--
import { loginFail, loginSuccess } from "../../reducers/user/userReducer";
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
import { backendUrl } from "../../helper";
// Style file--
import "./googleAuth.scss";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Google auth handler--
  const googleAuthHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await fetch(`${backendUrl}/api/v1/auth/google`, {
        method: "POST",
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
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
      }
    } catch (err) {
      dispatch(loginFail());
      dispatch(errorMessage(err?.message));
    }
  };
  return (
    <button
      className="google-btn"
      style={{ background: "#EA4335" }}
      onClick={googleAuthHandler}
    >
      Continue with google
    </button>
  );
};

export default OAuth;
