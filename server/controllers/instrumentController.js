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
  body("category", "Category must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // body("artist", "Artist must not be empty.")
  //   .trim()
  //   .isLength({ min: 1 })
  //   .escape(),
  body("model", "Model must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.send("Error");
      return;
    }
    // Create a Book object with escaped and trimmed data.
    const instrument = new Instrument({
      category: req.body.category,
      brand: req.body.brand,
      // artist: req.body.artist,
      model: req.body.model,
      dataClass : "instrument"
      // price: req.body.price,
    });

    // Data from form is valid. Save book.
    instrument.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new book record.
    });
    console.log("Instrument Created");
  },
];

exports.instrument_list = (req, res, next) => {
  Instrument.find()
    .sort([["brand", "ascending"]])
    .exec(function (err, list_instruments) {
      if (err) {
        return next(err);
      }
      res.json(list_instruments);
    });
  //Successful, so render
};

exports.instrument_detail = (req, res, next) => {
  async.parallel(
    {
      instrument(callback) {
        Instrument.findById(req.params.id).populate("artist").exec(callback);
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
};

exports.instrument_delete_get = (req, res, next) => {
  async.parallel(
    {
      instrument(callback) {
        Instrument.findById(req.params.id).exec(callback);
      },
      instruments_artists(callback) {
        Artist.find({ instrument: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.instrument == null) {
        // No results.
        res.redirect("/inventory/instrument");
      }
      // Successful, so render.
      res.render("instrument_delete", {
        title: "Delete Instrument",
        instrument: results.instrument,
      });
    }
  );
};

exports.instrument_delete_post = (req, res, next) => {
  Instrument.findByIdAndRemove(req.params.id, (err, x) => {
    if (err) {
      return next(err);
    }

    res.send(console.log("working"));
    res.send(console.log(x));
    res.send(console.log(req.params.id));
  });
};
