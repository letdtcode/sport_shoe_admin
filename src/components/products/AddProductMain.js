import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { productCreateAction } from "../../redux/actions/ProductAction";
import { PRODUCT_CREATE_RESET } from "../../redux/constants/ProductConstants";
import {
  Heading,
  Select,
  Stack,
  Table,
  Input,
  Th,
  Td,
  Thead,
  Tr,
  Tbody,
  Image,
} from "@chakra-ui/react";
import { categoryListAllAction } from "../../redux/actions/CategoryAction";
import { brandListAllAction } from "../../redux/actions/BrandAction";
import styled from "@emotion/styled";

const BtnPrimary = styled.button`
  padding: 8px 45px;
  background-color: #333;
  font-size: 18px;
  color: white;
`;

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddProductMain = () => {
  // Set up state
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryName, setCategoryName] = useState();
  const [brandName, setBrandName] = useState();
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const dispatch = useDispatch();

  const handleImgChange = (e) => {
    setImageFile(e.target.files[0]);
    setUrlImage(URL.createObjectURL(e.target.files[0]));
  };

  const productCreate = useSelector((state) => state.productCreate);
  const { categories } = useSelector((state) => state.categoryList);
  const { brands } = useSelector((state) => state.brandList);
  const { loading, product, error } = productCreate;

  const [itemColors, setItemColors] = useState([""]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const availableSizes = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
  const [quantityData, setQuantityData] = useState([[]]);
  const handleItemType = (index, value) => {
    const newItemColors = [...itemColors];
    newItemColors[index] = value;
    newItemColors[index + 1] = newItemColors[index + 1]
      ? newItemColors[index + 1]
      : "";
    if (value === "" && index < newItemColors.length - 1) {
      newItemColors.splice(index, 1);
    }
    setItemColors(newItemColors);
  };

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
    addQuantity(itemColors, selectedSizes);
  }, [itemColors, selectedSizes]);

  useEffect(() => {
    dispatch(categoryListAllAction());
    dispatch(brandListAllAction());
    if (product) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setPrice(0);
      setDescription("");
      setImageFile(null);
      setCategoryName();
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    let typeProduct = [];
    for (let i = 0; i < itemColors.length - 1; i++) {
      for (let j = 0; j < selectedSizes.length; j++) {
        if (quantityData[i][j] <= 0) {
          toast.error("Số lượng sản phẩm phải lớn hơn 0", ToastObjects);
          return;
        }
        typeProduct.push({
          color: itemColors[i],
          size: selectedSizes[j],
          quantity: quantityData[i][j],
        });
      }
    }
    if (typeProduct.length === 0) {
      toast.error("Sản phẩm phải có ít nhất 1 phân loại", ToastObjects);
      return;
    }
    if (price === 0) {
      toast.error("Giá sản phẩm không hợp lệ", ToastObjects);
      return;
    }
    dispatch(
      productCreateAction(
        name,
        price,
        description,
        imageFile,
        categoryName,
        brandName,
        typeProduct
      )
    );
    setImageFile(null);
    setUrlImage(null);
  };

  return (
    <>
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
                      value={categoryName}
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                      }}
                      required
                    >
                      {categories?.map((item) => (
                        <option key={item._id} value={item.categoryName}>
                          {item.categoryName}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="product_brand" className="form-label">
                      Brand
                    </label>
                    <Select
                      placeholder="Choose a brand"
                      value={brandName}
                      onChange={(e) => {
                        setBrandName(e.target.value);
                      }}
                      required
                    >
                      {brands?.map((item) => (
                        <option key={item._id} value={item.brandName}>
                          {item.brandName}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Enter product description"
                      className="form-control"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  {/* <div className="mb-4">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImgChange}
                    />
                  </div> */}
                  <div className="mb-4">
                    <label className="form-label">Image</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src={urlImage}
                        boxSize="200px"
                        fallbackSrc="https://via.placeholder.com/150"
                        alt="Dan Abramov"
                      />
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImgChange}
                    style={{ marginBottom: "15px" }}
                    required
                  />
                  <div className="mb-4">
                    <div style={{ display: "grid" }}>
                      <label>Phân loại màu</label>
                      <div>
                        {itemColors.map((itemColor, index) => (
                          <input
                            width={"100px"}
                            key={index}
                            type="text"
                            value={itemColor}
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
                                  <Td>{itemColors[i]}</Td>
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
                                          e.target.value
                                        )
                                          ? parseInt(e.target.value)
                                          : "";
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
      </Stack>
    </>
  );
};

export default AddProductMain;
