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
// Not currently used by the frontend but has been Implemented for potential future use
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

    try {
		const request = await Request.findOne({ _id: id });
		console.log(request);
		if (request === null) return res.status(404).send({message: 'Request not found!'});
		return res.status(200).send(request);
	} catch (error){
		if (error.message.includes('Cast to ObjectId failed for value')) return res.status(404).send('Request not found!');
		return res.status(500).send({ error: "Unable to retrieve book request" , message: error.message });
	}
});

// Retrieve all Requests for a User.
exports.usersRequests = ( async (req, res) => {
    try {
		const requests = await Request.find({ requestedUserID: req.params.id });
		return res.status(200).send(requests);
	} catch (error) {
		if (error.message.includes('Cast to ObjectId failed for value')) return res.status(404).send('Requests not Found!');
		return res.status(404).send({ error: "Unable to retrieve users book requests", message: error.message });
	}
});

// Retrieve all Requests that are assigned to the current user.
exports.getAssignedRequests = ( async (req, res) => {
    try {
		const requests = await Request.find({ employeeAssignedID: req.params.id });
		return res.status(200).send(requests);
	} catch (error) {
		if (error.message.includes('Cast to ObjectId failed for value')) return res.status(404).send('Requests not Found!');
		return res.status(404).send({ error: "Unable to retrieve users book requests", message: error.message });
	}
});

// Retrieve all Unassigned Requests.
exports.getRequests = ( async (req, res) => {
    try {
		const requests = await Request.find({ isAssigned: false });
		return res.status(200).send(requests);
	} catch (error) {
		if (error.message.includes('Cast to ObjectId failed for value')) return res.status(404).send('Requests not Found!');
		return res.status(404).send({ error: "Unable to retrieve users book requests", message: error.message });
	}
});

// Retrieve all Requests that need to be approved.
exports.getRequestsToApprove = ( async (req, res) => {
    try {
		const requests = await Request.find({ requestStatus : 'NEEDS APPROVAL' });
		return res.status(200).send(requests);
	} catch (error) {
		if (error.message.includes('Cast to ObjectId failed for value')) return res.status(404).send('Requests not Found!');
		return res.status(404).send({ error: "Unable to retrieve users book requests", message: error.message });
	}
});

// Updates Request
exports.updateRequest = ( async (req, res) => {
    try{
		if (req.user.isAdmin || req.user.isEmployee){
			await Request.findOneAndUpdate({ _id: req.params.id }, req.body)
			return res.status(200).send( { message: "Successfully amended book request"});
		} else {
			const book = await Request.findOne({ _id: req.params.id});
			if (book.requestedUserID == req.user.id){
				delete req.body.isAssigned;
				delete req.body.needsApproval;
				if (req.body.needsMoreDetail == true) delete req.body.needsMoreDetail;
				delete req.body.approved;

				
				await Request.findOneAndUpdate({ _id: req.params.id }, req.body);
				const updatedBook = await Request.findOne({ _id: req.params.id});
				res.status(200).send( { message: "Request was Updated Successfully.", updatedRequest: updatedBook});
			}
		}
		
	} catch (error) {
		if (error.message.includes('Cast to ObjectId failed for value')) return res.status(404).send('Cannot update Request. Maybe Request was not found!');
		return res.status(500).send({error: "Error occured when trying to update book request", message: error.message});
	}
});

// Delete a Request with the specified id in the request
exports.delete = ( async (req, res) => {
    const id = req.params.id;

    try {
		await Request.findByIdAndRemove({ _id: id })
		return res.status(204).send( { message: "Successfully Deleted Book Request"});
	} catch (error) {
		if (error.message.includes('Cast to ObjectId failed for value')) return res.status(404).send('Request was not found!');
		return res.status(500).send({ error: "Unable to delete book request", message: error.message });
	}
});