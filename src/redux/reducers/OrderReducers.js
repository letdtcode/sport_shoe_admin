import {
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../constants/OrderConstants";

// [REQUEST] GET ALL ORDER LISTS
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// [REQUEST] GET ALL ORDER DETAIL BY ID
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// ? [CHECKED] ORDER DELIVERED BY ADMIN
export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVERED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: {},
      };
    case ORDER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
