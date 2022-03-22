const db = require("./models");
const User = db.users
const Request = db.requests
const mongoose = require('mongoose');

/**
 * depopulateDB | A script function that deletes all the
 * pre-created objects that were populated in populateDB.js
 */
async function depopulateDB() {
    try{
        await User.deleteOne({username: 'client'});
        await User.deleteOne({username: 'employee'});
        await User.deleteOne({username: 'admin'});

        await Request.deleteOne({bookName: 'How to train your dog'});
        await Request.deleteOne({bookName: 'How to use the Internet'});
        await Request.deleteOne({bookName: 'The BFG'});
        await Request.deleteOne({bookName: 'Tale of Jerry Seinfeld'});
    } catch (error) {
        console.log(error);
    }
    mongoose.connection.close();
    

}
mongoose 
    .connect(db.url, {
        useNewUrlParser: true,
    })   
    .then(() => {
        depopulateDB();
    })
    .catch(err => console.log(err));