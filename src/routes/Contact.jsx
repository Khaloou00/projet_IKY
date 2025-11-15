import React from "react";

const Contact = () => {
  return (
    <>
      <div className="layout">
        <h2 className="text-4xl text-gray-300 font-semibold my-[60px]">
          Contact Us <span className="text-primary  ">Online</span>
        </h2>
        <div className="flex justify-between items-center  ">
          <div>
            <div>
              <h4 className="text-2xl text-gray-300 font-semibold ">
                Call <span className="text-primary  ">Us</span>
              </h4>
              <div className="my-8">
                <p>Office : +(225) 2102010445</p>
                <p>Mobile : +(225) 0777646389</p>
              </div>
            </div>
            <hr />
            <div>
              <h4 className="text-2xl text-gray-300 font-semibold my-[25px]">
                Email <span className="text-primary  ">Us</span>
              </h4>
              <p>company : rac@gmail.com</p>
              <p>personal : demaguede@gmail.com</p>
            </div>
          </div>
          <form className="flex items-center gap-[60px]">
            <div className="flex-1 space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="inputForm "
              />
              <input type="email" placeholder="Email" className="inputForm " />
              <input
                type="tel"
                placeholder="Phone Number"
                className="inputForm "
              />
              <input type="text" placeholder="Subject" className="inputForm " />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Message"
                name=""
                rows={6}
                id=""
                className="inputForm "
              ></textarea>
              <input
                type="submit"
                className="bg-black text-white w-full rounded-md cursor-pointer py-2 mt-3 hover:bg-black/80 "
                value={"SEND"}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mt-[100px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3972.5297928974906!2d-3.925545925028506!3d5.335768994642826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwMjAnMDguOCJOIDPCsDU1JzIyLjciVw!5e0!3m2!1sfr!2sci!4v1741532631365!5m2!1sfr!2sci"
          className="w-full h-[400px] "
        ></iframe>
      </div>
    </>
  );
};

export default Contact;
