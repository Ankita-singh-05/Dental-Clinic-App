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
import UserNavbar from "../Data/UserNavbar";
import "../styles/AdminStyles.css";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  // To edit the existing doctors
  const [selectedDoctor, setSelectedDoctor] = useState(null);

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
  
  return (
    <div>
      <UserNavbar />
      <div className="containers">
        <h2 className="heading text-left">View Doctors List</h2>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ViewDoctors;
