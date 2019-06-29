<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/layout/Header";

import "@/assets/js/jquery.min.js";
import "bootstrap";
import "@/assets/js/owl.carousel.min.js";
import "@/assets/js/custom.js";

export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import "./assets/css/owl.carousel.min.css";
@import "./assets/css/styles.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700,800,900");
@import "./assets/css/bootstrap.min.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
