const { body, validationResult } = require("express-validator");
const Artist = require("../models/artist");
const Genre = require("../models/genre");

const async = require("async");

// Remember, in here we need to implement controllers for every url we create in in our routes files
// Instrument refers artists and genres, so, you can delete inst, but NOT artist or genres, its deletion would cause
// an empty data space for instrument

exports.artist_create_get = (req, res, next) => {
  // get artist and genres for filling our instruments
  async.parallel(
    {
      genres(callback) {
        Genre.find(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("artist_form", {
        title: "Create new Artist",
        genres: results.genres,
      });
    }
  );
  // res.send("NOT IMPLEMENTED: BookInstance update GET");
};

exports.artist_create_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Artist Create Post");
}

exports.artist_list = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Artist list");
}

exports.artist_detail = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Artist Detail");
}

exports.artist_delete_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Artist Delete Get");
}
exports.artist_delete_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Artist Delete post");
}