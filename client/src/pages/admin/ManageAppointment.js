import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag } from "antd";
import AdminNav from "../../Data/AdminNavbar";
import "../../styles/AdminStyles.css";

const ManageAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/api/v1/admin/appointments");
      setAppointments(response.data.appointments);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching appointments:", error);
      setError("Error fetching appointments");
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "users",
      key: "users",
      render: (users) => <span>{users.name}</span>,
    },
    {
      title: "Appointment Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Appointment Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Pending" ? "orange" : "green"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div>
      <AdminNav />
      <div className="containers">
        <h2 className="heading text-left">Manage Appointments (Currently Not Working)</h2>
        <Table
          dataSource={appointments}
          columns={columns}
          rowKey={(record) => record._id}
        />
      </div>
    </div>
  );
};

export default ManageAppointment;
