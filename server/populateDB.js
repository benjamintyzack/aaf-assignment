const db = require("./models");
const User = db.users;
const Request = db.requests;
const  bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
/**
 * populateDB | A script function that creates a predefined
 * set of data that can be used to demonstrate the capabilities
 * of the web application.
 */
async function populateDB() {
    const encryptedPassword = await bcrypt.hash('password', 8);


    const exampleClient = new User({
        password: encryptedPassword,
        username: 'client',
        isEmployee: false,
        isAdmin: false,
    })

    

    const exampleEmployee = new User({
        password: encryptedPassword,
        username: 'employee',
        isEmployee: true,
        isAdmin: false,
    })

    

    const exampleAdmin = new User({
        password: encryptedPassword,
        username: 'admin',
        isEmployee: false,
        isAdmin: true,
    })

    


    try{
        await exampleClient.save();
        await exampleEmployee.save();
        await exampleAdmin.save();

        let client = await User.findOne({ username: 'client' }).select("-password")
        console.log(client);
        const bookReq1 = new Request({
            bookName: 'How to train your dog',
            bookAuthor: 'Robert Davies',
            bookDescription: 'The simple steps you need to train your dog',
            bookGenre: 'Educational',
            bookPrice: '20.00',
            dateCreated: new Date(),
            requestedUserID: client._id,
        })
    
        
    
        const bookReq2 = new Request({
            bookName: 'How to use the Internet',
            bookAuthor: 'Google',
            bookDescription: '',
            bookGenre: 'Educational',
            bookPrice: '8.00',
            dateCreated: new Date(),
            requestedUserID: client._id,
        })
    
        
    
        const bookReq3 = new Request({
            bookName: 'The BFG',
            bookAuthor: '',
            bookDescription: 'A tale about the BFG',
            bookGenre: '',
            bookPrice: '10.00',
            dateCreated: new Date(),
            requestedUserID: client._id,
        })
    
        
    
        const bookReq4 = new Request({
            bookName: 'Tale of Jerry Seinfeld',
            bookAuthor: 'Jerry Seinfeld',
            bookDescription: 'My Autobiography',
            bookGenre: 'Autobiography',
            bookPrice: '23.00',
            dateCreated: new Date(),
            requestedUserID: client._id,
        })
    
        await bookReq1.save();
        await bookReq2.save();
        await bookReq3.save();
        await bookReq4.save();
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
        populateDB()
        
    })
    .catch(err => console.log(err));