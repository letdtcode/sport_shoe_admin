import axios from "axios";
import URL from "../../URL";
import {
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
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

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.get(`${URL}/api/v1/orders/all`, config);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
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

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.get(`${URL}/api/v1/orders/${id}`, config);

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
export const orderDeliveredAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.put(
      `${URL}/api/v1/orders/${order._id}/delivered`,
      order,
      config
    );

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
export const orderDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.delete(
      `${URL}/api/v1/orders/${id}/force`,
      config
    );

    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: message,
    });
  }
};
