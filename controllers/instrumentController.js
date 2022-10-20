const { body, validationResult} = require("express-validator");
const Instrument = require("../models/instrument");
const Artist = require("../models/artist");
const Genre = require("../models/genre");

const async = require("async");

// Remember, in here we need to implement controllers for every url we create in in our routes files