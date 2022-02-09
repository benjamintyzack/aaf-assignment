module.exports = mongoose => {
    var Request = mongoose.model(
        "request",
        mongoose.Schema({
            bookName: {
                type: String,
                required: true,
            },
            bookPrice: {
                type: String
            },
            bookAuthor: {
                type: String
            },
            bookDescription: {
                type: String
            },
            bookGenre: {
                type: String
            },
            requestedUserID: {
                type: String
            },
            employeeAssignedID: {
                type: String
            },
            dateCreated:{
                type: Date,
                required: true,
                default: Date.now  
            },
            requestStatus: {
                type: String,
                enum : ['QUEUED', 'PROCESSING', 'APPROVED', 'DECLINED'],
                default : 'QUEUED'
            },
            isAssigned: {
                type: Boolean,
                default: false
            },
            needsMoreDetail: {
                type: Boolean,
                default: false
            },
            needsApproval: {
                type: Boolean,
                default: false
            }
        
        })

    );
    return Request;
};
