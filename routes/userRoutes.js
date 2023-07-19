const express = require("express");
const {
  loginController,
  registerController,
  authController,
  bookAppointmentController,
  viewAppointmentController,
  // bookAvailabilityController,
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

router.get('/appointments/:userId', viewAppointmentController);

module.exports = router;
