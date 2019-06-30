import Vue from "vue";
import firebase from 'firebase';
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyCmCkNeF7UYDgHCTJO-qmt8hjQxftuUd9I",
  authDomain: "library-system-1998.firebaseapp.com",
  databaseURL: "https://library-system-1998.firebaseio.com",
  projectId: "library-system-1998",
  storageBucket: "library-system-1998.appspot.com",
  messagingSenderId: "508756013751",
  appId: "1:508756013751:web:1a0e1e0f7292953e"
};

// Initialize Firebase
firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
