<template>
  <div id="book-list-item" class="col-lg-2 col-md-3 col-sm-4">
    <div class="item">
      <router-link tag="img" class="item" v-bind:to="{name: 'view-book', params: {book_id: book.id}}" v-bind:src="this.url"/>
      <router-link tag="h3" v-bind:to="{name: 'view-book', params: {book_id: book.id}}" v-bind:src="this.url" align="center">
        <a>{{book.title}}</a>
      </router-link>
    </div>
  </div>

  <!-- <div id="book-list-item" style="display: inline">
    <img width="20%" v-bind:src="this.url" />
    <h5>{{book.title}}</h5>
  </div>-->
</template>

<script>
import firebaseStorage from "./../firebaseStorage";

export default {
  data() {
    return {
      url: ""
    };
  },
  props: ["book"],
  created() {
    const imgLink = require("../../assets/no-image.png");
    if ("download_url" in this.book) {
      this.url = this.book.download_url;
    } else {
      this.url = imgLink;
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
