<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}

button {
    cursor: pointer;
    width: 180px;
    height: 40px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    line-height: 38px;
    border: 1px solid #2c3e50;
    margin-bottom: 16px;
    transition: opacity ease .3s;
    box-shadow: none !important;
    outline: none !important;
}

button:hover {
    opacity: .7;
}

.title {
  text-align: center;
  margin-bottom: 60px;
}
</style>
