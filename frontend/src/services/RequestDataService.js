import http from "../http-common";

class RequestDataService {

    // Add in frontend routes to call backend routes

    create(data) {
        return http.post("/requests", data);
    }

    getRequest(id) {
        return http.get(`/requests/${id}`);
    }

    getUnassignedRequests() {
        return http.get("/requests");
    }
    
    getRequestsToApprove() {
        return http.get('/requests/admin/requests');
    }
    
    getUsersRequests(id) {
        return http.get(`/requests/user/${id}`);
    }

    
    getAssignedRequests(id) {
        return http.get(`/requests/employee/${id}`);
    }

    updateRequest(id, data) {
        return http.put(`requests/${id}`, data);
    }

    deleteRequest(id) {
        return http.delete(`requests/${id}`);
    }

}
export default new RequestDataService();