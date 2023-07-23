const userModels = require("../models/userModels");
const appointmentModel = require("../models/appointmentModel");
const docModels = require("../models/docModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const momentTimezone = require("moment-timezone");

//register callback
const registerController = async (req, res) => {
  try {
    const existingUser = await userModels.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        message: "User Already Exist",
        success: false,
      });
    }
    const password = req.body.password;

    // bcrpyt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModels(req.body);
    await newUser.save();
    res.status(201).send({
      message: "Register Successfuly",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await userModels.findOne({ email });

    if (!users) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, users.password);

    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid email or password",
        success: false,
      });
    }

    const isAdmin = users.isAdmin;

    const token = jwt.sign({ id: users._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      message: "Login success",
      success: true,
      token,
      isAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error in login controller: ${error.message}`,
      success: false,
    });
  }
};

// Book appointment controller
const bookAppointmentController = async (req, res) => {
  try {
    const { userId, doctorId, doctorInfo, userInfo, date, time, doctorName } =
      req.body;

    // Create a new appointment
    const newAppointment = new appointmentModel({
      userId,
      doctorId,
      doctorInfo,
      userInfo,
      date,
      time,
      doctorName,
    });

    // Save the appointment to the database
    await newAppointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong!",
    });
  }
};

// Check the doctors availability
const checkAvailabilityController = async (req, res) => {
  try {
    const { name, date, time } = req.body;

    // Parse the date and time values to create valid Date objects
    const selectedDate = moment(date, "YYYY-MM-DD").toDate();
    const selectedTime = moment(time, "HH:mm").toDate();

    const doctor = await docModels.findOne({ name });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Check if the doctor's timings object exists and has the 'days' property
    if (!doctor.timings || !doctor.timings.days || !Array.isArray(doctor.timings.days)) {
      return res.status(200).json({
        success: false,
        message: "Doctor's working days not available",
      });
    }

    // Check if the doctor is available on the selected date and time
    const day = moment(selectedDate).format("dddd");
    const startTime = moment(doctor.timings.startTime, "HH:mm").toDate();
    const endTime = moment(doctor.timings.endTime, "HH:mm").toDate();

    // Check if the selected day is in the doctor's working days array
    if (!doctor.timings.days.includes(day)) {
      return res.status(200).json({
        success: false,
        message: "Doctor is not available on the selected day",
      });
    }

    // Check if the selected time is within the doctor's working hours
    if (!(selectedTime >= startTime && selectedTime <= endTime)) {
      return res.status(200).json({
        success: false,
        message: "Doctor is not available at the selected time",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor is available at the specified date and time",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};



// View Appointment Controller
const viewAppointmentController = async (req, res) => {
  try {
    // Fetch user data based on the user ID obtained from the authentication middleware
    const users = req.body.userId;

    // Log the user data to the console to verify if it contains the _id field
    // console.log("User Data:", users);

    // Fetch appointments for the user based on their ID
    const appointments = await appointmentModel.find({ userId: users });
    if (!appointments) {
      return res.status(404).json({
        success: false,
        message: "No appointments found for this user.",
      });
    }

    // Send the appointments data as a response
    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching appointments",
      error: error.message,
    });
  }
};

// auth controller
const authController = async (req, res) => {
  try {
    const users = await userModels.findOne({ _id: req.body.userId });
    if (!users) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: users.name,
          email: users.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  bookAppointmentController,
  viewAppointmentController,
  checkAvailabilityController,
};
