import axios from 'axios';

let user = JSON.parse(localStorage.getItem('user'));

export default axios.create({
    baseURL: "http://localhost:3050/bookstore",
    headers: {
        "Content-type": "application/json",
        "x-access-token": user.accessToken
    }
});