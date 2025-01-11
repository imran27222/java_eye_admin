import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <>
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
