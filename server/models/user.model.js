module.exports = mongoose => {
    var User = mongoose.model(
        "user",
        mongoose.Schema({
            username: {
                type: String,
                required: [true, 'A username is required'],
                lowercase: true,
                unique: true,
                minlength: 3,
                maxlength: 20
            },
            password: {
                type: String,
                required: [true, 'A password is required'],
                minlength: 6,
                maxlength: 150
            },
            dateCreated:{
                type: Date,
                required: true,
                default: Date.now  
            },
            isEmployee: {
                type: Boolean,
                required: false,
                default: false
            },
            isAdmin: {
                type: Boolean,
                required: false,
                default: false
            }
        
        })

    );
    return User;
};
