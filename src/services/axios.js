import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 50000,
  // validateStatus: function (status) {
  //   return status >= 200 && status <= 500;
  // },
});
instance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken) {
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
    const originalConfig = err.config;

    if (originalConfig.url !== "/users/login" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const rs = await instance.post("/users/refresh_token", {
            refreshToken: refreshToken,
          });
          const { accessToken } = rs.data;

          // const dispatch = useDispatch();
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          originalConfig.headers.Authorization = `Bearer ${accessToken}`;
          // dispatch({ type: USER_REFRESH_TOKEN, payload: accessToken });
          // useUpdateAccessToken(accessToken);
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
