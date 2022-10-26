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
  async.parallel(
    {
      artists(callback) {
        Artist.find(callback);
      },
      genres(callback) {
        Genre.find(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("instrument_form", {
        title: "Create new Instrument",
        artists: results.artists,
        genres: results.genres,
      });
    }
  );
  // res.send("NOT IMPLEMENTED: BookInstance update GET");
};

exports.instrument_create_post = [
    // Validate and sanitize fields.
  body("class", "Class must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("artist", "Artist must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("model", "Model must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const instrument = new Instrument({
      class: req.body.class,
      brand: req.body.brand,
      artist: req.body.artist,
      model: req.body.model,
      // price: req.body.price,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      async.parallel(
        {
          artists(callback) {
            Artist.find(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }

          res.render("instrument_form", {
            title: "Create Instrument",
            artists: results.artists,
            instrument,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    // Data from form is valid. Save book.
    instrument.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new book record.
      res.redirect(instrument.url);
    });
  },
];

exports.instrument_list = (req, res, next) => {
  Instrument.find({}, "class brand")
  .sort({ brand: 1 })
  .populate("brand")
  .exec(function (err, list_instruments) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.render("instrument_list", { title: "Instrument List", instrument_list: list_instruments });
  });
}

exports.instrument_detail = (req, res, next) => {
  async.parallel(
    {
      instrument(callback) {
        Instrument.findById(req.params.id)
          .populate("artist")
          .exec(callback);
      },
      // book_instance(callback) {
      //   BookInstance.find({ book: req.params.id }).exec(callback);
      // },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.instrument == null) {
        // No results.
        const err = new Error("Instrument not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("instrument_detail", {
        brand: results.instrument.brand,
        instrument: results.instrument,
        // book_instances: results.book_instance,
      });
    }
  );
}

exports.instrument_delete_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED: instrument Delete Get");
}
exports.instrument_delete_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED: instrument Delete post");
}