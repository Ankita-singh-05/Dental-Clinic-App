import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  TimePicker,
  notification,
} from "antd";
import moment from "moment";
import UserNavbar from "../Data/UserNavbar";
import axios from "axios";
import "../styles/UserStyles.css";

const { Option } = Select;

const BookAppointment = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [doctorsList, setDoctorsList] = useState([]);

  // To check the availability of the doctors
  const handleAvailabilityCheck = async () => {
    try {
      const values = await form.validateFields(); // Retrieve the form values
      setLoading(true);

      // Send a POST request to check availability
      const res = await axios.post("/api/v1/users/check-availability", {
        doctorName: values.doctorName,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm"),
        workingDays: values.workingDays,
      });
      if (res.data.success) {
        // Doctor is available
        notification.success({
          message: "Doctor is available at the specified date and time",
        });
      } else {
        // Doctor is not available
        notification.error({
          message: "Doctor is not available at the specified date and time",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };


  // Function to handle the appointment booking
  const handleBooking = async () => {
    try {
      const values = await form.validateFields(); // Retrieve the form values
      setLoading(true);

      const token = localStorage.getItem("token"); // Get the authentication token from local storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      };

      const res = await axios.post(
        "/api/v1/users/book-appointment",
        values,
        config
      );

      if (res.data.success) {
        // Appointment booked successfully
        console.log("Appointment booked successfully");
        notification.success({
          message: "Appointment Booked Successfully",
        });
      } else {
        // Failed to book appointment
        console.error("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the list of doctors when the component mounts
    fetchDoctorsList();
  }, []);

  // To display the doctors name in the dropdown
  const fetchDoctorsList = async () => {
    try {
      const response = await axios.get("/api/v1/admin/doctors");
      if (response.data.success) {
        // Update the doctorsList state with the list of doctors
        setDoctorsList(response.data.doctors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="book-appointment-container">
        <UserNavbar />
        <div className="book-appointment-content">
          <h1 className="book-appointment-title">Book an Appointment</h1>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Doctor Name"
              name="doctorName"
              rules={[{ required: true, message: "Please select a doctor" }]}
            >
              <Select placeholder="Select a doctor">
                {doctorsList.map((doctor) => (
                  <Option key={doctor._id} value={doctor.name}>
                    {doctor.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Time"
              name="time"
              rules={[{ required: true, message: "Please select a time" }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
            {/* <Form.Item>
              <Button
                type="primary"
                onClick={handleAvailabilityCheck}
                loading={loading}
                className="check-availability-button"
              >
                Check Availability
              </Button>
            </Form.Item> */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleBooking}
                className="book-now-button"
              >
                Book Now
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
