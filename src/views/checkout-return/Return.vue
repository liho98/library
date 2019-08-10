<template>
  <div class="return">
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" :top="true">
      {{ message }}
      <v-btn dark text @click="snackbar = false" style="text-transform: none">Close</v-btn>
    </v-snackbar>

    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <span class="breadcrumb-item active">Return</span>
      </div>
    </div>
    <div class="centre">
      <!-- <v-alert
        type="success"
        dark
        :value="success"
        transition="scale-transition"
      >Return Successfully</v-alert>-->
      <br />

      <label for="books">Select book:</label>
      <!-- <multiselect
        id="books"
        v-model="books"
        :options="books"
        :clear-on-select="false"
        :multiple="true"
        placeholder="Select books"
        label="title"
        track-by="title"
      ></multiselect>-->

      <multiselect
        id="books"
        v-model="books_return"
        :options="books"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        :preselect-first="true"
        placeholder="Type here to search"
        label="title"
        track-by="title"
        :custom-label="titleAuthor"
        @input="onSelect()"
      />
      <!-- 
        :preserve-search="true"
        :preselect-first="true"
        :multiple="true"

      -->
      <!-- <template slot="selection" slot-scope="{ values, search, isOpen }">
          <span
            class="multiselect__single"
            v-if="values.length &amp;&amp; !isOpen"
          >{{ values.length }} book(s) selected</span>
      </template>-->

      <br />
      <label for="copies">Select book copies:</label>
      <multiselect
        id="copies"
        v-model="copies_return"
        :options="copies"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        :preselect-first="true"
        placeholder="Type here to search"
        label="id"
        track-by="id"
        @input="onSelectCopies()"
      />

      <br />
      <label for="student">Due date:</label>

      <input
        :value="due_date && due_date.toISOString().split('T')[0]"
        @input="myDate = $event.target.valueAsDate"
        type="date"
        class="form-control"
        name="due-date"
        id="due-date"
        aria-describedby="helpId"
        placeholder="Due date"
        disabled
      />

      <br />
      <label for="student">Return date:</label>

      <input
        :value="return_date && return_date.toISOString().split('T')[0]"
        @input="return_date = $event.target.valueAsDate"
        type="date"
        class="form-control"
        name="return-date"
        id="return-date"
        aria-describedby="helpId"
        placeholder="Return date"
        disabled
      />

      <div id="div-fine" style="display: none;">
        <br />

        <label for="student">Days of late return:</label>

        <input
          v-model="days_late"
          type="number"
          class="form-control"
          name="days_late"
          id="days_late"
          aria-describedby="helpId"
          placeholder="Days late"
          disabled
          style="width: 100%"
        />

        <br />

        <label for="student">
          Late return fine (RM): &nbsp;
          <span v-tooltip="msg">
            <i class="far fa-question-circle" style="color: #008CBA"></i>
          </span>
        </label>
        <input
          v-model="fine"
          type="number"
          class="form-control"
          name="fine"
          id="fine"
          aria-describedby="helpId"
          placeholder="Fine"
          disabled
          style="width: 100%"
        />
      </div>

      <br />
      <div class="text-center">
        <v-btn large color="primary" style="text-transform: none" @click="returnBook">Return</v-btn>
      </div>

      <!--         :custom-label="nameWithLang"          :preselect-first="true"         :preserve-search="true"-->
      <!-- <pre class="language-json"><code>{{ borrower  }}</code></pre>

      <pre class="language-json"><code>{{ books  }}</code></pre>-->
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import db from "../../components/firestoreInit";
import Vue from "vue";
import { firestorePlugin } from "vuefire";

import Tooltip from "vue-directive-tooltip";
import "vue-directive-tooltip/dist/vueDirectiveTooltip.css";

Vue.use(Tooltip);

// how to know the specific book got stock or not?
// get number of record in return collections?
//
Vue.use(firestorePlugin);

