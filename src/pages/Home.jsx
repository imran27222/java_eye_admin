import React, { useEffect } from "react";
import HeroBanner from "../components/heroBanner/HeroBanner";
import MyAssetsCard from "../components/assests/MyAssestsCard";
import TextBanner from "../components/textBanner/TextBanner";
import BuyAndSell from "../components/buyAndSell/BuyAndSell";
import FeatureNFT from "../components/featuredNFT/FeaturedNFT";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <MyAssetsCard />
      <TextBanner />
      {/* <BuyAndSell /> */}
      <FeatureNFT />
    </div>
  );
};

export default Home;
