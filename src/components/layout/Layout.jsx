import React, { useEffect } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer } from "react-toastify";
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
      const header = {
        "x-auth-token": token,
      };
      const response = await api.get("/auth/by-accesstoken", { headers: header });
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
      <ToastContainer
        position="top-right"
        autoClose={5000} // Toast auto-closes in 5 seconds
        hideProgressBar={false} // Progress bar is visible
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Layout;
