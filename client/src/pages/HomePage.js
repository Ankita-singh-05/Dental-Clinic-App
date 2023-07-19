import { React, useEffect } from "react";
import axios from "axios";
import Navbar from "../Data/UserNavbar";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import userDashboardImg from "../images/user-dashboard.jpg";

const HomePage = () => {
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/users/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div
        className="user-hero"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <div className="user-hero-content" style={{ flex: 1, display: "flex" }}>
          <div
            className="user-heading"
            style={{
              zIndex: 1,
              marginTop: "10rem",
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              gutterBottom
              sx={{
                fontWeight: "bold",
              }}
            >
              Welcome to Our Dental Clinic
            </Typography>
            <Typography
              variant="body1"
              component="p"
              gutterBottom
              sx={{
                fontWeight: "bold",
              }}
            >
              We provide top-quality dental care services for your oral health
              and well-being. Our experienced dentists are committed to
              delivering personalized care and creating beautiful smiles.
            </Typography>
            <Link to="/book-appointment">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  fontSize: "18px",
                  backgroundColor: "#ff6600",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#e65c00" },
                  margin: "0 10px",
                }}
              >
                Schedule Now
              </Button>
            </Link>

            <Link to="/view-doctors">
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
                  "&:hover": { backgroundColor: "#00b359" },
                  margin: "0 10px",
                }}
              >
                View Doctors
              </Button>
            </Link>
            <Link to="/view-appointments">
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  borderRadius: "10px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  backgroundColor: "#4285f4",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#2979ff" },
                  margin: "0 10px",
                }}
              >
                View Appointments
              </Button>
            </Link>
          </div>
          <div
            className="user-hero-image"
            style={{ position: "absolute", flex: 1 }}
          >
            <img
              src={userDashboardImg}
              alt="Dentist"
              style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
