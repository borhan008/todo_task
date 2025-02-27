const router = require("express").Router();
const passport = require("passport");
const {
  register,
  login,
  emailVerify,
  twoFactorVerify,
  getUser,
} = require("../controllers/authController");
const verifyJWTToken = require("../middleware/middleware");
require("../utilities/googleAuth");

const dotenv = require("dotenv");
dotenv.config();

router.post("/register", register);
router.post("/login", login);

router.post("/email/verify", emailVerify);
router.post("/2fa/verify", twoFactorVerify);

router.get("/user", getUser);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: process.env.FRONTEND_FAILED_URL,
  })
);

module.exports = router;
