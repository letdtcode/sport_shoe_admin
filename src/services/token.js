export const getToken = () => {
  return JSON.parse(localStorage.getItem("accessToken"));
};
export const updateToken = (accessToken) => {
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
};
export const getRefreshToken = () => {
  return JSON.parse(localStorage.getItem("refreshToken"));
};
export const updateRefreshToken = (refreshToken) => {
  localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
};
