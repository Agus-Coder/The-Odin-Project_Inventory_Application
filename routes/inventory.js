const express = require("express");
const router = express.Router();

// Require controller modules
const instrument_controller = require("../controllers/instrumentController");
const artist_controller = require("../controllers/artistController");
const genre_controller = require("../controllers/genreController");

// ------------ INSTRUMENT ROUTES ------------ //

// GET home page
router.get("/", instrument_controller.index);

// GET request for creating a new instrument
router.get("/instrument/create", instrument_controller.instrument_create_get);

// POST request for creating a new instrument
router.post("/instrument/create", instrument_controller.instrument_create_post);

// GET request for viewing a list of created instruments
router.get("/instrument/list", instrument_controller.instrument_list);

// GET any instrument detail
router.get("/instrument/:id", instrument_controller.instrument_detail);

// GET delete instrument from the list
router.get("/instrument/:id/delete", instrument_controller.instrument_delete_get);

// POST delete instrument from the list
router.post("/instrument/:id/delete", instrument_controller.instrument_delete_post);


// ------------ ARTIST ROUTES ------------ //

// GET request for creating a new Artist
router.get("/artist/create", artist_controller.artist_create_get);

// POST request for creating a new Artist
router.post("/artist/create", artist_controller.artist_create_post);

// GET request for viewing a list of created artists
router.get("/artist/list", artist_controller.artist_list);

// GET any artist detail
router.get("/artist/:id", artist_controller.artist_detail);

// GET delete artist from the list
router.get("/artist/:id/delete", artist_controller.artist_delete_get);

// POST delete artist from the list
router.post("/artist/:id/delete", artist_controller.artist_delete_post);

// // ------------ GENRE ROUTES ------------ //

// GET request for creating a new Genre
router.get("/genre/create", genre_controller.genre_create_get);

// POST request for creating a new Genre
router.post("/genre/create", genre_controller.genre_create_post);

// GET request for viewing a list of created genres
router.get("/genre/list", genre_controller.genre_list);

// GET any genre detail
router.get("/genre/:id", genre_controller.genre_detail);

// GET delete genre from the list
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// POST delete genre from the list
router.post("/genre/:id/delete", genre_controller.genre_delete_post);



module.exports = router;
