<template>
  <div class="return">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <span class="breadcrumb-item active">Return</span>
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

      <br />
      <div class="text-center">
        <input class="btn" type="submit" value="Return" @click="returnBook" />
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

// how to know the specific book got stock or not?
// get number of record in return collections?
//
Vue.use(firestorePlugin);

export default {
  name: "return",
  components: { Multiselect },
  data() {
    return {
      books: [],
      students: [],
      copies: [],
      books_return: [],
      copies_return: [],
      due_date: null,
      checkout: [],
      return_date: null
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
          returned_date: createdAt,
          checkout_did: this.copies_return.checkout_did
        })
        .then(docRef => {
          // update copies to borrowed and add checkout id to refer
          db.collection("books")
            .doc(this.books_return.id)
            .collection("copies")
            .doc(this.copies_return.id)
            .update({ status: "returned", returned_did: docRef.id });
          console.log("Return book successfully");
          alert("Return book successfully");
          this.$router.go({ path: this.path });
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
                checkout_did: doc.data().checkout_did
              };
              this.copies.push(data); // books will now equal to data
            }
          });
        });
    },
    onSelectCopies() {
      var due_date = null;
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
          this.checkout.push(data); // books will now equal to data

          console.log(Object.keys(this.checkout)[0]);

          this.due_date = this.checkout[0].due_date;
          if (this.return_date > this.checkout.due_date) {
            // pay fine
            console.log(
              this.return_date + " > " + this.due_date + ": Pay fine"
            );
          } else {
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
