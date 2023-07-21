const express = require("express");
const {
  loginController,
  registerController,
  authController,
  bookAppointmentController,
  viewAppointmentController,
  checkAvailabilityController,
} = require("../controllers/userCtrl");
const authmiddleware = require("../middlewares/authmiddleware");

// router object
const router = express.Router();

// routes
//  LOGIN || POST
router.post("/login", loginController);

// REGISTER || POST
router.post("/register", registerController);

// AUTH || POST
router.post('/getUserData', authmiddleware, authController);

// BOOK APPOINTMENT || POST
router.post("/book-appointment", authmiddleware, bookAppointmentController);

// CHECK AVAILABILITY || POST
router.post("/check-availability", checkAvailabilityController);

// VIEW APPOINTMENT || GET
router.get('/view-appointments/:users', authmiddleware, viewAppointmentController);

module.exports = router;
