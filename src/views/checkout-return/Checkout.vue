<template>
  <div class="checkout">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;"
      >
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <span class="breadcrumb-item active">Checkout</span>
      </div>
    </div>
    <div class="centre">
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
        v-model="books_checkout"
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
        v-model="copies_checkout"
        :options="copies"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        :preselect-first="true"
        placeholder="Type here to search"
        label="id"
        track-by="id"
      />

      <br />
      <label for="student">Select student:</label>
      <multiselect
        id="student"
        v-model="student_checkout"
        :options="students"
        :clear-on-select="false"
        placeholder="Type here to search"
        label="name"
        track-by="name"
        :preserve-search="true"
        :preselect-first="true"
        :custom-label="nameStudentID"
      ></multiselect>

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
      <div class="text-center">

        <input class="btn" type="submit" value="Checkout" @click="checkout" />
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

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

// how to know the specific book got stock or not?
// get number of record in checkout collections?
//
Vue.use(firestorePlugin);

export default {
  name: "checkout",
  components: { Multiselect },
  data() {
    return {
      books: [],
      students: [],
      copies: [],
      student_checkout: null,
      books_checkout: [],
      copies_checkout: [],
      due_date: null
    };
  },
  // vuefire library
  firestore: {
    // get books that are available from firebase
    books: db.collection("books").where("current_quantity", ">", 0),

    // get all students from firebase
    students: db.collection("students")
  },

  created() {
    // calculate due date
    const due_date = new Date();
    this.due_date = new Date(due_date.setDate(due_date.getDate() + 14));

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
    checkout() {
      // decrease book quantity
      const new_quantity = this.books_checkout.quantity - 1;
      db.collection("books")
        .doc(this.books_checkout.id)
        .update({ current_quantity: new_quantity });

      const createdAt = new Date();
      // add new checkout record
      db.collection("checkout")
        .add({
          // use document id instead of book id or student id for easy query later
          book_did: this.books_checkout.id,
          copies_did: this.copies_checkout.id,
          borrowed_date: createdAt,
          due_date: this.due_date,
          student_did: this.student_checkout.id
        })
        .then(docRef => {
          // update copies to borrowed and add checkout id to refer
          db.collection("books")
            .doc(this.books_checkout.id)
            .collection("copies")
            .doc(this.copies_checkout.id)
            .update({ status: "borrowed", checkout_did: docRef.id, student_did: this.student_checkout.id });
          console.log("Check out book successfully");
          alert("Check out book successfully");
          this.$router.go({ path: this.path });
        })
        .catch(error => {
          console.error("Error checking out book: ", error);
        });

// update isAvailable

      // this.books_checkout = [this.books_checkout]

      // // loop throught every selected book to checkout
      // Object.keys(this.books_checkout).forEach(key => {

      // });
    },
    onSelect() {
      this.copies_checkout = [];
      this.copies = [];
      // find copies based on book did
      // this.copies.push(books.docRef(this.books_checkout.id).collection('copies'))
      db.collection("books")
        .doc(this.books_checkout.id)
        .collection("copies")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().status != "borrowed") {
              const data = {
                id: doc.id, // firebase document id
                status: doc.data().status
              };
              this.copies.push(data); // books will now equal to data
            }
          });
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
