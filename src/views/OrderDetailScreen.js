import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderDetailMain from "../components/orders/OrderDetailMain";
import { useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";

const OrderDetailScreen = ({ match }) => {
  const orderId = match.params.id;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error } = orderList;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <OrderDetailMain orderId={orderId} />
        )}
      </main>
    </>
  );
};

export default OrderDetailScreen;
