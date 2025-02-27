const { google } = require("googleapis");
const Todo = require("../models/todo");
const User = require("../models/user");

const dotenv = require("dotenv");
dotenv.config();

const generateAccessToken = async (refreshToken) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.MAIL_CLIENT_ID,
    process.env.MAIL_CLIENT_SECRET,
    process.env.MAIL_REDIRECT_URL
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    return credentials.access_token;
  } catch (error) {
    console.log(error);

    console.log(error);
    return null;
  }
};

module.exports = generateAccessToken;
