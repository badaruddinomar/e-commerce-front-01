import { Link } from "react-router-dom";
// Menubar--
import MenuBar from "./MenuBar";
import "./navbar.scss";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
// MUI Icons--
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
// Images--
import logo from "./../../img/logo.png";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [burgerActive, setBurgerActive] = useState(false);
  const navlinks = useRef();

  const burgerHandler = () => {
    setBurgerActive(true);
  };

  // active links handler--
  const navLinkActiveHandler = (e) => {
    navlinks.current.childNodes.forEach((el) => {
      el.firstChild.style.color = "#11161e";
    });
    if (e.target.classList.contains("link")) {
      e.target.style.color = "#ff6d00";
    }
  };

  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="burger" onClick={burgerHandler}>
            <MenuIcon className="icon" />
          </div>
          <div>
            <Link to={"/"} className="logo">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <ul
            className="links-ul"
            ref={navlinks}
            onClick={navLinkActiveHandler}
          >
            <li>
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="link">
                Product
              </Link>
            </li>
            <li>
              <Link to="/contact" className="link">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="link">
                About
              </Link>
            </li>
          </ul>
          <div className="nav-right">
            <Link to={isAuthenticated ? "/profile" : "/login"} className="link">
              <PersonIcon className="icon" />
            </Link>
            <Link to="/cart" className="link">
              <ShoppingCartIcon className="icon" />
              <span className="cart-notification">{cartItems.length}</span>
            </Link>
            <Link to="/search" className="link">
              <SearchIcon className="icon" />
            </Link>
          </div>
        </div>
      </nav>
      <MenuBar active={burgerActive} setBurgerActive={setBurgerActive} />
    </>
  );
};

export default Navbar;
