const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");

//register callback
const registerController = async (req, res) => {
  try {
    const existingUser = await userModels.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({ 
        message: "User Already Exist", success: false });
    }
    const password = req.body.password;

    // bcrpyt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModels(req.body)
    await newUser.save();
    res.status(201).send({
        message:"Register Successfuly", success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
  }
};

const loginController = () => {};

module.exports = { loginController, registerController };
