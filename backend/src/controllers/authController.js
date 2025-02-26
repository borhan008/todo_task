const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const sendMail = require("../utilities/emailSend");

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

    const otp = speakeasy.totp({
      secret: process.env.TOTP_SECRET,
      encoding: "base32",
      step: 60 * 2,
      window: 1,
    });

    const result = await sendMail(
      user.email,
      "OTP for login",
      `Your OTP is ${otp}`
    );

    if (result.error) throw new Error("Error while sending email");
    console.log(result);
    return res.status(200).json({
      message: "Login successful",
      name: user.name,
      _id: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: "Error while logging in",
    });
  }
};

const emailVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isOTPValid = speakeasy.totp.verifyDelta({
      secret: process.env.TOTP_SECRET,
      encoding: "base32",
      token: otp,
      window: 1,
      step: 60 * 2,
    });
    if (!isOTPValid) throw new Error("Invalid OTP");

    return res.status(200).json({
      message: "OTP verified successfully",
      name: user.name,
      _id: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: "Error while verifying OTP",
    });
  }
};

const twoFactorVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    console.log(email, otp);
    const isOTPValid = speakeasy.totp.verify({
      secret: user.twoFactorCode,
      encoding: "base32",
      token: otp,
      window: 2,
    });
    if (!isOTPValid) throw new Error("Invalid OTP");

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    return res.status(200).json({
      message: "OTP verified successfully",
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: "Error while verifying OTP",
    });
  }
};

const getUser = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  return res.status(200).json({
    name: user.name,
    email: user.email,
    _id: user._id,
  });
};

module.exports = {
  register,
  login,
  emailVerify,
  twoFactorVerify,
  getUser,
};
