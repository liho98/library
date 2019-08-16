<template>
  <div id="manage-book">
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" :top="true" right>
      {{ message }}
      <v-btn dark text @click="snackbar = false" style="text-transform: none">Close</v-btn>
    </v-snackbar>

    <div class="container">
      <v-card>
        <v-card-title>
          Manage Book
          <v-btn
            @click="add_dialog = true"
            color="primary"
            style="margin: 0 15px; text-transform: none"
          >
            <v-icon>add</v-icon>Book
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

    <v-dialog scrollable v-model="add_dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Book</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="book_id"
                  label="Book ID *"
                  type="text"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="title"
                  label="Title *"
                  type="text"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="author"
                  label="Author *"
                  type="text"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="publisher"
                  label="Publisher *"
                  type="text"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="year"
                  :rules="[v => (v && v.length) >= 1 || 'Required', v => v.length == 4 || '4 digits required', v => v > 0 || 'Cannot be negative']"
                  minlength="4"
                  label="Year *"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :rules="[v => (v && v.length) >= 1 || 'Required', v => v > 0 || 'Cannot be negative']"
                  v-model="quantity"
                  label="Quantity *"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="description"
                  label="Description"
                  hide-details
                  style="padding-bottom: 20px"
                ></v-textarea>
              </v-flex>
              <v-flex xs12 class="text-center">
                <app-file-uploader @uploaded="onImgUploaded" @downloadURL="getDownloadURL"></app-file-uploader>
              </v-flex>
            </v-layout>
          </v-container>
          <small
            style="margin-top: 15px!important;float: right!important;margin-bottom: -15px!important;"
          >* indicates required field</small>
        </v-card-text>
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
            @click="addBook(); add_dialog = false"
          >Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog scrollable v-model="edit_dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Book</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="book_selected.book_id"
                  label="Book ID *"
                  type="text"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="book_selected.title"
                  label="Title *"
                  type="text"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="book_selected.author"
                  label="Author *"
                  type="text"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="book_selected.publisher"
                  label="Publisher *"
                  type="text"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="book_selected.year"
                  :rules="[v => (v && v.length) >= 1 || 'Required', v => v.length == 4 || '4 digits required', v => v > 0 || 'Cannot be negative']"
                  minlength="4"
                  label="Year *"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :rules="[v => (v && v.length) >= 1 || 'Required', v => v > 0 || 'Cannot be negative']"
                  v-model="book_selected.quantity"
                  label="Quantity *"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="book_selected.description"
                  label="Description"
                  hide-details
                  style="padding-bottom: 20px"
                ></v-textarea>
              </v-flex>
              <v-flex xs12 class="text-center">
                <img :src="book_selected.download_url" width="20%" style="padding-bottom: 10px" />
                <app-file-uploader @uploaded="onImgUploaded" @downloadURL="getDownloadURL"></app-file-uploader>
              </v-flex>
            </v-layout>
          </v-container>

          <small
            style="margin-top: 15px!important;float: right!important;margin-bottom: -15px!important;"
          >* indicates required field</small>
        </v-card-text>
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
            @click="updateBook(); edit_dialog = false"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="delete_dialog" width="500">
      <!-- <template v-slot:activator="{ on }"></template> -->
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Delete Book?</v-card-title>
        <v-card-text style="padding-top: 16px">
          Are you sure you want to delete book
          <b>{{book_selected.title}}</b>
          ({{book_selected.book_id}})?
          <br />You will not able to recover it after deleting.
        </v-card-text>
        <v-divider style="margin: 0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            style="text-transform: none; margin: 0 5px;"
            @click="delete_dialog = false"
          >Cancel</v-btn>
          <v-btn
            color="error"
            style="background-color: #2A73C5; text-transform: none; margin: 0"
            @click="deleteBook(); delete_dialog = false"
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
import FileUploader from "./../../components/FileUploader";
import secondaryFirebase from "./../../firebase/firebaseSecondary";

