<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Request List</h4>
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
            <button class="btn btn-success" v-if="!needsApproval(selectedRequest) && calculateTotalCost(selectedRequest) && !checkSuspended(selectedRequest)" @click="requestApproval(selectedRequest)">
                Request Authorisation
            </button>
            <button class="btn btn-success" v-if="checkRequestDetail(selectedRequest) && selectedRequest.requestStatus != 'DECLINED'" @click="requestMoreDetail(selectedRequest)">
                Request more detail
            </button>
            <button class="btn btn-success" v-if="readyForPurchase(selectedRequest)" @click="purchased(selectedRequest)">
                Purchase Book
            </button>
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
      requestToUpdate: null
    };
  },
  computed: {
      currentUser() {
        return this.$store.state.auth.user;
    }
  },

  methods: {
    retrieveAssignedRequests() {
      RequestDataService.getAssignedRequests(this.currentUser.id)
          .then(response => {
            this.requests = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveAssignedRequests();
      this.selectedRequest = null;
      this.currentIndex = -1;
    },

    setActiveRequest(request, index) {
      this.selectedRequest = request;
      this.currentIndex = index;
    },

    calculateTotalCost(request) {
      if(parseInt(request.bookPrice) >= 20) {
        return true;
      }
      else {
        return false;
      }
    },

    checkRequestDetail(request) {
      if ((request.bookDescription == "" || request.bookAuthor == "" || request.bookGenre == "") && request.requestStatus != "SUSPENDED") {
        return true;
      } else {
        return false;
      }
    },

    readyForPurchase(request) {
      return (request.readyForPurchase?true:false);
    },

    needsApproval(request) {
        return (request.needsApproval);
    },

    needsMoreDetail(request) {
        return (request.needsMoreDetail?true:false);
    },

    checkSuspended(request) {
      if(request.requestStatus == "SUSPENDED") {
        return true;
      } else {
        return false;
      }
    },

    requestApproval(request) {
      this.requestToUpdate = request;
      this.requestToUpdate.requestStatus = "NEEDS APPROVAL";
      this.requestToUpdate.needsApproval = true;

      RequestDataService.requestApproval(this.requestToUpdate._id, this.requestToUpdate)
      .then(response => {
          console.log(response.data);
          this.refreshList;
        })
        .catch(e => {
          console.log(e);
        });

    },

    requestMoreDetail(request) {
      this.requestToUpdate = request;
      this.requestToUpdate.requestStatus = "SUSPENDED";
      this.requestToUpdate.needsMoreDetail = true;

      RequestDataService.requestMoreDetail(this.requestToUpdate._id, this.requestToUpdate)
      .then(response => {
          console.log(response.data);
          this.refreshList;
        })
        .catch(e => {
          console.log(e);
        });
    },

    purchased(request) {
      this.requestToUpdate = request;
      this.requestToUpdate.requestStatus = "PURCHASED";

      RequestDataService.purchase(this.requestToUpdate._id, this.requestToUpdate)
      .then(response => {
          console.log(response.data);
          this.refreshList;
        })
        .catch(e => {
          console.log(e);
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
        });
    }
  },
  mounted() {
    this.retrieveAssignedRequests();
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