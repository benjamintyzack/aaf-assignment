import http from "../http-common";

class RequestDataService {

    // Add in frontend routes to call backend routes

    create(data) {
        return http.post("/requests", data);
    }

    getRequest(id) {
        return http.get(`/request/${id}`);
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

    updateRequest(id, data) {
        return http.put(`requests/${id}`, data);
    }

    getAssignedRequests(id) {
        return http.get(`/requests/${id}/assigned`);
    }

    allocate(id, data) {
        return http.put(`/requests/${id}/allocate`, data);
    }

    purchase(id, data) {
        return http.put(`/requests/${id}/purchase`, data);
    }

    cancel(id, data) {
        return http.put(`/requests/${id}/cancel`, data);
    }

    requestApproval(id, data) {
        return http.put(`/requests/${id}/request-approval`, data);
    }

    requestMoreDetail(id, data) {
        return http.put(`/requests/${id}/request-detail`, data);
    }

    approvePurchase(id, data) {
        return http.put(`/requests/${id}/approved`, data);
    }

    declinePurchase(id, data) {
        return http.put(`/requests/${id}/declined`, data);
    }

    deleteRequest(id) {
        return http.delete(`requests/${id}`);
    }

}
export default new RequestDataService();