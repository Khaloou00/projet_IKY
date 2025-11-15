import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../assets/logo.png";
import { FaCartArrowDown } from "react-icons/fa";

const Header = () => {
  return (
    <div className="shadow-md ">
      <nav className="layout flex justify-between items-center">
        <Link to={"/"}>
          <img src={Logo} alt="" className="w-[120px] " />
        </Link>
        <div className="flex gap-10 text-xl ">
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
          <Link to={"/cart"} className="relative">
            <FaCartArrowDown className="text-2xl" />
            <span className="absolute bg-primary text-white rounded-full px-2 py-1 text-[14px] -top-[15px] -right-[15px] ">
              0
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
