const db = require("../models");
const Request = db.requests;

// Add in functions got Requests (create and handling)

// Create and Save a new Request
exports.create = (req, res) => {
    // Validate request
   if (!req.body.bookName) {
       res.status(400).send({ message: "Content can not be empty!" });
       return;
   }
 
   // Create an Request model object
   const request = new Request({
       bookName: req.body.bookName,
       bookPrice: req.body.bookPrice,
       bookAuthor: req.body.bookAuthor,
       bookDescription: req.body.bookDescription,
       bookGenre: req.body.bookGenre,
       requestedUserID: req.body.requestedUserID,
       readyForPurchase: req.body.readyForPurchase
   });
 
   // Save User in the database
   request
       .save()
       .then(data => {
           console.log("Request saved in the database: " + data);
           res.send(data);
       })
       .catch(err => {
           res.status(500).send( {
               message:
                 err.message || "Some error occurred while creating the Request."
           });
       });
};

// Retrieve all Requests from the database.
exports.findAll = (req, res) => {
    const bookName = req.query.bookName;
    //We use req.query.bookName to get query string from the Request and consider it as condition for findAll() method.
    var condition = bookName ? { bookName: { $regex: new RegExp(bookName), $options: "i" } } : {};
    Request
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Requests."
            });
        });
};

// Retrieve all Requests from the database.
exports.getRequest = (req, res) => {
    const id = req.params.id;

    Request
        .findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Request."
            });
        });
};

// Retrieve all Requests for a User.
exports.usersRequests = (req, res) => {
    const requestedUserID = req.params.id;
    //We use req.query.bookName to get query string from the Request and consider it as condition for findAll() method.
    var condition = requestedUserID ? { requestedUserID: { $regex: new RegExp(requestedUserID), $options: "i" } } : {};
    Request
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Requests."
            });
        });
};

// Retrieve all Requests that are assigned to the current user.
exports.getAssignedRequests = (req, res) => {
    const employeeAssignedID = req.params.id;
    //We use req.query.bookName to get query string from the Request and consider it as condition for findAll() method.
    var condition = employeeAssignedID ? { employeeAssignedID: { $regex: new RegExp(employeeAssignedID), $options: "i" } } : {};
    Request
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Requests."
            });
        });
};

// Retrieve all Requests that are unassigned.
exports.getUnassignedRequests = (req, res) => {
    //Query to get all the unassigned requests
    var condition = { isAssigned : false };
    Request
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Requests."
            });
        });
};

// Retrieve all Requests that need to be approved.
exports.getRequestsToApprove = (req, res) => {
    //We use req.query.bookName to get query string from the Request and consider it as condition for findAll() method.
    var condition = { needsApproval : true };
    Request
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Requests."
            });
        });
};

// Updates Request
exports.updateRequest = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Request.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Request with id=${id}. Maybe Request was not found!`
                });
            } else
                res.send({ message: "Request was Updated Successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Request with id=" + id
            });
        });
};

// Delete a Request with the specified id in the request
exports.delete = (req, res) => {
    console.log("HI");
    const id = req.params.id;

    Request.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Request with id=${id}. Maybe Request was not found!`
                });
            } else {
                res.send({
                    message: "Request was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Request with id=" + id
            });
        });
};