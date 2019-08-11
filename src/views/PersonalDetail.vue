<template>
  <div id="personal-detail">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>

        <span class="breadcrumb-item active">Personal Detail</span>
      </div>
    </div>
    <div class="centre">
      <div class="col-md-8" style="padding-top: 10px">
        <table class="table table-hover table-borderless">
          <tbody>
            <tr class="d-flex">
              <th class="col-4 text-right">ID:</th>
              <td class="col-6">{{this.id}}</td>
              <td class="col-2"></td>
            </tr>
            <tr class="d-flex">
              <th class="col-4 text-right">Name:</th>
              <td class="col-6">{{this.name}}</td>
              <td class="col-2"></td>
            </tr>
            <tr class="d-flex">
              <th class="col-4 text-right">Email:</th>
              <td class="col-6">{{this.currentEmail}}</td>
              <td class="col-2">
                <v-icon small @click.stop="dialog = true">edit</v-icon>
              </td>
            </tr>
            <tr class="d-flex">
              <th class="col-4 text-right">Contact:</th>
              <td class="col-6">{{this.currentContact}}</td>
              <td class="col-2">
                <v-icon small @click.stop="dialog1 = true">edit</v-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <v-dialog v-model="dialog" width="500">
      <!-- <template v-slot:activator="{ on }"></template> -->
      <v-card>
        <v-card-title class="headline grey lighten-2 mb-10" primary-title>Change Email</v-card-title>
        <v-card-text>
          <v-layout row justify-center>
            <v-flex xs11>
              <v-text-field type="text" v-model="currentEmail" outlined label="Current Email"  disabled readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs11>
              <v-text-field
                type="text"
                v-model="latestEmail"
                label="New Email"
                outlined
                :rules="[v => (v && v.length) >= 1 || 'Required']"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

        <v-divider style="margin-bottom:0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat text style="text-transform: none;" @click="dialog = false">Cancel</v-btn>
          <v-btn
            color="primary"
            style="background-color: #2A73C5; text-transform: none;"
            @click="updateEmail"
          >Change</v-btn>
        </v-card-actions>

        </v-card-text>

      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" width="500">
      <!-- <template v-slot:activator="{ on }"></template> -->
      <v-card>
        <v-card-title class="headline grey lighten-2 mb-10" primary-title>Change Contact</v-card-title>
        <v-card-text>
          <v-layout row justify-center>
            <v-flex xs11>
              <v-text-field type="text" v-model="currentContact" outlined label="Current Phone no."  disabled  readonly="true"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs11>
              <v-text-field
                type="text"
                v-model="latestContact"
                outlined label="New Phone no."
                :rules="[v => (v && v.length) >= 1 || 'Required']"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        <v-divider style="margin-bottom:0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat text style="text-transform: none;" @click="dialog1 = false">Cancel</v-btn>
          <v-btn
            color="primary"
            style="background-color: #2A73C5; text-transform: none;"
            @click="updateContact"
          >Change</v-btn>
        </v-card-actions>

        </v-card-text>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "./../components/firestoreInit";
import firebase from "firebase";

export default {
  name: "personal-detail",
  data() {
    return {
      id: "",
      name: "",
      currentEmail: "",
      latestContact: "",
      role: "",
      uid: "",
      latestEmail: "",
      dialog: false,
      dialog1: false,
      currentContact: ""
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      var currentUser = firebase.auth().currentUser;
      this.role = currentUser.photoURL;
      this.currentEmail = currentUser.email;
      this.name = currentUser.displayName;
      this.uid = currentUser.uid;

      if (this.role == "admins" || this.role == "librarians") {
        db.collection("librarians")
          .doc(this.uid)
          .get()
          .then(doc => {
            this.id = doc.data().librarian_id;
            this.currentContact = doc.data().contact;
          });
      }
      if (this.role == "students") {
        db.collection("students")
          .doc(this.uid)
          .get()
          .then(doc => {
            this.id = doc.data().student_id;
            this.currentContact = doc.data().contact;
          });
      }
    }
  },
  methods: {
    updateEmail() {
      if (this.role == "librarians" || this.role == "admins") {
        db.collection("librarians")
          .doc(this.uid)
          .update({
            email: this.latestEmail
          });
      }
      if (this.role == "students") {
        db.collection("students")
          .doc(this.uid)
          .update({
            email: this.latestEmail
          });
      }
      firebase.auth().currentUser.updateEmail(this.latestEmail);

      alert("Your email has already updated");
    },

    updateContact() {
      if (this.role == "librarians" || this.role == "admins") {
        db.collection("librarians")
          .doc(this.uid)
          .update({
            contact: this.latestContact
          });
      }
      if (this.role == "students") {
        db.collection("students")
          .doc(this.uid)
          .update({
            contact: this.latestContact
          });
      }
      alert("Your email has already updated");
    }
  }
};
</script>

<style scoped>
div.centre {
  text-align: center;
  width: 150%;
  margin: auto;
  align-content: center;
}

div.col-md-8 {
  display: inline-block;
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
  width: 50%;
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


