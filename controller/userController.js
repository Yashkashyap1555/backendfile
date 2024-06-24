const users = require("../models/userModel");

const registerUser = async (req, res) => { 
  try {
    // console.log("controller")
    const { name, email, password, phonenumber } = req.body;
    if (!name || !email || !password || !phonenumber) {
      return res.status(403).json({
        message: "please enter all details",
      });
    } else {
      const existingUser = await users.findOne({ email: email });
      if (existingUser) {
        return res.status(403).json({
          message: "you are already registred please login ",
        });
      }

      const newUser = await users.create({
        name: name,
        email: email,
        phoneNumber: phonenumber,
        password: password,
      });
      res.status(201).json({
        message: "you have successfully registred ",
        data: newUser,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find({});
    if (allUsers?.length === 0) {
      return res.status(404).json({
        message: "db is empty",
      });
    }
    res.status(200).json({
      data: allUsers,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getOwnProfile = async (req, res) => {
  const { id } = req.body;
  try {
    const myData = await users.findOne({ _id: id });
    if (myData === null) {
      return res.status(404).json({
        message: "you are not registerd",
      });
    }
    myData.password = undefined;
    myData.email = undefined;
    myData.__v = undefined;


    res.status(200).json({
      data: myData,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getOwnProfile
};
