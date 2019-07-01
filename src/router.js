import firebase from './components/firebaseInit';
import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import AddBook from "./views/books/AddBook";

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
        requiresAuth: true
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
        requiresAuth: true
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
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('/');
  else next();
});

export default router;
