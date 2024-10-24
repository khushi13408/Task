const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    let { password, email } = req.body;

    // Check if email already exists
    const emailValues = await User.findOne({ email: email });
    if (emailValues) {
      return res.json({
        message: "Email already exists",
        status: "Failure",
        code: 400,
        data: {}
      });
    }

    // Encrypt password
    let encryptPassword = await bcrypt.hash(password, 10);

    // Create new user with encrypted password
    const data = {
      ...req.body,
      password: encryptPassword,
    };

    const response = await User.create(data);
    return res.json({
      message: "User created successfully",
      status: "Success",
      code: 201,
      data: response
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Internal server error",
      status: "Failure",
      code: 500,
      data: {}
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        message: "Invalid credentials",
        status: "Failure",
        code: 400,
        data: {}
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({
        message: "Invalid credentials",
        status: "Failure",
        code: 400,
        data: {}
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, user_type: user.user_type },
      "asdgy",
      { expiresIn: "1h" }
    );

    const data = {
      id: user._id,
      email: user.email,
      token,
    };

    return res.json({
      message: "Login successfully",
      status: "Success",
      code: 200,
      data
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Internal server error",
      status: "Failure",
      code: 500,
      data: {}
    });
  }
};
