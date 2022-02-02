module.exports = mongoose => {
    var User = mongoose.model(
        "user",
        mongoose.Schema({
            username: {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            password: {
                type: String
            },
            dateCreated:{
                type: Date,
                required: true,
                default: Date.now  
            },
            isEmployee: {
                type: Boolean,
                default: false
            },
            isAdmin: {
                type: Boolean,
                default: false
            }
        
        })

    );
    return User;
};
