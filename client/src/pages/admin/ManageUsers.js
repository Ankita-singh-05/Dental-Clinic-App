import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import AdminNavbar from '../../Data/AdminNavbar';
import '../../styles/AdminStyles.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/v1/admin/patients');
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

 // handleDelete Function - to delete the users
// const handleDelete = async (userId) => {
//   console.log("userId to be deleted:", userId);

//   try {
//     const response = await axios.delete(`/api/v1/admin/patients/${userId}`);
//     if (response.status === 200) {
//       // User deleted successfully, you can update the users state or fetch the updated list of users again.
//       fetchUsers();
//       console.log("User deleted successfully");
//     } else {
//       console.log("Error deleting user:", response.data.message);
//     }
//   } catch (error) {
//     console.log("Error deleting user:", error.message);
//   }
// };
  

  return (
    <div className="manage-users-container">
      <AdminNavbar />
      <div className="manage-users-content">
        <h2 className="manage-users-heading">Manage Patients</h2>
        <TableContainer component={Paper} className="manage-users-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="manage-users-table-cell">Name</TableCell>
                <TableCell className="manage-users-table-cell">Email</TableCell>
                <TableCell className="manage-users-table-cell">Gender</TableCell>
                <TableCell className="manage-users-table-cell">Phone</TableCell>
                {/* <TableCell className="manage-users-table-cell">Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  {/* <TableCell className="manage-users-actions-cell">
                    <Button variant="contained" color="primary" onClick={() => handleEdit(doctor.userId)}>Edit</Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(user.userId)}>Delete</Button>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ManageUsers;
