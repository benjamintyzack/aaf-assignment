export default class Request {
    constructor(bookName, bookPrice, bookAuthor, bookDescription, bookGenre, requestedUserID, employeeAssignedID, dateCreated, approved, requestStatus, isAssigned, needsMoreDetail, needsApproval, readyForPurchase) {
        this.bookName = bookName;
        this.bookPrice = bookPrice;
        this.bookAuthor = bookAuthor;
        this.bookDescription = bookDescription;
        this.bookGenre = bookGenre;
        this.requestedUserID = requestedUserID;
        this.employeeAssignedID = employeeAssignedID;
        this.dateCreated = dateCreated;
        this.approved = approved;
        this.requestStatus = requestStatus;
        this.isAssigned = isAssigned;
        this.needsMoreDetail = needsMoreDetail;
        this.needsApproval = needsApproval;
        this.readyForPurchase = readyForPurchase;
    }
}