export default {
  name: "return",
  components: { Multiselect },
  data() {
    return {
      snackbar: false,
      color: "",
      timeout: 5000, // 5 seconds
      message: "",

      books: [],
      students: [],
      copies: [],
      books_return: [],
      copies_return: [],
      due_date: null,
      checkout: [],
      return_date: null,
      fine: 0,
      days_late: 0,
      msg: "Total fine = Days of late return x RM 0.50"
    };
  },
  // vuefire library
  firestore: {
    // get books that are available from firebase
    books: db.collection("books").where("quantity", ">", 0),
    // get all students from firebase
    students: db.collection("students")
  },

  created() {
    this.return_date = new Date();

    // calculate due date
    // const due_date = new Date();
    // this.due_date = new Date(due_date.setDate(due_date.getDate()));

    //// OLD METHOD

    // db.collection("books")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       const data = {
    //         id: doc.id, // firebase document id
    //         book_id: doc.data().id,
    //         title: doc.data().title,
    //         author: doc.data().author,
    //         publisher: doc.data().publisher,
    //         year: doc.data().year,
    //         quantity: doc.data().quantity
    //       };
    //       this.books.push(data) // books will now equal to data
    //     })
    //   })

    // db.collection("students")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       const data = {
    //         id: doc.id, // firebase document id
    //         student_id: doc.data().id,
    //         name: doc.data().name,
    //         email: doc.data().email
    //       };
    //       this.students.push(data) // books will now equal to data
    //     });
    //   });
  },
  methods: {
    titleAuthor({ title, author }) {
      return `${title} by ${author}`;
    },
    nameStudentID({ name, student_id }) {
      return `${name}, ${student_id}`;
    },
    returnBook() {
      // decrease book quantity
      const new_quantity = this.books_return.quantity + 1;
      db.collection("books")
        .doc(this.books_return.id)
        .update({ quantity: new_quantity });

      const createdAt = new Date();

      // add new return record
      db.collection("return")
        .add({
          // use document id instead of book id or student id for easy query later
          book_did: this.books_return.id,
          copies_did: this.copies_return.id,
          return_date: createdAt,
          checkout_did: this.copies_return.checkout_did,
          student_did: this.copies_return.student_did,
          days_late: this.days_late,
          fine: this.fine
        })
        .then(docRef => {
          // update copies to borrowed and add checkout id to refer
          db.collection("books")
            .doc(this.books_return.id)
            .collection("copies")
            .doc(this.copies_return.id)
            .update({ status: "available", returned_did: docRef.id });
          console.log("Return book successfully");
          // alert("Return book successfully");
          // this.$router.go({ path: this.path });

          this.due_date = "";
          this.copies_return = this.books_return = [];

          this.snackbar = true;
          this.message = "Return book successfully";
          this.color = "success";
        })
        .catch(error => {
          console.error("Error checking out book: ", error);
        });

      // update checkout record
      db.collection("checkout")
        .doc(this.copies_return.checkout_did)
        .update({ status: "returned", returned_did: docRef.id });

      // // loop throught every selected book to checkout
      // Object.keys(this.books_checkout).forEach(key => {

      // });
    },
    onSelect() {
      // reset the copies multiselect
      this.copies_return = [];

      this.copies = [];
      // find copies based on book did
      // this.copies.push(books.docRef(this.books_checkout.id).collection('copies'))
      db.collection("books")
        .doc(this.books_return.id)
        .collection("copies")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().status === "borrowed") {
              const data = {
                id: doc.id, // firebase document id
                checkout_did: doc.data().checkout_did,
                student_did: doc.data().student_did
              };
              this.copies.push(data); // books will now equal to data
            }
          });
        });
    },
    onSelectCopies() {
      // get due date
      db.collection("checkout")
        .doc(this.copies_return.checkout_did)
        .get()
        .then(querySnapshot => {
          // TODO : Hi
          const data = {
            id: querySnapshot.id, // firebase document id
            due_date: querySnapshot.data().due_date.toDate()
          };
          this.checkout = [];
          this.checkout.push(data); // books will now equal to data

          // console.log(Object.keys(this.checkout)[0]);

          this.due_date = this.checkout[0].due_date;

          var divFine = document.getElementById("div-fine");
          if (this.return_date > this.due_date) {
            // pay fine
            if (divFine.style.display === "none") {
              divFine.style.display = "block";
            } else {
              divFine.style.display = "none";
            }

            // get days late
            const diffTime = Math.abs(
              this.return_date.getTime() - this.due_date.getTime()
            );
            this.days_late = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
            this.fine = this.days_late * 0.5;
            this.fine = this.fine.toFixed(2);

            // console.log(
            //   this.return_date + " > " + this.due_date + ": Pay fine"
            // );
          } else {
            if (divFine.style.display === "block") {
              divFine.style.display = "none";
            }

            console.log(
              this.return_date + " > " + this.due_date + ": No need to pay fine"
            );
          }

          //   due_date = querySnapshot.data().due_date.toDate();
          //   console.log(this.due_date);
        });
    }
  }
};
</script>

<style scoped>
div.centre {
  text-align: justify;
  width: 30%;
  margin: auto;
  margin-bottom: 20px;
}
</style>

<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
