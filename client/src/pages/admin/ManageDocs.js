import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNav from "../../Data/AdminNavbar";
import "../../styles/AdminStyles.css";

const ManageDocs = () => {
  const [doctors, setDoctors] = useState([]);

  // To edit the existing doctors
  // const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/v1/admin/doctors");
      setDoctors(response.data.doctors);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleEdit = (doctorId) => {
  //   const selectedDoctor = doctors.find((doctor) => doctor.userId === doctorId);
  //   setSelectedDoctor(selectedDoctor);
  // };

  const handleDelete = async (doctorId) => {
    try {
      const response = await axios.delete(`/api/v1/admin/doctors/${doctorId}`);
      if (response.status === 200) {
        // Update doctors state by removing the deleted doctor
        setDoctors(doctors.filter(doctor => doctor._id !== doctorId));
        console.log('Doctor deleted successfully');
      } else {
        console.log('Error deleting doctor:', response.data.message);
      }
    } catch (error) {
      console.log('Error deleting doctor:', error.message);
    }
  };
  
  

  return (
    <div>
      <AdminNav />
      <div className="containers">
        <h2 className="heading">Manage Doctors</h2>
        <TableContainer component={Paper} className="mt-3 table-conatiner">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Name</TableCell>
                <TableCell className="tableCell">Phone</TableCell>
                <TableCell className="tableCell">Email</TableCell>
                <TableCell className="tableCell">Specialization</TableCell>
                <TableCell className="tableCell">Address</TableCell>
                <TableCell className="tableCell">Fees</TableCell>
                <TableCell className="tableCell">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.userId}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.address}</TableCell>
                  <TableCell>{doctor.feesPerConsultation}</TableCell>
                  <TableCell className="actionsCell">
                    {/* <Button
                      variant="contained"
                      color="primary"
                      className="button"
                      onClick={() => handleEdit(doctor.userId)}
                    >
                      Edit
                    </Button> */}
                    <Button
                      variant="contained"
                      color="error"
                      className="button"
                      onClick={() => handleDelete(doctor._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Link to="/admin/add-doctors">
          <Button variant="contained" className="btn-custom">
            Add Doctor
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ManageDocs;
