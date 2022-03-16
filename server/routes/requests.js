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
router.get("/request/:id", [authjwt.verifyToken], requestController.getRequest);

// Retrieve all requests
router.get("/requests/", [authjwt.verifyToken], requestController.findAll);

router.get("/requests/unassigned", [authjwt.verifyToken], [employeeCheck.verifyEmployee], requestController.getUnassignedRequests);

router.get("/requests/approval", [authjwt.verifyToken], [adminCheck.verifyAdmin], requestController.getRequestsToApprove);

// Retrieve requests for current user
router.get("/requests/:id", [authjwt.verifyToken], requestController.usersRequests);

router.get("/requests/:id/assigned", [authjwt.verifyToken], [employeeCheck.verifyEmployee], requestController.getAssignedRequests);

router.put("/requests/:id/", [authjwt.verifyToken], requestController.updateRequest);

router.put("/requests/:id/allocate", [authjwt.verifyToken], [employeeCheck.verifyEmployee], requestController.updateRequest);

router.put("/requests/:id/purchase", [authjwt.verifyToken], [employeeCheck.verifyEmployee], requestController.updateRequest);

router.put("/requests/:id/cancel", [authjwt.verifyToken], requestController.updateRequest);

router.put("/requests/:id/request-approval", [authjwt.verifyToken], [employeeCheck.verifyEmployee], requestController.updateRequest);

router.put("/requests/:id/request-detail", [authjwt.verifyToken], [employeeCheck.verifyEmployee], requestController.updateRequest);

router.put("/requests/:id/approved", [authjwt.verifyToken], [adminCheck.verifyAdmin], requestController.updateRequest);

router.put("/requests/:id/declined", [authjwt.verifyToken], [adminCheck.verifyAdmin], requestController.updateRequest);

router.delete("/requests/:id", [authjwt.verifyToken], requestController.delete);

module.exports = router;