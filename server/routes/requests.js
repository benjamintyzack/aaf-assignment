var express = require('express');
var router = express.Router();

var requestController = require('../controllers/request.controller');

// Add in the routes for requests
// Create a new request
router.post("/requests/", requestController.create);

// Retrieve all requests
router.get("/requests/", requestController.findAll);

router.put("/requests/:id/allocate", requestController.allocate);
 
// Retrieve requests for current user
router.get("/requests/:id", requestController.usersRequests);
 
// // Update a requests with id
// router.put("/requests/:id", requestController.update);
 
// // Delete a requests with id
// router.delete("/requests/:id", requestController.delete);

module.exports = router;