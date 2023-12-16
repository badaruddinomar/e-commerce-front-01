import "./confirmOrder.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// All components--
import { saveProceedToPayment } from "../../reducers/cart/cartReducer";
import StepperComp from "./../stepperComp/StepperComp";
import MetaData from "./../MetaData";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Stored payment address--
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}, Pin Code : ${shippingInfo.pinCode} `;
  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);
  const tax = subTotal * 0.18;
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const totalPrice = subTotal + tax + shippingCharges;

  // Proceed to payment handler --
  const proceedToPaymentHandler = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    dispatch(saveProceedToPayment(data));
    navigate("/paymentProcess");
  };

  return (
    <>
      <MetaData title={"Confirm Order"} />
      <div className="confirm-order-page">
        {/* Banner Div-- */}
        <div className="confirm-order-banner">
          <h2>Confirm Your Order</h2>
        </div>

        {/* Container Div-- */}
        <div className="confirm-order-container">
          {/* Stepper Component */}
          <StepperComp activeStepNo={1} />

          {/* Shipping Info Div--  */}
          <div className="confirm-shipping-area">
            <h2>Your Shipping Information</h2>
            <div className="username">
              <b>Name : </b> <span>{user.name}</span>
            </div>
            <div className="phoneNo">
              <b>Phone : </b>
              <span>{shippingInfo.phoneNo}</span>
            </div>
            <div className="address">
              <b>Address : </b>
              <span>{address}</span>
            </div>
          </div>

          {/* Cart Items Div--  */}
          <div className="confirm-cart-items">
            <h2>Your Cart Items</h2>
            <div className="table-container">
              <table cellSpacing={"0px"}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                {cartItems?.map((item, ind) => {
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
                        <td className="product-price">
                          <span>{item.productQuantity}</span> *
                          <span> ${item.productPrice}</span> =
                          <span> ${item.totalPrice}</span>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>

          {/* Order Summery Div--  */}
          <div className="proceed-to-checkout">
            <h2>Order Summery</h2>
            <div className="price">
              <p className="subtotal">
                Subtotal: <span>${subTotal}</span>
              </p>
              <p className="shipping-charges">
                Shipping Charges: <span>${shippingCharges}</span>
              </p>
              <p className="gst">
                GST: <span>${tax}</span>
              </p>
              <p className="total-price">
                Total Price: <span>${totalPrice}</span>
              </p>
            </div>
            <button onClick={proceedToPaymentHandler} className="btn">
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
