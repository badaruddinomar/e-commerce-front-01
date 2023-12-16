// Hooks--
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Components--
import { backendUrl } from "../../helper";
import { Link } from "react-router-dom";
import MetaData from "../MetaData";
import ToastNotification from "../ToastNotification/ToastNotification";
// Style File--
import "./userList.scss";
// MUI Icons--
import EditIcon from "@mui/icons-material/Edit";
const UserList = () => {
  const { successMsg } = useSelector((state) => state.toastReducer);
  const [users, setUsers] = useState([]);
  // Get All users list from DB--
  useEffect(() => {
    const fetchHandler = async () => {
      const response = await fetch(`${backendUrl}/api/v1/admin/users`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUsers(data.users);
    };
    fetchHandler();
  }, []);

  return (
    <>
      <MetaData title={"User List"} />
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      <div className="user-list-page">
        {/* Banner Div-- */}
        <div className="user-list-banner">
          <h2>{`All User's List`}</h2>
        </div>
        {/* Container Div-- */}
        <div className="user-list-container">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => {
                  return (
                    <tr key={user?._id}>
                      <td>{user?.name}</td>
                      <td>{user?.email}</td>
                      <td>{user?.role}</td>
                      <td>
                        <Link
                          className="link"
                          to={`/admin/update/role/${user._id}`}
                        >
                          <EditIcon className="icon" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
