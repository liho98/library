<template>
  <div id="book-list-item">
    <h1>{{book.title}}</h1>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
    };
  },
    props: ["book"]
};
</script>

<style>
</style>
