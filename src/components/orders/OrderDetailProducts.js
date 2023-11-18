import React from "react";
import "./OrderDetail/orderDetailProduct.css";

const OrderDetailProducts = ({ order }) => {
  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Product</th>
          <th style={{ width: "20%" }}>Unit Price</th>
          <th style={{ width: "20%" }}>Quantity</th>
          <th style={{ width: "20%" }} className="text-end">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {order.orderItems.map((item, index) => (
          <tr key={index}>
            <td>
              <div className="itemside">
                <div className="left">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">
                  <div>{item.name}</div>
                  <div style={{ color: "gray", fontWeight: 400 }}>
                    Color: {item.typeProduct.color}
                  </div>
                  <div style={{ color: "gray", fontWeight: 400 }}>
                    Size: {item.typeProduct.size}
                  </div>
                </div>
                {/* <div className="info">Color: {item.typeProduct.color} </div>
                <div className="info">Size: {item.typeProduct.size} </div> */}
              </div>
            </td>
            <td>${item.price} </td>
            <td>{item.typeProduct.quantity} </td>
            <td className="text-end">
              {" "}
              ${item.price * item.typeProduct.quantity}
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Subtotal:</dt> <dd>${order.itemsPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Tax:</dt> <dd>${order.taxPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Shipping cost:</dt> <dd>${order.shippingPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Grand total:</dt>
                <dd>
                  <b className="h5">${order.totalPrice}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Status:</dt>
                <dd>
                  {order.isPaid ? (
                    <span className="badge rounded-pill alert alert-success text-success">
                      Payment done
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger">
                      Not Paid
                    </span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
