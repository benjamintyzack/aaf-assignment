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
                type: String,
                default: ""
            },
            dateCreated:{
                type: Date,
                required: true,
                default: Date.now  
            },
            approved: {
                type: Boolean,
                default: false

            },
            requestStatus: {
                type: String,
                enum : ['QUEUED', 'PROCESSING', 'APPROVED', 'DECLINED', 'CANCELLED', 'SUSPENDED', 'NEEDS APPROVAL', 'PURCHASED'],
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
