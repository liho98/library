<template>
  <div id="view-book-list">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <span class="breadcrumb-item active">Book List</span>
      </div>
    </div>
    <section class="recent-book-sec">
      <app-progress-circular :value="value"></app-progress-circular>
      <app-book-list :books="books" @getValue="getValue"></app-book-list>
    </section>
  </div>
</template>

<script>
import BookList from "../../components/books/BookList.vue";
import db from "../../components/firestoreInit";
import ProgressCircular from "../../components/ProgressCircular.vue";

export default {
  data() {
    return {
      books: [{}],
      value: true
    };
  },
  components: {
    "app-book-list": BookList,
    "app-progress-circular": ProgressCircular
  },
  // vuefire library
  firestore: {
    // get books that are available from firebase
    books: db.collection("books")
  },
  created() {
    // this.value = false;
  },
  methods: {
    getValue: function(value) {
      this.value = value;
    }
  }
};
</script>

<style>
div.centre {
  text-align: justify;
  width: 75%;
  margin: auto;
  margin-bottom: 20px;
}
</style>
