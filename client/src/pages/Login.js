import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterStyles.css";


const Login = () => {

  const navigate = useNavigate();

  // form Handler
const onfinishHandler = async(values) => {
  try{
    const res = await axios.post('/api/v1/users/login', values);
    if(res.data.success){
      localStorage.setItem("token", res.data.token);
      message.success('Login Successfuly!')
      navigate('/');
    }
    else{
      message.error(res.data.message)
    }

  }catch(error){
    console.log(error)
    message.error("Something Went Wrong!!")
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
          <h1 className="text-center"> Login Form </h1>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>

          <Link to="/register" className="ms-2">
            Not a User. Register Now
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
