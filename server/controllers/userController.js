const passport = require("passport");
const User = require("../models/user");

exports.user_creation_post = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  
  user.save((err) => {
    if (err) {
      console.log("works!");
      return next(err);
    }
  });
  res.redirect("/log-in");
};

exports.user_login_post = passport.authenticate("local", {
  successRedirect: "/inventory/",
  failureRedirect: "/inventory/log-in",
});
