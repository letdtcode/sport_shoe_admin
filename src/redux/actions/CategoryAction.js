import axios from "axios";
import { toast } from "react-toastify";
import URL from "../../URL";
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_GET_ITEM,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
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

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.get(`${URL}/api/v1/categories`, config);

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
  (name, description, imageFile) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      let formData = new FormData();
      formData.append("file", imageFile);
      const dataImage = await axios.post(
        `${URL}/api/v1/upload/single`,
        formData,
        config
      );
      const imageUrl = dataImage.data.image;

      // use axios.[GET] to compare user with server's user,
      const { data } = await axios.post(
        `${URL}/api/v1/categories`,
        { name, description, imageUrl },
        config
      );

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

export const categoryGetItemEditAction = (item) => {
  return {
    type: CATEGORY_GET_ITEM,
    payload: item,
  };
};

// [GET] GET ALL CATEGORIES LIST ACTION
export const categoryDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.delete(`${URL}/api/v1/category/${id}`, config);

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
