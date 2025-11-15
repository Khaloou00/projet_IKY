import React from "react";

const Forgot = () => {
  return (
    <div className="flex flex-col items-center   ">
      <h2 className=" font-bold text-3xl my-7 ">Reset Password</h2>
      <p>we will send you an email to reset your Password</p>
      <form className="space-y-4 mt-5 w-[30%]">
        <input
          id="email"
          type="email"
          className="inputForm"
          placeholder="Enter your email"
        />

        <input
          type="submit"
          className="bg-primary text-white py-2 rounded-md w-full cursor-pointer font-semibold hover:bg-primary/90 "
          value={"Reset"}
        />
      </form>
    </div>
  );
};

export default Forgot;
