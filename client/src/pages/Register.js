import { Form, Input, message } from "antd";
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterStyles.css";

const Register = () => {
  const navigate = useNavigate();

  // form Handler
const onfinishHandler = async (values) => {
  try{
    const res = await axios.post('/api/v1/users/register', values);
    if(res.data.success) {
      message.success('Registered Successfully!');
      navigate('/login');
    } else {
      message.error(res.data.message);
    }
  } catch(error){
    console.log(error);
    message.error("Something Went Wrong");
  }
};

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onfinishHandler} className="register-form">
            <h1 className="text-center"> Register Form </h1>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>

          <Link to="/login" className="ms-2">Already Login User</Link>

          <button className="btn btn-primary" type="submit">register</button>
        </Form>
      </div>
    </>
  );
};

export default Register;
