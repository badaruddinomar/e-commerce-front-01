// Style File--
import "./productCart.scss";
// Hooks--
import { useDispatch, useSelector } from "react-redux";
// MUI Icons--
import DeleteIcon from "@mui/icons-material/Delete";
// Componensts--
import { Link } from "react-router-dom";
import { removeCartItem } from "../../reducers/cart/cartReducer";

const ProductCart = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { isAuthenticated } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const totalProductPrice = cartItems.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);

  return (
    <>
      <div className="product-cart-page">
        {/* Banner-- */}
        <div className="product-cart-banner">
          <h2>Your product cart</h2>
        </div>
        {/* Container-- */}
        <div className="product-cart-container">
          <div className="table-container">
            {cartItems.length === 0 ? (
              <p className="item-none-text">No Product in Your Cart</p>
            ) : (
              <table cellSpacing={"0px"}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{ind + 1}</td>
                        <td>
                          <Link to={`/product/${item.productId}`}>
                            <img
                              className="product-image"
                              src={item.image}
                              alt="product-image"
                            />
                          </Link>
                        </td>
                        <td className="product-name">
                          <Link
                            className="link"
                            to={`/product/${item.productId}`}
                          >
                            {item.productName.slice(0, 10)}...
                          </Link>
                        </td>
                        <td>{item.productQuantity}</td>
                        <td>${item.productPrice}</td>
                        <td>${item.totalPrice}</td>
                        <td
                          onClick={() =>
                            dispatch(removeCartItem(item.productId))
                          }
                        >
                          <DeleteIcon className="icon" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* Cart Total-- */}
        {cartItems.length > 0 && (
          <div className="proceed">
            <div className="cart-total-price">
              <p>Cart Total</p>
              <p>${totalProductPrice}</p>
            </div>
            <Link
              className="btn"
              to={`${isAuthenticated ? "/shipping" : "/login"}`}
            >
              Check Out
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCart;
