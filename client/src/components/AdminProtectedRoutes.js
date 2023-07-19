import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import { setAdminStatus } from "../redux/features/adminSlice";

const AdminProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    const getUserData = async () => {
      try {
        dispatch(showLoading());
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "/api/v1/admin/getAdminData",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(hideLoading());

        if (response.data.success) {
          const { name, email, isAdmin } = response.data.data;
          dispatch(setUser({ name, email }));
          dispatch(setAdminStatus(isAdmin));
        } else {
          // Handle unsuccessful response
        }
      } catch (error) {
        dispatch(hideLoading());
        // Handle error
      }
    };

    if (!users) {
      getUserData();
    }
  }, [dispatch, users]);

  const { isAdmin } = useSelector((state) => state.admin);

  if (localStorage.getItem("token")) {
    if (isAdmin) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminProtectedRoute;
