<template>
  <div class="submit-form">
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
            v-model="request.bookPrice"
            name="bookPrice"
        />
        <label for="bookAuthor">Book Author</label>
        <input
            type="text"
            class="form-control"
            id="bookAuthor"
            v-model="request.bookAuthor"
            name="bookAuthor"
        />
        <label for="bookDescription">Book Description</label>
        <input
            type="text"
            class="form-control"
            id="bookDescription"
            v-model="request.bookDescription"
            name="bookDescription"
        />
        <label for="bookGenre">Book Genre</label>
        <input
            type="text"
            class="form-control"
            id="bookGenre"
            v-model="request.bookGenre"
            name="bookGenre"
        />
      </div>
      <button @click="saveRequest" class="btn btn-success">Submit</button>
  </div>
</template>

<script>
import RequestDataService from "../services/RequestDataService";

export default {
  name: "request-add",
  data() {
    return {
      request: {
        _id: null,
        bookName: '',
        bookPrice: '',
        bookAuthor: '',
        bookDescription: '',
        bookGenre: ''
      }
    };
  },
  computed: {
      currentUser() {
          return this.$store.state.auth.user;
      }
  },
  methods: {
    saveRequest() {
      var data = {
        bookName: this.request.bookName,
        bookPrice: this.request.bookPrice,
        bookAuthor: this.request.bookAuthor,
        bookDescription: this.request.bookDescription,
        requestedUserID: this.currentUser.id
      };

      RequestDataService.create(data)
          .then(response => {
            console.log(response.data);
            this.request = {};
          })
          .catch(e => {
            console.log(e);
          });
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>