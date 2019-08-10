<template>
  <v-app>
    <v-progress-linear indeterminate :active="isLoading"></v-progress-linear>
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
  },
  computed: {
    isLoading () {
      return this.$store.state.loading;
    }
  }
};
</script>

<style>
</style>
