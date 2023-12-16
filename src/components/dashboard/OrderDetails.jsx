// Style File--
import "./orderDetails.scss";
// Hooks--
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// components--
import { backendUrl } from "../../helper";
import MetaData from "../MetaData";
import PreLoader from "./../preLoader/PreLoader";
import ToastNotification from "../ToastNotification/ToastNotification";
// store and get data from the redux store--
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
const OrderDetails = () => {
  const { successMsg, errorMsg } = useSelector((state) => state.toastReducer);
  const [order, setOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  // Get Order Details Info From The DB--
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/order/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setOrder(data.order);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHandler();
  }, [id]);

  // Store all address info into the one variable--
  const address = `${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.state}, ${order?.shippingInfo?.country}, ${order?.shippingInfo?.pinCode}`;
  console.log(order);

  // Update Order Status Handler--
  const updateOrderStatusHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/v1/admin/order/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: orderStatus }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(successMessage(data.message));
        setLoading(false);
      } else {
        dispatch(errorMessage(data.message));
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      dispatch(errorMessage(err.message));
    }
  };
  return (
    <>
      <MetaData title={"Order Details Page"} />
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="order-details-page">
          {/* Banner Div-- */}
          <div className="order-details-banner">
            <h2>Order Details Page</h2>
          </div>
          {/* Conainer Div-- */}
          <div className="order-details-container">
            {/* Shipping Info Div--  */}
            <div className="shipping-info">
              <h2>Order Shipping Information</h2>
              <div className="username">
                <b>Name : </b> <span>{order?.user?.name}</span>
              </div>
              <div className="email">
                <b>Email: </b>
                <span>{order?.user?.email}</span>
              </div>
              <div className="phoneNo">
                <b>Phone : </b>
                <span>{order?.shippingInfo?.phoneNo}</span>
              </div>
              <div className="address">
                <b>Address : </b>
                <span>{address}</span>
              </div>
            </div>
            {/* Order Items Info--  */}
            <div className="order-items">
              <h2>Order Items</h2>
              <div className="table-container">
                <table cellSpacing={"0px"}>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  {order?.orderItems?.map((item, ind) => {
                    return (
                      <tbody key={ind} className="item">
                        <tr>
                          <td>{ind + 1}</td>
                          <td>
                            <Link to={`/product/${item.productId}`}>
                              <img
                                className="product-image"
                                src={item.image}
                                alt="cart-image"
                              />
                            </Link>
                          </td>
                          <td>
                            <Link
                              className="link"
                              to={`/product/${item.productId}`}
                            >
                              {item.productName}
                            </Link>
                          </td>
                          <td
                            style={{
                              color: `${
                                order.orderStatus === "Delivered"
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          >
                            {order?.orderStatus}
                          </td>
                          <td>{item.productQuantity}</td>
                          <td className="product-price">
                            <span> ${item.productPrice}</span>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
            {/* Order Summery Info--  */}
            <div className="order-summery">
              <h2>Order Summery</h2>
              <div className="price">
                <p className="shipping-charges">
                  Shipping Charges: <span>${order?.shippingPrice}</span>
                </p>
                <p className="gst">
                  GST: <span>${order?.taxPrice}</span>
                </p>
                <p className="total-price">
                  Total Price: <span>${order?.totalPrice}</span>
                </p>
              </div>
            </div>
            {/* Update Order Status Form--  */}
            <div className="update-order">
              <h2>Update Order Status</h2>
              <form
                className="update-order-form"
                onSubmit={updateOrderStatusHandler}
              >
                <div className="input-div">
                  <select
                    name=""
                    id="status"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                    <option value="Status">Select Status</option>
                    {["Processing", "Delivered", "Shipped"].map((elm, ind) => {
                      return <option key={ind}>{elm}</option>;
                    })}
                  </select>
                </div>
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
