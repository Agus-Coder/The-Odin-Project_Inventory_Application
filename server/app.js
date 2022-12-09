// ---------------- Server Creation ---------------- //

const express = require("express");
const app = express();

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
