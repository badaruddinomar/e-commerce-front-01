// style file--
import "./orderSuccess.scss";
// MUI Icons--
import DoneIcon from "@mui/icons-material/Done";
// Components--
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="order-success-page">
      <DoneIcon className="icon" />
      <p>Order Confimed</p>
      <Link to="/myOrder" className="link">
        My Order
      </Link>
    </div>
  );
};

export default OrderSuccess;
