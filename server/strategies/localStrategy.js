const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const validatePassFunction = require("../routes/Auth/passUtils").validPassword;


const verifyFunction = (username, password, end) => {

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        console.log('There is no such user');
        return end(null, false);
      }

      const isValid = validatePassFunction(password, user.hash, user.salt);

      if (isValid) {

        return end(null, user); // se devuelve un usuario validado
      } else {
        return end(null, false);
      }
    })
    .catch((err) => {
      end(err);
    });
};

const strategy = new LocalStrategy(verifyFunction);

passport.use('login', strategy); //el primer parametro es el nombre que le estas poniendo al
//recurso que passport va a usar
// el segundo es, justamente, el recurso

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
