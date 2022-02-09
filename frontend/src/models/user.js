export default class User {
    constructor(username, password, dateCreated, isEmployee, isAdmin) {
        this.username = username;
        this.password = password;
        this.dateCreated = dateCreated;
        this.isEmployee = isEmployee;
        this.isAdmin = isAdmin;
    }
}