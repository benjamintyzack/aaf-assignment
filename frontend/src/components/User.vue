<template>
  <div v-if="currentUser" class="edit-form">
    <h4>User</h4>
    <form>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username"
               v-model="currentUser.username"
        />
      </div>
      <div class="form-group">
        <label for="employee">Make Employee</label>
            <input
                v-model="currentUser.isEmployee"
                type="checkbox"
                name="employee"
                id="employee"
                @click="disableAdmin"
            />
            <label for="admin">Make Admin</label>
            <input
                v-model="currentUser.isAdmin"
                type="checkbox"
                name="admin"
                id="admin"
                @click="disableEmployee"
            />
      </div>
    </form>

    <button class="m-3 btn btn-sm btn-danger"
            @click="deleteUser"
    >
      Delete
    </button>

    <button type="submit" class="btn btn-success"
            @click="updateUser"
    >
      Update
    </button>
    <p class="alert-success">{{ message }}</p>
    <p class="alert-danger">{{ errMsg }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "user",
  data() {
    return {
      currentUser: null,
      message: '',
      errMsg: ''
    };
  },
  methods: {
    getUser(id) {
      UserDataService.get(id)
          .then(response => {
            this.currentUser = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    updateUser() {
      UserDataService.update(this.currentUser._id, this.currentUser)
          .then(response => {
            console.log(response.data);
            this.message = "User updated Successfully!";
          })
          .catch(e => {
            this.errMsg = e.response.data.message;
            console.log(e);
          });
    },

    deleteUser() {
      UserDataService.delete(this.currentUser._id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "users" });
          })
          .catch(e => {
            console.log(e);
          });
    },

    disableEmployee() {
        var employeeCheck = document.getElementById("employee");
        var adminCheck = document.getElementById("admin");

        if (adminCheck.checked) {
          employeeCheck.disabled = true;
        }
        else {
          employeeCheck.disabled = false;
        }
    },
    disableAdmin() {
        var employeeCheck = document.getElementById("employee");
        var adminCheck = document.getElementById("admin");

        if (employeeCheck.checked) {
          adminCheck.disabled = true;
        }
        else {
          adminCheck.disabled = false;
        }
    }
  },
  mounted() {
    this.message = '';
    this.getUser(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>