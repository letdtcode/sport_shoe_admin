import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainBrand from "./../components/Brand/MainBrand";

const BrandScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainBrand />
      </main>
    </>
  );
};

export default BrandScreen;
