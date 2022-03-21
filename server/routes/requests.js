var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
const {employeeCheck} = require("../middlewares");
const {adminCheck} = require("../middlewares");

var requestController = require('../controllers/request.controller');

// Add in the routes for requests
// Create a new request
router.post("/requests/", [authjwt.verifyToken], requestController.create);

// Retrieve a single requests
router.get("/requests/:id", [authjwt.verifyToken], requestController.getRequest);

router.get("/requests/", [authjwt.verifyToken], [employeeCheck.verifyEmployee], requestController.getRequests);

router.get("/requests/admin", [authjwt.verifyToken], [adminCheck.verifyAdmin], requestController.getRequestsToApprove);

// Retrieve requests for current user
router.get("/requests/user/:id", [authjwt.verifyToken], requestController.usersRequests);

router.get("/requests/employee/:id", [authjwt.verifyToken], [employeeCheck.verifyEmployee], requestController.getAssignedRequests);

router.put("/requests/:id/", [authjwt.verifyToken], requestController.updateRequest);

router.delete("/requests/:id", [authjwt.verifyToken], requestController.delete);

module.exports = router;