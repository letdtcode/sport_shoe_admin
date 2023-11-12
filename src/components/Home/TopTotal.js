import { Heading } from "@chakra-ui/react";
import React from "react";

const TopTotal = (props) => {
  const { products, orders } = props;
  let totalSale = 0;
  if (orders) {
    orders.map((order) =>
      order?.isPaid === true ? (totalSale += order?.totalPrice) : null
    );
  }
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <Heading as="h6" size="sm" className="mb-1">
                Total revenue
              </Heading>
              <span>${totalSale.toFixed()}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
              <Heading as="h6" size="sm" className="mb-1">
                Total orders
              </Heading>
              <span>
                {orders ? <span>{orders.length}</span> : <span>0</span>}
              </span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <Heading as="h6" size="sm" className="mb-1">
                Total products
              </Heading>
              <span>
                {products ? <span>{products.length}</span> : <span>0</span>}
              </span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
