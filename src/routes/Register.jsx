import React from "react";

const Register = () => {
  return (
    <div className="flex flex-col items-center   ">
      <h2 className=" font-bold text-3xl my-7 ">Welcome Back</h2>
      <p>Welcome back please enter your details</p>
      <form className="mt-7 w-[30%]">
        <div className="">
          <label htmlFor="email" className="font-medium inline-block mb-1 ">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="inputForm"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="font-medium inline-block mt-3 mb-1"
          >
            Password
          </label>
          <div className="flex items-center cursor-pointer ">
            <input
              type={type}
              className="inputForm"
              placeholder="Enter your password"
            />
            <div className="-ml-10">
              {type === "password" ? (
                <FaEye onClick={() => setType("text")} />
              ) : (
                <FaEyeSlash onClick={() => setType("password")} />
              )}
            </div>
          </div>
        </div>
        <Link
          to={"/forgot"}
          className="block text-right mt-2 mb-4 font-semibold"
        >
          Forgot Password
        </Link>
        <input
          type="submit"
          className="bg-primary text-white py-2 rounded-md w-full cursor-pointer font-semibold hover:bg-primary/90 "
          value={"Sign In"}
        />
        <div className="flex items-center my-5">
          <hr className="flex-1" />
          <span className="mx-10">Or</span>
          <hr className="flex-1" />
        </div>

        <button className="flex justify-center items-center w-full border-2 border-gray-300 rounded-md cursor-pointer gap-2 py-2   ">
          <FcGoogle className="text-lg" />
          <span className="font-medium">Sign In With Google</span>
        </button>
        <p className="text-center mt-2">
          Don't have an account?{" "}
          <Link className="font-semibold text-primary " to={"/register"}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
