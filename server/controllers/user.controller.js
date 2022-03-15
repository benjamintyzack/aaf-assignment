const db = require("../models");
const  bcrypt = require('bcryptjs');
const User = db.users;

/**
 * create | Creates a new user object and stores it in the database.
 * @param  {Object} req	| An Object sent via the HTTP request.
 * @return {Object} message | A message informing how the request finished.
 */
exports.create = (async (req, res) => {
    // Validate request
   if (!req.body.username || !req.body.password) {
       res.status(400).send("Content can't be empty!");
       return;
   }
   console.log(req.body.username);
   const oldUser = await User.findOne({ username: req.body.username });

   if (oldUser) {
        // username already exists, so return error
      return res.status(409).send("Username already exists!");
    }

    encryptedPassword = await bcrypt.hash(req.body.password, 8);
 
   // Create an User model object
   const user = new User({
       username: req.body.username,
       password: encryptedPassword,
       isEmployee: req.body.isEmployee
   });
 
   // Save User in the database
   user
       .save()
       .then(data => {
           console.log("User saved in the database: " + data);
           res.status(201).send("User saved successfully!");
       })
       .catch(err => {
           res.status(500).send({ 
            message: err || "Some error during save"});
       });
});

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
    User
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id: " + id});
            else
                res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: "Error retrieving User with id: " + id});
        })
};

// Update a User by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else
                res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};
 
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};
 
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Users were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};