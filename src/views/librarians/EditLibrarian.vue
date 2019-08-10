<template>
  <div id="edit-librarian">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <!-- <a class="breadcrumb-item" href="index.html">librarian</a> -->
        <span class="breadcrumb-item active">Edit Librarian</span>
      </div>
    </div>

    <div style="margin-left: 10%; margin-right: 10%">
      <hr />
      <h2>Step 1. Select librarian for updating</h2>
      <hr />
    </div>

    <div class="centre"></div>

    <div class="container">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          fixed-header
          :headers="headers"
          :items="items"
          :search="search"
          @row-selected="rowSelected"
        >
          <v-progress-linear v-show="progressBar" color="blue" indeterminate></v-progress-linear>
          <!-- <template v-slot:items="props">
          <tr>
            <td class="text-xs-left">{{ props.item.librarian_id}}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.contact }}</td>
            <td class="text-xs-left"><v-icon
                small
                @click="rowSelected(props.item)"
            >update</v-icon></td>
          </tr>
          </template>-->

          <template v-slot:item.action="{ item }">
            <v-icon small @click="rowSelected(item)">edit</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <!-- <b-container> -->
    <!-- User Interface controls -->
    <!-- <b-row>
        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
            <b-input-group>
              <b-form-select v-model="sortBy" :options="sortOptions">
                <option slot="first" :value="null">-- none --</option>
              </b-form-select>
              <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
                <option :value="false">Asc</option> <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">
            <b-form-select v-model="sortDirection">
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
              <option value="last">Last</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
            <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
          </b-form-group>
        </b-col>
    </b-row>-->

    <!-- Main table element -->
    <!-- <b-table
        show-empty
        stacked="md"
        selectable
        :select-mode="selectMode"
        selectedVariant="success"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
        @row-selected="rowSelected"
      >
        <template slot="selected" slot-scope="{ rowSelected }">
          <span v-if="rowSelected">✔</span>
        </template>
      </b-table>

      <b-row class="row d-flex justify-content-center">
          <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-0"
          ></b-pagination>
      </b-row>
    </b-container>-->

    <div style="margin-left: 10%; margin-right: 10%">
      <hr />
      <h2>Step 2. Enter new detail</h2>
      <hr />
    </div>

    <v-container align-center>
      <v-form ref="form" v-model="valid">
        <v-layout row>
          <v-flex xs2 text-xs-right>Name</v-flex>
          <v-flex xs8>
            <v-text-field
              type="text"
              v-model="name"
              :rules="[v => (v && v.length) >= 1 || 'Required']"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2 text-xs-right>Id</v-flex>
          <v-flex xs8>
            <v-text-field
              type="text"
              v-model="librarian_id"
              :rules="[v => (v && v.length) >= 1 || 'Required']"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2 text-xs-right>Email</v-flex>
          <v-flex xs8>
            <v-text-field
              type="text"
              v-model="email"
              :rules="[v => (v && v.length) >= 1 || 'Required']"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2 text-xs-right>Contact</v-flex>
          <v-flex xs8>
            <v-text-field
              type="text"
              v-model="contact"
              :rules="[v => (v && v.length) >= 1 || 'Required']"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 text-xs-center>
            <v-btn centered color="primary" :disabled="!valid" @click="updateLibrarian">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
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
import BootstrapVue from "bootstrap-vue";
import firebase from "firebase";

Vue.use(BootstrapVue);
Vue.use(firestorePlugin);
Vue.use(VeeValidate);

// This imports all the layout components such as <b-container>, <b-row>, <b-col>:
import { LayoutPlugin } from "bootstrap-vue";
Vue.use(LayoutPlugin);

// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { ModalPlugin } from "bootstrap-vue";
Vue.use(ModalPlugin);

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { CardPlugin } from "bootstrap-vue";
Vue.use(CardPlugin);

// This imports directive v-b-scrollspy as a plugin:
import { VBScrollspyPlugin } from "bootstrap-vue";
Vue.use(VBScrollspyPlugin);

// This imports the dropdown and table plugins
import { DropdownPlugin, TablePlugin } from "bootstrap-vue";
Vue.use(DropdownPlugin);
Vue.use(TablePlugin);

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

export default {
  name: "edit-librarian",
  data() {
    return {
      search: "",
      items: [],

      headers: [
        {
          text: "Librarian ID",
          value: "librarian_id",
          align: "left",
          sortable: true
        },
        {
          text: "Name",
          value: "name",
          align: "left",
          sortable: true
        },
        {
          text: "Email",
          value: "email",
          align: "left",
          sortable: true
        },
        {
          text: "Contact",
          value: "contact",
          align: "left",
          sortable: true
        },
        { text: "Actions", value: "action", sortable: false }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      selected: [],
      selectMode: "single",
      id: "",
      name: "",
      email: "",
      contact: "",
      valid: true
    };
  },
  firestore() {
    return {
      items: db.collection("librarians").orderBy("name")
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
    rows() {
      return this.items.length;
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    rowSelected(librarian) {
      this.id = librarian.id;
      this.librarian_id = librarian.librarian_id;
      this.name = librarian.name;
      this.email = librarian.email;
      this.contact = librarian.contact;
    },
    updateLibrarian() {
      db.collection("librarians")
        .doc(this.id)
        .update({
          librarian_id: this.librarian_id,
          name: this.name,
          email: this.email,
          contact: this.contact
        });
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
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>


