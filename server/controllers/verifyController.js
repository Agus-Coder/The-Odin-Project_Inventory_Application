
exports.verifyToken= (req, res, next) => {
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
