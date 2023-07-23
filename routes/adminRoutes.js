const express = require("express");
const {
  addDoctorController,
  getDoctorsData,
  deleteDoctorController,
  authController,
  getAppointmentController,
  getUsersDataController,
  deleteUserController,
  updateAppointmentStatus,
} = require("../controllers/adminCtrl");

const authAdmin = require("../middlewares/authAdmin");

const router = express.Router();

// Add Doctor || POST
router.post("/add-doctors", addDoctorController);

// Get Doctors || GET
router.get("/doctors", getDoctorsData);

// Delete Doctor || DELETE
router.delete("/doctors/:id", deleteDoctorController);

// Get all appointments || GET
router.get("/view-all-appointments",getAppointmentController);

// Get Admin Data || POST
router.post("/getAdminData", authController);

// Get Users Data || GET
router.get("/patients", getUsersDataController);

//  Delete User || DELETE  
router.delete('/patients/:userId', deleteUserController);

// Update appointment status
router.put("/update-appointment-status/:id", updateAppointmentStatus);

module.exports = router;
