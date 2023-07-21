import Button from "@mui/material/Button";
import React from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../Data/AdminNavbar";
import "../../styles/AdminStyles.css";

const AdminPage = () => {
  return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-content">
        <div className="hero">
          <div className="hero-content">
            <h1>Welcome to the Admin Panel</h1>
            <h3>Manage and control various aspects of the system</h3>
            <div className="button-group">
              <Link to="/admin/view-all-appointments">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "10px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    backgroundColor: "#ff6600",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#e65c00",
                    },
                  }}
                >
                  Manage Appointments
                </Button>
              </Link>

              <Link to="/admin/doctors">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "10px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    backgroundColor: "#0088ff",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#005db3",
                    },
                  }}
                >
                  Manage Doctors
                </Button>
              </Link>

              <Link to="/admin/patients">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "10px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    backgroundColor: "#00cc66",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#00b359",
                    },
                  }}
                >
                  Manage Patients
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
