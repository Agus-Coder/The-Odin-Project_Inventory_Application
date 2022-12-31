const User = require("../models/user");
const genPassword = require("../routes/Auth/passUtils").genPassword;

exports.user_creation_post = (req, res, next) => {
  const userAlreadyExist = User.exists(
    { username: req.body.username },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log("Result :", doc); // false
      }
    }
  );

  if (userAlreadyExist) {
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
        return next(err);
      }
    });
    next();
  } else {
    console.log("user already exists!");
    next();
  }
};
