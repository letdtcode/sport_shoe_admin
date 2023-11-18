import { useEffect, useRef } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  orderChangeStatusAction,
  orderDetailsAction,
} from "../../redux/actions/OrderAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import * as moment from "moment";
import {
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  Button,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const OrderDetailMain = ({ orderId }) => {
  const dispatch = useDispatch();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state) => state.orderDelivered
  );

  useEffect(() => {
    dispatch(orderDetailsAction(orderId));
  }, [dispatch, orderId, successDeliver]);

  const deliveredHandler = (status) => {
    dispatch(orderChangeStatusAction(order, status));
  };

  const statusOrderHanlder = (status) => {
    let statusTextOrder = "";
    switch (status) {
      case 0:
        statusTextOrder = "Awaiting confirm";
        break;
      case 1:
        statusTextOrder = "Awaiting delivering";
        break;
      case 2:
        statusTextOrder = "Delivering";
        break;
      case 3:
        statusTextOrder = "Received";
        break;
      case -1:
        statusTextOrder = "Cancelled";
        break;
    }
    return statusTextOrder;
  };

  const renderStatusChange = (status) => {
    let textShow = "";
    switch (status) {
      case 0:
        textShow = "CONFIRM ORDER";
        break;
      case 1:
        textShow = "TRANFER FOR SHIPPING";
        break;
      default:
        textShow = "Đã giao hàng";
    }
    return (
      <>
        <button
          onClick={onOpen}
          // onClick={deliveredHandler}
          className="btn btn-dark col-12"
        >
          {textShow}
        </button>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>MARK AT {textShow}</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              The order will be marked as {textShow}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => {
                  console.log(status + 1);
                  deliveredHandler(status + 1);
                  onClose();
                }}
              >
                {textShow}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white">
          Back To Orders
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(order.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Order ID: {order._id}
                </small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <h3>Status: {statusOrderHanlder(order.status)}</h3>
                <Link className="btn btn-success ms-2" to="#">
                  <i className="fas fa-print"></i>
                </Link>
              </div>
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {order.status === 2 ? (
                    <button className="btn btn-dark col-12">
                      DELIVERED AT {""}{" "}
                      {moment(order.deliveredAt).format("lll")}
                    </button>
                  ) : order.status === -1 ? (
                    <button className="btn btn-dark col-12">CANCELLED</button>
                  ) : (
                    <>
                      {loadingDeliver && <Loading />}
                      {renderStatusChange(order.status)}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailMain;
