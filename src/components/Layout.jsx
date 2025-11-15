import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import WhatsappContact from "./WhatsappContact";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <div className=" fixed z-10 bottom-[2vh] right-[2vh] lg:bottom-[5vh lg:right-[10vh] ">
        <WhatsappContact />
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
