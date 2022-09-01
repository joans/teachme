const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
verifyToken = (req, res, next) => {
  // cookie-version of the code:
  // let token = req.cookies.jwt;
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, process.env.CONFIG_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.uuid;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
