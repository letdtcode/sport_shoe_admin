import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./reducers/UserReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productListAllReducer,
  productEditReducer,
  productUpdateReducer,
} from "./reducers/ProductReducers";
import {
  orderDeleteReducer,
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./reducers/OrderReducers";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryListAllReducer,
} from "./reducers/CategoryReducer";

const reducer = combineReducers({
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
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  // ORDER
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDelivered: orderDeliveredReducer,
  orderDelete: orderDeleteReducer,
});

// SAVE USER Login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
