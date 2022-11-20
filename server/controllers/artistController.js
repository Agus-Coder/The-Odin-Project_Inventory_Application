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

exports.artist_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),
  body("age")
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage("Age must be specified."),
  // body("style")
  //   .optional({ checkFalsy: true })
  //   .trim()
  //   .isLength({ min: 2 })
  //   .escape(),
  body("band")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.send("Error");
      return;
    }
    // Data from form is valid.

    // Create an Author object with escaped and trimmed data.
    const artist = new Artist({
      name: req.body.name,
      age: req.body.age,
      // style: req.body.style,
      band: req.body.band,
      dataClass: 'artist',
    });
    artist.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful - redirect to new author record.
      // res.redirect(artist.url);
    })
    console.log("Artist Created");
  },
];

exports.artist_list = (req, res, next) => {
  Artist.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_artists) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.json(list_artists);
    });
}

exports.artist_detail = (req, res, next) => {
  async.parallel(
    {
      artist(callback) {
        Artist.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.artist == null) {
        // No results.
        const err = new Error("artist not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("artist_detail", {
        title: "artist Detail",
        artist: results.artist,
      });
    }
  );
}

exports.artist_delete_get = (req, res, next) => {
  async.parallel(
    {
      artist(callback) {
        Artist.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.artist == null) {
        // No results.
        res.redirect("/inventory/artist/create");
      }
      // Successful, so render.
      res.render("artist_delete", {
        title: "Delete Artist",
        artist: results.artist,
      });
    }
  );
}

exports.artist_delete_post = (req, res) => {

  Artist.findByIdAndRemove(req.params.id, (err, x) => {
    if (err) {
      return next(err);
    }

    res.send(console.log("working"));
    res.send(console.log(x));
    res.send(console.log(req.params.id));
  });


}