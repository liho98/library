<template>
  <div id="view-book">
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" :top="true">
      {{ message }}
      <v-btn dark text @click="snackbar = false" style="text-transform: none">Close</v-btn>
    </v-snackbar>

    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <router-link class="breadcrumb-item" to="/view-book-list">Book List</router-link>
        <span class="breadcrumb-item active">{{ this.title }}</span>
      </div>
    </div>
    <div class="container" style="padding-top: 0px">
      <div class="row" style="padding-bottom: 15px">
        <div class="col-md-12" style="width:100%; height:100%">
          <h1 style="display: inline">{{this.title}}&nbsp;</h1>
          <h3 style="display: inline">by {{this.author}}</h3>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4" style="width:100%; height:100%">
          <img
            v-bind:src="this.download_url"
            alt="Book Cover"
            width="30%"
            style="padding-top: 10px; align: center"
          />
        </div>
        <div class="col-md-8" style="padding-top: 10px">
          <table class="table table-hover table-borderless">
            <tbody>
              <tr class="d-flex">
                <th class="col-2 text-right">Title</th>
                <td class="col-10">{{this.title}}</td>
              </tr>
              <tr class="d-flex">
                <th class="col-2 text-right">Author</th>
                <td class="col-10">{{this.author}}</td>
              </tr>
              <tr class="d-flex">
                <th class="col-2 text-right">Year</th>
                <td class="col-10">{{this.year}}</td>
              </tr>
              <tr class="d-flex">
                <th class="col-2 text-right">Publisher</th>
                <td class="col-10">{{this.publisher}}</td>
              </tr>
              <tr class="d-flex">
                <th class="col-2 text-right">Description</th>
                <td class="col-10" style="text-align: justify">{{this.description}}</td>
              </tr>
              <tr class="d-flex">
                <th class="col-12" style="padding: 0"></th>
              </tr>
            </tbody>
          </table>

          <h4 style="padding-bottom: 15px; padding-top: 15px">Copies</h4>

          <table class="table table-hover table-borderless">
            <thead>
              <tr class="d-flex">
                <th class="col-1 text-center">No.</th>
                <th class="col-5 text-center">Copies ID</th>
                <th class="col-3 text-center">Status</th>
                <th class="col-3 text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr class="d-flex" v-bind:key="copy.id" v-for="(copy, index) in copies">
                <th class="col-1 text-center">{{index+1}}</th>
                <td class="col-5 text-center">{{copy.id}}</td>
                <td
                  v-if="copy.status === 'available' || copy.status === 'returned'"
                  class="col-3 text-center"
                  style="text-transform: capitalize;"
                  v-bind:id="copy.id + '-status'"
                >
                  <i
                    class="fas fa-check-circle"
                    style="color: #02ac1e"
                    v-bind:id="copy.id + '-icon'"
                  >&nbsp;</i>
                  {{copy.status}}
                </td>
                <td
                  v-else
                  class="col-3 text-center"
                  style="text-transform: capitalize;"
                >{{copy.status}}</td>

                <td class="col-3 text-center">
                  <!-- <v-btn
                    small
                    color="primary"
                    style="background-color: #2A73C5; text-transform: none;"
                    v-if="copy.status === 'available' || copy.status === 'returned'"
                    @click="displayConfirmDialog(title, copy.id)"
                  >Reserve</v-btn>-->
                  <v-btn
                    v-bind:id="copy.id + '-button'"
                    small
                    color="primary"
                    style="text-transform: none;"
                    @click.stop="setCopy(copy); dialog = true"
                    v-if="role === 'students' && copy.status === 'available' || copy.status === 'returned'"
                  >Reserve</v-btn>
                </td>
              </tr>
              <tr class="d-flex">
                <th class="col-12" style="padding: 0"></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <v-dialog v-model="dialog" width="500">
      <!-- <template v-slot:activator="{ on }"></template> -->
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Reserve Book?</v-card-title>
        <v-card-text style="padding-top: 16px">
          Are you sure you want to reserve
          <b>{{title}}</b>?
          <br />You are require to collect the book at library counter
          <b>within 3 days</b> after reserving it.
        </v-card-text>
        <v-divider style="margin: 0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text style="text-transform: none; margin: 0 5px;" @click="dialog = false">Cancel</v-btn>
          <v-btn
            color="primary"
            style="text-transform: none; margin: 0 5px;"
            @click="reserveCopy()"
          >Reserve</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "./../../components/firestoreInit";
// import firebase from "firebase";

