const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
  class: { type: String },
  brand: { type: String },
  artist: { type: Schema.Types.ObjectId, ref: "Artist", required: false },
  model: { type: String },
  dataClass: {type: String},
  // price: { type: Number}
});

InstrumentSchema.virtual("url").get(function(){ //You can't use arrow function in here because of the 'this'
  return `/catalog/${this.class}/${this._id}`
})

module.exports = mongoose.model("Instrument", InstrumentSchema);
