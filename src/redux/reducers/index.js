import { combineReducers } from "redux";
import { userListReducer, userLoginReducer } from "./UserReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productListAllReducer,
  productEditReducer,
  productUpdateReducer,
} from "./ProductReducers";
import {
  orderDeleteReducer,
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./OrderReducers";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryListAllReducer,
  categoryUpdateReducer,
} from "./CategoryReducer";
import {
  brandListAllReducer,
  brandUpdateReducer,
  brandCreateReducer,
  brandDeleteReducer,
} from "./BrandReducer";

const rootReducer = combineReducers({
  // USER
  userLogin: userLoginReducer,
  userList: userListReducer,
  // PRODUCT
  productList: productListAllReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  // CATEGORY
  categoryList: categoryListAllReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  // BRAND
  brandList: brandListAllReducer,
  brandUpdate: brandUpdateReducer,
  brandCreate: brandCreateReducer,
  brandDelete: brandDeleteReducer,
  // ORDER
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDelivered: orderDeliveredReducer,
  orderDelete: orderDeleteReducer,
});

export default rootReducer;
