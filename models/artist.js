const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: { type: String },
    age: { type: Number },
    style: { type: String },
    band: { type: String },
})

module.exports = mongoose.model("Artist", ArtistSchema)