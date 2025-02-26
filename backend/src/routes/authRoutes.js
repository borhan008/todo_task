const router = require("express").Router();

const {
  register,
  login,
  emailVerify,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

router.post("/email/verify", emailVerify);

module.exports = router;
