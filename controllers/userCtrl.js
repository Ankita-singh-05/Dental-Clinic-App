const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

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

// login callback
const loginController = async (req, res) => {
  try{
    const users = await userModels.findOne({email: req.body.email});
    if(!users){
      return res.status(200).send({
        message: "user not found",
        success: false});   
    }

    const isMatch = await bcrypt.compare(req.body.password, users.password);
    if(!isMatch){
      return res.status(200).send({message: "Invalid Email or Password", success: false});
    }

    const token = jwt.sign({id:users._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.status(200).send({message: "Login success", success: true, token});

  }catch(error){
    console.log(error);
    res.status(500).send({
      message: `Error in login ctrl ${error.message}`
    });
  }
};

module.exports = { loginController, registerController };
