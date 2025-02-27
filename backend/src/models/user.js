const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    twoFactorCode: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      default: null,
      required: false,
    },
    refreshToken: {
      type: String,
      default: null,
      required: false,
    },
    accessToken: {
      type: String,
      default: null,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
