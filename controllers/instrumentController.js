const { body, validationResult } = require("express-validator");
const Instrument = require("../models/instrument");
const Artist = require("../models/artist");
const Genre = require("../models/genre");

const async = require("async");

// Remember, in here we need to implement controllers for every url we create in in our routes files
// Instrument refers artists and genres, so, you can delete inst, but NOT artist or genres, its deletion would cause
// an empty data space for instrument

exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

exports.instrument_create_get = (req, res, next) => {
  // get artist and genres for filling our instruments
  // async.parallel(
  //   {
  //     artists(callback) {
  //       Artist.find(callback);
  //     },
  //     genres(callback) {
  //       Genre.find(callback);
  //     },
  //   },
  //   (err, results) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     res.render("instrument_form", {
  //       title: "Create new Instrument",
  //       artists: results.artists,
  //       genres: results.genres,
  //     });
  //   }
  // );
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};
