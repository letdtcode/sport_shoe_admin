import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import Loading from "../LoadingError/Loading";
import { categoryListAllAction } from "../../redux/actions/CategoryAction";
import Message from "../LoadingError/Error";
import { Box, Container, Flex, Heading, Select, Stack } from "@chakra-ui/react";
import Pagination from "../Home/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { productListAllAction } from "../../redux/actions/ProductAction";
import Toast from "../LoadingError/Toast";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const MainProducts = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const { loading, error, products, pages } = useSelector(
    (state) => state.productList
  );
  const { categories } = useSelector((state) => state.categoryList);
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: successLoading } = productDelete;
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState(
    query.get("categoryName") || ""
  );
  const [keyword, setKeyword] = useState(query.get("keyword") || "");
  const page = query.get("pageNumber") || 1;

  const handlerChangeCategory = (keyword, categoryName) => {
    dispatch(productListAllAction(keyword, categoryName, page));
  };

  useEffect(() => {
    console.log(keyword);
    dispatch(productListAllAction(keyword, categoryName, page));
    dispatch(categoryListAllAction());
  }, [dispatch, keyword, categoryName, page]);
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
                <div className="col-search">
                  <form className="searchform">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="form-control p-2"
                        value={keyword}
                        onChange={(e) => {
                          setKeyword(e.target.value);
                        }}
                      />
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
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                    handlerChangeCategory(keyword, e.target.value);
                  }}
                >
                  {categories?.map((item) => (
                    <option key={item._id} value={item.categoryName}>
                      {item.categoryName}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <Select value="jaa">
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
                  keyword={keyword ? keyword : ""}
                  categoryName={categoryName ? categoryName : ""}
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
