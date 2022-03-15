var express = require('express');
var router = express.Router();

var requestController = require('../controllers/request.controller');

// Add in the routes for requests
// Create a new request
router.post("/requests/", requestController.create);

// Retrieve all requests
router.get("/request/:id", requestController.getRequest);

// Retrieve all requests
router.get("/requests/", requestController.findAll);

router.get("/requests/unassigned", requestController.getUnassignedRequests);

router.get("/requests/approval", requestController.getRequestsToApprove);

// Retrieve requests for current user
router.get("/requests/:id", requestController.usersRequests);

router.get("/requests/:id/assigned", requestController.getAssignedRequests);

router.put("/requests/:id/", requestController.updateRequest);

router.put("/requests/:id/allocate", requestController.updateRequest);

router.put("/requests/:id/purchase", requestController.updateRequest);

router.put("/requests/:id/cancel", requestController.updateRequest);

router.put("/requests/:id/request-approval", requestController.updateRequest);

router.put("/requests/:id/request-detail", requestController.updateRequest);

router.put("/requests/:id/approved", requestController.updateRequest);

router.put("/requests/:id/declined", requestController.updateRequest);

router.delete("/requests/:id", requestController.delete);

module.exports = router;