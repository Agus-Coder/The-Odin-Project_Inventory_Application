const User = require("../models/user");
const genPassword = require("../routes/Auth/passUtils").genPassword;

exports.user_creation_post = (req, res, next) => {
  let userAlreadyExist;

  User.exists({ username: req.body.username }).then((result) => {
    result === null ? (userAlreadyExist = false) : (userAlreadyExist = true);
  });

  if (userAlreadyExist) {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const user = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
      isAdmin: false,
    });

    user.save((err) => {
      if (err) {
        return next(err);
      }
    });
    next();
  } else {
    console.log("user already exists!");
    next();
  }
};
