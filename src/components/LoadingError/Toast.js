import React from "react";
import { ToastContainer } from "react-toastify";
export default function Toast() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
      />
      {/* Same As  */}
      <ToastContainer />
    </div>
  );
}