export default {
  // name: "view-book",
  data() {
    return {
      snackbar: false,
      color: "",
      timeout: 5000, // 5 seconds
      message: "",

      id: "",
      title: "",
      author: "",
      publisher: "",
      download_url: null,
      year: null,
      quantity: null,
      current_quantity: null,
      description: "",
      copies: [],
      dialog: false,
      due_date: null,
      role: "",
      selected_copy: {}
    };
  },
  created() {
    this.$store.commit("startLoading");
    this.role = localStorage.role;
    //   if (firebase.auth().currentUser) {
    //     var currentUser = firebase.auth().currentUser;
    //     this.role = currentUser.photoURL;
    //   }
  },
  props: ["book"],
  beforeRouteEnter(to, from, next) {
    // console.log(to.params.book_id);
    db.collection("books")
      .doc(to.params.book_id)
      .get()
      .then(doc => {
        next(vm => {
          vm.id = doc.data().id;
          vm.title = doc.data().title;
          vm.author = doc.data().author;
          vm.publisher = doc.data().publisher;
          vm.download_url = doc.data().download_url;
          vm.year = doc.data().year;
          vm.quantity = doc.data().quantity;
          vm.current_quantity = doc.data().current_quantity;
          vm.description = doc.data().description;

          if (
            doc.data().download_url === undefined ||
            doc.data().download_url === ""
          ) {
            const imgLink = require("../../assets/no-image.png");
            vm.download_url = imgLink;
          }
          vm.getCopies(vm, to.params.book_id);
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    setCopy(copy) {
      this.selected_copy = copy;
    },
    // displayConfirmDialog(title, copy_id) {
    //   var r = confirm(
    //     "Are you sure you want to reserve " +
    //       title +
    //       "?\nYou are require to collect the book at library counter within 3 days."
    //   );
    //   if (r) {
    //     this.reserveCopy(copy_id);
    //   }
    // },
    getCopies(vm, book_id) {
      db.collection("books")
        .doc(book_id)
        .collection("copies")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id, // firebase document id
              status: doc.data().status
            };
            vm.copies.push(data); // books will now equal to data
          });
        });
    },
    reserveCopy() {
      this.dialog = false;

      const created_at = new Date();
      this.due_date = new Date(created_at.setDate(created_at.getDate() + 3));

      // add new checkout record
      db.collection("reserve")
        .add({
          // use document id instead of book id or student id for easy query later
          book_did: this.$route.params.book_id,
          copies_did: this.selected_copy.id,
          reserve_at: new Date(),
          due_date: this.due_date,
          student_did: localStorage.userId,
          status: "ready"
        })
        .then(docRef => {
          // update copies to borrowed and add checkout id to refer
          db.collection("books")
            .doc(this.$route.params.book_id)
            .collection("copies")
            .doc(this.selected_copy.id)
            .update({
              status: "reserved",
              reserve_did: docRef.id,
              student_did: localStorage.userId,
              due_date: this.due_date
            });
          // console.log("Reserve book successfully");
          // alert("Reserve book successfully");
          // this.$router.go({ path: this.path });
          document.getElementById(this.selected_copy.id + "-icon").remove();

          document.getElementById(
            this.selected_copy.id + "-status"
          ).textContent = "reserved";
          document.getElementById(this.selected_copy.id + "-button").remove();

          this.snackbar = true;
          this.message = "Reserve book successfully";
          this.color = "primary";
        })
        .catch(error => {
          console.error("Error reserving out book: ", error);
        });
    },
    fetchData() {
      db.collection("books")
        .doc(this.$route.params.book_id)
        .get()
        .then(doc => {
          this.id = this.$route.params.book_id;
          this.title = doc.data().title;
          this.author = doc.data().author;
          this.publisher = doc.data().publisher;
          this.download_url = doc.data().download_url;
          this.year = doc.data().year;
          this.quantity = doc.data().quantity;
          this.current_quantity = doc.data().current_quantity;
          this.description = doc.data().description;

          if (
            doc.data().download_url === undefined ||
            doc.data().download_url === ""
          ) {
            const imgLink = require("../../assets/no-image.png");
            this.download_url = imgLink;
          }
        });

      db.collection("books")
        .doc(this.$route.params.book_id)
        .collection("copies")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id, // firebase document id
              status: doc.data().status
            };
            this.copies.push(data); // books will now equal to data
          });
        });
    }
  },
  updated() {
    this.$store.commit("stopLoading");
  }
};
</script>

<style scoped>
img {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

#borderless-cell {
  border: 1px solid Transparent !important;
}
</style>
