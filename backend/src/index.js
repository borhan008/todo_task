const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

const dbConnect = require("./config/dbConnect");
const router = require("./routes/routes");
dotenv.config();

const app = express();
dbConnect();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", router);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
