// Style File--
import "./adminProductList.scss";
// All Hook--
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// MUI Icons--
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// Components--
import { getAllAdminProducts } from "../../reducers/adminProducts/adminProductsReducer";
import { backendUrl } from "./../../helper";
import { Link } from "react-router-dom";
import MetaData from "./../MetaData";
import PreLoader from "./../preLoader/PreLoader";
import ToastNotification from "../ToastNotification/ToastNotification";
// store and get data from the redux store--
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
const AdminProductList = () => {
  // Get Products data from Redux Store--
  const { products } = useSelector((state) => state.adminProductsReducer);
  const { successMsg, errorMsg } = useSelector((state) => state.toastReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Get all Products List From the Database--
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/admin/products`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        dispatch(getAllAdminProducts(data.products));
      } catch (err) {
        console.log(err);
      }
    };
    fetchHandler();
  }, [dispatch]);
  // product delete handler --
  const productDeleteHandler = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backendUrl}/api/v1//admin/product/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(successMessage(data.message));
        setLoading(false);
      } else {
        dispatch(errorMessage(data.message));
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      dispatch(errorMessage(err.message));
    }
  };

  return (
    <>
      <MetaData title={"All Products"} />
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}

      {loading ? (
        <PreLoader />
      ) : (
        <div className="admin-products-page">
          {/* Banner-- */}
          <div className="admin-products-banner">
            <h2>All Products List</h2>
          </div>
          {/* Container-- */}
          <div className="all-products-container">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product, ind) => {
                    return (
                      <tr key={ind}>
                        <td>
                          <Link className="link" to={`/product/${product._id}`}>
                            {product._id}
                          </Link>
                        </td>
                        <td>
                          <Link className="link" to={`/product/${product._id}`}>
                            <img
                              src={product.images[0].url}
                              alt="product-image"
                              className="product-image"
                            />
                          </Link>
                        </td>
                        <td>{product.name.slice(0, 15)}</td>
                        <td>{product.stock}</td>
                        <td>${product.price}</td>
                        <td>
                          <Link to={`/admin/update/product/${product._id}`}>
                            <EditIcon className="icon" />
                          </Link>
                          <span>
                            <DeleteIcon
                              className="icon"
                              onClick={() => productDeleteHandler(product._id)}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProductList;
