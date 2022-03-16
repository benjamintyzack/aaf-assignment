const authjwt = require("./authjwt");
const verifySignUp = require("./verifySignUp");
const employeeCheck = require("./employeeCheck");
const adminCheck = require("./adminCheck");

module.exports = {
  authjwt,
  verifySignUp,
  employeeCheck,
  adminCheck
};