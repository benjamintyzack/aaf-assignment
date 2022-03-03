var express = require('express');
var router = express.Router();

var requestController = require('../controllers/request.controller');

// Add in the routes for requests
// Create a new request
router.post("/requests/", requestController.create);

// Retrieve all requests
router.get("/requests/", requestController.findAll);

router.get("/requests/unassigned", requestController.getUnassignedRequests);

router.get("/requests/approval", requestController.getRequestsToApprove);

// Retrieve requests for current user
router.get("/requests/:id", requestController.usersRequests);

router.get("/requests/:id/assigned", requestController.getAssignedRequests);

router.put("/requests/:id/allocate", requestController.allocate);

router.put("/requests/:id/request-approval", requestController.requestApproval);

router.put("/requests/:id/approved", requestController.approvePurchase);

router.put("/requests/:id/declined", requestController.declinePurchase);
 
// // Update a requests with id
// router.put("/requests/:id", requestController.update);
 
// // Delete a requests with id
// router.delete("/requests/:id", requestController.delete);

module.exports = router;