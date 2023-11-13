import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { storePersist } from "./redux/store";
import Toast from "./components/LoadingError/Toast";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={storePersist.store}>
    <PersistGate loading={null} persistor={storePersist.persistor}>
      <App />
      <Toast />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
