import React from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useSelector } from "react-redux";
import { Box, Heading, Stack } from "@chakra-ui/react";

const Main = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  return (
    <>
      <Stack className="content-main">
        <Box className="content-header">
          <Heading as="h2" size="lg" className="content-title">
            {" "}
            Dashboard{" "}
          </Heading>
        </Box>
        {/* Top Total */}
        <TopTotal orders={orders} products={products} />

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder loading={loading} orders={orders} error={error} />
        </div>
      </Stack>
    </>
  );
};

export default Main;
