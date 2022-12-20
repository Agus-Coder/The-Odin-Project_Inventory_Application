const User = require("../models/user");
const genPassword = require("../routes/Auth/passUtils").genPassword;

exports.user_creation_post = (req, res, next) => {
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const user = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
  });

  user.save((err) => {
    if (err) {
      console.log("Error");
      return next(err);
    }
  });
};
