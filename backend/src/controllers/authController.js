const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const register = async (req, res) => {
  try {
    console.log(req);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: "Missing required fields",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const secret = speakeasy.generateSecret();

    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: name,
      issuer: "Todo",
      encoding: "base32",
    });

    const qrImage = await qrcode.toDataURL(url);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      twoFactorCode: secret.base32,
    });
    await user.save();

    return res.status(201).json({
      message: "User registered successfully",
      qrImage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: "Error while registering user",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: "Missing required fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid password",
        error: "Invalid password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: "Error while logging in",
    });
  }
};

const logout = async (req, res) => {};

const twoFactorSetup = async (req, res) => {};

const twoFactorVerify = async (req, res) => {};

const twoFactorReset = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
  twoFactorSetup,
  twoFactorVerify,
  twoFactorReset,
};
