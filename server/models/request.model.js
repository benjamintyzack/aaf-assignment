module.exports = mongoose => {
    var Request = mongoose.model(
        "request",
        mongoose.Schema({
            bookName: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 64
            },
            bookPrice: {
                type: String,
                required: true,
                default: "",
                maxlength: 32
            },
            bookAuthor: {
                type: String,
                required: false,
                default: "",
                maxlength: 64
            },
            bookDescription: {
                type: String,
                required: false,
                default: "",
                maxlength: 256,
            },
            bookGenre: {
                type: String,
                required: false,
                default: "",
                maxlength: 128
            },
            requestedUserID: {
                type: String,
                required: false,
            },
            employeeAssignedID: {
                type: String,
                required: false,
                default: ""
            },
            dateCreated:{
                type: Date,
                required: true,
                default: Date.now  
            },
            approved: {
                type: Boolean,
                required: false,
                default: false

            },
            requestStatus: {
                type: String,
                enum : ['QUEUED', 'PROCESSING', 'DECLINED', 'CANCELLED', 'SUSPENDED', 'NEEDS APPROVAL', 'PURCHASED'],
                default : 'QUEUED'
            },
            isAssigned: {
                type: Boolean,
                required: false,
                default: false
            },
            needsMoreDetail: {
                type: Boolean,
                required: false,
                default: false
            },
            needsApproval: {
                type: Boolean,
                required: false,
                default: false
            },
        
        })

    );
    return Request;
};
