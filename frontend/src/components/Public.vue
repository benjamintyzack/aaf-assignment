<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{"Welcome to the Book Store"}}</h3>
    </header>
    <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr>
      </div>
      <div class="card-body">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <label for="user">User:</label>
          <input type="text" v-model="user" class="form-control">
        </div>
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control">
        </div>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'Public',
    data() {
    return {
      user: '',
      message: '',
      messages: [],
      socket : io('localhost:3050/chat')
    }
  },
 methods: {
    sendMessage(e) {
      e.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message
      });
      this.message = '';

    }
  },
  mounted() {
    this.socket.on('history', (data) => {
      console.log("Chat log pulled from database" + data);
      data.forEach(element => {
        this.messages.push(element);
      });
    });
    this.socket.on('MESSAGE', (data) => {
      console.log("Client Received: " + JSON.stringify(data));
      this.messages.push(data);
    });
  }
};
</script>