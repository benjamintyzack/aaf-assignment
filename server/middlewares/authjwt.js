const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;

verifyToken = (async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    console.log(decoded);
    const user = await User.findOne({ _id: decoded.id })
    req.user = user;
  } catch (err) {
    console.log(err);
    
    return res.status(401).send("Invalid Token");
  }
  return next();
});

const authjwt = {
  verifyToken
};
module.exports = authjwt;
