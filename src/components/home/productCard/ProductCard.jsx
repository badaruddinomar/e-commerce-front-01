/* eslint-disable react/prop-types */
// Components--
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
// Style file--
import "./productCard.scss";
// Images--

const Product = ({ product }) => {
  // Start rating components options--
  const startsOptions = {
    edit: false,
    color: "gray",
    activeColor: "gold",
    size: 20,
    value: product?.ratings,
    isHalf: true,
  };

  return (
    <>
      <Link className="product-card" to={`/product/${product._id}`}>
        <img className="product-img" src={product.images[0].url} />
        <p className="product-name">{product.name}</p>
        <div className="card-content">
          <span className="product-price">${product?.price}</span>
          <div className="reviews">
            <ReactStars {...startsOptions} className="icon" />
            <span>({product.reviews.length} Reviews)</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
