const express = require("express");
const {
  addDoctorController,
  getDoctorsData,
  deleteDoctorController,
  authController,
  getAppointmentController,
  getUsersDataController,
  deleteUserController,
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
router.get("/appointments",getAppointmentController);

// Get Admin Data || POST
router.post("/getAdminData", authAdmin,   authController);

// Get Users Data || GET
router.get("/patients", getUsersDataController);

//  Delete User || DELETE  
router.delete('/patients/:userId', deleteUserController);

module.exports = router;
