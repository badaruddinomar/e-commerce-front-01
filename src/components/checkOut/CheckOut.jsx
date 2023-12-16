// These packages are used for Stripe payment gateway--
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// Here Stripe publishable secret key--
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
// Here imported component--
import PaymentProcess from "../paymentProcess/PaymentProcess";

const CheckOut = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentProcess />
    </Elements>
  );
};

export default CheckOut;
