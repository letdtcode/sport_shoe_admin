import axios from "../../services/axios";
import { toast } from "react-toastify";
import URL from "../../URL";
import {
  BRAND_CREATE_FAIL,
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_GET_ITEM,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
} from "../constants/BrandConstant";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 3000,
};
// [GET] GET ALL BRANDS LIST ACTION
export const brandListAllAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BRAND_LIST_REQUEST });
    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.get(`${URL}/api/v1/brands`);

    dispatch({ type: BRAND_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BRAND_LIST_FAIL,
      payload: message,
    });
  }
};

export const createBrandAction =
  (name, description, imageFile) => async (dispatch, getState) => {
    try {
      dispatch({ type: BRAND_CREATE_REQUEST });

      let formData = new FormData();
      formData.append("file", imageFile);
      const dataImage = await axios.post(
        `${URL}/api/v1/upload/single`,
        formData
      );
      const imageUrl = dataImage.data.image;

      // use axios.[GET] to compare user with server's user,
      const { data } = await axios.post(`${URL}/api/v1/brands`, {
        name,
        description,
        imageUrl,
      });

      dispatch({ type: BRAND_CREATE_SUCCESS, payload: data });
      toast.success("Successfully created brand !", ToastObjects);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: BRAND_CREATE_FAIL,
        payload: message,
      });
      toast.error("Invalid brand !", ToastObjects);
    }
  };

export const brandGetItemEditAction = (item) => {
  return {
    type: BRAND_GET_ITEM,
    payload: item,
  };
};

// [GET] GET ALL BRANDS LIST ACTION
export const brandDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BRAND_DELETE_REQUEST });

    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.delete(`${URL}/api/v1/brand/${id}`);

    dispatch({ type: BRAND_DELETE_SUCCESS, payload: data });
    toast.success("Brand deleted successfully!", ToastObjects);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BRAND_DELETE_FAIL,
      payload: message,
    });
  }
};
