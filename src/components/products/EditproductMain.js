import React, { useEffect, useState } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  productEditAction,
  productUpdateAction,
} from "../../redux/actions/ProductAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/ProductConstants";
import { Heading, Select } from "@chakra-ui/react";
import { categoryListAllAction } from "../../redux/actions/CategoryAction";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  // Set up state
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Declare Dispatch
  const dispatch = useDispatch();
  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;
  const categoryList = useSelector((state) => state.categoryList);
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;
  const { categories } = categoryList;
  const [category, setCategory] = useState(
    categories?.map((item) => item.name)
  );
  useEffect(() => {
    dispatch(categoryListAllAction());
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Updated Successfully", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productEditAction(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setImage(product.image);
        setCategory(product.category);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productUpdateAction({
        _id: productId,
        name,
        price,
        description,
        countInStock,
        image,
        category,
      })
    );
  };
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products/all" className="btn btn-danger text-white">
              Return to product page
            </Link>
            <Heading as="h2" size="lg" className="content-title">
              Update product
            </Heading>
            <div>
              <button type="submit" className="btn btn-primary">
                Update now
              </button>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Product's name
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Quantity
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="product_category"
                          className="form-label"
                        >
                          Category
                        </label>
                        <Select
                          placeholder="Select a category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {categories?.map((item) => (
                            <option key={item._id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Image</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
