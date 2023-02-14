const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtStrategy = require("passport-jwt").Strategy;

// Require controller modules
const instrument_controller = require("../controllers/instrumentController");
const artist_controller = require("../controllers/artistController");
const genre_controller = require("../controllers/genreController");
const user_Controller = require("../controllers/userController");
const verify_controller = require("../controllers/verifyController");

// ------------ INSTRUMENT ROUTES ------------ //

// GET request for creating a new instrument
router.get("/instrument/create", instrument_controller.instrument_create_get);

// POST request for creating a new instrument
router.post("/instrument/create", instrument_controller.instrument_create_post);

// GET request for viewing a list of created instruments
router.get(
  "/instrument/list",
  passport.authenticate("jwt", { session: false }),
  instrument_controller.instrument_list
);

// GET any instrument detail
router.get("/instrument/:id", instrument_controller.instrument_detail);

// GET delete instrument from the list
router.get(
  "/instrument/:id/delete",
  instrument_controller.instrument_delete_get
);

// POST delete instrument from the list
router.delete(
  "/instrument/:id/delete",
  instrument_controller.instrument_delete_post
);

// ------------ ARTIST ROUTES ------------ //

// GET request for creating a new Artist
router.get("/artist/create", artist_controller.artist_create_get);

// POST request for creating a new Artist
router.post("/artist/create", artist_controller.artist_create_post);

// GET request for viewing a list of created artists
router.get(
  "/artist/list",
  passport.authenticate("jwt", { session: false }),
  artist_controller.artist_list
);

// GET any artist detail
router.get("/artist/:id", artist_controller.artist_detail);

// GET delete artist from the list
router.get("/artist/:id/delete", artist_controller.artist_delete_get);

// POST delete artist from the list
router.delete("/artist/:id/delete", artist_controller.artist_delete_post);

// // ------------ GENRE ROUTES ------------ //

// GET request for creating a new Genre
router.get("/genre/create", genre_controller.genre_create_get);

// POST request for creating a new Genre
router.post("/genre/create", genre_controller.genre_create_post);

// GET request for viewing a list of created genres
router.get(
  "/genre/list",
  passport.authenticate("jwt", { session: false }),
  genre_controller.genre_list
);

// GET any genre detail
router.get("/genre/:id", genre_controller.genre_detail);

// GET delete genre from the list
router.get(
  "/genre/:id/delete",
  passport.authenticate("jwt", { session: false }),
  genre_controller.genre_delete_get
);

// POST delete genre from the list
router.delete(
  "/genre/:id/delete",
  passport.authenticate("jwt", { session: false }),
  genre_controller.genre_delete_post
);

// user Creation

router.post(
  "/sign-up",
  user_Controller.user_creation_post,
  (req, res, next) => {
    res.status(201).send("Nice!");
  }
);

// user login

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    // recorda que 'user' representa la devolucion de un usuario ya autentificado

    try {
      // test de error o de usuario no autentificado(pass or user incorrecto)
      if (err || !user) {
        console.log("incorrect user or password");
        res.status(403).json({ message: "Wrong user or password" });
        const error = new Error("new Error");
        return next(error);
      }
      // el usuario existe, entonces
      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        console.log(user);

        const body = { _id: user._id, username: user.username };

        const token = jwt.sign({ user: body }, "top_secret");
        res.json({ token, user });
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
});

const jwtStrategry = require("../strategies/jwt");
passport.use(jwtStrategry);

router.get(
  "/protected",
  (req, res, next) => {
    console.log("here");
    next();
  },
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("here too");
    return res.status(200).send("YAY! this is a protected Route");
  }
);

module.exports = router;
