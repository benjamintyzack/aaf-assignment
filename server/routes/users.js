var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
const {adminCheck} = require("../middlewares");
const {verifySignUp} = require("../middlewares")
 
//Require controller
var userController = require('../controllers/user.controller');
 
router.get('/', function(req, res, next) {
    res.json({message: "Welcome to the user management subsystem api."});
});

// Create a new user
router.post("/users/", [authjwt.verifyToken], [adminCheck.verifyAdmin], userController.create);
 
// Retrieve all users
router.get("/users/", [authjwt.verifyToken], [adminCheck.verifyAdmin], userController.findAll);
 
// Retrieve a single user with id
router.get("/users/:id", [authjwt.verifyToken], [adminCheck.verifyAdmin], userController.findOne);
 
// Update a user with id
router.put("/users/:id", [authjwt.verifyToken], [adminCheck.verifyAdmin], [verifySignUp.checkDuplicateUsername], userController.update);
 
// Delete a user with id
router.delete("/users/:id", [authjwt.verifyToken], [adminCheck.verifyAdmin], userController.delete);
 
// Delete all users of the database
router.delete("/users/", [authjwt.verifyToken], [adminCheck.verifyAdmin], userController.deleteAll);
 
module.exports = router;