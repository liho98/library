<template>
  <div id="personal-detail-librarian">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <!-- <a class="breadcrumb-item" href="index.html">Book</a> -->
        <span class="breadcrumb-item active">Personal Detail</span>
      </div>
    </div>

    <div style="margin-left: 10%; margin-right: 10%">
      <hr/>
      <h2>Personal Detail</h2>
      <hr/>
    </div>
    
    <v-container align-center>
      <v-form ref="form" v-model="valid">
        <v-layout row>
          <v-flex xs2 text-xs-right>
            Name
          </v-flex>
          <v-flex xs8>
            <v-text-field
              type="text"
              v-model="name"
              :readonly="name"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2 text-xs-right>
            ID
          </v-flex>
          <v-flex xs8>
            <v-text-field
              type="text"
              v-model="librarian_id"
              :readonly="librarian_id"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2 text-xs-right>
            Email
          </v-flex>
          <v-flex xs8>
            <v-text-field
              type="text"
              v-model="email"
              :rules="[v => (v && v.length) >= 1 || 'Required']"
              required
            >
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2 text-xs-right>
            Password
          </v-flex>
          <v-flex xs8>
            <v-text-field
              type="number"
              v-model="password"
              required
            >
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 text-xs-center>
            <v-btn
              centered
                color="primary"
                :disabled="!valid"
                @click="updatePersonalDetail"
            >
            submit
            </v-btn>
            <v-btn 
              @click="clear"
            >
            clear
            </v-btn>
          </v-flex>
        </v-layout>
        
      </v-form>
    </v-container>
  </div>
</template>

<script>
import db from "./../../components/firestoreInit";
import Vue from "vue";
import VeeValidate from "vee-validate";
import { firestorePlugin } from "vuefire";
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(firestorePlugin);
Vue.use(VeeValidate);

// This imports all the layout components such as <b-container>, <b-row>, <b-col>:
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)

// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)

// This imports directive v-b-scrollspy as a plugin:
import { VBScrollspyPlugin } from 'bootstrap-vue'
Vue.use(VBScrollspyPlugin)

// This imports the dropdown and table plugins
import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

export default {
  name: "personal-detail-librarian",
  data () {
    return {
      isLoggedIn: false,
      name: "",
      librarian_id: "",
      email: "",
      password: "",
      role: ""
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      var currentUser = firebase.auth().currentUser;
      this.isLoggedIn = true;
      this.name = currentUser.displayName;
      this.librarian_id = currentUser.librarian_id;
      this.email = currentUser.email;
      this.password = currentUser.password;
      this.role = currentUser.photoURL;
    }
  },
  
  methods: {
    
    updateLibrarian() {
      db.collection("librarians").doc(currentUser.librarian_id).update(
        {
          name: this.name,
          librarian_id: this.librarian_id,
          email: this.email,
          password: this.password
        }
      )
      this.$refs.form.reset();
    },
    clear() {
      this.$refs.form.reset();
    }

  }
};
</script>

<style scoped>
div.centre {
  text-align: center;
  width: 100%;
  margin: auto;
}

.sign-up {
  margin-top: 40px;
}

input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
input[type="radio"] {
  width: 30px;
}

.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

label.radio-inline {
  margin: 0px 10px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}

table {
  margin-left: 10%;
  margin-right: 10%;
  border-collapse: collapse;
  width: 80%;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {background-color:#f5f5f5;}
</style>


