import { useEffect, useState } from "react";
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
import { brandListAllAction } from "../../redux/actions/BrandAction";
import {
  Heading,
  Select,
  Table,
  Input,
  Th,
  Td,
  Thead,
  Tr,
  Tbody,
  Image,
} from "@chakra-ui/react";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = ({ productId }) => {
  // Declare Dispatch
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.productEdit);
  const { categories } = useSelector((state) => state.categoryList);
  const { brands } = useSelector((state) => state.brandList);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate);
  console.log(successUpdate);
  // Declare State
  const [name, setName] = useState("");
  // console.log(name);
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [typeProducts, setTypeProducts] = useState([]);

  const [imageFile, setImageFile] = useState(null);
  const [urlImage, setUrlImage] = useState("");

  const [itemColors, setItemColors] = useState([""]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const availableSizes = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
  const isSizeSelected = (size) => selectedSizes.includes(size);

  const handleImgChange = (e) => {
    setImageFile(e.target.files[0]);
  };

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
      setSelectedSizes(selectedSizes.filter((item) => item !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const addQuantity = (itemTypes, selectedSizes) => {
    const updatedQuantityData = [];
    for (let i = 0; i < itemTypes.length - 1; i++) {
      for (let j = 0; j < selectedSizes.length; j++) {
        const item = {
          color: itemTypes[i],
          size: selectedSizes[j],
          quantity: product?.typeProduct[i]?.sizes[j]?.quantity
            ? product?.typeProduct[i]?.sizes[j]?.quantity
            : 0,
        };
        updatedQuantityData.push(item);
      }
    }
    setTypeProducts(updatedQuantityData);
  };

  useEffect(() => {
    addQuantity(itemColors, selectedSizes);
  }, [itemColors, selectedSizes]);

  useEffect(() => {
    dispatch(categoryListAllAction());
    dispatch(brandListAllAction());
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Updated Successfully", ToastObjects);
    } else {
      if (!product?.productName || product.id !== productId) {
        dispatch(productEditAction(productId));
      } else {
        setName(product?.productName);
        setPrice(product?.price);
        setCategoryName(product?.categoryName);
        setBrandName(product?.brandName);
        setDescription(product?.description);
        setUrlImage(product?.image);
        setItemColors([...product?.typeProduct.map((item) => item.color), ""]);
        if (product?.typeProduct[0]?.sizes)
          setSelectedSizes([
            ...product?.typeProduct[0]?.sizes.map((size) =>
              parseInt(size.size)
            ),
          ]);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("haha");
    dispatch(
      productUpdateAction({
        _id: productId,
        productName: name,
        price,
        description,
        imageFile,
        categoryName,
        brandName,
        typeProduct: typeProducts,
      })
    );
  };
  return (
    <>
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
                  <div className="mb-4">
                    <label htmlFor="product_category" className="form-label">
                      Category
                    </label>
                    <Select
                      placeholder="Choose a category"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
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
                      rows="7"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
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
                            type="button"
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
                        {typeProducts.map((typeProduct, i) => (
                          <>
                            <Tr>
                              <Td>{typeProduct.color}</Td>
                              <Td>{typeProduct.size}</Td>
                              <Td>
                                <Input
                                  type="number"
                                  id={i}
                                  value={typeProduct.quantity}
                                  onChange={(e) => {
                                    const updateTypeProducts = [
                                      ...typeProducts,
                                    ];
                                    updateTypeProducts[i].quantity = parseInt(
                                      e.target.value,
                                      10
                                    );
                                    setTypeProducts(updateTypeProducts);
                                  }}
                                />
                              </Td>
                            </Tr>
                          </>
                        ))}
                      </Tbody>
                    </Table>
                  </div>
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
