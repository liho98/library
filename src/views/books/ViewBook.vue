<template>
  <div id="view-book">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <span class="breadcrumb-item active">Book List</span>
      </div>
    </div>
    <div class="centre">
      <app-book-list :books="books"></app-book-list>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BookList from "../../components/books/BookList.vue";

import db from "../../components/firestoreInit";

export default {
  data() {
    return {
      books: [{}]
    };
  },
  components: {
    "app-book-list": BookList
  },
  // vuefire library
  firestore: {
    // get books that are available from firebase
    books: db.collection("books")
  }
};
</script>

<style>
div.centre {
  text-align: justify;
  width: 30%;
  margin: auto;
  margin-bottom: 20px;
}
</style>
