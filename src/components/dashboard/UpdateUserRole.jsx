// style file--
import "./updateUserRole.scss";
// components--
import { backendUrl } from "../../helper";
import MetaData from "./../MetaData";
import PreLoader from "./../preLoader/PreLoader";
import ToastNotification from "../ToastNotification/ToastNotification";
// Hooks--
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// store and get data from the redux store--
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
const UpdateUserRole = () => {
  const { errorMsg } = useSelector((state) => state.toastReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  //  Update User Role Handler--
  const userRoleUpdateHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/v1/admin/user/${id}`, {
        method: "PUT",
        body: JSON.stringify({ role }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        dispatch(successMessage(data.message));
        navigate("/admin/user/list");
      } else {
        dispatch(errorMessage(data.message));
        setLoading(false);
      }
    } catch (err) {
      dispatch(errorMessage(err.message));
      setLoading(false);
    }
  };
  return (
    <>
      <MetaData title={"Update User Role"} />
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="user-role-page">
          {/* Banner Div-- */}
          <div className="user-role-banner">
            <h2>Update User Role</h2>
          </div>
          {/* Container-- */}
          <div>
            <div className="user-role-container">
              <form className="user-role-form" onSubmit={userRoleUpdateHandler}>
                <div className="input-div">
                  <label htmlFor="role"></label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>Select Role</option>
                    {["user", "admin"].map((role) => {
                      return <option key={role}>{role}</option>;
                    })}
                  </select>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUserRole;
