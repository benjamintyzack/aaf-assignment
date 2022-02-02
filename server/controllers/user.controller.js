const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
   if (!req.body.username) {
       res.status(400).send({ message: "Content can not be empty!" });
       return;
   }
 
   // Create an User model object
   const user = new User({
       username: req.body.username
   });
 
   // Save User in the database
   user
       .save()
       .then(data => {
           console.log("User saved in the database: " + data);
           res.send(data);
       })
       .catch(err => {
           res.status(500).send( {
               message:
                 err.message || "Some error occurred while creating the User."
           });
       });
};

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