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

app.use(
  cors({
    origin: ["https://todo-task-7i4d.vercel.app/", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
