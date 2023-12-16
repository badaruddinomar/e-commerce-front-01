// style file--
import "./home.scss";
// Components--
import ProductCard from "./productCard/ProductCard";
import { Link } from "react-router-dom";
import PreLoader from "../preLoader/PreLoader";
import ToastNotification from "../ToastNotification/ToastNotification";
import { Helmet } from "react-helmet";
// Hooks--
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// Store data to the redux--
import { allProductSuccess } from "../../reducers/products/productsReducer";
import { getAllProducts } from "../../actions/productActions/productActions";
import { loginSuccess, signoutSuccess } from "../../reducers/user/userReducer";
// Images--
import bannerShow from "../../img/banner/banner-img.png";
// MUI Icons--
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { features, brands } from "../data/data";
import { backendUrl } from "../../helper";
const Home = () => {
  // All variables are here--
  const { products } = useSelector((state) => state.productReducer);
  const { successMsg } = useSelector((state) => state.toastReducer);
  // Get all products--
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const dispatch = useDispatch();
  // Store all the data to the Redux store--
  useEffect(() => {
    dispatch(
      allProductSuccess({
        products: data?.products,
        productsCount: data?.productsCount,
        resultPerPage: data?.resultPerPage,
      })
    );
  }, [dispatch, data]);
  // fetching profile data--
  useEffect(() => {
    const fetchHandler = async () => {
      const response = await fetch(`${backendUrl}/api/v1/me`, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess(data?.user));
      } else {
        dispatch(signoutSuccess());
      }
    };
    fetchHandler();
  }, [dispatch]);

  return (
    <>
      <Helmet title="Shop-Cart" />
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      <div className="home">
        {/* home banner div -- */}
        <div className="home-banner">
          <div className="home-banner-container">
            <div className="content">
              <h1>
                Nike New <br />
                Collection!
              </h1>
              <p>
                Libero dolore debitis similique numquam aut alias error rem
                <br /> eveniet quasi hic!
              </p>
              <Link to="/products" className="btn">
                <div>
                  <span>See More</span>
                  <span>
                    <ArrowRightAltIcon className="icon" />
                  </span>
                </div>
              </Link>
            </div>
            <div className="banner-img">
              <img src={bannerShow} alt="banner-image" />
            </div>
          </div>
        </div>
        {/* features-- */}
        <div className="features">
          {features.map((feature, ind) => {
            return (
              <div className="feature" key={ind}>
                <img src={feature.image} alt="feature-image" />
                <p>{feature.text}</p>
              </div>
            );
          })}
        </div>
        {/* featured-porduct-div */}
        <div className="featured-products">
          <h3>Featured Products</h3>
          {isLoading ? (
            <PreLoader />
          ) : (
            <div className="products">
              {products?.map((product, ind) => {
                return <ProductCard key={ind} product={product} />;
              })}
            </div>
          )}
        </div>
        {/* brand div--  */}
        <div className="brands">
          {brands.map((brand, ind) => {
            return (
              <div className="brand" key={ind}>
                <img src={brand.image} alt="brand-image" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Home;
