// Style File--
import "./createProduct.scss";
// Helper File Where Stored Some Data--
import { backendUrl, categories } from "../../helper";
// Hooks--
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// Redux Actions For Storing The Data--
import {
  createProductFaill,
  createProductRequest,
  createProductSuccess,
} from "../../reducers/adminProducts/createProductReducer";
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
// Components--
import MetaData from "./../MetaData";
import PreLoader from "../preLoader/PreLoader";
import ToastNotification from "../ToastNotification/ToastNotification";

const CreateProduct = () => {
  // All States--
  const { successMsg, errorMsg } = useSelector((state) => state.toastReducer);
  const { loading } = useSelector((state) => state.createProductReducer);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagePreview] = useState([]);
  const dispatch = useDispatch();

  // image change handler --
  const fileChangeHandler = (e) => {
    // Store multiple images into an array--
    const files = Array.from(e.target.files);

    // We don't want to show the previous images so remove from the array--
    setImages([]);
    setImagePreview([]);

    // Show the new selected images by FileReader Constructor--
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]); // store all selected images inside this loop-
          setImagePreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Create Product Handler--
  const createProductHandler = async (e) => {
    e.preventDefault();
    try {
      const myForm = new FormData();
      // Store all required value into the FormData Constructor--
      myForm.set("name", name);
      myForm.set("price", Number(price));
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("stock", Number(stock));
      images.forEach((image) => {
        myForm.append("images", image);
      });

      dispatch(createProductRequest());
      const response = await fetch(`${backendUrl}/api/v1/admin/product/new`, {
        method: "POST",
        body: myForm,
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(createProductSuccess(data.product));
        dispatch(successMessage(data.message));
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setStock("");
        setImages([]);
        setImagePreview([]);
      } else {
        dispatch(createProductFaill());
        dispatch(errorMessage(data.message));
      }
    } catch (err) {
      dispatch(createProductFaill());
      dispatch(errorMessage(err.message));
    }
  };

  return (
    <>
      <MetaData title={"Create Product"} />
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="create-product-page">
          {/* Banner Div-- */}
          <div className="create-product-banner">
            <h2>Create New Product</h2>
          </div>
          {/* Container-- */}
          <div className="create-product-container">
            {/* Create Product Form-- */}
            <form
              className="create-product-form"
              onSubmit={createProductHandler}
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
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProduct;
