import React, { useEffect } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import TopBanner from "../topBanner/TopBanner";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import api from "../../utils/axios";
import { logout } from "../../store/user/userSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = useSelector((store) => store.user.token);
  const getUser = async (token) => {
    try {
      const { setUser } = await import("../../store/user/userSlice");
      const response = await api.get("/auth/by-accesstoken");
      dispatch(setUser(response.data));
    } catch (error) {
      if (error.response.data.error === "jwt expired") {
        dispatch(logout());
      }
    }
  };
  useEffect(() => {
    const tokenT = searchParams.get("token");
    if (tokenT) {
      getUser(tokenT);
    }
  }, [searchParams]);
  useEffect(() => {
    if (token) {
      getUser(token);
    }
  }, [token]);
  return (
    <>
      <TopBanner />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
