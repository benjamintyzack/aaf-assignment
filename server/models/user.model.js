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
                type: String,
                required: true
            },
            role: {
                type: String,
                required: true
            },
            dateCreated:{
                type: Date,
                required: true,
                default: Date.now  
            }
        
        })

    );
    return User;
};
