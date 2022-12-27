const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const validatePassFunction = require("../routes/Auth/passUtils").validPassword;

const verifyFunction = (username, password, end) => {

  console.log('works here')

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return end(null, false);
      }

      const isValid = validatePassFunction(password, user.hash, user.salt);

      if (isValid) {
        console.log(user);
        return end(null, user);
      } else {
        return end(null, false);
      }
    })
    .catch((err) => {
      end(err);
    });
};

const strategy = new LocalStrategy(verifyFunction);

passport.use(strategy);

passport.serializeUser((user, end) => {
  end(null, user.id);
});

passport.deserializeUser((userId, end) => {
  User.findById(userId)
    .then((user) => {
      end(null, user);
    })
    .catch((err) => {
      end(err);
    });
});
