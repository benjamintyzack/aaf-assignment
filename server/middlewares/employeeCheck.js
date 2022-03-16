const db = require("../models");
const User = db.users;

verifyEmployee = async (req, res, next) => {
    try{ 
		if (req.user.isEmployee == true){
			return next();
		} else {
			res.status(401);
			return res.status(401).send("Not Authorised For This Request, Employee needed");
		}
    } catch {
        return res.status(401).send("Invalid Token");
    }
};

const employeeCheck = {
  verifyEmployee
};

module.exports = employeeCheck;