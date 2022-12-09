const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//jwt stuff
const jwt = require("jsonwebtoken");

//passport stuff
const passport = require("passport");
const jwtStrategry = require("./strategies/jwt");
passport.use(jwtStrategry);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const inventoryRouter = require("./routes/inventory");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to mongoose"));

app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/inventory", inventoryRouter);

app.post("/login", (req, res) => {
  let { email, password } = req.body;

  console.log(email, password);

  //This lookup would normally be done using a database
  if (email === "paul@nanosoft.co.za") {
    if (password === "pass") {
      //the password compare would normally be done using bcrypt.
      const opts = {};
      opts.expiresIn = 120; //token expires in 2min
      const secret = "SECRET_KEY"; //normally stored in process.env.secret
      const token = jwt.sign({ email }, secret, opts);
      return res.status(200).json({
        message: "Auth Passed",
        token,
      });
    }
  }
  return res.status(401).json({ message: "Auth Failed" });
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).send("YAY! this is a protected Route");
  }
);

module.exports = app;
