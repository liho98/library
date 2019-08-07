<template>
  <v-app>
    <Header />
    <router-view></router-view>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer
  }
};
</script>

<style>

</style>
