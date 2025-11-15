import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappContact = () => {
  return (
    <button className="bg-[#28D146] flex text-white items-center rounded-md px-3 py-2 gap-2 cursor-pointer font-semibold text-2xl hover:bg-[#28D146]/90  ">
      <FaWhatsapp className="text-3xl   " />
      <span>Contact-Us</span>
    </button>
  );
};

export default WhatsappContact;
