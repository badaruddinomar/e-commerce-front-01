// style file--
import "./products.scss";
// Hooks--
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// get products from redux store--
import { getAllProducts } from "../../actions/productActions/productActions";
// MUI icons and components--
import Slider from "@mui/material/Slider";
import ListIcon from "@mui/icons-material/List";
import CloseIcon from "@mui/icons-material/Close";
// Components--
import PreLoader from "./../preLoader/PreLoader";
import ProductCard from "../home/productCard/ProductCard";
import Pagination from "react-js-pagination";
import { Helmet } from "react-helmet";
import { categories } from "../../helper";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(25000);
  let [searchPrice, setSearchPrice] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [filterMenuActive, setFilterMenuActive] = useState(false);
  const selectCategory = useRef();

  // active category handler--
  const catergoryHandler = (e) => {
    selectCategory.current.childNodes.forEach((el) => {
      el.style.color = "#11161e";
    });
    if (e.target.classList.contains("category")) {
      e.target.style.color = "#ff6d00";
    }
  };
  // Toggle the filter menu --
  const filterMenuHandler = () => {
    setFilterMenuActive(!filterMenuActive);
  };
  // get all products from the Database--
  const { isLoading, data } = useQuery({
    queryKey: [
      "products",
      { page: currentPage, searchPrice, category, ratings },
    ],
    queryFn: () =>
      getAllProducts(
        currentPage,
        undefined,
        [minPrice, maxPrice],
        category,
        ratings
      ),
    initialData: [],
  });
  const minPriceChangeHandler = (e) => {
    setMinPrice(e.target.value);
  };
  const maxPriceChangeHandler = (e) => {
    setMaxPrice(e.target.value);
  };
  const searchPriceChangeHandler = () => {
    searchPrice = searchPrice + 1;
    setSearchPrice(searchPrice);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const ratingsValueHandler = (e) => {
    setRatings(e.target.value);
  };

  return (
    <>
      <Helmet title="All-Products" />
      <div className="products-section">
        {/* products banner */}
        <div className="prducts-banner">
          <h2 className="products-heading">All Products page</h2>
        </div>
        {/* products-container-- */}
        <div className="products-container">
          {/* filter sidebar-- */}
          <div
            className={`${
              filterMenuActive
                ? "filter-sidebar filter-active"
                : "filter-sidebar"
            }`}
          >
            <div className="filter-top">
              <h5>Filter By</h5>
              <div className="filter-menu" onClick={filterMenuHandler}>
                {filterMenuActive ? (
                  <CloseIcon className="icon" />
                ) : (
                  <ListIcon className="icon" />
                )}
              </div>
            </div>
            <div
              className={`${
                filterMenuActive ? "filter-container" : "filter-container hide"
              }`}
            >
              {/* category box */}
              <div className="categoryBox">
                <h5>Filter by Category</h5>
                <div
                  className="category-container"
                  onClick={catergoryHandler}
                  ref={selectCategory}
                >
                  {categories.map((category, ind) => {
                    return (
                      <li
                        key={ind}
                        className="category"
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    );
                  })}
                </div>
              </div>
              {/* filter by price */}
              <div className="filter-price">
                <h5>Filter By Price</h5>
                <div className="filter-input">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={minPriceChangeHandler}
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={maxPriceChangeHandler}
                  />
                  <button onClick={searchPriceChangeHandler}>Search</button>
                </div>
              </div>
              {/* filter by ratings-- */}
              <div className="filter-by-ratings">
                <h5>Filter by Ratings</h5>
                <Slider
                  className="slider"
                  aria-label="Temperature"
                  defaultValue={0}
                  value={ratings}
                  onChange={ratingsValueHandler}
                  // getAriaValueText={ratingsValueHandler}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={5}
                />
              </div>
            </div>
          </div>

          {/* product section -- */}
          <div className="products">
            {isLoading ? (
              <PreLoader />
            ) : (
              <>
                {data?.products?.map((product) => {
                  return <ProductCard key={product._id} product={product} />;
                })}
                {data?.products?.length === 0 && (
                  <p className="empty-products-message">No Products Found!</p>
                )}
              </>
            )}
          </div>
        </div>
        {/* pagination box */}
        <div className="pagination-box">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={data?.resultPerPage}
            totalItemsCount={data?.productsCount || 0}
            onChange={setCurrentPageNo}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"1st"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      </div>
    </>
  );
};

export default Products;
