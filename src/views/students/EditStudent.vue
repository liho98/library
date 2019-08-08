<template>
  <div id="edit-student">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <!-- <a class="breadcrumb-item" href="index.html">Book</a> -->
        <span class="breadcrumb-item active">Edit Student Info</span>
      </div>
    </div>

    <div style="margin-left: 10%; margin-right: 10%">
      <hr/>
      <h2>Step 1. Select student for updating</h2>
      <hr/>
    </div>

    <div class="centre">
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
    </div>

    <div class="list">
      <v-data-table fixed-header
        :headers="headers"
        :items="items"
        :search="search">

        <v-progress-linear v-show="progressBar" color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
          <tr>
            <!-- <td>{{ props.item.title }}</td> -->
            <td class="text-xs-left">{{ props.item.student_id}}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left"><v-icon
                small
                @click="rowSelected(props.item)"
            >edit</v-icon></td>
          </tr>
        </template>
      </v-data-table>
  
    </div>

    <!-- <b-container>
      <b-row style="padding-bottom: 15px">
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
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
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
      </b-row>

      <b-table
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
    </b-container> -->

    <div style="margin-left: 10%; margin-right: 10%">
      <hr/>
      <h2>Step 2. Enter new detail</h2>
      <hr/>
    </div>

    <v-container align-center>
      <v-form ref="form" v-model="valid">
        <v-layout row>
          <v-flex xs2 text-xs-right>
            ID
          </v-flex>
          <v-flex xs8>
            <v-text-field
              type="text"
              v-model="student_id"
              :rules="[v => (v && v.length) >= 1 || 'Required']"
              required
            >
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2 text-xs-right>
            Name
          </v-flex>
          <v-flex xs8>
            <v-text-field
              type="text"
              v-model="name"
              :rules="[v => (v && v.length) >= 1 || 'Required']"
              required
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
              type="email"
              v-model="email"
              :rules="[v => (v && v.length) >= 1 || 'Required']"
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
                @click="updateStudent"
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
import BootstrapVue from "bootstrap-vue";

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
  name: "view-student",
  data() {
    return {
      items: [],
      fields: [
        { key: "student_id", label: "Student ID", sortable: true },
        { key: "name", label: "Student Name", sortable: true },
        { key: "email", label: "Student Email", sortable: true },
      ],
      headers:[
        {
          text: "Student ID",
          value: "student_id",
          align: "left",
          sortable: true
        },
        {
          text: "Student Name",
          value: "name",
          align: "left",
          sortable: true
        },
        {
          text: "Student Email",
          value: "email",
          align: "left",
          sortable: true
        },
        {
            text: "Action",
            value: "action",
            align: "left",
            sortable: false
        }
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
      student_id: "",
      name: "",
      email: "",
      valid: true
    };
  },
  firestore () {
    return {
      items: db.collection("students").orderBy("student_id")
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
    rows() {
      return this.items.length
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    rowSelected(items) {
      this.selected = items
      this.student_id = this.selected[0].student_id
      this.name = this.selected[0].name
      this.email = this.selected[0].email
      document.getElementById("updateStudentID").value = this.selected[0].student_id
      document.getElementById("updateStudentName").value = this.selected[0].name
      document.getElementById("updateStudentEmail").value = this.selected[0].email
    },
    updateStudent() {
      db.collection("students").doc(this.selected[0].id).update(
        {
          student_id: this.student_id,
          name: this.name,
          email: this.email,
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

<style>
div.centre {
  text-align: center;
  width: 60%;
  margin-right: 30px;
}

div.list {
  text-align: justify;
  width: 75%;
  margin: auto;
  margin-bottom: 20px;
}
</style>


