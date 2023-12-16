import "./getSIngleOrder.scss";
import { backendUrl } from "./../../helper";
// Hooks--
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// store data into redux store--
import {
  getSingleOrderFaill,
  getSingleOrderRequest,
  getSingleOrderSuccess,
} from "../../reducers/order/orderReducer";
// components--
import MetaData from "./../MetaData";

const GetSingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState({});
  // store all order into into one variable--
  const address = `${orderData?.shippingInfo?.address}, ${orderData?.shippingInfo?.city}, ${orderData?.shippingInfo?.state}, ${orderData?.shippingInfo?.country}, Pin Code : ${orderData?.shippingInfo?.pinCode} `;
  // Get Single Orders Details--
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        dispatch(getSingleOrderRequest());
        const response = await fetch(`${backendUrl}/api/v1/order/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(getSingleOrderSuccess(data.order));
          setOrderData(data.order);
        } else {
          dispatch(getSingleOrderFaill());
        }
      } catch (err) {
        dispatch(getSingleOrderFaill());
      }
    };
    fetchHandler();
  }, [id, dispatch]);
  return (
    <>
      <MetaData title={"Single Order Page"} />
      <div className="single-order-page">
        {/* Banner Div-- */}
        <div className="single-order-banner">
          <h2>Single Order Details</h2>
        </div>
        {/* Container-- */}
        <div className="single-order-container">
          {/* Shipping Info-- */}
          <div className="shipping-info">
            <h3>Shipping Information</h3>
            <p>
              <b>Name:</b> <span>{orderData?.user?.name}</span>
            </p>
            <p>
              <b>Phone:</b>
              <span>{orderData?.shippingInfo?.phoneNo}</span>
            </p>
            <p>
              <b>Address:</b> <span>{address}</span>
            </p>
          </div>
          {/* Order Items Info-- */}
          <div className="order-items">
            <h3>Your Order Items</h3>
            <div className="table-container">
              <table cellSpacing={"0px"}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                {orderData?.orderItems?.map((item, ind) => {
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
                        <td>{item?.productQuantity}</td>
                        <td className="product-price">
                          <span> ${item?.productPrice}</span>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
          {/* Order Summery-- */}
          <div className="order-summery">
            <h3>Order Summery</h3>
            <p>
              <b>Subtotal:</b>
              <span>{orderData?.itemsPrice}</span>
            </p>
            <p>
              <b>Shipping Charges: </b>
              <span>${orderData?.shippingPrice}</span>
            </p>
            <p>
              <b>GST: </b>
              <span>${orderData?.taxPrice}</span>
            </p>
            <p>
              <b>Total Price: </b>
              <span>${orderData?.totalPrice}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetSingleOrder;
