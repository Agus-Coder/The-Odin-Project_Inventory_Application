const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//importar validacion de pass

const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};
