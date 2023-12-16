// Style File--
import "./updateProduct.scss";
// All Hooks--
import { useEffect, useState } from "react";
import { backendUrl, categories } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// Store data into the Redux Store--
import {
  updateProductFaill,
  updateProductRequest,
  updateProductSuccess,
} from "../../reducers/adminProducts/updateProductReducer";
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
// Components--
import MetaData from "./../MetaData";
import PreLoader from "../preLoader/PreLoader";
import ToastNotification from "../ToastNotification/ToastNotification";

const UpdateProduct = () => {
  // All States--
  const { loading } = useSelector((state) => state.updateProductReducer);
  const { successMsg, errorMsg } = useSelector((state) => state.toastReducer);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagePreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Get product Details--
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/product/${id}`);
        const data = await response.json();
        // Set previous data to the form--
        setName(data.product.name);
        setPrice(data.product.price);
        setCategory(data.product.category);
        setDescription(data.product.description);
        setStock(data.product.stock);
        setOldImages(data.product.images);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHandler();
  }, [id]);

  // image change handler --
  const fileChangeHandler = (e) => {
    // Store all selected images into an array--
    const files = Array.from(e.target.files);
    // We don't want to show the previous images so delete from the array--
    setImages([]);
    setImagePreview([]);
    setOldImages([]);

    // Show and store selected images--
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagePreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Update Product Handler--
  const updateProductHandler = async (e) => {
    e.preventDefault();
    try {
      // Stored all data to the FormData Constructor--
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("price", Number(price));
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("stock", Number(stock));
      images.forEach((image) => {
        myForm.append("images", image);
      });

      dispatch(updateProductRequest());
      const response = await fetch(`${backendUrl}/api/v1/admin/product/${id}`, {
        method: "PUT",
        body: myForm,
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updateProductSuccess(data.product));
        dispatch(successMessage(data.message));
        navigate(`/product/${id}`);
      } else {
        dispatch(updateProductFaill());
        dispatch(errorMessage(data.message));
      }
    } catch (err) {
      dispatch(updateProductFaill());
      dispatch(errorMessage(err.message));
    }
  };

  return (
    <>
      <MetaData title={"Update Product"} />
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="update-product-page">
          <div className="update-product-banner">
            <h2>Update Product</h2>
          </div>
          <div className="update-product-container">
            <form
              className="update-product-form"
              onSubmit={updateProductHandler}
            >
              <div className="input-div">
                <label htmlFor="product-name"></label>
                <input
                  type="text"
                  placeholder="Product Name"
                  id="product-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-div">
                <label htmlFor="price"></label>
                <input
                  type="number"
                  placeholder="Price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="input-div input-textarea-div">
                <label htmlFor="product-desc"></label>
                <textarea
                  id="product-desc"
                  className="textarea"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="input-div">
                <label htmlFor="category"></label>
                <select
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  {categories.map((category, ind) => {
                    return (
                      <option key={ind} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="input-div">
                <label htmlFor="stock"></label>
                <input
                  type="number"
                  placeholder="Stock"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="input-div file-input-div">
                <label htmlFor="images"></label>
                <input
                  type="file"
                  placeholder="Images"
                  multiple
                  className="file-input"
                  name="images"
                  accept="image/*"
                  onChange={fileChangeHandler}
                />
              </div>
              <div className="image-preview-div">
                {oldImages &&
                  oldImages?.map((image, ind) => {
                    return (
                      <img
                        key={ind}
                        src={image.url}
                        className="image-preview"
                        alt="product-image"
                      />
                    );
                  })}
              </div>
              <div className="image-preview-div">
                {imagesPreview.map((image, ind) => {
                  return (
                    <img
                      key={ind}
                      src={image}
                      className="image-preview"
                      alt="product-image"
                    />
                  );
                })}
              </div>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
