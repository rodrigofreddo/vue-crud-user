<template>
  <div class="home">
    <h1 class="title">Welcome to Your Vue.js App</h1>
    <form-login/>
  </div>
</template>

<script>
import FormLogin from './../FormLogin'

export default {
  name: 'PageHome',
  components: {
    FormLogin
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
