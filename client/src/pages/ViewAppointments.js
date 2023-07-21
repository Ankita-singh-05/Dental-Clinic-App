import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import UserNavbar from "../Data/UserNavbar"
import "../styles/UserStyles.css";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Fetch the user's name and appointments when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch user data using the API endpoint
      const userResponse = await axios.post(
        "/api/v1/users/getUserData",
        {},
        config
      );

      if (userResponse.data.success) {
        // Update the userName state with the user's name
        setUserName(userResponse.data.data.name);

        // Fetch the user's appointments using the received userId prop
        const appointmentsResponse = await axios.get(
          `/api/v1/users/view-appointments/${userResponse.data.data._id}`,
          config
        );

        if (appointmentsResponse.data.success) {
          // Update the appointments state with the user's appointments
          setAppointments(appointmentsResponse.data.data);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
      render: (doctorName) => doctorName || "N/A",
    },
    {
      title: "Appointment Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Appointment Time",
      dataIndex: "time",
      key: "time",
      render: (time) => moment(time).format("HH:mm"),
    },
    {
      title: "Appointment Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "pending" ? "gold" : status === "confirmed" ? "green" : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <div className="user-appointments-container">
        <UserNavbar />
        <div className="user-appointments-content">
          <h1 className="user-appointments-title m-4">Welcome, {userName}</h1>
          <h2 className="user-appointments-subtitle text-center mb-4 text-lg text-bold">My Appointments</h2>
          <div className="appointmnt-tble-container">
            <Table dataSource={appointments} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAppointments;
