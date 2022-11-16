const { body, validationResult } = require("express-validator");
const Genre = require("../models/genre");
const async = require("async");

// Remember, in here we need to implement controllers for every url we create in in our routes files
// Instrument refers artists and genres, so, you can delete inst, but NOT artist or genres, its deletion would cause
// an empty data space for instrument

// REMEMBER TO INSTALL NODEMON OR TO RESTART TE SERVER IN EVERY CHANGE!!

exports.genre_create_get = (req, res, next) => {
  // get artist and genres for filling our instruments
  res.render("genre_form", {
    title: "Create new Genre",
  });
};

exports.genre_create_post = [
  // Validate and sanitize the name field.
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(req.body);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      Genre.findOne({ name: req.body.name }).exec((err, found_genre) => {
        if (err) {
          return next(err);
        }

        if (found_genre) {
          // Genre exists, redirect to its detail page.
          res.redirect(found_genre.url);
        } else {
          genre.save((err) => {
            if (err) {
              return next(err);
            }
            // Genre saved. Redirect to genre detail page.
            res.redirect("back");
          });
        }
      });
    }
  },
];

exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_genre) {
      if (err) {
        return next(err);
      }
      //succes! Then, render:
      res.json(list_genre);
      // res.render("genre_list", {
      //   title: "Genre List",
      //   genre_list: list_genre,
      // });
    });
};

exports.genre_detail = (req, res, next) => {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        // No results.
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("genre_detail", {
        title: "Genre Detail",
        genre: results.genre,
      });
    }
  );
};

exports.genre_delete_get = (req, res, next) => {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        // No results.
        res.redirect("/inventory/genre/create");
      }
      // Successful, so render.
      res.render("genre_delete", {
        title: "Delete genre",
        genre: results.genre,
      });
    }
  );
};

exports.genre_delete_post = (req, res) => {
  Genre.findByIdAndRemove(req.params.id, (err, x) => {
    if (err) {
      return next(err);
    }

    res.send(console.log("working"));
    res.send(console.log(x));
    res.send(console.log(req.params.id));
  });

  // res.send(console.log('working'))
  /* Observacion: NO ES LO MISMO!!! Enviar un req.body que enviar
  un req.params. Esto no estaba funcionando porque en findByIdAndRemove
  se estaba pasando req.body.id como parametro. En este momento esta funcionando
  porque se utiliza req.params.id cuidado con esto
*/

/* Por otro lado, esto estaba funcionando con un metodo POST y no un metodo DELETE
Pero, tanto en el archivo */
};
