<template>
  <div class="home">
    <h1 class="title">Welcome to Your Vue.js App</h1>

    <ul>
      <li v-for="user of users" :key="user.cpf">
        {{ user.username }} {{ user.password }} 
      </li>
    </ul>

    <form-login/>
  </div>
</template>

<script>
import FormLogin from './../FormLogin'
import axios from 'axios';

export default {
  name: 'PageHome',
  components: {
    FormLogin
  },
   data() {
    return {
      users: [],
      username: '',
      password: '',
      fullname: '',
      mail: '',
    }
  },
  async created() {
    const { data } = await axios.get("http://localhost:3000/users");
    this.users = data;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    width: 460px;
    padding: 40px 30px; 
    margin: auto;
    max-width: 100%;
  }
</style>
