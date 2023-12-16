/* eslint-disable react/prop-types */
import ReactStars from "react-rating-stars-component";
import defaultAvatar from "../../img/avatar.png";
import "./productReviewCard.scss";

const ProductReviewCard = ({ review }) => {
  const startsOptions = {
    edit: false,
    color: "gray",
    activeColor: "gold",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };
  return (
    <div className="review-card">
      <div>
        <img src={defaultAvatar} alt="avatar" className="avatar" />
        <p>{review.name}</p>
      </div>

      <ReactStars {...startsOptions} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ProductReviewCard;
