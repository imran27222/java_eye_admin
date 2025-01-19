import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import api from "../../utils/adminAxios";
import AdminLogin from "./AdminLogin";
import AdminPortalLayout from "../components/layout/AdminLayout";
import AdminHome from "../components/home/AdminHome";
function Routing() {
  const token = useSelector((store) => store.admin.token);
  const dispatch = useDispatch();
  const getAdmin = async (token) => {
    try {
      const { setAdmin, logoutAdmin } = await import("../../store/admin/adminSlice");
      const response = await api.get("/auth/by-accesstoken");
      dispatch(setAdmin(response.data));
    } catch (error) {
      if (error.response.data.error === "jwt expired") {
        dispatch(logoutAdmin());
      }
    }
  };
  useEffect(() => {
    getAdmin();
  }, [token]);
  return (
    <Routes>
      {token ? (
        // Routes for authenticated users
        <>
          <Route path="" element={<AdminPortalLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="/deposit" element={<h1>DEPOSIT</h1>} />
            <Route path="/withdraw" element={<h1>WITHDRAW</h1>} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" />} />
        </>
      ) : (
        // Routes for unauthenticated users
        <>
          <Route path="login" element={<AdminLogin />} />
          <Route path="*" element={<Navigate to="/admin/login" />} />
        </>
      )}
    </Routes>
  );
}

export default Routing;
