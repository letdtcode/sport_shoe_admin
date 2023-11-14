import {
  BRAND_CREATE_FAIL,
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_RESET,
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

export const brandListAllReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case BRAND_LIST_REQUEST:
      return {
        loading: true,
        brands: [],
      };
    case BRAND_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.payload,
      };
    case BRAND_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const brandCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_CREATE_REQUEST:
      return {
        loading: true,
        brand: [],
      };
    case BRAND_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        brand: action.payload,
      };
    case BRAND_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BRAND_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const brandUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case BRAND_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BRAND_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const brandDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_DELETE_REQUEST:
      return {
        loading: true,
      };
    case BRAND_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BRAND_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
