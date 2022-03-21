<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="username">Username</label>
        <input
            type="text"
            class="form-control"
            id="username"
            required
            v-model="user.username"
            name="username"
        />
        <label for="password">Password</label>
            <input
                v-model="user.password"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="password"
            />
        <label for="employee">Make Employee</label>
          <input
              v-model="user.isEmployee"
              type="checkbox"
              name="employee"
              id="employee"
          />
      </div>
      <button @click="saveUser" class="btn btn-success">Submit</button>
      <p class="alert-success">{{ message }}</p>
      <p class="alert-danger"> {{errMsg}} </p>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "user-add",
  data() {
    return {
      user: {
        _id: null,
        username: '',
        password: '',
        isEmployee: false
      },
      message: '',
      errMsg: ''
    };
  },
  methods: {
    saveUser() {
      var data = {
        username: this.user.username,
        password: this.user.password,
        isEmployee: this.user.isEmployee
      };

      UserDataService.create(data)
          .then(response => {
            this.user._id = response.data._id;
            this.user = {};
            console.log(response.data);
            this.message = response.data;
          })
          .catch(e => {
            console.log(e);
            this.errMsg = e.response.data;
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
