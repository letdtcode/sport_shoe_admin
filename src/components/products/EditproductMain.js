import React, { useEffect, useState, useRef } from "react";
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
import { categoryListAllAction } from "../../redux/actions/CategoryAction";
import styled from "@emotion/styled";
import {
  Button,
  Heading,
  Select,
  Table,
  Input,
  Th,
  Td,
  Thead,
  Tr,
  Tbody,
} from "@chakra-ui/react";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const BtnPrimary = styled.button`
  padding: 8px 45px;
  background-color: #333;
  font-size: 18px;
  color: white;
`;

const EditProductMain = (props) => {
  const { productId } = props;

  // Set up state
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const handleImgChange = (e) => {
    setImageFile(e.target.files[0]);
    // inputRef.current.value = '';
  };
  const [itemTypes, setItemTypes] = useState([""]);

  const handleItemType = (index, value) => {
    const newItemType = [...itemTypes];
    newItemType[index] = value;
    newItemType[index + 1] = newItemType[index + 1]
      ? newItemType[index + 1]
      : "";
    if (value === "" && index < newItemType.length - 1) {
      newItemType.splice(index, 1);
    }
    setItemTypes(newItemType);
  };
  const [selectedSizes, setSelectedSizes] = useState([]);
  const availableSizes = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      // Nếu size đã được chọn, loại bỏ nó khỏi danh sách selectedSizes
      setSelectedSizes(selectedSizes.filter((item) => item !== size));
    } else {
      // Nếu size chưa được chọn, thêm nó vào danh sách selectedSizes
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  const isSizeSelected = (size) => selectedSizes.includes(size);

  const [quantityData, setQuantityData] = useState([[]]);
  const addQuantity = (itemTypes, selectedSizes) => {
    const updatedQuantityData = [];
    for (let i = 0; i < itemTypes.length - 1; i++) {
      const row = [];
      for (let j = 0; j < selectedSizes.length; j++) {
        row.push(0);
      }
      updatedQuantityData.push(row);
    }
    setQuantityData(updatedQuantityData);
  };
  useEffect(() => {
    addQuantity(itemTypes, selectedSizes);
    console.log(quantityData);
  }, [itemTypes, selectedSizes]);

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
        setDescription(product.description);
        setImageFile(product.image);
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
        imageFile,
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
                  {/* <div className="mb-4">
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
                  </div> */}
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
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      onChange={handleImgChange}
                    />
                  </div>

                  <div></div>
                  <div className="mb-4">
                    <div style={{ display: "grid" }}>
                      <label>Phân loại màu</label>
                      <div>
                        {itemTypes.map((itemTpye, index) => (
                          <input
                            width={"100px"}
                            key={index}
                            type="text"
                            value={itemTpye}
                            placeholder="Type here"
                            className="input-item-type"
                            id="type"
                            onChange={(e) =>
                              handleItemType(index, e.target.value)
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "grid" }}>
                      <label>Phân loại size</label>
                      <div>
                        {availableSizes.map((size) => (
                          <button
                            key={size}
                            className={
                              isSizeSelected(size)
                                ? "button-size-selected"
                                : "button-size"
                            }
                            required={false}
                            onClick={() => handleSizeChange(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Type</Th>
                          <Th>Size</Th>
                          <Th>Quantity</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {quantityData.map((type, i) => (
                          <>
                            {type.map((size, j) => (
                              <>
                                <Tr>
                                  <Td>{itemTypes[i]}</Td>
                                  <Td>{selectedSizes[j]}</Td>
                                  <Td>
                                    <Input
                                      type="number"
                                      id={`quantity${i}${j}`}
                                      value={quantityData[i][j]}
                                      onChange={(e) => {
                                        const updatedQuantityData = [
                                          ...quantityData,
                                        ];
                                        updatedQuantityData[i][j] = parseInt(
                                          e.target.value,
                                          10
                                        );
                                        setQuantityData(updatedQuantityData);
                                      }}
                                    />
                                  </Td>
                                </Tr>
                              </>
                            ))}
                          </>
                        ))}
                      </Tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <BtnPrimary type="submit">Publish now</BtnPrimary>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
