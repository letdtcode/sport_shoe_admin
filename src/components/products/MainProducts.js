import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Product from "./Product";
import Loading from "../LoadingError/Loading";
import { categoryListAllAction } from "../../redux/actions/CategoryAction";
import Message from "../LoadingError/Error";
import {
  Box,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import Pagination from "../Home/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { productListAllAction } from "../../redux/actions/ProductAction";
import Toast from "../LoadingError/Toast";
const MainProducts = ({ keyword, pageNumber }) => {
  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );
  const { categories } = useSelector((state) => state.categoryList);
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: successLoading } = productDelete;
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [keywords, setKeywords] = useState(null);

  const handlerChangeCategory = (keyword, categoryName) => {
    productListAllAction(keyword, categoryName, 1);
  };

  const history = useHistory();

  const handleRedirect = () => {
    history.push("/products/all"); // Chuyển hướng đến '/products/all'
  };

  useEffect(() => {
    dispatch(productListAllAction(keyword, pageNumber));
    dispatch(categoryListAllAction());
    setCategory();
  }, [dispatch, keyword, pageNumber, category]);
  return (
    <>
      <Toast />
      <Stack className="content-main">
        <Box className="content-header">
          <Heading as="h2" size="lg" className="content-title">
            All products
          </Heading>
          <Box>
            <Link to="/addproduct" className="btn btn-primary">
              Add product
            </Link>
          </Box>
        </Box>

        <Container maxW="container.2xl" className="card mb-4 shadow-sm">
          <header className="card-header bg-white ">
            <div className="row gx-3 py-3">
              <div className="col-lg-4 col-md-6 me-auto ">
                <div class="col-search">
                  <form class="searchform">
                    <div class="input-group">
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="form-control p-2"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                      />
                      <button
                        className="btn btn-light bg"
                        type="button"
                        onClick={handleRedirect}
                      >
                        <i className="far fa-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <Flex className="col-lg-2" align="center">
                Total products: {products.length}
              </Flex>
              <div className="col-lg-2 col-6 col-md-3">
                <Select
                  placeholder="Select category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    handlerChangeCategory(e.target.value);
                  }}
                >
                  {categories?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.categoryName}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <Select>
                  <option>Latest added</option>
                  <option>Lowest price</option>
                  <option>Most view</option>
                </Select>
              </div>
            </div>
          </header>

          <div className="card-body">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <div className="row">
                {products.map((product) => (
                  <Product
                    product={product}
                    key={product._id}
                    successLoading={successLoading}
                  />
                ))}
                <Pagination
                  page={page}
                  pages={pages}
                  keyword={keyword ? keywords : ""}
                />
              </div>
            )}
          </div>
        </Container>
      </Stack>
    </>
  );
};

export default MainProducts;
