const passport = require("passport");
const user = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//importar validacion de pass

const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};

const verifyFunction = (username, password, end) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return end(null, false);
      }

      const isValid = validatePassFunction(password, user.hash, user.salt);

      if (isValid) {
        return end(null, user);
      } else {
        return end(null, false);
      }
    })
    .catch((err) => {
      end(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyFunction);

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
