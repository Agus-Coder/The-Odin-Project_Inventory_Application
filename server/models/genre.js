const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String },
  dataClass: {type: String},
});

GenreSchema.virtual("url").get(function () {
  return `/inventory/genre/${this._id}`;
});

module.exports = mongoose.model("Genre", GenreSchema);
