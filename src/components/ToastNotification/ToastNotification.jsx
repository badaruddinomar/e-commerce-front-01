// style file--
import "./toastNotification.scss";
// MUI Icons--
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  clearErrorMessage,
  clearSuccessMessage,
} from "../../reducers/toastMessage/toastReducer";

// eslint-disable-next-line react/prop-types
const ToastNotification = ({ classname, text }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (classname === "success") {
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);
    } else if (classname === "error") {
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 3000);
    }
  }, [dispatch, classname]);
  return (
    <div className={`toast ${classname} }`}>
      {classname === "success" ? (
        <CheckCircleOutlineIcon className="icon" style={{ color: "green" }} />
      ) : (
        <ErrorOutlineIcon className="icon" style={{ color: "red" }} />
      )}
      <p>{text}</p>
    </div>
  );
};

export default ToastNotification;
