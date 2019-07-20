<template>
  <div class="checkout">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <span class="breadcrumb-item active">History</span>
      </div>
    </div>
    <div class="centre">
      <v-data-table :headers="headers" :items="checkout" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.book_did }}</td>
          <td class="text-xs-right">{{ props.item.borrowed_date }}</td>
          <td class="text-xs-right">{{ props.item.due_date }}</td>
        </template>
      </v-data-table>

      <!--         :custom-label="nameWithLang"          :preselect-first="true"         :preserve-search="true"-->
      <!-- <pre class="language-json"><code>{{ borrower  }}</code></pre>

      <pre class="language-json"><code>{{ books  }}</code></pre>-->
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import db from "../../components/firestoreInit";
import firebase from "../../components/firebaseInit";
import Vue from "vue";
import { firestorePlugin } from "vuefire";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);
Vue.use(firestorePlugin);

export default {
  name: "checkout-history",
  data() {
    return {
      books: [],
      return: [],
      checkout: [],
      due_date: null,
      headers: [
        { text: "Book Title", value: "book", align: "left" },
        { text: "Borrowed Date", value: "borrowed_date", align: "left" },
        { text: "Returned Date ", value: "returned_date", align: "left" }
      ]
    };
  },
  // vuefire library
  firestore: {
    // get books that are available from firebase
    books: db.collection("books"),
    checkout: db
      .collection("checkout")
      .where("student_did", "==", String(localStorage.userId)),
    return: db
      .collection("return")
      .where("student_did", "==", String(localStorage.userId))
  },

  created() {
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
    // },
    // checkout() {
    //   // decrease book quantity
    //   const new_quantity = this.books_checkout.quantity - 1;
    //   db.collection("books")
    //     .doc(this.books_checkout.id)
    //     .update({ current_quantity: new_quantity });
    //   const createdAt = new Date();
    //   // add new checkout record
    //   db.collection("checkout")
    //     .add({
    //       // use document id instead of book id or student id for easy query later
    //       book_did: this.books_checkout.id,
    //       copies_did: this.copies_checkout.id,
    //       borrowed_date: createdAt,
    //       due_date: this.due_date,
    //       student_did: this.student_checkout.id
    //     })
    //     .then(docRef => {
    //       // update copies to borrowed and add checkout id to refer
    //       db.collection("books")
    //         .doc(this.books_checkout.id)
    //         .collection("copies")
    //         .doc(this.copies_checkout.id)
    //         .update({ status: "borrowed", checkout_did: docRef.id });
    //       console.log("Check out book successfully");
    //       alert("Check out book successfully");
    //       this.$router.go({ path: this.path });
    //     })
    //     .catch(error => {
    //       console.error("Error checking out book: ", error);
    //     });
    //   // update isAvailable
    //   // this.books_checkout = [this.books_checkout]
    //   // // loop throught every selected book to checkout
    //   // Object.keys(this.books_checkout).forEach(key => {
    //   // });
    // }
  }
};
</script>

<style scoped>
div.centre {
  text-align: justify;
  width: 75%;
  margin: auto;
  margin-bottom: 20px;
}
</style>
