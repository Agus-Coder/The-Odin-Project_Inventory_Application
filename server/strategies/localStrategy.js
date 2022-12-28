const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const validatePassFunction = require("../routes/Auth/passUtils").validPassword;


const verifyFunction = (username, password, end) => {

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return end(null, false);
      }

      const isValid = validatePassFunction(password, user.hash, user.salt);

      if (isValid) {
        console.log('workin');
        return end(null, user); //End lo que hace es dar un exito a la funcion y llamar al metodo next
      } else {
        return end(null, false);
      }
    })
    .catch((err) => {
      end(err);
    });
};

const strategy = new LocalStrategy(verifyFunction);

passport.use('login', strategy);

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
