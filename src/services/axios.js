import axios from "axios";
import { getToken, getRefreshToken, updateToken } from "./token";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 50000,
  validateStatus: function (status) {
    return status >= 200 && status <= 500;
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
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
    console.log(err);
    const originalConfig = err.config;

    if (originalConfig.url !== "/user/login" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/user/refresh-token", {
            refreshToken: getRefreshToken(),
          });
          const { accessToken } = rs.data;
          updateToken(accessToken);
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
