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
   await user
            .save()
            .then(data => {
                console.log("User saved in the database: " + data);
                res.status(201).send("User saved successfully!");
            })
            .catch(err => {
                res.status(500).send({ message: err || "Some error during save"});
            });
});

// Retrieve all Users from the database.
exports.findAll = (async (req, res) => {
    const username = req.query.username;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
    await User
            .find(condition)
            .select("-password")
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while retrieving Users." });
            });
});

// Find a single User with an id
exports.findOne = ( async (req, res) => {
    const id = req.params.id;

    await User.findById(id)
            .select("-password")
            .then(data => {
                if (!data)
                    res.status(404).send({ message: "Not found User with id: " + id});
                else
                    res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({message: "Error retrieving User with id: " + id});
            })
});

// Update a User by the id in the request
exports.update = ( async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty!" });
    }

    const id = req.params.id;

    try {
		await User.findOneAndUpdate({ _id: id }, req.body);
		user = await User.findOne({ _id: id }).select("-password");
		return res.status(200).send(user);
	} catch (error) {
		if(error.message.includes("duplicate key error")) {
			return res.status(409).send("Username is Already in use!");
		}
		return res.status(404).send("Error, this User doesn't exist!");
	}
});
 
// Delete a User with the specified id in the request
exports.delete = ( async (req, res) => {
    const id = req.params.id;

    try {
		await User.findByIdAndRemove({ _id: id })
		return res.status(204).send("Successfully deleted user");
	} catch {
		return res.status(404).send("This User doesn't exist!")
	}
});
 
// Delete all Users from the database.
exports.deleteAll = ( async (req, res) => {
    try {
		await User.deleteMany({})
		return res.status(204).send("Successfully deleted all users");
	} catch {
		return res.status(404).send("Problem with deleting Users")
	}
});