import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/index";
// SAVE USER Login
// const userInfoFromLocalStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// const accessTokenFromLocalStorage = localStorage.getItem("accessToken")
//   ? JSON.parse(localStorage.getItem("accessToken"))
//   : null;

// const refreshTokenFromLocalStorage = localStorage.getItem("refreshToken")
//   ? JSON.parse(localStorage.getItem("refreshToken"))
//   : null;

// const initialState = {
//   userLogin: {
//     userData: userInfoFromLocalStorage,
//   },
// };

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userLogin"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
const persistor = persistStore(store);

export const storePersist = {
  store,
  persistor,
};
