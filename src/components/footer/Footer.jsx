// Style file--
import "./footer.scss";
// MUI Icons--
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
// Images--
import appStore from "../../img/pay/app.jpg";
import playStore from "../../img/pay/play.jpg";
import pay from "../../img/pay/pay.png";
import logo from "../../img/logo.png";
// Components--
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <img src={logo} className="logo" alt="footer-logo" />

      <div className="footer-container">
        {/* footer div 1-- */}
        <div className="footer-div-1">
          <div>
            <h4>Contact</h4>
            <address>
              <strong>Address: </strong>
              562 Wellington Road, Street #2, San Fransisco
            </address>
            <p>
              <strong>Phone:</strong> + 01 2222 435 / (+91 01 2345 6789)
            </p>
            <p>
              <strong>Hours: </strong>10:00 -18:00, Mon -Sat
            </p>
          </div>
          <h5>Follow Us</h5>
          <ul className="social-links">
            <li>
              <Link to={"#"}>
                <FacebookIcon className="icon" />
              </Link>
            </li>
            <li>
              <Link to={"#"}>
                <TwitterIcon className="icon" />
              </Link>
            </li>
            <li>
              <Link to={"#"}>
                <InstagramIcon className="icon" />
              </Link>
            </li>
            <li>
              <Link to={"#"}>
                <YouTubeIcon className="icon" />
              </Link>
            </li>
          </ul>
        </div>
        {/* footer div  -2  */}
        <div className="footer-div-2">
          <h4>About Us</h4>
          <ul>
            <li>
              <Link to={"#"} className="link">
                About Us
              </Link>
            </li>
            <li>
              <Link to={"#"} className="link">
                Delivery Information
              </Link>
            </li>
            <li>
              <Link to={"#"} className="link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to={"#"} className="link">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to={"#"} className="link">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        {/* footer div 3 -- */}
        <div className="footer-div-3">
          <h4>My Account</h4>
          <ul>
            <li>
              <Link className="link" to={"#"}>
                Sign In
              </Link>
            </li>
            <li>
              <Link className="link" to={"#"}>
                View Cart
              </Link>
            </li>
            <li>
              <Link className="link" to={"#"}>
                My Wallet
              </Link>
            </li>
            <li>
              <Link className="link" to={"#"}>
                Track My Order
              </Link>
            </li>
            <li>
              <Link className="link" to={"#"}>
                Help
              </Link>
            </li>
          </ul>
        </div>
        {/* footer div -4 */}
        <div className="footer-div-4">
          <h4>Install Our App</h4>
          <p>From App Store Or Google Play</p>
          <div className="apps-image-container">
            <img src={appStore} alt="app-store-image" />
            <img src={playStore} alt="play-store-image" />
          </div>
          <p>Secured Payment Gateway</p>
          <img src={pay} className="payment" alt="payment-image" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
