<template>
  <div id="view-book">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <router-link class="breadcrumb-item" to="/view-book-list">Book List</router-link>
        <span class="breadcrumb-item active">{{ this.title }}</span>
      </div>
    </div>
    <div class="container" style="padding-top: 0px">
      <div class="row" style="padding-bottom: 15px">
        <div class="col-md-12" style="width:100%; height:100%">
          <h1 style="display: inline">{{this.title}} </h1><h3 style="display: inline"> by {{this.author}}</h3>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4" style="width:100%; height:100%">
          <img
            v-bind:src="this.download_url"
            alt="Book Cover"
            width="30%"
            style="padding-top: 10px; align: center"
          />
        </div>
        <div class="col-md-8" style="padding-top: 10px">
          <table class="table table-hover table-bordered">
            <tbody>
              <tr class="d-flex">
                <th class="col-2 text-right">Title</th>
                <td class="col-10">{{this.title}}</td>
              </tr>
              <tr class="d-flex">
                <th class="col-2 text-right">Author</th>
                <td class="col-10">{{this.author}}</td>
              </tr>
              <tr class="d-flex">
                <th class="col-2 text-right">Year</th>
                <td class="col-10">{{this.year}}</td>
              </tr>
              <tr class="d-flex">
                <th class="col-2 text-right">Publisher</th>
                <td class="col-10">{{this.publisher}}</td>
              </tr>
              <tr class="d-flex">
                <th class="col-2 text-right">Description</th>
                <td class="col-10" style="text-align: justify">{{this.description}}</td>
              </tr>
            </tbody>
          </table>

            <h3>Copies</h3>

        </div>
      </div>
    </div>
  </div>
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
      download_url: null,
      year: null,
      quantity: null,
      current_quantity: null,
      description: ""
    };
  },
  props: ["book"],
  created() {
    // if (this.download_url === null) {
    //   const imgLink = require("../../assets/no-image.png");
    //   this.download_url = imgLink;
    // }
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to.params.book_id);
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
          vm.description = doc.data().description;

          if (doc.data().download_url === undefined) {
            console.log("no image");
            const imgLink = require("../../assets/no-image.png");
            vm.download_url = imgLink;
          }
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
          this.description = doc.data().description;

          if (doc.data().download_url === undefined) {
            console.log("no image");
            const imgLink = require("../../assets/no-image.png");
            this.download_url = imgLink;
          }
        });
    }
  }
};
</script>

<style scoped>
img {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
