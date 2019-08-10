<template>
  <header>
    <!-- <script defer type="application/javascript" src="js/dropdown.js"></script> -->

    <div class="header-top">
      <div class="container" style="padding-top: 10px; padding-bottom: 0px">
        <div class="d-flex align-items-end flex-column">
          <!-- <div class="col-md-3">
            <a href="#" class="web-url">www.bookstore.com</a>
          </div>
          <div class="col-md-3">
          </div>-->
          <div v-if="isLoggedIn" class="p-2" style="display: inline;">
            <span class="ph-number">Welcome, {{name}}</span>
            <v-btn
              small
              color="primary"
              v-on:click="logout"
              style="padding: .15rem .35rem; text-transform: none; background: #ff9700"
            >Logout</v-btn>
            <!-- <button
              type="button"
              class="btn btn-default"
              style="padding: .15rem .35rem; text-transform: none"
              v-on:click="logout"
            >Logout</button>-->
          </div>

          <!-- ---------------------------Logged In User----------------------------------- -->
          <!-- <li class="navbar-item" v-if="isLoggedIn">
            <a
              type="link"
              v-on:click="logout"
              class="nav-link active"
              style="cursor: pointer"
            >Logout</a>
          </li>-->
        </div>
      </div>
    </div>
    <div class="main-menu" style="padding-top: 0px;">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
          <router-link to="/" class="navbar-brand" style="margin-right: 0px">
            <img src="images/logo.png" alt="logo" style="width: 150px" />
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
              <!-- ---------------------------Student--------------------------------------- -->

              <li class="navbar-item" v-if="role=='students'">
                <router-link to="/view-book-list" class="nav-link active">Book List</router-link>
              </li>
              <li class="navbar-item" v-if="role=='students'">
                <router-link
                  to="/checkout-return-history"
                  class="nav-link active"
                >Your Borrowed Book</router-link>
              </li>

              <!-- ---------------------------Admins------------------------------------- -->
              <!-- <li class="navbar-item dropdown" v-if="role=='admins'">
                <a
                  class="nav-link dropdown-toggle active"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Student</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="margin: 0px">
                  <router-link to="/manage-student" class="dropdown-item">View Student</router-link>
                  <router-link to="/edit-student" class="dropdown-item">Edit Student</router-link>
                  <router-link to="/delete-student" class="dropdown-item">Delete Student</router-link>
                </div>
              </li> -->

              <li class="navbar-item" v-if="role=='admins'">
                <router-link to="/manage-student" class="nav-link active">Student</router-link>
              </li>


              <!-- <li class="navbar-item dropdown" v-if="role=='admins'">
                <a
                  class="nav-link dropdown-toggle active"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Librarian</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="margin: 0px">
                  <router-link to="/manage-librarian" class="dropdown-item">View Librarian</router-link>
                  <router-link to="/edit-librarian" class="dropdown-item">Edit Librarian</router-link>
                  <router-link to="/delete-librarian" class="dropdown-item">Delete Librarian</router-link>
                </div>
              </li> -->

              <li class="navbar-item" v-if="role=='admins'">
                <router-link to="/manage-librarian" class="nav-link active">Librarian</router-link>
              </li>


              <!-- ---------------------------Librarians------------------------------------- -->
              <li class="navbar-item dropdown" v-if="role=='librarians' || role=='admins'">
                <a
                  class="nav-link dropdown-toggle active"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Book</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="margin: 0px">
                  <router-link to="/view-book-list" class="dropdown-item">View Book</router-link>
                  <router-link to="/add-book" class="dropdown-item">Add Book</router-link>
                  <router-link to="/edit-book" class="dropdown-item">Edit Book</router-link>
                  <router-link to="/search-book" class="dropdown-item">Search Book</router-link>
                </div>
              </li>

              <li class="navbar-item" v-if="role=='librarians' || role=='admins'">
                <router-link to="/checkout" class="nav-link active">Checkout</router-link>
              </li>
              <li class="navbar-item" v-if="role=='librarians' || role=='admins'">
                <router-link to="/return" class="nav-link active">Return</router-link>
              </li>
              <li class="navbar-item" v-if="role=='librarians' || role=='admins'">
                <router-link to="/reserved" class="nav-link active">Reserved</router-link>
              </li>

              <!-- ---------------------------Logged in user------------------------------------- -->
              
            <li class="navbar-item" v-if="role=='librarians' || role=='admins'|| role=='students'">
                <router-link to="/personal-detail" class="nav-link active">Personal Detail</router-link>
              </li>
              <!-- --------------------------Guest---------------------------------------- -->
              <li class="navbar-item" v-if="!isLoggedIn">
                <router-link to="/about" class="nav-link active">About</router-link>
              </li>
              <li class="navbar-item" v-if="!isLoggedIn">
                <router-link to="/faq" class="nav-link active">FAQ</router-link>
              </li>
              <li class="navbar-item" v-if="!isLoggedIn">
                <router-link to="/login" class="nav-link active">Login</router-link>
              </li>
              <li class="navbar-item" v-if="!isLoggedIn">
                <router-link to="/register" class="nav-link active">Register</router-link>
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
            <!-- <div class="cart my-2 my-lg-0">
              <span>
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </span>
              <span class="quntity">3</span>
            </div>-->
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
  data() {
    return {
      isLoggedIn: false,
      name: "",
      role: ""
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      var currentUser = firebase.auth().currentUser;
      this.isLoggedIn = true;
      this.name = currentUser.displayName;
      this.role = currentUser.photoURL;
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
    }
  }
  // mounted() {
  //   let dropdownScript = document.createElement("script");
  //   dropdownScript.setAttribute("src", "/library/js/dropdown.js");
  //   document.head.appendChild(dropdownScript);

  //   // this.loadJs("./../../../public/js/dropdown.js", function() {
  //   //Stuff to do after someScript has loaded
  // }
};
</script>

<style scoped>
.dropdown:hover > .dropdown-menu {
  display: block;
}
</style>
