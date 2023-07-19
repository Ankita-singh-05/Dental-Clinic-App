import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, notification } from 'antd';
import UserNavbar from '../Data/UserNavbar';
import axios from 'axios';
import "../styles/UserStyles.css";

const BookAppointment = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAvailabilityCheck = async () => {

    const checkAvailability = async (doctorName, date, time) => {
      try {
        const res = await axios.post('/api/v1/users/check-availability', {
          doctorName,
          date,
          time,
        });
        return res.data.success; // Return the availability status
      } catch (error) {
        console.error('Error:', error);
        // Handle the error as needed
        return false; // Return false in case of an error
      }
    };
    
    try {
      const values = await form.validateFields(); // Retrieve the form values
      setLoading(true);
  
      // Fetch the doctor's details from the database using the doctor's name
      const res = await axios.get(`/api/v1/users/doctors?name=${values.doctorName}`);
  
      if (res.data.success) {
        const doctor = res.data.data;
        const appointments = await axios.get(`/api/v1/users/appointments?doctorId=${doctor._id}`);
  
        // Check if the doctor is available at the specified date and time
        const isAvailable = checkAvailability(doctor, appointments, values.date, values.time);
  
        if (isAvailable) {
          // Doctor is available
          notification.success({
            message: 'Doctor is available at the specified date and time',
          });
          // TODO: Add any additional logic or display success message if needed
        } else {
          // Doctor is not available
          notification.error({
            message: 'Doctor is not available at the specified date and time',
          });
          // TODO: Display error message or handle the unavailability as needed
        }
      } else {
        // Doctor not found
        notification.error({
          message: 'Doctor not found',
        });
        // TODO: Display error message or handle the doctor not found scenario as needed
      }
    } catch (error) {
      console.error('Error:', error);
      // TODO: Display error message or handle the error as needed
    } finally {
      setLoading(false);
    }
  };
  

  const handleBooking = async () => {
    try {
      const values = await form.validateFields(); // Retrieve the form values
      setLoading(true);

      const token = localStorage.getItem('token'); // Get the authentication token from local storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      };
  
      const res = await axios.post('/api/v1/users/book-appointment', values, config);
  
      if (res.data.success) {
        // Appointment booked successfully
        console.log('Appointment booked successfully');
        notification.success({
          message: "Appointment Booked Successfully",
        });
        // TODO: Add any additional logic or display success message if needed
      } else {
        // Failed to book appointment
        console.error('Failed to book appointment');
        // TODO: Display error message or handle the error as needed
      }
    } catch (error) {
      console.error('Error:', error);
      // TODO: Display error message or handle the error as needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="book-appointment-container">
        <UserNavbar />
        <div className="book-appointment-content">
          <h1 className="book-appointment-title">Book an Appointment</h1>
          <Form form={form} layout="vertical">
            <Form.Item label="Doctor Name" name="doctorName" rules={[{ required: true, message: 'Please enter the doctor name' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date' }]}>
              <DatePicker />
            </Form.Item>
            <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Please select a time' }]}>
              <TimePicker format="HH:mm" />
            </Form.Item>
            {/* <Form.Item>
              <Button type="primary" onClick={handleAvailabilityCheck} loading={loading} className="check-availability-button">
                Check Availability
              </Button>
            </Form.Item> */}
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleBooking} className="book-now-button">
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
