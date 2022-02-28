import http from "../http-common";

class RequestDataService {

    // Add in frontend routes to call backend routes

    create(data) {
        return http.post("/requests", data);
    }

    getAll() {
        return http.get("/requests");
    }

    allocate(id, data) {
        return http.put(`/requests/${id}/allocate`, data);
    }

}
export default new RequestDataService();