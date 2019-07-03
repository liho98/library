<template>
  <div class="checkout">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <span class="breadcrumb-item active">Checkout</span>
      </div>
    </div>
    <div class="centre">
      <label for="books">Select book(s):</label>
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
        :multiple="true"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        :preselect-first="true"
        placeholder="Type here to search"
        label="title"
        track-by="title"
        :custom-label="titleYearQuantity"
      >
        <!-- 
        :preserve-search="true"
        :preselect-first="true"

        -->
        <template slot="selection" slot-scope="{ values, search, isOpen }">
          <span
            class="multiselect__single"
            v-if="values.length &amp;&amp; !isOpen"
          >{{ values.length }} book(s) selected</span>
        </template>
      </multiselect>

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

// how to know the specific book got stock or not?
// get number of record in checkout collections?
//

export default {
  name: "checkout",
  components: { Multiselect },
  data() {
    return {
      books: [],
      students: [],
      student_checkout: null,
      books_checkout: null,
      due_date: null
    };
  },
  created() {
    db.collection("books")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id, // firebase document id
            book_id: doc.data().id,
            title: doc.data().title,
            author: doc.data().author,
            publisher: doc.data().publisher,
            year: doc.data().year,
            quantity: doc.data().quantity
          };
          this.books.push(data); // books will now equal to data
        });
      });

    db.collection("students")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id, // firebase document id
            student_id: doc.data().id,
            name: doc.data().name,
            email: doc.data().email
          };
          this.students.push(data); // books will now equal to data
        });
      });

    // calculate due date
    const due_date = new Date();
    this.due_date = new Date(due_date.setDate(due_date.getDate() + 14));
  },
  methods: {
    titleYearQuantity({ title, year, quantity }) {
      return `${title}, ${year} (Left: ${quantity})`;
    },
    nameStudentID({ name, student_id }) {
      return `${name}, ${student_id}`;
    },
    checkout() {
      // decrease book quantity
      

      // add new checkout record

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
