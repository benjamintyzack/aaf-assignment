<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Request List</h4>
      <div>
          <p class="alert-success"> {{message}} </p>
          <p class="alert-danger"> {{errMsg}} </p>
      </div>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(request, index) in requests"
            :key="index"
            @click="setActiveRequest(request, index)"
        >
          {{ request.bookName }}
          {{ request.requestStatus }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="selectedRequest">
        <h4>Request</h4>
        <div>
          <label><strong>Id:</strong></label> {{selectedRequest._id }}
        </div>
        <div>
          <label><strong>Book Name:</strong></label> {{ selectedRequest.bookName }}
        </div>
        <div>
          <label><strong>Book Price:</strong></label> {{ selectedRequest.bookPrice }}
        </div>
        <div>
          <label><strong>Book Author:</strong></label> {{ selectedRequest.bookAuthor }}
        </div>
        <div>
          <label><strong>Book Description:</strong></label> {{ selectedRequest.bookDescription }}
        </div>
        <div>
          <label><strong>Book Genre:</strong></label> {{ selectedRequest.bookGenre }}
        </div>
        <div>
          <label><strong>Requested User ID:</strong></label> {{ selectedRequest.requestedUserID }}
        </div>
        <div>
            <button v-if="checkStatus(selectedRequest)" class="btn btn-success" @click="allocateRequest(selectedRequest)">
                Allocate Request
            </button>
        </div>
        <div> 
          <button class="m-3 btn btn-sm btn-danger" @click="deleteRequest(selectedRequest)">
                Delete Request
          </button>
        </div>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Request ...</p>
      </div>
    </div>
  </div>
</template>

<script>
import RequestDataService from "../services/RequestDataService";

export default {
  name: "request-list",
  data() {
    return {
      requests: [],
      selectedRequest: null,
      currentIndex: -1,
      requestToUpdate: null,
      message: '',
      errMsg: ''
    };
  },
  computed: {
      currentUser() {
        return this.$store.state.auth.user;
    }
  },

  methods: {
    retrieveRequests() {
      RequestDataService.getUnassignedRequests()
          .then(response => {
            this.requests = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
            this.errMsg = (e.message || e.response.message);
          });
    },

    refreshList() {
      this.retrieveRequests();
      this.selectedRequest = null;
      this.currentIndex = -1;
    },

    setActiveRequest(request, index) {
      this.selectedRequest = request;
      this.currentIndex = index;
    },

    checkStatus(request) {
        if(request.requestStatus != "CANCELLED") {
          return true;
        } else {
          return false;
        }
    },

    allocateRequest(request) {
        this.requestToUpdate = request;
        this.requestToUpdate.requestStatus = "PROCESSING";
        this.requestToUpdate.isAssigned = true;
        this.requestToUpdate.employeeAssignedID = this.currentUser.id;

        RequestDataService.updateRequest(this.requestToUpdate._id, this.requestToUpdate)
        .then(response => {
            console.log(response.data);
            this.$router.go();
          })
          .catch(e => {
            console.log(e);
            this.errMsg = (e.message || e.response.message);
          });
    },

    deleteRequest(request) {
      RequestDataService.deleteRequest(request._id)
      .then(response => {
          console.log(response.data);
          this.$router.go();
        })
        .catch(e => {
          console.log(e);
          this.errMsg = (e.message || e.response.message);
        });
    }
  },
  mounted() {
    this.retrieveRequests();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>