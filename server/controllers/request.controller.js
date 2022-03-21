const db = require("../models");
const Request = db.requests;

// Add in functions got Requests (create and handling)

// Create and Save a new Request
exports.create = ( async (req, res) => {
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
   await request
            .save()
            .then(data => {
                console.log("Request saved in the database: " + data);
                res.status(201).send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while creating the Request." });
            });
});

// Retrieve all Requests from the database.
exports.findAll = ( async (req, res) => {
    const bookName = req.query.bookName;
    //We use req.query.bookName to get query string from the Request and consider it as condition for findAll() method.
    var condition = bookName ? { bookName: { $regex: new RegExp(bookName), $options: "i" } } : {};
    await Request
            .find(condition)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while retrieving Requests." });
            });
});

// Retrieve a Requests from the database.
exports.getRequest = ( async (req, res) => {
    const id = req.params.id;

    await Request
            .findById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while retrieving Request." });
            });
});

// Retrieve all Requests for a User.
exports.usersRequests = ( async (req, res) => {
    const requestedUserID = req.params.id;
    //We use req.query.bookName to get query string from the Request and consider it as condition for findAll() method.
    var condition = requestedUserID ? { requestedUserID: { $regex: new RegExp(requestedUserID), $options: "i" } } : {};
    await Request
            .find(condition)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while retrieving Requests." });
            });
});

// Retrieve all Requests that are assigned to the current user.
exports.getAssignedRequests = ( async (req, res) => {
    const employeeAssignedID = req.params.id;
    //We use req.query.bookName to get query string from the Request and consider it as condition for findAll() method.
    var condition = employeeAssignedID ? { employeeAssignedID: { $regex: new RegExp(employeeAssignedID), $options: "i" } } : {};
    await Request
            .find(condition)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while retrieving Requests." });
            });
});

// Retrieve all Unassigned Requests.
exports.getRequests = ( async (req, res) => {
    //Query to get all the unassigned requests
    var condition = { isAssigned : false };
    Request
        .find(condition)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving Requests." });
        });
});

// Retrieve all Requests that need to be approved.
exports.getRequestsToApprove = ( async (req, res) => {
    //We use req.query.bookName to get query string from the Request and consider it as condition for findAll() method.
    var condition = { requestStatus : "NEEDS APPROVAL" };
    await Request
            .find(condition)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while retrieving Requests." });
            });
});

// Updates Request
exports.updateRequest = ( async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    if(req.user.isAdmin || req.user.isEmployee) {
        await Request.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot update Request with id=${id}. Maybe Request was not found!` });
                } else
                    res.status(200).send({ message: "Request was Updated Successfully." });
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error updating Request with id=" + id });
            });
    }
    else {
        const request = await Request.findById(id);

        if(request.requestedUserID == req.user.id) {
            delete req.body.isAssigned;
            delete req.body.approved;
            delete req.body.needsMoreDetail;
            delete req.body.needsApproval;
        }

        await Request.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot update Request with id=${id}. Maybe Request was not found!` });
                } else
                    res.status(200).send({ message: "Request was Updated Successfully." });
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error updating Request with id=" + id });
            });
    }
});

// Delete a Request with the specified id in the request
exports.delete = ( async (req, res) => {
    const id = req.params.id;

    await Request.findByIdAndRemove(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot delete Request with id=${id}. Maybe Request was not found!` });
                } else {
                    res.status(200).send({ message: "Request was deleted successfully!" });
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Could not delete Request with id=" + id });
            });
});