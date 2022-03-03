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
       requestedUserID: req.body.requestedUserID
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

// Allocate Request to current Employee
exports.allocate = (req, res) => {
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
                res.send({ message: "Request was Allocated Successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error allocating Request with id=" + id
            });
        });
};

// Request Approval for a request that is over the cost threshold
exports.requestApproval = (req, res) => {
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
                res.send({ message: "Request Successfull, waiting for Approval" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error requesting authorisation for Request with id=" + id
            });
        });
};

// approve a purchase request
exports.approvePurchase = (req, res) => {
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
                res.send({ message: "Authorisation requested Successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error requesting authorisation for Request with id=" + id
            });
        });
};

// decline a purchase request
exports.declinePurchase = (req, res) => {
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
                    message: `Cannot decline Request with id=${id}. Maybe Request was not found!`
                });
            } else
                res.send({ message: "Request Declined." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error declining for Request with id=" + id
            });
        });
};