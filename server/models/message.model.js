module.exports = mongoose => {
    var Message = mongoose.model(
        "message",
        mongoose.Schema({
            user: {
                type: String,
                required: [true, 'A username is required'],
                minlength: 3,
                maxlength: 20
            },
            message: {
                type: String,
                required: [true, "Message can't be empty"],
                maxlength: 150
            }
        
        })

    );
    return Message;
};
