import Vue from "vue";
import firebase from './components/firebaseInit';
import App from "./App.vue";
import router from "./router";
import vuetify from './plugins/vuetify' // path to vuetify export
import store from './store'

Vue.config.productionTip = false;

let app = '';



// Your web app's Firebase configuration
// firebase.initializeApp({
//   apiKey: "AIzaSyCmCkNeF7UYDgHCTJO-qmt8hjQxftuUd9I",
//   authDomain: "library-system-1998.firebaseapp.com",
//   databaseURL: "https://library-system-1998.firebaseio.com",
//   projectId: "library-system-1998",
//   storageBucket: "library-system-1998.appspot.com",
//   messagingSenderId: "508756013751",
//   appId: "1:508756013751:web:1a0e1e0f7292953e"
// });

// initialize the Vue app only when we are sure Firebase is initialized
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store,
      render: h => h(App)
    }).$mount("#app");    
    
  }
});
