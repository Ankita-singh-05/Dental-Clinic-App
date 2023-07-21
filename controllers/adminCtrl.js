const appointmentModel = require("../models/appointmentModel");
const docModels = require("../models/docModels");
const userModels = require("../models/userModels");

const addDoctorController = async (req, res) => {
  try {
    const newDoctor = new docModels({
      userId: req.body.userId,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      specialization: req.body.specialization,
      experience: req.body.experience,
      feesPerConsultation: req.body.feesPerConsultation,
      status: "pending",
      timings: req.body.timings,
    });

    await newDoctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor added successfully",
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

// To get the doctors details
const getDoctorsData = async (req, res) => {
  try {
    const doctors = await docModels.find();
    res.status(200).json({
      success: true,
      doctors: doctors,
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

// to delete the doctor
const deleteDoctorController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).send({
    //         success: false,
    //         error: 'Invalid ID format',
    //     });
    // }

    // Find the doctor by ID and delete it from the database
    const deletedDoctor = await docModels.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).send({
        success: false,
        error: "Doctor not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Doctor deleted successfully",
      data: deletedDoctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Server Error",
    });
  }
};

// Get all appointments
const getAppointmentController = async (req, res) => {
  try {
    // Fetch appointments for the logged-in user based on their user ID
    const appointments = await appointmentModel
      .find()
      .populate("userId", "name email") // Include user name and email
      .populate("doctorId", "name") // Include doctor name
      .exec();

    if (!appointments) {
      return res.status(404).json({
        success: false,
        message: "No appointments found.",
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


// Get users data
const getUsersDataController = async (req, res) => {
  try {
    // Fetch all doctor documents from the database
    const users = await userModels.find({ isAdmin: false });

    res.status(200).send({
        success: true,
        data: users,
    });
} catch (error) {
    console.error(error);
    res.status(500).send({
        success: false,
        error: 'Server Error',
    });
}
};


// To delete the user data
const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const users = await userModels.findById(userId);
    if (!users) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // If the user exists, delete the user
    await userModels.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
};


// auth controller
const authController = async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming the request body contains the userId
    const users = await userModels.findById(userId);

    if (!users) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).send({
      success: true,
      data: {
        name: users.name,
        email: users.email,
        isAdmin: users.isAdmin,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth Error",
      success: false,
      error,
    });
  }
};

module.exports = {
  addDoctorController,
  getDoctorsData,
  deleteDoctorController,
  getAppointmentController,
  authController,
  getUsersDataController, 
  deleteUserController
};
