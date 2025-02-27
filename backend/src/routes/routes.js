const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/todo", require("./todoRoutes"));
module.exports = router;
