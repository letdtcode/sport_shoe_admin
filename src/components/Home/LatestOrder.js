import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const LatestOrder = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className="card-body">
      <h5 className="card-title">Đơn hàng mới nhất</h5>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tên</th>
                <th scope="col">Email</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Tình trạng</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col" className="text-end">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td>
                    <b>{order.user.name}</b>
                  </td>
                  <td>{order.user.email}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <span className="badge rounded-pill alert-success">
                        Đã thanh toán {moment(order.paidAt).format("LLL")}
                      </span>
                    ) : (
                      <span className="badge rounded-pill alert-danger text-danger">
                        Chưa thanh toán
                      </span>
                    )}
                  </td>
                  <td>{moment(order.createdAt).format("LL")}</td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link to={`/order/${order._id}`} className="text-success">
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
