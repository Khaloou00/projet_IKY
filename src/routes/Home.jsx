import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <div className="bg-[url('https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] h-[400px] bg-cover flex items-center justify-center relative after:absolute after:bg-black/40 after:inset-0">
        <h1 className=" text-white text-4xl font-bold z-2">
          Welcome to BuyGoos
        </h1>
      </div>
    </div>
  );
};

export default Home;
