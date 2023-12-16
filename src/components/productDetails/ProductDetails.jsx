// style file--
import "./productDetails.scss";
// MUI Carousel component--
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import Rating from "@mui/material/Rating";
// Hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// components--
import MetaData from "./../MetaData";
import ProductReviewCard from "./ProductReviewCard";
import { backendUrl } from "../../helper";
import ToastNotification from "../ToastNotification/ToastNotification";
// store data into the redux--
import { addToCart } from "../../reducers/cart/cartReducer";
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
import {
  reviewRequest,
  reviewSuccess,
  reviewFaill,
} from "../../reducers/review/reviewReducer";
import PreLoader from "./../preLoader/PreLoader";
import {
  productDetailsFaill,
  productDetailsRequest,
  productDetailsSuccess,
} from "../../reducers/products/productDetailsReducer";

const ProductDetails = () => {
  const { successMsg, errorMsg } = useSelector((state) => state.toastReducer);
  const { loading } = useSelector((state) => state.reviewReducer);
  const { product } = useSelector((state) => state.productDetailsReducer);
  const [productQuantity, setProductQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // All funtions are here--
  const incrementProductQuantity = () => {
    let inc = productQuantity + 1;
    if (inc > product.stock) return;
    setProductQuantity(inc);
  };
  const decrementProductQuantity = () => {
    let inc = productQuantity - 1;
    if (inc <= 0) return;
    setProductQuantity(inc);
  };
  // fetch product details --
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        dispatch(productDetailsRequest());
        const response = await fetch(`${backendUrl}/api/v1/product/${id}`);
        const data = await response.json();
        if (response.ok) {
          dispatch(productDetailsSuccess(data.product));
        } else {
          dispatch(productDetailsFaill());
        }
      } catch (err) {
        dispatch(productDetailsFaill());
      }
    };
    fetchHandler();
  }, [id, dispatch]);

  // ratings options-
  const starRatingsOptions = {
    edit: false,
    color: "gray",
    activeColor: "gold",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.ratings,
    isHalf: true,
  };
  // add to cart handler --
  const addToCartHandler = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/product/${id}`);
      const data = await response.json();
      if (response.ok) {
        dispatch(
          addToCart({
            productId: id,
            productName: data.product.name,
            productPrice: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            productQuantity,
            totalPrice: productQuantity * data.product.price,
          })
        );
        dispatch(successMessage("Product added to cart."));
      } else {
        dispatch(errorMessage("Product does not added!"));
      }
    } catch (err) {
      dispatch(errorMessage(err.message));
    }
  };
  // add review handler --
  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      if (review === "" || rating === 0) {
        dispatch(errorMessage("Please write something!"));
        return;
      }
      const myForm = new FormData();

      myForm.set("rating", rating);
      myForm.set("comment", review);
      myForm.set("productId", id);

      dispatch(reviewRequest());
      const response = await fetch(`${backendUrl}/api/v1/review`, {
        method: "PUT",
        body: myForm,

        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(successMessage(data.message));
        dispatch(reviewSuccess());
        setReview("");
        setRating(0);
      } else {
        dispatch(errorMessage(data.message));
        dispatch(reviewFaill());
      }
    } catch (err) {
      dispatch(errorMessage(err.message));
    }
  };

  return (
    <>
      <MetaData title={product.name} />
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="product-details-page">
          {/* banner-section */}
          <div className="product-details-banner">
            <h2>Product Details Page</h2>
          </div>
          {/* container-- */}
          <div className="product-details-container">
            {/* image slider-- */}
            <div className="left-div">
              <Carousel>
                {product?.images?.map((img, ind) => {
                  return <img src={img.url} alt={img + 1} key={ind} />;
                })}
              </Carousel>
            </div>
            {/* product description-- */}
            <div className="right-div product-desc">
              <div className="product-desc__1">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-id">Product ID- {product._id}</p>
                <h2 className="product-price">${product.price}</h2>
                <p className="product-status">
                  <span>Availibility : </span>
                  <b className={product.stock > 0 ? "inStock" : "notInStock"}>
                    {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                  </b>
                </p>
                <p className="product-category">
                  <span>Category : </span>
                  {product.category}
                </p>
                <div className="product-reviews-container">
                  <ReactStars {...starRatingsOptions} />

                  <span className="product-reviews">
                    ({product.numOfReviews} Reviews)
                  </span>
                </div>
                <p className="product-description">{product.description}</p>
              </div>
              <div className="quantity-container">
                <div>
                  <button
                    className="btn-increment"
                    onClick={incrementProductQuantity}
                  >
                    +
                  </button>
                  <input
                    type="number"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  />
                  <button
                    className="btn-decrement"
                    onClick={decrementProductQuantity}
                  >
                    -
                  </button>
                </div>
                <button
                  disabled={product.stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          {/* add review container-- */}
          <div className="add-review-container">
            <div className="total-review">
              <h4>Overall Review</h4>
              <p className="total-ratigns">{product?.ratings}</p>
              <p className="total-reviews">({product?.numOfReviews} Reviews)</p>
            </div>
            <div className="review-form-container">
              <h3>Add a Review</h3>
              <Rating
                name="simple-controlled"
                value={rating}
                size="large"
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                className="rating"
              />
              <form onSubmit={submitReviewHandler}>
                <div className="input-textarea-div">
                  <label htmlFor="reviewarea"></label>
                  <textarea
                    id="reviewarea"
                    placeholder="Review..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="textarea"
                  ></textarea>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
          {/*  */}
          <div className="product-review">
            <div className="reviews">
              <h3>All Product Reviews</h3>
              {product?.reviews && product?.reviews[0] ? (
                <div className="reviews">
                  {product?.reviews &&
                    product?.reviews?.map((review) => (
                      <ProductReviewCard key={review._id} review={review} />
                    ))}
                </div>
              ) : (
                <p className="noReviews">No Reviews Yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
