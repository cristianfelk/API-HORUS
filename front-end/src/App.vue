<template>
    <div id="app">
      <HomeLogin />
    </div>
  </template>
  
  <script>
  import HomeLogin from './views/HomeLogin.vue';
  
  export default {
    name: 'App',
    components: {
      HomeLogin,
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
  }
  </style>
  