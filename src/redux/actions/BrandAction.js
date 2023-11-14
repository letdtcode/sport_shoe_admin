import axios from "../../services/axios";
import { toast } from "react-toastify";
import {
  BRAND_CREATE_FAIL,
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_UPDATE_REQUEST,
  BRAND_UPDATE_SUCCESS,
  BRAND_UPDATE_FAIL,
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
    const { data } = await axios.get("/brands");

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
  (name, origin, imageFile) => async (dispatch, getState) => {
    try {
      dispatch({ type: BRAND_CREATE_REQUEST });

      let formData = new FormData();
      formData.append("file", imageFile);
      const dataImage = await axios.post("/upload/single", formData);
      const imageUrl = dataImage.data.image;

      // use axios.[GET] to compare user with server's user,
      const { data } = await axios.post("/brands", {
        brandName: name,
        origin,
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

export const brandUpdateAction =
  (id, brandName, origin, imageUrl) => async (dispatch, getState) => {
    try {
      dispatch({ type: BRAND_UPDATE_REQUEST });
      console.log(imageUrl);
      if (imageUrl instanceof File) {
        let formData = new FormData();
        formData.append("file", imageUrl);
        const { data } = await axios.post("/upload/single", formData);
        imageUrl = data.image;
      }
      // use axios.[GET] to compare user with server's user,
      const { data } = await axios.put(`/brands/${id}`, {
        brandName,
        imageUrl,
        origin,
      });
      dispatch({ type: BRAND_UPDATE_SUCCESS, payload: data });
      toast.success("Brand updated successfully!", ToastObjects);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: BRAND_UPDATE_FAIL,
        payload: message,
      });
    }
  };

// [GET] GET ALL BRANDS LIST ACTION
export const brandDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BRAND_DELETE_REQUEST });

    // use axios.[GET] to compare user with server's user,
    const { data } = await axios.delete(`/brand/${id}`);

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
