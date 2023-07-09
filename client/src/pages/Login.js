import { Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/RegisterStyles.css";

// form Handler
const onfinishHandler = (values) => {
    console.log(values);
};

const Login = () => {
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h1 className="text-center"> Login Form </h1>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>

          <Link to="/register" className="ms-2">
            Not a User Registered Now
          </Link>

          <button className="btn btn-primary" type="submit">
                Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
