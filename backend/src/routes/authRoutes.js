const router = require("express").Router();

const {
  register,
  login,
  emailVerify,
  twoFactorVerify,
  getUser,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

router.post("/email/verify", emailVerify);
router.post("/2fa/verify", twoFactorVerify);

router.get("/user", getUser);

module.exports = router;
