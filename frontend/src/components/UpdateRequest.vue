<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="bookName">Book Name</label>
        <input
            type="text"
            class="form-control"
            id="bookName"
            required
            v-model="request.bookName"
            name="bookName"
        />
        <label for="bookPrice">Book Price</label>
        <input
            type="text"
            class="form-control"
            id="bookPrice"
            required
            v-model="request.bookPrice"
            name="bookPrice"
        />
        <label for="bookAuthor">Book Author</label>
        <input
            type="text"
            class="form-control"
            id="bookAuthor"
            required
            v-model="request.bookAuthor"
            name="bookAuthor"
        />
        <label for="bookDescription">Book Description</label>
        <input
            type="text"
            class="form-control"
            id="bookDescription"
            required
            v-model="request.bookDescription"
            name="bookDescription"
        />
        <label for="bookGenre">Book Genre</label>
        <input
            type="text"
            class="form-control"
            id="bookGenre"
            required
            v-model="request.bookGenre"
            name="bookGenre"
        />
      </div>
      <button class="btn btn-success" @click="updateRequest()">Submit</button>
      <p> {{ errMsg }} </p>
    </div>
    <div v-else>
      <h4>Request updated successfully!</h4>
    </div>
  </div>
</template>

<script>
import RequestDataService from "../services/RequestDataService";

export default {
  name: "request-update",
  data() {
    return {
      request: {
        _id: null,
        bookName: '',
        bookPrice: '',
        bookAuthor: '',
        bookDescription: '',
        bookGenre: '',
        errMsg: '',
      },
      submitted: false,
    };
  },
  computed: {
      currentUser() {
          return this.$store.state.auth.user;
      }
  },
  methods: {
    getRequest() {
      RequestDataService.getRequest(this.$route.params.id)
          .then(response => {
            console.log(response.data);
            this.request = response.data;
          })
          .catch(e => {
            console.log(e);
            this.errMsg = (e.message || e.response.message);
          });
    },

    updateRequest() {
      if(this.request.bookPrice < 20) {
        this.readyForPurchase = true;
      }
      var data = {
        bookName: this.request.bookName,
        bookPrice: this.request.bookPrice,
        bookAuthor: this.request.bookAuthor,
        bookDescription: this.request.bookDescription,
        bookGenre: this.request.bookGenre,
        requestStatus: "PROCESSING"
      };

      RequestDataService.updateRequest(this.$route.params.id ,data)
          .then(response => {
            console.log(response.data);
            this.request = {};
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
            this.errMsg = (e.message || e.response.message);
            this.submitted = false;
          });
    }
  },
  mounted() {
    this.getRequest();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>