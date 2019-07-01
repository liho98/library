import firebase from './components/firebaseInit';
import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import AddBook from "./views/books/AddBook";
import ViewBook from "./views/books/ViewBook";

Vue.use(Router);

const router = new Router({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    // redirect every paths that does not exist to the Login view.
    {
      path: "*",
      redirect: '/login'
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true,
      }
    },
    // {
    //   path: "/",
    //   redirect: '/login'
    // },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/add-book',
      name: 'Add Book',
      component: AddBook,
      meta: {
        requiresAuth: true,
        librarianAuth: true,
        studentAuth: false
      }
    },
    {
      path: '/view-book',
      name: 'View Book',
      component: ViewBook,
      meta: {
        requiresAuth: true,
        librarianAuth: true,
        studentAuth: true
      }
    }
  ]
});

// If the route we navigate to requires authentication and there is no current user logged in, we redirect to the Login view.
// If the route we navigate to does not require authentication and there is a user logged in, we redirect to the Home view.
// Else, we proceed navigation.
// We should now be able to access the app only when the user is authenticated !

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;

  // if not logged in
  if (!currentUser) {
    if (to.meta.requiresAuth || to.meta.librarianAuth || to.meta.studentAuth) {
      next('login');
    } else {
      next();
    }
  } else {
    // get user role
    // I used photoURL attribute to store user role, because no other choice alr
    const role = currentUser.photoURL;

    console.log("User Logged In");
    console.log("User Role: " + role);

    // if user want to go to studentAuth page
    if (to.meta.studentAuth) {
      if (role === 'students') {
        next();
      } else {
        next('/');
      }
    }
    // if user want to go to librarianAuth
    else if (to.meta.librarianAuth) {
      if (role === 'librarians') {
        next();
      } else {
        next('/');
      }
    } 
    // for other page
    else {
      // cannot go to page for guest like login, register
      if(to.meta.requiresGuest){
        next('/');
      } else {
        next();
      }
    }
  }

  // if (to.meta.requiresAuth) {
  //   if (!currentUser) next('login');
  //   else next();
  // }
  // else next();
  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // if (requiresAuth && !currentUser) next('login');
  // else if (!requiresAuth && currentUser) next('/');
});

export default router;
