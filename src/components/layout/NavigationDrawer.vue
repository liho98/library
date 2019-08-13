
<template>
  <v-card height="100%" width="256" class="mx-auto">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          <router-link to="/" class="navbar-brand" style="margin-right: 0px">
            <img src="../../assets/logo.png" alt="logo" style="width: 50px" />

            <!-- <img src="images/logo.png" alt="logo" style="width: 150px" /> -->

            <span class="logoname">Taruc Library</span>
          </router-link>
        </v-list-item-title>
        <v-list-item-subtitle v-if="isLoggedIn">
          <span class="ml-2">Welcome, {{name}}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle v-else>
          <span class="ml-2">Hello, there.</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <div v-for="item in items" :key="item.id">
      <v-list v-if="item.role == role" dense nav>
        <router-link :to="item.to">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon size="20" class style="margin-top:3px;" small right dense>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>

      <v-list v-if="item.role == 'all'" dense nav>
        <router-link :to="item.to">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon size="20" class style="margin-top:3px" small right dense>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </div>

    <v-layout v-if="isLoggedIn" align-end style="position: absolute;bottom: 0">
      <div class="pa-2">
        <v-btn v-on:click="logout" color="primary" style="padding: 0 89.5px;" block>Logout</v-btn>
      </div>
    </v-layout>

    <v-layout v-else align-end style="position: absolute;bottom: 0">
      <div class="pa-2">
        <v-btn v-on:click="login" color="primary" style="padding: 0 89.5px;" block>Login</v-btn>
      </div>
    </v-layout>
  </v-card>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      isLoggedIn: false,
      name: "",
      role: "",
      items: [
        //admins
        {
          id: 1,
          title: "Dashboard",
          icon: "fa-fw fa-tachometer-alt",
          role: "admins",
          to: "/dashboard"
        },
        {
          id: 2,
          title: "Book List",
          icon: "fa-fw fa-book",
          role: "admins",
          to: "/view-book-list"
        },
        {
          id: 3,
          title: "Student",
          icon: "fa-fw fa-user-graduate",
          role: "admins",
          to: "/manage-student"
        },
        {
          id: 4,
          title: "Librarian",
          icon: "fa-fw fa-users-cog",
          role: "admins",
          to: "/manage-librarian"
        },
        {
          id: 5,
          title: "Book",
          icon: "fa-fw fa-book",
          role: "admins",
          to: "/manage-book"
        },
        {
          id: 6,
          title: "Checkout",
          icon: "fa-fw fa-shopping-cart",
          role: "admins",
          to: "/checkout"
        },
        {
          id: 7,
          title: "Return",
          icon: "fa-fw fa-undo",
          role: "admins",
          to: "/return"
        },
        {
          id: 8,
          title: "Reserved",
          icon: "fa-fw fa-archive",
          role: "admins",
          to: "/reserved"
        },
        {
          id: 9,
          title: "Profile",
          icon: "fa-fw fa-user-circle",
          role: "admins",
          to: "/personal-detail"
        },

        //librarians
        {
          id: 10,
          title: "Dashboard",
          icon: "fa-fw fa-tachometer-alt",
          role: "librarians",
          to: "/dashboard"
        },
        {
          id: 11,
          title: "Book List",
          icon: "fa-fw fa-book",
          role: "librarians",
          to: "/view-book-list"
        },
        {
          id: 12,
          title: "Book",
          icon: "fa-fw  fa-book",
          role: "librarians",
          to: "/manage-book"
        },
        {
          id: 13,
          title: "Checkout",
          icon: "fa-fw fa-shopping-cart",
          role: "librarians",
          to: "/checkout"
        },
        {
          id: 14,
          title: "Return",
          icon: "fa-fw  fa-undo",
          role: "librarians",
          to: "/return"
        },
        {
          id: 15,
          title: "Reserved",
          icon: "fa-fw fa-archive",
          role: "librarians",
          to: "/reserved"
        },
        {
          id: 16,
          title: "Profile",
          icon: "fa-fw fa-user-circle",
          role: "librarians",
          to: "/personal-detail"
        },

        //students
        {
          id: 17,
          title: "Dashboard",
          icon: "fa-fw fa-tachometer-alt",
          role: "students",
          to: "/dashboard"
        },
        {
          id: 18,
          title: "Book List",
          icon: "fa-fw fa-book",
          role: "students",
          to: "/view-book-list"
        },
        {
          id: 19,
          title: "Borrowed & Returned Book",
          icon: "fa-fw fa-book-medical",
          role: "students",
          to: "/checkout-return-history"
        },
        {
          id: 20,
          title: "Reserved Book",
          icon: "fa-fw fa-archive",
          role: "students",
          to: "/reserved-history"
        },
        {
          id: 21,
          title: "Profile",
          icon: "fa-fw fa-user-circle",
          role: "students",
          to: "/personal-detail"
        },

        { id: 22, title: "Home", icon: "fa-fw fa-home", role: "all", to: "/" },
        {
          id: 23,
          title: "About",
          icon: "fa-fw fa-exclamation-circle",
          role: "all",
          to: "/about"
        },
        {
          id: 24,
          title: "FAQ",
          icon: "fa-fw fa-lightbulb",
          role: "all",
          to: "/faq"
        }
      ],

      right: null
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
    },
    login: function() {
      this.$router.push({ path: "login" });
    }
  }
};
</script>