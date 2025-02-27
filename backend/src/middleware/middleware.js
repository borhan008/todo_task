const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyJWTToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const findUser = await User.findById(decoded.id);

    if (!findUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = findUser;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyJWTToken;
