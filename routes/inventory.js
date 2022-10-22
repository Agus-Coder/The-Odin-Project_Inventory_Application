const express = require("express");
const router = express.Router();

// Require controller modules
const instrument_controller = require("../controllers/instrumentController");
// const artist_controller = require("../controllers/artistController");
const genre_controller = require("../controllers/genreController");

// ------------ INSTRUMENT ROUTES ------------ //

// GET home page
router.get("/", instrument_controller.index);

// GET request for creating a new instrument
router.get("/instrument/create", instrument_controller.instrument_create_get);

// POST request for creating a new instrument
// router.post("/instrument/create", instrument_controller.instrument_create_post);

// ------------ ARTIST ROUTES ------------ //

// // GET request for creating a new instrument
// router.get("/artist/create", artist_controller.artist_create_get);

// // POST request for creating a new instrument
// router.get("/artist/create", artist_controller.artist_create_post);

// // ------------ GENRE ROUTES ------------ //

// GET request for creating a new instrument
router.get("/genre/create", genre_controller.genre_create_get);

// POST request for creating a new instrument
router.post("/genre/create", genre_controller.genre_create_post);

module.exports = router;
