import axios from "axios";
import { storePersist } from "../redux/store";
import URL from "../URL";

const instance = axios.create({
  baseURL: `${URL}`,
  timeout: 50000,
});
instance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken) {
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const { userData } = storePersist.store.getState().userLogin;
    const originalConfig = err.config;

    if (originalConfig.url !== "/users/login" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
          const rs = await instance.post("/users/refresh_token", {
            refreshToken: refreshToken,
            email: userData.email,
          });
          const { accessToken } = rs.data;
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          originalConfig.headers.Authorization = `Bearer ${accessToken}`;
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);
export default instance;
