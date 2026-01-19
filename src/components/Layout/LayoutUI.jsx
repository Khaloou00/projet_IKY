import React from "react";
import Header from "../Shared/Header";
import { Outlet } from "react-router";
import Footer from "../Shared/Footer";

const LayoutUI = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutUI;
