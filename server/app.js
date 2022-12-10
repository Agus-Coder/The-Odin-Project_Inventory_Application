// ---------------- Server Creation ---------------- //

const express = require("express");
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false })) // Observation: Express wont work without body parser implementation
app.use(bodyParser.json())

// ----------------       CORS      ---------------- //

const cors = require("cors");
app.use(cors());

// --------------- DOT ENV variables --------------- //

require("dotenv").config();


// ----------------      Routes     ---------------- //

const inventory = require("./routes/inventory");
app.use("/", inventory);


// -------------- Database Connection -------------- //

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to mongoose"));


module.exports = app;



const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
  })
);

app.post(
  "/login",
  passport.authenticate("local", ()=>{
    console.log('logged');
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
