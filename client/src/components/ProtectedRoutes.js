import React, { useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  // Define getUser as a useCallback hook
  const getUser = useCallback(async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/users/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        // Redirect to login
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!users) {
      getUser();
    }
  }, [users, getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
