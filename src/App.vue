<template>
  <!-- <v-app>
    <v-progress-linear indeterminate :active="isLoading" color="primary"></v-progress-linear>
    <Header />
    <v-content>
    <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>-->
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <NavigationDrawer />
    </v-navigation-drawer>

    <v-app-bar app>
      <div
        class="container"
        style="max-width: 1264px;width: 100%;display: inline-block;margin-left: 0;padding-left: 0px;"
      >
        <v-btn class @click.stop="drawer = !drawer" color="primary" icon>
          <v-icon>fa fa-bars</v-icon>
        </v-btn>
        <div style="display: inline-block;">
          <v-breadcrumbs :items="$store.getters.breadcrumbs"></v-breadcrumbs>
        </div>
        <!-- <Header /> -->
      </div>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <v-progress-linear top indeterminate :active="isLoading" color="primary"></v-progress-linear>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer padless>
      <v-content class="pt-0">
        <Footer />
      </v-content>
    </v-footer>
  </v-app>
</template>

<script>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import NavigationDrawer from "./views/admin/navigationDrawer.vue";

export default {
  name: "app",
  data() {
    return {
      drawer: true
    };
  },

  components: {
    Header,
    Footer,
    NavigationDrawer
  },
  computed: {
    isLoading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    // toggle(){
    //         // this.$store.commit('toggle',!this.$store.getters.drawer);
    //         this.drawer= !this.drawer;
    // }
  }
};
</script>

<style>
</style>
