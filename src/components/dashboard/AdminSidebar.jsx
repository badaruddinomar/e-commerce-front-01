// Style File--
import "./adminSidebar.scss";
// MUI Icons--
import SettingsIcon from "@mui/icons-material/Settings";
import ListIcon from "@mui/icons-material/List";
import CloseIcon from "@mui/icons-material/Close";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleIcon from "@mui/icons-material/People";
// Component and Hook--
import { Link } from "react-router-dom";
import { useState } from "react";

const AdminSidebar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  // Toggle the Sidebar by Clicking--
  const sidebarToggler = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div className="sidebar-page">
      {/* Sidebar Header-- */}
      <div className="sidebar-top">
        <SettingsIcon className="icon" />
        <h3>Settings</h3>
        {sidebarActive && (
          <CloseIcon className="icon" onClick={sidebarToggler} />
        )}
        {!sidebarActive && (
          <ListIcon className="list-icon" onClick={sidebarToggler} />
        )}
      </div>
      {/* Sidebar Container-- */}
      <div
        className={
          sidebarActive
            ? "sidebar-container sidebar-active" // Toggle the Sidebar--
            : "sidebar-container"
        }
      >
        <div className="settings">
          <div>
            <CategoryIcon className="icon" />
            <Link className="link" to={"/admin/products"}>
              All Products
            </Link>
          </div>
          <div>
            <AddCircleOutlineIcon className="icon" />
            <Link className="link" to={"/admin/create/product"}>
              Create Products
            </Link>
          </div>
          <div>
            <ReceiptLongIcon className="icon" />
            <Link className="link" to={"/admin/orders"}>
              Orders
            </Link>
          </div>
          <div>
            <PeopleIcon className="icon" />
            <Link className="link" to={"/admin/user/list"}>
              Users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
