import React from "react";
import Banner from "../components/HomePage/Banner";
import ExploreProducts from "../components/HomePage/ExploreProducts";
import GoodDeals from "../components/HomePage/GoodDeals";
import Collection from "../components/HomePage/Collection";

const Home = () => {
  return (
    <div>
      <Banner />
      <GoodDeals />
      <Collection />
      <ExploreProducts />
    </div>
  );
};

export default Home;
