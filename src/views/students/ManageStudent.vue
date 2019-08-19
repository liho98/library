<template>
  <div id="delete-student">
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" :top="true" right>
      {{ message }}
      <v-btn dark text @click="snackbar = false" style="text-transform: none">Close</v-btn>
    </v-snackbar>

    <div class="container">
      <v-card>
        <v-card-title>
          Manage Student
          <v-btn
            @click="add_dialog = true"
            color="primary"
            style="margin: 0 15px; text-transform: none"
          >
            <v-icon>add</v-icon>Student
          </v-btn>
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
          :loading="loading"
          color="primary"
          loading-text="Loading students..."
          :footer-props="{
            prevIcon: 'fa fa-angle-left',
            nextIcon: 'fa fa-angle-right'
          }"
          :height="530"
        >
          <!-- <template v-slot:items="props">
          <tr>
            <td class="text-xs-left">{{ props.item.student_id}}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.contact }}</td>
            <td class="text-xs-left"><v-icon
                small
                @click="deleteStud(props.item)"
            >delete</v-icon></td>
          </tr>
          </template>-->
          <template v-slot:item.action="{ item }">
            <v-icon small @click="rowSelected(item); edit_dialog = true">edit</v-icon>&nbsp;
            <v-icon small @click="rowSelected(item); delete_dialog = true">delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>

    <v-dialog v-model="add_dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add student</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="student_id"
                  label="Student ID *"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="Name *"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  label="Email *"
                  type="email"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="password"
                  label="Password *"
                  type="password"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="contact" label="Contact" type="number"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small style="float:right;display:block;margin-right:15px">* indicates required field</small>
        </v-card-text>
        <br />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            style="text-transform: none"
            text
            @click="add_dialog = false"
          >Close</v-btn>
          <v-btn
            color="primary"
            style="text-transform: none"
            @click="signUp(); add_dialog = false"
          >Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="edit_dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Student</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="student_id"
                  label="Student ID *"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="Name *"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                  required
                ></v-text-field>
              </v-flex>
              <!-- <v-flex xs12>
                <v-text-field v-model="email" label="Email*" type="email" required></v-text-field>
              </v-flex>-->
              <v-flex xs12>
                <v-text-field v-model="contact" label="Contact" type="number"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small style="float:right;display:block;margin-right:15px">* indicates required field</small>
        </v-card-text>
        <br />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            style="text-transform: none"
            text
            @click="edit_dialog = false"
          >Close</v-btn>
          <v-btn
            color="primary"
            style="text-transform: none"
            @click="updateStudent(); edit_dialog = false"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="delete_dialog" width="500">
      <!-- <template v-slot:activator="{ on }"></template> -->
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Delete Student?</v-card-title>
        <v-card-text style="padding-top: 16px">
          Are you sure you want to delete student
          <b>{{name}}</b>
          ({{student_id}})?
          <br />You will not able to recover it after deleting.
        </v-card-text>
        <v-divider style="margin: 0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            text
            style="text-transform: none; margin: 0 5px;"
            @click="delete_dialog = false"
          >Cancel</v-btn>
          <v-btn
            color="error"
            style="background-color: #2A73C5; text-transform: none; margin: 0"
            @click="deleteStud(); delete_dialog = false"
          >Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <b-container> -->
    <!-- User Interface controls -->
    <!-- <b-row>
        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
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
  </div>
</template>

<script>
import db from "./../../firebase/firestoreInit";
import firebase from "firebase";
import firebaseConfig from "./../../firebase/firebaseConfig";

export default {
  name: "manage-student",
  created() {
    this.$store.commit("startLoading");
    this.$store.commit("changePage", [
      { text: "Manage Student", disabled: false, to: "/manage-student" }
    ]);
  },

  data() {
    return {
      snackbar: false,
      color: "",
      timeout: 5000, // 5 seconds
      message: "",

      search: "",
      items: [],
      loading: true,
      headers: [
        {
          text: "Student ID",
          value: "student_id",
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
      role: "",
      valid: true,
      student_id: "",
      name: "",
      email: "",
      contact: "",
      password: "",
      add_dialog: false,
      edit_dialog: false,
      delete_dialog: false
    };
  },
  firestore() {
    return {
      items: db.collection("students").orderBy("name")
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
  updated() {
    this.loading = false;
    this.$store.commit("stopLoading");
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
    clear() {
      this.$refs.form.reset();
    },
    deleteStud() {
      db.collection("students")
        .doc(this.id)
        .delete()
        .then(() => {
          //
          console.log(this.id);
          console.log(firebase.auth().currentUser.refreshToken);
          //
        })
        .catch(error => {
          console.error("Error deleting user: ", error);
        });

      this.snackbar = true;
      this.message = "Delete student successfully";
      this.color = "primary";
    },
    rowSelected(student) {
      this.id = student.id;
      this.student_id = student.student_id;
      this.name = student.name;
      this.email = student.email;
      this.contact = student.contact;
    },
    updateStudent() {
      db.collection("students")
        .doc(this.id)
        .update({
          student_id: this.student_id,
          name: this.name,
          //   email: this.email,
          contact: this.contact
        });

      this.snackbar = true;
      this.message = "Update student successfully";
      this.color = "primary";
      //   this.$refs.form.reset();
    },
    addUser(uid, student_id, name, email, contact) {
      const createdAt = new Date();

      db.collection("students")
        .doc(uid)
        .set({
          name,
          student_id: student_id,
          email,
          contact,
          created_at: createdAt
        })
        .then(() => {
          this.snackbar = true;
          this.message = "Add Student successfully";
          this.color = "primary";

          // console.log("User added: ");
          // alert("Your account has been created!");
          // this.$router.go({ path: "/" });
        })
        .catch(error => {
          console.error("Error adding user: ", error);
        });
    },
    signUp() {
      var secondaryFirebase = firebase.initializeApp(
        firebaseConfig,
        "Secondary"
      );

      if (this.name && this.email && this.student_id && this.password) {
        secondaryFirebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            () => {
              var currentUser = secondaryFirebase.auth().currentUser;
              var uid = currentUser.uid;
              console.log("name: " + this.name);
              // update user profile
              currentUser.updateProfile({
                displayName: this.name,
                photoURL: "students"
              });
              secondaryFirebase.auth().signOut();
              secondaryFirebase.delete();
              this.addUser(
                uid,
                this.student_id,
                this.name,
                this.email,
                this.contact
              );
            },
            err => {
              alert("Oops. " + err.message);
            }
          );
      }
    }
  }
};
</script>

<style scoped>
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


