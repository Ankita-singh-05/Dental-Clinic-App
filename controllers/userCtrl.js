const userModels = require("../models/userModels");
const appointmentModel = require("../models/appointmentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    const { userId, doctorId, doctorInfo, userInfo, date, time } = req.body;

    // Create a new appointment
    const newAppointment = new appointmentModel({
      userId,
      doctorId,
      doctorInfo,
      userInfo,
      date,
      time,
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

// Booking availability controller
// const bookAvailabilityController = async (req, res) => {
//   try {
//     const { doctorName, date, time } = req.body;

//     // Check if there are any appointments for the specified doctor, date, and time
//     const existingAppointment = await appointmentModel.findOne({
//       doctorName,
//       date,
//       time,
//     });

//     if (existingAppointment) {
//       // The doctor is not available at the specified date and time
//       res.status(200).json({
//         success: false,
//         message: "Doctor is not available at the specified date and time",
//       });
//     } else {
//       // The doctor is available
//       res.status(200).json({
//         success: true,
//         message: "Doctor is available at the specified date and time",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       error: error.message,
//       message: "Something went wrong!",
//     });
//   }
// };


// View Appointment Controller
const viewAppointmentController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const appointments = await Appointment.find({ userId });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
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
  // bookAvailabilityController,
};
