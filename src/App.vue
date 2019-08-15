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

      <template v-if="isLoggedIn" v-slot:append>
      <div class="pa-2">
        <v-btn v-on:click="logout" color="primary" block>Logout</v-btn>
      </div>
      </template>
      <template v-else v-slot:append>
      <div class="pa-2">
        <v-btn v-on:click="login" color="primary" block>Login</v-btn>
      </div>
      </template>

    </v-navigation-drawer>

    <v-app-bar app>

        <v-btn class @click.stop="drawer = !drawer" color="primary" icon>
          <v-icon dense small>fa-fw fa-bars</v-icon>
        </v-btn>

        <v-breadcrumbs :items="$store.getters.breadcrumbs"></v-breadcrumbs>
        <v-spacer></v-spacer>

        <v-btn color="primary" icon>
          <v-icon dense small>fa-fw fa-search</v-icon>
        </v-btn>


    <v-badge overlap>
        <template v-slot:badge>
          <span v-if="$store.getters.messages > 0">{{ $store.getters.messages }}</span>
        </template>
         <v-btn color="primary" icon>
          <v-icon dense small>fa-fw fa-bell</v-icon>
        </v-btn>
    </v-badge>

        <v-btn v-show="!isLoggedIn" color="primary" icon router to="/login">
          <v-icon dense small>fa-fw fa-user-circle</v-icon>
        </v-btn>
        <v-menu
          nudge-width="100"
          nudge-right="10"
          nudge-bottom="28"
          offset-overflow
          offset-y
          offset-x
        >
          <template v-slot:activator="{ on }">
            <v-chip style="text-decoration:none!important" class="mx-4" v-show="isLoggedIn" pill v-on="on" router to="/personal-detail">
              <v-avatar left>
                <v-icon color="primary" dense small>fa-fw fa-user-circle</v-icon>
                <!-- <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd5-DBF4bZYqH5Viu6GQbQ_zUMfvxRhBvafyV4ULA1IDMkrStr"></v-img> -->
              </v-avatar>{{displayName}}
            </v-chip>
          </template>
 </v-menu>
        <!-- <Header /> -->
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
import firebase from "firebase";
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import NavigationDrawer from "./components/layout/NavigationDrawer.vue";

export default {
  name: "app",
  data() {
    return {
      drawer: true,
      isLoggedIn: false,
      messages: 1,
      displayName:"",
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      var currentUser = firebase.auth().currentUser;
      this.isLoggedIn = true;
      this.displayName = currentUser.displayName;
    }
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
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // alert("Logout successfully.");
          this.$router.go({ path: "/" });
        });
    },
    login: function() {
      this.$router.push({ path: "login" });
    }
  }
};
</script>

<style>
.v-badge__badge{
  top:0px!important;right:0px!important;
    font-size: 10px!important;
    height: 15px!important;
    width: 10px!important;
    min-width: 20px!important;
    border-radius: 20px!important;
}
</style>
