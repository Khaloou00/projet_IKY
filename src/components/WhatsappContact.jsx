import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappContact = () => {
  return (
    <button className="bg-green-900/80 backdrop-blur-md border-b border-green-500/25 flex text-white items-center rounded-md px-1 py-1 gap-1 cursor-pointer font-semibold text-2xl hover:bg-[#28D146]/90  ">
      <FaWhatsapp className="text-xl lg:text-3xl    " />
      <span className="text-[16px] lg:text-3xl ">Contact-Us</span>
    </button>
  );
};

export default WhatsappContact;
