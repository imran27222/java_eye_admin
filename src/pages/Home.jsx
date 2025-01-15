import React, { useEffect } from "react";
import HeroBanner from "../components/heroBanner/HeroBanner";
import MyAssetsCard from "../components/assests/MyAssestsCard";
import TextBanner from "../components/textBanner/TextBanner";
import BuyAndSell from "../components/buyAndSell/BuyAndSell";
import FeatureNFT from "../components/featuredNFT/FeaturedNFT";
import Timer from "../components/purchase/Timer";
import { useSearchParams } from "react-router";
import api from "../utils/axios";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const getUser = async (token) => {
    const { setUser } = await import("../store/user/userSlice");
    const header = {
      "x-auth-token": token,
    };
    const response = await api.get("/auth/by-accesstoken", { headers: header });
    dispatch(setUser(response.data));
  };
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      getUser(token);
    }
  }, [searchParams]);

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
