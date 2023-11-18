import { useState, useEffect } from "react";
import Orders from "./Orders";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import {
  orderListAllAction,
  orderListAllByStatusAction,
} from "../../redux/actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import { Box, Heading, Stack, TableContainer } from "@chakra-ui/react";
const OrderMain = () => {
  const { loading, error, orders } = useSelector((state) => state.orderList);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("Get all");

  useEffect(() => {
    dispatch(orderListAllAction());
  }, [dispatch]);

  const handlerChangeStatusOrder = (status) => {
    if (status === "Get all") return dispatch(orderListAllAction());
    dispatch(orderListAllByStatusAction(parseInt(status)));
  };

  return (
    <Stack className="content-main">
      <Box className="content-header">
        <Heading as="h2" size="lg" className="content-title">
          Orders
        </Heading>
      </Box>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                onChange={(e) => {
                  setStatus(e.target.value);
                  handlerChangeStatusOrder(e.target.value);
                }}
              >
                <option value="Get all">Status</option>
                <option value={0}>Awaiting confirm</option>
                <option value={1}>Awaiting delivery</option>
                <option value={2}>Delivering</option>
                <option value={3}>Received</option>
                <option value={-1}>Cancelled</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>View 20</option>
                <option>View 30</option>
                <option>View 40</option>
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
