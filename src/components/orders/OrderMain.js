import React from "react";
import { useSelector } from "react-redux";
import Orders from "./Orders";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { Box, Heading, Stack, TableContainer } from "@chakra-ui/react";
const OrderMain = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  return (
    <Stack className="content-main">
      <Box className="content-header">
        <Heading as="h2" size="lg" className="content-title">
          Đơn hàng
        </Heading>
      </Box>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Tình trạng</option>
                <option>Đang hoạt động</option>
                <option>Disabled</option>
                <option>Xem tất cả</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Xem 20</option>
                <option>Xem 30</option>
                <option>Xem 40</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <TableContainer className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders orders={orders} />
            )}
          </TableContainer>
        </div>
      </div>
    </Stack>
  );
};

export default OrderMain;
