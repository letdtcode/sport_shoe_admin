import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import UserComponent from "../components/users/UserComponent";

const UsersScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber;
  const keyword = match.params.keyword;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserComponent pageNumber={pageNumber} keyword={keyword} />
      </main>
    </>
  );
};

export default UsersScreen;
