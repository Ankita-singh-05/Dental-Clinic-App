import { Form, Input, Select, message, notification } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterStyles.css";
import RegisterImage from "../images/register.jpg";

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // form Handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      // generate a random patientid
      // const patientId = Math.floor(Math.random() * 10000);
      // const data = { ...values, patientId };

      const res = await axios.post("/api/v1/users/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        notification.success({
          message: "Register Successfully!",
        });
        navigate("/login");
      } else {
        message.error(res.data.message);
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
      <div className="register-container">
        <div className="form-container">
          <Form
            layout="vertical"
            onFinish={onfinishHandler}
            className="register-form"
          >
            <h1 className="text-center"> Register Now! </h1>
            <Form.Item label="Name" name="name" required>
              <Input type="text" required />
            </Form.Item>

            <Form.Item label="Email" name="email" required>
              <Input type="email" required />
            </Form.Item>

            <Form.Item label="Gender" name="gender" required>
              <Select placeholder="Select Gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Mobile" name="mobile" required>
              <Input type="text" required />
            </Form.Item>

            <Form.Item label="Address" name="address" required>
              <Input type="text" required />
            </Form.Item>

            <Form.Item label="Password" name="password" required>
              <Input type="password" required />
            </Form.Item>

            <Link to="/login">
              {/* "Already part of our dental family?" */}
              {/* Welcome back to our dental family! Log in here! */}
              <span className="mr-3">
                Come on in! Existing members can login here!
              </span>
            </Link>

            <button className="btn btn-custom" type="submit">
              Register
            </button>
          </Form>
        </div>
        <div className="register-image-container">
        <img src={RegisterImage} alt="register" />
      </div>
      </div>
    </>
  );
};

export default Register;
