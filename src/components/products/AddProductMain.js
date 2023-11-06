import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Toast from "../LoadingError/Toast";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { productCreateAction } from "../../redux/actions/ProductAction";
import { PRODUCT_CREATE_RESET } from "../../redux/constants/ProductConstants";
import { Heading, Select, Stack } from "@chakra-ui/react";
import { categoryListAllAction } from "../../redux/actions/CategoryAction";
import styled from "@emotion/styled";

const BtnPrimary = styled.button`
  padding: 8px 45px;
  background-color: #333;
  font-size: 18px;
  color: white;
`;

const AddProductMain = () => {
  // Set up state
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Declare Dispatch
  const dispatch = useDispatch();
  // Call Reducer
  const productCreate = useSelector((state) => state.productCreate);
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const { loading, product, error } = productCreate;

  useEffect(() => {
    dispatch(categoryListAllAction());
    if (product) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setPrice(0);
      setCountInStock(0);
      setDescription("");
      setImage("");
      setCategory();
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      productCreateAction(
        name,
        price,
        description,
        image,
        countInStock,
        category
      )
    );
  };

  return (
    <>
      <Toast />
      <Stack className="content-main" style={{ maxWidth: "1200px" }}>
        <Heading as="h2" size="xl" className="content-title mb-4">
          Add product
        </Heading>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products/all" className="btn btn-danger text-white">
              Go to product page
            </Link>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product's name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the product name"
                      className="form-control"
                      id="product_title"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_quantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_quantity"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_category" className="form-label">
                      Category
                    </label>
                    <Select
                      placeholder="Choose a category"
                      value={category}
                      onChange={(e) => console.log(setCategory(e.target.value))}
                    >
                      {categories?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Enter product description"
                      className="form-control"
                      rows="7"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Image</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Inter Image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input
                      className="form-control mt-3"
                      type="file"
                      onChange={(e) =>
                        setImage(URL.createObjectURL(e.target.files[0]))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <BtnPrimary type="submit">Publish now</BtnPrimary>
              </div>
            </div>
          </div>
        </form>
      </Stack>
    </>
  );
};

export default AddProductMain;
