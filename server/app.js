// ---------------- Server Creation ---------------- //

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");

app.use(bodyParser.urlencoded({ extended: false })); // Observation: Express wont work without body parser implementation
app.use(bodyParser.json());

// ----------------       CORS      ---------------- //

const cors = require("cors");
app.use(cors());

// --------------- DOT ENV variables --------------- //

require("dotenv").config();

// -------------- JWT -------------- //
const jwt = require("jsonwebtoken");

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.TOP_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created",
        authData,
      });
    }
  });
});

/*
  This is the most basic token generation.
  The middleware 'verify' execution in here is what STOPS the next middleware (req, res, etc etc) 
*/

app.post("/api/login", (req, res) => {
  //Mock User
  const user = {
    id: 1,
    username: "Agus",
  };

  jwt.sign({ user }, process.env.TOP_SECRET, {expiresIn: '30s'}, (err, token) => {
    res.json({
      token, //this token has to be saved in the client local storage
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

//verify Function

function verifyToken(req, res, next) {
  // get auth header value, the token is always sended in the header
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // split at the space
    const bearer = bearerHeader.split(" ");

    // get token from array
    const bearerToken = bearer[1];

    // set the token
    req.token = bearerToken;

    // call next function
    next();
  } else {
    //forbidden
    res.sendStatus(403);
  }
}

// -------------- Database Connection -------------- //

const mongoose = require("mongoose");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");

const dbString = process.env.DATABASE_URL;
const dbOptions = {
  useNewUrlParser: true, // both options are necessary, without them, mongo will  complaint
  useUnifiedTopology: true,
};

mongoose.connect(dbString, dbOptions);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to mongoose"));

// const testStore = MongoStore.create({
//   mongoUrl: dbString,
//   collection: "sessions",
// });

// app.use(
//   session({
//     secret: process.env.TOP_SECRET,
//     saveUninitialized: true,
//     resave: false,
//     store: testStore,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );

require("./strategies/localStrategy");


// app.use('/auth2', auth);

app.use(passport.initialize());
// app.use(passport.session());

// app.use((req, res, next) => {
  //   console.log(req.session);
  //   // console.log(req.user);
  //   next();
  // });
  

  // ----------------      Routes     ---------------- //
  
  const inventory = require("./routes/inventory");
  app.use("/", inventory);
  require('./routes/auth');

module.exports = app;

// --------------- Sessions tutorial part 1 --------------- //

/* 
So, let's get a grip in what we just learned. The 'new' code is:

const MongoStore = require("connect-mongo");
const session = require("express-session");

those are the packages used in our server for connect to the database and to engage a session in it.

--------------

MongoStore => Connect us to a determinate collection using:

const testStore = MongoStore.create({
  mongoUrl: dbString,
  collection: "sessions",
});

I don't fully think that this section of code is truly necessary, but it allow the app
to enter in a determinate collection.

--------------

Session => This is the core middleware. It contains all the options needed for configure the session,
as its name says, and the cookies.

app.use(
  session({
    secret: process.env.TOP_SECRET,
    resave: false,
    saveUninitialized: true,
    store: testStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

Remember that app.use() configures a determinate middleware for the server to use.
The session middleware contains an object that indicates all the options needed for it functioning

secret: Secret word for session storage in DB
resave: DK
saveUninitialized: DK
store: The collection where sessions will be saved
cookie: cookie's configurations


*/ /*

Sessions
A web application needs the ability to identify users as they browse from page to page.
This series of requests and responses, each associated with the same user, is known as a session.

HTTP is a stateless protocol, meaning that each request to an application can be understood in
isolation - without any context from previous requests. This poses a challenge for web applications
with logged in users, as the authenticated user needs to be remembered across subsequent requests as
 they navigate the application.

To solve this challenge, web applications make use of sessions, which allow state to be maintained
between the application server and the user's browser. A session is established by setting an HTTP
cookie in the browser, which the browser then transmits to the server on every request. The server
uses the value of the cookie to retrieve information it needs across multiple requests. In effect,
this creates a stateful protocol on top of HTTP.

 */

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));

// passport.use(
//   // passport.use lo que hace es registrar ESTA ESTRATEGIA!
//   new LocalStrategy((username, password, done) => {
//     console.log("first");

//     User.findOne({ username: username }, (err, user) => {
//       console.log("second");

//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         console.log("no user");
//         return done(null, false, { message: "Incorrect username" });
//       }
//       if (user.password !== password) {
//         console.log("incorrect password");

//         return done(null, false, { message: "Incorrect password" });
//       }
//       return done(null, user, { message: "welcome" });
//     });
//   })
// );

// // All strategies have a name which, by convention, corresponds to the package name according
// // to the pattern passport-{name}. For instance, the LocalStrategy configured above is named local
// // as it is distributed in the passport-local package.

app.get("/", (req, res, next) => {
  res.send("Hello there!");
});
