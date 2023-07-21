import {
  Col,
  Form,
  Input,
  Row,
  TimePicker,
  message,
  notification,
  Checkbox,
  Select,
} from "antd";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import AdminNav from "../../Data/AdminNavbar";
import "../../styles/AdminStyles.css";

const { Option } = Select;

const AddDoctors = ({ doctor }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(doctor); // Set initial form values based on the doctor prop
  }, [doctor, form]);

  // const { users } = useSelector(state => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      const { timings, ...data } = values;
      const timingsValue =
        timings && timings.length > 0
          ? [timings[0].format("HH:mm"), timings[1].format("HH:mm")]
          : [];

      let res;
      if (doctor) {
        // If doctor prop is available, it means we are editing an existing doctor
        res = await axios.put(`/api/v1/admin/doctors/${doctor._id}`, {
          ...data,
          timings: {
            startTime: timingsValue[0] || "",
            endTime: timingsValue[1] || "",
          },
        });
      } else {
        // Otherwise, it's a new doctor being added
        res = await axios.post("/api/v1/admin/add-doctors", {
          ...data,
          timings: {
            startTime: timingsValue[0] || "",
            endTime: timingsValue[1] || "",
          },
        });
      }

      dispatch(hideLoading());
      if (res.data.success) {
        notification.success({
          message: doctor
            ? "Doctor updated successfully"
            : "Doctor added successfully",
        });
        navigate("/admin/doctors");
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
      <div style={{ backgroundColor: "#f0f0f0", height: "100vh" }}>
        <AdminNav />
        <div className="doc-form-container">
          <Form layout="vertical" onFinish={onFinishHandler} className="m-4">
            <h1 className="text-center" style={{ color: "#0E2954" }}>
              Onboard Doctors
            </h1>
            <h1 className="">Personal Details : </h1>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Name"
                  name="name"
                  required
                  rules={[
                    { required: true, message: "Please enter your full name" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Full name as per official records"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Phone No"
                  name="phone"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter your phone number" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="email" placeholder="Enter your email address" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter your clinic address" />
                </Form.Item>
              </Col>
            </Row>
            <h1 className="mt-2">Professional Details :</h1>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter your specialization" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter your experience" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Fees Per Consultation"
                  name="feesPerConsultation"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Enter fees" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Timings" name="timings" required>
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Working Days" name="days" required>
                  <Select mode="multiple" placeholder="Select working days">
                    <Option value="Monday">Monday</Option>
                    <Option value="Tuesday">Tuesday</Option>
                    <Option value="Wednesday">Wednesday</Option>
                    <Option value="Thursday">Thursday</Option>
                    <Option value="Friday">Friday</Option>
                    <Option value="Saturday">Saturday</Option>
                    <Option value="Sunday">Sunday</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <button
                  className="d-flex justify-end btn btn-custom mt-3 "
                  type="submit"
                >
                  {doctor ? "Update" : "Submit"}
                </button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddDoctors;
