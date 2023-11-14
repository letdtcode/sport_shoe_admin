import axios from "../../services/axios";
import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/UserContants";
import { toast } from "react-toastify";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000, // means 2s
};

// USER LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    // const userLogin = useSelector((state) => state.userLogin);
    // const { userData } = userLogin;
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // use axios.[POST] to compare user with server's user,
    const { data } = await axios.post(
      "/users/login",
      {
        email,
        password,
      },
      config
    );
    if (!data.userInfo.isAdmin === true) {
      toast.error("You are not allowed to be access here", ToastObjects);
      dispatch({ type: USER_LOGIN_FAIL });
    } else {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      document.location.href = "/";
    }
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, no token") {
      // dispatch(logout());
    }
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
  }
};

// LOGOUT

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
  // Redirect to /login
  document.location.href = "/login";
};

// GET ALL USERS ACTION

export const userListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    // use axios.[POST] to compare user with server's user,
    const { data } = await axios.get("/users");
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};
