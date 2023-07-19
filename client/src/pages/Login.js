import React, { useEffect} from "react";
import { Form, Input, notification, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "../styles/RegisterStyles.css";
import { setAdminStatus } from "../redux/features/adminSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // form Handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/users/login", values);
      dispatch(hideLoading());

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);

        notification.success({
          message: "Login Successful",
        });

        const isAdmin = res.data.isAdmin;
        dispatch(setAdminStatus(isAdmin)); // Set the admin status in the Redux store

        if (isAdmin) {
          navigate("/admin"); // Redirect to admin dashboard
        } else {
          navigate("/"); // Redirect to user dashboard
        }
      } else {
        notification.error({
          message: "Login Failed",
          description: res.data.message,
        });
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      notification.error({
        message: "Something Went Wrong!",
      });
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h1 className="text-center"> Login to Your Account </h1>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>

          <Link to="/register" className="ms-2">
            <span className="mr-3">
              New to our Dental Family? Join us today!
            </span>
          </Link>

          <button className="btn btn-custom" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
