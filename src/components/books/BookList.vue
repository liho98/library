<template>
  <div id="book-list">
    <div v-bind:key="book.id" v-for="book in books">
      <app-book-list-item :book="book"></app-book-list-item>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BookListItem from "./BookListItem";

export default {
  data() {
    return {};
  },
  props: ["books"],
  components: {
    "app-book-list-item": BookListItem
  }
};
</script>

<style>
</style>
