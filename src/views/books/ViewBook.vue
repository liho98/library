<template>
  <div id="book-list-item" class="col-lg-2 col-md-3 col-sm-4"></div>

  <!-- <div id="book-list-item" style="display: inline">
    <img width="20%" v-bind:src="this.url" />
    <h5>{{book.title}}</h5>
  </div>-->
</template>

<script>
import db from "./../../components/firestoreInit";

export default {
  name: "view-book",
  data() {
    return {
      id: "",
      title: "",
      author: "",
      publisher: "",
      download_url: "",
      year: null,
      quantity: null,
      current_quantity: null
    };
  },
  props: ["book"],
  created() {
    if (this.download_url === "") {
      const imgLink = require("../../assets/no-image.png");
      this.download_url = imgLink;
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.params.book_id);
    db.collection("books")
      .doc(to.params.book_id)
      .get()
      .then(doc => {
        next(vm => {
          vm.id = doc.data().id;
          vm.title = doc.data().title;
          vm.author = doc.data().author;
          vm.publisher = doc.data().publisher;
          vm.download_url = doc.data().download_url;
          vm.year = doc.data().year;
          vm.quantity = doc.data().year;
          vm.current_quantity = doc.data().current_quantity;
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("books")
        .doc(this.$route.params.book_id)
        .get()
        .then(doc => {
          this.id = doc.id;
          this.title = doc.data().title;
          this.author = doc.data().author;
          this.publisher = doc.data().publisher;
          this.download_url = doc.data().download_url;
          this.year = doc.data().year;
          this.quantity = doc.data().year;
          this.current_quantity = doc.data().current_quantity;
        });
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
