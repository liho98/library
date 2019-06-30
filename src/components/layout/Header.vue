<template>
  <header>
    <!-- <div class="header-top">
            <div class="container">
                <div class="row">
                    <div class="col-md-3"><a href="#" class="web-url">www.bookstore.com</a></div>
                    <div class="col-md-6">
                        <h5>Free Shipping Over $99 + 3 Free Samples With Every Order</h5></div>
                    <div class="col-md-3">
                        <span class="ph-number">Call : 800 1234 5678</span>
                    </div>
                </div>
            </div>
    </div>-->
    <div class="main-menu">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
          <router-link to="/home" class="navbar-brand" style="padding-right: 0px">
            <img src="images/logo.png" alt="logo" style="width: 50%" />
          </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="navbar-item" v-if="isLoggedIn">
                <span class="email black-text">{{currentUser}}</span>
              </li>
              <li class="navbar-item active">
                <router-link to="/home" class="nav-link">Home</router-link>
              </li>
              <li class="navbar-item">
                <a href="shop.html" class="nav-link">Shop</a>
              </li>
              <li class="navbar-item">
                <a href="about.html" class="nav-link">About</a>
              </li>
              <li class="navbar-item">
                <a href="faq.html" class="nav-link">FAQ</a>
              </li>

              <li class="navbar-item" v-if="!isLoggedIn">
                <router-link to="/login" class="nav-link">Login</router-link>
              </li>
              <li class="navbar-item" v-if="!isLoggedIn">
                <router-link to="/register" class="nav-link">Register</router-link>
              </li>
              <li class="navbar-item" v-if="isLoggedIn">
                <a type="link" v-on:click="logout" class="nav-link" style="cursor: pointer">Logout</a>
              </li>

              <!-- 
              <div v-if="user != null">
                <li class="navbar-item">
                  <a @click="logout" class="nav-link">Logout {{user}}</a>
                </li>
              </div>
              <div v-else>
                <li class="navbar-item">
                  <router-link to="/login" class="nav-link">Login {{user}}</router-link>
                </li>
              </div>-->
            </ul>
            <div class="cart my-2 my-lg-0">
              <span>
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </span>
              <span class="quntity">3</span>
            </div>
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search here..."
                aria-label="Search"
              />
              <span class="fa fa-search"></span>
            </form>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import firebase from "firebase";
// var firebaseConfig = {
//   apiKey: "AIzaSyCmCkNeF7UYDgHCTJO-qmt8hjQxftuUd9I",
//   authDomain: "library-system-1998.firebaseapp.com",
//   databaseURL: "https://library-system-1998.firebaseio.com",
//   projectId: "library-system-1998",
//   storageBucket: "library-system-1998.appspot.com",
//   messagingSenderId: "508756013751",
//   appId: "1:508756013751:web:1a0e1e0f7292953e"
// };
// Initialize Firebase
// if (!firebase.apps.length) {
//     firebase.initializeApp({});
// }
// const currentUser = firebase.auth().currentUser;
// if(currentUser){
//     currentUser = firebase.auth().currentUser.uid;
// }
// console.log('currentUser is: ' + currentUser);
export default {
  name: "header",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.name;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Logout successfully.");
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<style scoped></style>
