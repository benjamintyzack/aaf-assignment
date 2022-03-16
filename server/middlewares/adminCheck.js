const db = require("../models");
const User = db.users;

verifyAdmin = async (req, res, next) => {
    try{ 
		if (req.user.isAdmin == true){
			return next();
		} else {
			res.status(401);
			return res.status(401).send("Not Authorised For This Request, Admin needed");
		}
    } catch {
        return res.status(401).send("Invalid Token");
    }
};

const adminCheck = {
    verifyAdmin
};

module.exports = adminCheck;