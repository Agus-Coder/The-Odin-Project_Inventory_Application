const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
    "User",
    new Schema({
      username: { type: String, required: true },
      password: { type: String, required: true }
    })
  );


exports.user_creation_post = (req, res, next) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    }).save(err => {
      if (err) { 
        console.log(err);
      }
      console.log('WORKS!');
    });
  };