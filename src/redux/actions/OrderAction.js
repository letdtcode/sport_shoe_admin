import axios from "../../services/axios";
import {
  ORDER_CANCELLED_FAIL,
  ORDER_CANCELLED_REQUEST,
  ORDER_CANCELLED_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../constants/OrderConstants";
import { logout } from "./UserAction";

// [GET] GET ALL ORDER LIST ACTION
export const orderListAllAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.get("/orders/all");

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};

export const orderListAllByStatusAction =
  (status) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
      // use axios.[GET] to compare user with server's user,
      console.log(status);
      const { data } = await axios.get("/orders/sort-by-status", {
        params: { status },
      });
      console.log(data);

      dispatch({ type: ORDER_LIST_SUCCESS, payload: data.data });
    } catch (error) {
      console.log(error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, no token") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      });
    }
  };

// [GET] GET ORDER DETAILS ID BILL ACTION
export const orderDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.get(`/orders/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// [PUT] UPDATE ORDER IS DELIVERED ACTION
export const orderChangeStatusAction =
  (order, status) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELIVERED_REQUEST });
      // use axios.[GET] to compare user with server's user,
      const { data } = await axios.put("/orders/change-status", null, {
        params: { id: order._id, status: status },
      });
      dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, no token") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_DELIVERED_FAIL,
        payload: message,
      });
    }
  };

// [GET] GET ORDER DETAILS ID BILL ACTION
export const orderCancelAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CANCELLED_REQUEST });
    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.put("/orders/change-status", null, {
      params: { id, status: -1 },
    });

    dispatch({ type: ORDER_CANCELLED_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CANCELLED_FAIL,
      payload: message,
    });
  }
};
