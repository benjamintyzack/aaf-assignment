import http from "../http-common";

class RequestDataService {

    // Add in frontend routes to call backend routes

    create(data) {
        return http.post("/requests", data);
    }

    getAll() {
        return http.get("/requests");
    }

    getUnassignedRequests() {
        return http.get('/requests/unassigned');
    }
    
    getRequestsToApprove() {
        return http.get('/requests/approval');
    }
    
    getUsersRequests(id) {
        return http.get(`/requests/${id}`);
    }

    getAssignedRequests(id) {
        return http.get(`/requests/${id}/assigned`);
    }

    allocate(id, data) {
        return http.put(`/requests/${id}/allocate`, data);
    }

    cancel(id, data) {
        return http.put(`/requests/${id}/cancel`, data);
    }

    requestApproval(id, data) {
        return http.put(`/requests/${id}/request-approval`, data);
    }

    approvePurchase(id, data) {
        return http.put(`/requests/${id}/approved`, data);
    }

    declinePurchase(id, data) {
        return http.put(`/requests/${id}/declined`, data);
    }

}
export default new RequestDataService();