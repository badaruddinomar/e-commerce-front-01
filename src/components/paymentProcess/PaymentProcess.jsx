// style file--
import "./paymentProcess.scss";
// stripe important components--
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// MUI Icons--
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
// Hooks--
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
// store data to the
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
import {
  orderFaill,
  orderRequest,
  orderSuccess,
} from "../../reducers/order/orderReducer";
// components
import PreLoader from "./../preLoader/PreLoader";
import ToastNotification from "./../ToastNotification/ToastNotification";
import StepperComp from "../stepperComp/StepperComp";
import { backendUrl } from "../../helper";
import MetaData from "./../MetaData";

const PaymentProcess = () => {
  const { proceedToPayment, shippingInfo, cartItems } = useSelector(
    (state) => state.cartReducer
  );
  const { errorMsg } = useSelector((state) => state.toastReducer);
  const { loading } = useSelector((state) => state.orderReducer);
  const { user } = useSelector((state) => state.userReducer);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const payBtn = useRef();
  const navigate = useNavigate();

  const orderInfo = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: proceedToPayment.subTotal,
    taxPrice: proceedToPayment.tax,
    shippingPrice: proceedToPayment.shippingCharges,
    totalPrice: proceedToPayment.totalPrice,
  };
  // saving order data to the database --
  const orderHandler = async () => {
    try {
      dispatch(orderRequest());
      const response = await fetch(`${backendUrl}/api/v1/order/new`, {
        method: "POST",
        body: JSON.stringify(orderInfo),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(orderSuccess(data.order));
        dispatch(successMessage(data.message));
        navigate("/orderSuccess");
      } else {
        dispatch(errorMessage("Your order not confirmed!"));
        dispatch(orderFaill());
      }
    } catch (err) {
      dispatch(errorMessage(err.message));
      dispatch(orderFaill());
    }
  };
  // save payment data to the database --
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const response = await fetch(`${backendUrl}/api/v1/paymentProcess`, {
        method: "POST",
        body: JSON.stringify({
          amount: Math.round(proceedToPayment.totalPrice * 100),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        dispatch(errorMessage(result.error.message));
      } else {
        if (result.paymentIntent.status === "succeeded") {
          orderInfo.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          // finally saving the data to data database--
          await orderHandler();
        } else {
          dispatch(
            errorMessage("There is some issue while proccessing payment!")
          );
        }
      }
    } catch (err) {
      payBtn.current.disabled = false;
    }
  };
  return (
    <>
      <MetaData title={"Payment Process"} />
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="payment-page">
          {/* banner div-- */}
          <div className="payment-banner">
            <h2>Confirm Your Payment</h2>
          </div>
          {/* Container-- */}
          <div className="payment-conainer">
            <StepperComp activeStepNo={2} />
            <form className="payment-form">
              <div className="input-div">
                <CreditCardIcon className="icon" />
                <CardNumberElement className="input" />
              </div>
              <div className="input-div">
                <EventIcon className="icon" />
                <CardExpiryElement className="input" />
              </div>
              <div className="input-div">
                <VpnKeyIcon className="icon" />
                <CardCvcElement className="input" />
              </div>
              <button ref={payBtn} type="submit" onClick={submitHandler}>
                Pay - ${proceedToPayment.totalPrice}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default PaymentProcess;