export default {
  name: "manage-book",
  components: {
    "app-file-uploader": FileUploader
  },
  created() {
    this.$store.commit("startLoading");
    this.$store.commit("changePage", [
      { text: "Manage Book", disabled: false, to: "/manage-book" }
    ]);
  },
  data() {
    return {
      snackbar: false,
      color: "",
      timeout: 5000, // 5 seconds
      message: "",

      book_selected: {},

      id: "",
      book_id: "",
      title: "",
      author: "",
      publisher: "",
      year: "",
      quantity: undefined,
      fileName: "",
      download_url: "",
      description: "",

      search: "",
      items: [],
      loading: true,
      headers: [
        {
          text: "Book ID",
          value: "book_id",
          align: "left",
          sortable: true
        },
        {
          text: "Title",
          value: "title",
          align: "left",
          sortable: true
        },

        {
          text: "Author",
          value: "author",
          align: "left",
          sortable: true
        },
        {
          text: "Year",
          value: "year",
          align: "left",
          sortable: true
        },
        {
          text: "Publisher",
          value: "publisher",
          align: "left",
          sortable: true
        },
        {
          text: "Quantity",
          value: "quantity",
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
      librarian_id: "",
      name: "",
      email: "",
      contact: "",
      password: "",
      uid: "",
      add_dialog: false,
      edit_dialog: false,
      delete_dialog: false
    };
  },
  firestore() {
    return {
      items: db.collection("books").orderBy("book_id")
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
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.getReserve(vm);
  //   });
  // },
  methods: {
    addBook() {
      const createdAt = new Date();
      if (
        this.book_id &&
        this.title &&
        this.author &&
        this.publisher &&
        this.year &&
        this.quantity
      ) {
        db.collection("books")
          .add({
            book_id: this.book_id,
            title: this.title,
            author: this.author,
            publisher: this.publisher,
            year: this.year,
            quantity: Number(this.quantity),
            created_at: createdAt,
            current_quantity: Number(this.quantity),
            cover_image: this.fileName,
            download_url: this.download_url,
            description: this.description
          })
          .then(docRef => {
            // add copies based on book quantity
            for (var i = 0; i < this.quantity; i++) {
              db.collection("books")
                .doc(docRef.id)
                .collection("copies")
                .add({
                  status: "available",
                  created_at: createdAt
                });
            }
            // this.book_id = "";
            // this.title = "";
            // this.author = "";
            // this.publisher = "";
            // this.year = "";
            // this.quantity = undefined;
            // this.fileName = "";
            // this.downloadURL = "";
            // this.description = "";

            this.snackbar = true;
            this.message = "Add book successfully";
            this.color = "primary";

            // console.log("Book added");
            // alert("Book added!");
            // this.$router.go({ path: this.path });
          })
          .catch(error => {
            console.error("Error adding book: ", error);
          });
      }
    },
    onImgUploaded(value) {
      this.book_selected.fileName = value;
    },
    getDownloadURL(value) {
      this.book_selected.download_url = value;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    clear() {
      this.$refs.form.reset();
    },
    deleteStud(student) {
      if (confirm("Are you sure to remove this record?")) {
        db.collection("students")
          .doc(student.id)
          .delete();
      } else {
      }
    },
    rowSelected(book) {
      this.book_selected = book;
    },
    updateBook() {
      if (this.book_selected.fileName === undefined) {
        this.book_selected.fileName = "";
      }

      db.collection("books")
        .doc(this.book_selected.id)
        .update({
          book_id: this.book_selected.book_id,
          title: this.book_selected.title,
          author: this.book_selected.author,
          publisher: this.book_selected.publisher,
          year: this.book_selected.year,
          quantity: Number(this.book_selected.quantity),
          cover_image: this.book_selected.fileName,
          download_url: this.book_selected.download_url,
          description: this.book_selected.description
        });

      this.snackbar = true;
      this.message = "Update book successfully";
      this.color = "primary";
    },
    deleteBook() {
      //   if (confirm("Are you sure to remove this record?")) {
      db.collection("books")
        .doc(this.book_selected.id)
        .delete();

      this.snackbar = true;
      this.message = "Delete book successfully";
      this.color = "primary";

      //   } else {
      //   }
    },
    addUser(uid, librarian_id, name, email, contact) {
      const createdAt = new Date();

      db.collection("librarians")
        .doc(uid)
        .set({
          name,
          librarian_id: librarian_id,
          email,
          contact,
          created_at: createdAt
        })
        .then(() => {
          this.snackbar = true;
          this.message = "Add librarian successfully";
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
      if (this.name && this.email && this.librarian_id && this.password) {
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
                photoURL: "librarians"
              });
              secondaryFirebase.auth().signOut();
              secondaryFirebase.delete();
              this.addUser(
                uid,
                this.librarian_id,
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


<style>
.v-dialog--scrollable {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}
</style>