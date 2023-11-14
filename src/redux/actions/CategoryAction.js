import axios from "../../services/axios";
import { toast } from "react-toastify";
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
} from "../constants/CategoryConstant";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 3000,
};
// [GET] GET ALL CATEGORIES LIST ACTION
export const categoryListAllAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.get("/categories");

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: message,
    });
  }
};

export const createCategoryAction =
  (categoryName, description) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_CREATE_REQUEST });
      const { data } = await axios.post("/categories", {
        categoryName,
        description,
      });
      dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
      toast.success("Successfully created category!", ToastObjects);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CATEGORY_CREATE_FAIL,
        payload: message,
      });
      toast.error("Invalid category!", ToastObjects);
    }
  };

export const categoryUpdateAction =
  (id, categoryName, description) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_UPDATE_REQUEST });
      // use axios.[GET] to compare user with server's user,
      const { data } = await axios.put(`/categories/${id}`, {
        categoryName,
        description,
      });

      dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
      toast.success("Category updated successfully!", ToastObjects);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CATEGORY_UPDATE_FAIL,
        payload: message,
      });
    }
  };

// [GET] GET ALL CATEGORIES LIST ACTION
export const categoryDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });
    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.delete(`/category/${id}`);

    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
    toast.success("Category deleted successfully!", ToastObjects);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};
