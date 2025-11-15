import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import WhatsappContact from "./WhatsappContact";

const Layout = () => {
  return (
    <>
      <Header />
      <div className=" fixed z-10 bottom-[5vh] right-[10vh]">
        <WhatsappContact />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
