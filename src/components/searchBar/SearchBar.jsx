/* eslint-disable react/prop-types */
// style file--
import "./searchBar.scss";
// hooks--
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// components--
import ProductCard from "../home/productCard/ProductCard";
import { Helmet } from "react-helmet";
import Pagination from "react-js-pagination";
// get and store data into the redux--
import { getAllProducts } from "../../actions/productActions/productActions";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // get all products from the database--
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["products", { search: keyword, page: currentPage }],
    queryFn: () => getAllProducts(currentPage, keyword, undefined, undefined),
    enabled: keyword !== "",
    initialData: [],
  });

  const searchChangeHandler = (e) => {
    setKeyword(e.target.value);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const submitHanlder = (e) => {
    e.preventDefault();
    if (keyword === "") return;
  };

  return (
    <>
      <Helmet title="Searched-Products" />
      {isLoading && keyword !== "" && <p>Loading..</p>}
      {isError && <p>{error.message}</p>}
      <div className="search-section" onSubmit={submitHanlder}>
        {/* banner div-- */}
        <div className="search-banner">
          <h2>Search Products</h2>
        </div>
        {/* container div-- */}
        <div className="search-container">
          <form className="search-box">
            <label htmlFor="search"></label>
            <input
              type="text"
              id="search"
              placeholder="Search Product ..."
              value={keyword}
              onChange={searchChangeHandler}
            />
            <button>Search</button>
          </form>
          {!isError && !isLoading && (
            <>
              <div className="products">
                {data?.products?.map((product) => {
                  return <ProductCard key={product._id} product={product} />;
                })}
              </div>
              {data?.productsCount >= 9 && (
                <div className="pagination-box">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={data?.resultPerPage}
                    totalItemsCount={data?.productsCount}
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
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
// 6.50 minutes
