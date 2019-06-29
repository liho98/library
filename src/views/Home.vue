<template>
  <div class="home">
    <HomeSlider />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeSlider from "@/components/HomeSlider.vue";
// import '@/assets/js/jquery.min.js';
// import 'bootstrap'
// import '@/assets/js/owl.carousel.min.js';
// import '@/assets/js/custom.js'
// import 'owl.carousel';

export default {
  name: "home",
  components: {
    HomeSlider
  }
};
</script>

<style lang="scss">
// @import "./../assets/css/owl.carousel.min.css";
// @import "./../assets/css/styles.css";
// @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
// @import url("https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700,800,900");
// @import "./../assets/css/bootstrap.min.css";
</style>
