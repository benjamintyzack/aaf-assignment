import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:3050/bookstore",
    headers: {
        "Content-type": "application/json"
    }
});