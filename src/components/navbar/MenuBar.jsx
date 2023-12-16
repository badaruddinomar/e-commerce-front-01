// style file--
import "./menubar.scss";
// MUI Icons--
import CloseIcon from "@mui/icons-material/Close";
// hooks--
import { useRef } from "react";
// Components--
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MenuBar = ({ active, setBurgerActive }) => {
  const menulinks = useRef();
  // Toggle Humburger Menu--
  const closeBurgerHandler = () => {
    setBurgerActive(!active);
  };

  // Active Menu Hanlder--
  const menuLinkActiveHandler = (e) => {
    menulinks.current.childNodes.forEach((el) => {
      el.firstChild.style.color = "#11161e";
    });
    if (e.target.classList.contains("link")) {
      e.target.style.color = "#ff6d00";
    }
  };

  return (
    <aside className={`${active ? "menubar menu-active" : "menubar"}`}>
      <CloseIcon className="close-icon" onClick={closeBurgerHandler} />
      <ul ref={menulinks} onClick={menuLinkActiveHandler}>
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
    </aside>
  );
};

export default MenuBar;
