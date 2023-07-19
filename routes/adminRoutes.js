const express = require("express");
const {
  addDoctorController,
  getDoctorsData,
  deleteDoctorController,
  authController,
} = require("../controllers/adminCtrl");

const authAdmin = require("../middlewares/authAdmin");

const router = express.Router();

// Add Doctor || POST
router.post("/add-doctors", addDoctorController);

// Get Doctors || GET
router.get("/doctors", getDoctorsData);

// Delete Doctor || DELETE
router.delete("/doctors/:id", deleteDoctorController);

// Get Admin Data || POST
router.post("/getAdminData", authAdmin,   authController);

module.exports = router;
