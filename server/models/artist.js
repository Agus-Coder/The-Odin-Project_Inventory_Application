const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  style: { type: String },
  band: { type: String },
  dataClass: { type: String },
});

ArtistSchema.virtual("url").get(function () {
  return `/inventory/artist/${this._id}`;
});

module.exports = mongoose.model("Artist", ArtistSchema);
