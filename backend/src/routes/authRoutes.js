const router = require("express").Router();

const {
  register,
  login,
  logout,
  twoFactorSetup,
  twoFactorVerify,
  twoFactorReset,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/2fa/setup", twoFactorSetup);
router.post("/2fa/verify", twoFactorVerify);
router.post("/2fa/reset", twoFactorReset);

module.exports = router;
