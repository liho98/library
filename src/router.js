import firebase from './components/firebaseInit';
import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import FAQ from "./views/FAQ.vue";

// Login, Register
import Login from "./views/Login.vue";
// import Register from "./views/Register.vue";

// Book
import AddBook from "./views/books/AddBook";
import ViewBookList from "./views/books/ViewBookList";
import ViewBook from "./views/books/ViewBook";
import SearchBook from "./views/books/SearchBook"
import EditBook from "./views/books/EditBook"
import ManageBook from "./views/books/ManageBook"

// Students
import EditStudent from "./views/students/EditStudent";
import DeleteStudent from "./views/students/DeleteStudent";
import ViewStudent from "./views/students/ViewStudent";
import ManageStudent from "./views/students/ManageStudent";

// Checkout, Return
import Checkout from "./views/checkout-return/Checkout";
import Return from "./views/checkout-return/Return";
import Reserved from "./views/checkout-return/Reserved";
import CheckoutReturnHistory from "./views/checkout-return/CheckoutReturnHistory";
import ReservedHistory from "./views/checkout-return/ReservedHistory";

//Librarian
import ViewLibrarian from "./views/librarians/ViewLibrarian";
import DeleteLibrarian from "./views/librarians/DeleteLibrarian";
import EditLibrarian from "./views/librarians/EditLibrarian";
import ManageLibrarian from "./views/librarians/ManageLibrarian";

import PersonalDetail from "./views/PersonalDetail";

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
      name: "home",
      component: Home,
      meta: {
        noAuth: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: About,
      // meta: {
      //   requiresGuest: true,
      // }
    },
    {
      path: "/faq",
      name: "faq",
      component: FAQ,
      // meta: {
      //   requiresGuest: true,
      // }
    },

    // {
    //   path: "/",
    //   redirect: '/login'
    // },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: Register,
    //   meta: {
    //     requiresGuest: true
    //   }
    // },
    {
      path: '/view-book-list',
      name: 'view-book-list',
      component: ViewBookList,
      meta: {
        requiresAuth: true,
        librarianAuth: true,
        studentAuth: true,
        adminAuth: true
      }
    },
    {
      path: '/view-book/:book_id',
      name: 'view-book',
      component: ViewBook,
      meta: {
        requiresAuth: true,
        librarianAuth: true,
        studentAuth: true,
        adminAuth: true
      }
    },
    {
      path: '/add-book',
      name: 'add-book',
      component: AddBook,
      meta: {
        requiresAuth: true,
        librarianAuth: true,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
      path: '/edit-book',
      name: 'edit-book',
      component: EditBook,
      meta: {
        requiresAuth: true,
        librarianAuth: true,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
      path: '/search-book',
      name: 'search-book',
      component: SearchBook,
      meta: {
        requiresAuth: true,
        librarianAuth: true,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
      path: '/manage-book',
      name: 'manage-book',
      component: ManageBook,
      meta: {
        requiresAuth: true,
        librarianAuth: true,
        studentAuth: false,
        adminAuth: true
      }
    },

    {
      path: '/manage-student',
      name: 'manage-student',
      component: ManageStudent,
      meta: {
        requiresAuth: true,
        librarianAuth: false,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
      path: '/edit-student',
      name: 'edit-student',
      component: EditStudent,
      meta: {
        requiresAuth: true,
        librarianAuth: false,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
      path: '/delete-student',
      name: 'delete-student',
      component: DeleteStudent,
      meta: {
        requiresAuth: true,
        librarianAuth: false,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
      path: '/view-student',
      name: 'view-student',
      component: ViewStudent,
      meta: {
        requiresAuth: true,
        librarianAuth: false,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta: {
        requiresAuth: true,
        librarianAuth: true,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
      path: '/return',
      name: 'return',
      component: Return,
      meta: {
        requiresAuth: true,
        librarianAuth: true,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
      path: '/reserved',
      name: 'reserved',
      component: Reserved,
      meta: {
        requiresAuth: true,
        librarianAuth: true,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
      path: '/checkout-return-history',
      name: 'checkout-return-history',
      component: CheckoutReturnHistory,
      meta: {
        requiresAuth: true,
        librarianAuth: false,
        studentAuth: true,
        adminAuth: false
      }
    },    {
      path: '/reserved-history',
      name: 'reserved-history',
      component: ReservedHistory,
      meta: {
        requiresAuth: true,
        librarianAuth: false,
        studentAuth: true,
        adminAuth: false
      }
    },

    {
      path: '/manage-librarian',
      name: 'manage-librarian',
      component: ManageLibrarian,
      meta: {
        requiresAuth: true,
        librarianAuth: false,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
      path: '/view-librarian',
      name: 'view-librarian',
      component: ViewLibrarian,
      meta: {
        requiresAuth: true,
        librarianAuth: false,
        studentAuth: false,
        adminAuth: true
      }
    },
    
    {
      path: '/delete-librarian',
      name: 'delete-librarian',
      component: DeleteLibrarian,
      meta: {
        requiresAuth: true,
        librarianAuth: false,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
      path: '/edit-librarian',
      name: 'edit-librarian',
      component: EditLibrarian,
      meta: {
        requiresAuth: true,
        librarianAuth: false,
        studentAuth: false,
        adminAuth: true
      }
    },
    {
     path: '/personal-detail',
      name: 'personal-detail',
      component: PersonalDetail,
      meta: {
        requiresAuth: true,
        librarianAuth: true,
        studentAuth: true,
        adminAuth: true
      }
   },
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
    if (to.meta.requiresAuth || to.meta.librarianAuth || to.meta.studentAuth || to.meta.adminAuth) {
      next('login');
    } else {
      next();
    }
  } else {


    // get user role
    // I used photoURL attribute to store user role, because no other choice alr
    const role = currentUser.photoURL;

    // console.log("User Logged In");
    // console.log("User Role: " + role);
    localStorage.userId = currentUser.uid
    localStorage.role = role

    if (role === 'students') {
      if (to.meta.studentAuth || to.meta.noAuth) {
        next();
      } else {
        next('/');
      }
    } else if (role === 'librarians') {
      if (to.meta.librarianAuth || to.meta.noAuth) {
        next();
      } else {
        next('/');
      }
    } else if (role === 'admins') {
      if (to.meta.adminAuth || to.meta.noAuth) {
        next();
      } else {
        next('/');
      }
    } else {
      if (to.meta.requiresGuest || to.meta.noAuth) {
        next();
      } else {
        next('/');
      }
    }


    // // if user want to go to studentAuth page
    // if (to.meta.studentAuth) {
    //   if (role === 'students') {
    //     next();
    //   } else {
    //     next('/');
    //   }
    // }
    // // if user want to go to librarianAuth
    // else if (to.meta.librarianAuth) {
    //   if (role === 'librarians') {
    //     next();
    //   } else {
    //     next('/');
    //   }
    // }
    // // if user want to go to adminAuth
    // else if (to.meta.adminAuth) {
    //   if (role === 'admins') {
    //     next();
    //   } else {
    //     next('/');
    //   }
    // }
    // // for other page
    // else {
    //   // cannot go to page for guest like login, register
    //   if (to.meta.requiresGuest) {
    //     next('/');
    //   } else {
    //     next();
    //   }
    // }
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
