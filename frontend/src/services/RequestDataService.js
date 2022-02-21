import http from "../http-common";

class RequestDataService {

    // Add in frontend routes to call backend routes

    create(data) {
        return http.post("/requests", data);
    }

    getAll() {
        return http.get("/requests");
    }


}
export default new RequestDataService();