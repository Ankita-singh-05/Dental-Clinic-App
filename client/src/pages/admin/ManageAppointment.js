import React, { useState, useEffect } from "react";
import { Table, Tag, message, Space, Button } from "antd";
import axios from "axios";
import moment from "moment";
import AdminNavbar from "../../Data/AdminNavbar";
import "../../styles/AdminStyles.css"

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch all appointments when the component mounts
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch all appointments using the API endpoint
      const response = await axios.get(
        "/api/v1/admin/view-all-appointments",
        config
      );

      if (response.data.success) {
        // Update the appointments state with the data
        setAppointments(response.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // console.log(appointments);


  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send a PUT request to update the appointment status
      const response = await axios.put(
        `/api/v1/admin/update-appointment-status/${appointmentId}`,
        { status },
        config
      );

      if (response.data.success) {
        // Update the appointments state with the updated status
        const updatedAppointments = appointments.map((appointment) => {
          if (appointment._id === appointmentId) {
            return { ...appointment, status };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);

        message.success("Appointment status updated successfully");
      } else {
        message.error("Failed to update appointment status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userId", // Access the name field from the nested userId object
      key: "userName",
      render: (users) => (users && users.name) || "N/A",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
      render: (doctorName) => doctorName || "N/A",
      // render: (doctors) => {
      //   console.log(doctors); // Log the doctors data to the console
      //   return (doctors && doctors.doctorName) || "N/A";
      // },
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.status === "pending" && (
            <>
              <Button
                // type="primary"
                className="text-white bg-success"
                onClick={() => handleStatusUpdate(record._id, "confirmed")}
              >
                Confirm
              </Button>
              <Button
                className="text-white bg-danger"
                onClick={() => handleStatusUpdate(record._id, "cancelled")}
              >
                Cancel
              </Button>
            </>
          )}
          {record.status === "confirmed" && (
            <Tag color="green">Confirmed</Tag>
          )}
          {record.status === "cancelled" && (
            <Tag color="red">Cancelled</Tag>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="admin-appointments-container">
      <AdminNavbar />
      <h1 className="admin-appointments-title">Appointments List</h1>
      <div className="appointmnt-tble-container">
        <Table dataSource={appointments} columns={columns} />
      </div>
    </div>
  );
};

export default ManageAppointments;
