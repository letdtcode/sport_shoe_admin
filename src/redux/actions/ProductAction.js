import axios from "../../services/axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/ProductConstants";
import { logout } from "../actions/UserAction";
import { toast } from "react-toastify";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 3000,
};
// [GET] GET ALL PRODUCT LIST ACTION
export const productListAllAction =
  (keywords = "", categoryName = "", pageNumber = 1) =>
  async (dispatch, getState) => {
    try {
      // console.log(keywords);
      // console.log(pageNumber);
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        `/products/all?keyword=${keywords}&categoryName=${categoryName}&pageNumber=${pageNumber}`
      );
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// [DELETE] DELETE PRODUCT ACTION BY ADMIN
export const productDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    // use axios.[GET] to compare user with server's user,
    await axios.delete(`/products/${id}/delete`);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
    toast.success("Product deletion successful!", ToastObjects);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
    toast.error("Can't delete products!", ToastObjects);
  }
};

// [POST] CREATE PRODUCT ACTION BY ADMIN
export const productCreateAction =
  (
    productName,
    price,
    description,
    imageFile,
    categoryName,
    brandName,
    typeProduct
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });

      let formData = new FormData();
      formData.append("file", imageFile);
      const {
        data: { image },
      } = await axios.post(`/upload/single`, formData);
      // use axios.[POST] to create user
      const { data } = await axios.post(`/products/create`, {
        productName,
        price,
        description,
        imageUrl: image,
        categoryName,
        brandName,
        typeProduct,
      });

      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
      toast.success("Create successful products!", ToastObjects);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, no token") {
        // dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      });
      toast.error("Invalid product !", ToastObjects);
    }
  };

// [GET] GET EDIT PRODUCT ID PAGE ACTION BY ADMIN
export const productEditAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });

    // use axios.[POST] to create user
    const { data } = await axios.get(`/products/${id}`);
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, no token") {
      // dispatch(logout());
    }
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: message,
    });
  }
};

// [PUT] UPDATE PRODUCT ID ACTION BY ADMIN
export const productUpdateAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    let formData = new FormData();
    formData.append("file", product.imageFile);
    const dataImage = await axios.post(`/upload/single`, formData);
    product.image = dataImage.data.image;

    // use axios.[POST] to create user
    const { data } = await axios.put(`/products/${product._id}`, product);

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, no token") {
      // dispatch(logout());
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};
