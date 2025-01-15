import React from "react";
import HeroBanner from "../components/heroBanner/HeroBanner";
import MyAssetsCard from "../components/assests/MyAssestsCard";
import TextBanner from "../components/textBanner/TextBanner";
import BuyAndSell from "../components/buyAndSell/BuyAndSell";
import FeatureNFT from "../components/featuredNFT/FeaturedNFT";
import Timer from "../components/purchase/Timer";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <MyAssetsCard />
      <TextBanner />
      {/* <BuyAndSell /> */}
      <Timer />
      <FeatureNFT />
    </div>
  );
};

export default Home;
