// Style File--
import "./ordersList.scss";
// All Hooks--
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// MUI Icons--
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// Components--
import { Link } from "react-router-dom";
import { backendUrl } from "../../helper";
import MetaData from "../MetaData";
import PreLoader from "./../preLoader/PreLoader";
import ToastNotification from "../ToastNotification/ToastNotification";
// store and get data from the redux store--
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
const OrdersList = () => {
  const { successMsg, errorMsg } = useSelector((state) => state.toastReducer);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Get All Orders List From The DB--
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/admin/orders`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHandler();
  }, []);

  // Delete Order Handler --
  const orderDeleteHandler = async (orderId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backendUrl}/api/v1/admin/order/${orderId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(successMessage(data.message));
        setLoading(false);
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
      <MetaData title={"Orders List"} />
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="orders-list">
          {/* Banner Div-- */}
          <div className="orders-list-banner">
            <h2>All Orders List</h2>
          </div>
          {/* Container-- */}
          <div className="orders-list-container">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Date & Time</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{order._id}</td>
                        <td
                          style={{
                            color: `${
                              order.orderStatus === "Delivered"
                                ? "green"
                                : "red"
                            }`,
                          }}
                        >
                          {order.orderStatus}
                        </td>
                        <td>{order.orderItems.length}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                          <Link
                            className="link"
                            to={`/admin/order/details/${order._id}`}
                          >
                            <EditIcon className="icon" />
                          </Link>
                          <span>
                            <DeleteIcon
                              className="icon"
                              onClick={() => orderDeleteHandler(order._id)}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersList;
