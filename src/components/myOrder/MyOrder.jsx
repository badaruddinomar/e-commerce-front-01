// style file--
import "./myOrder.scss";
// hooks--
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components--
import { backendUrl } from "./../../helper";
import { Link } from "react-router-dom";
import MetaData from "./../MetaData";
// store data into the redux store--
import {
  getMyOrderFaill,
  getMyOrderRequest,
  getMyOrderSuccess,
} from "../../reducers/order/orderReducer";
import { errorMessage } from "../../reducers/toastMessage/toastReducer";
// MUI icons--
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const MyOrder = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  // Get first word of the username--
  const username = user.name.split(" ")[0];

  // get orders details--
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        dispatch(getMyOrderRequest());
        const response = await fetch(`${backendUrl}/api/v1/orders/me`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(getMyOrderSuccess(data.orders));
          setOrders(data.orders);
        } else {
          dispatch(getMyOrderFaill());
        }
      } catch (err) {
        dispatch(errorMessage(err.message));
        dispatch(getMyOrderFaill());
      }
    };
    fetchHandler();
  }, [dispatch]);
  return (
    <>
      <MetaData title="Your Orders" />
      <div className="my-order-page">
        <div className="my-order-banner">
          <h2>{username} Orders</h2>
        </div>
        <div className="my-order-container">
          <div className="order-table-container">
            {orders.length === 0 ? (
              <p className="item-none-text">
                You did not purchased any product.
              </p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Items Quantity</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{item._id}</td>
                        <td
                          style={{
                            color: `${
                              item.orderStatus == "Delivered" ? "green" : "red"
                            }`,
                          }}
                        >
                          {item.orderStatus}
                        </td>
                        <td>{item.orderItems.length}</td>
                        <td>${item.totalPrice}</td>
                        <td>
                          <Link to={`/singleOrder/${item._id}`}>
                            <OpenInNewIcon className="icon" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrder;
