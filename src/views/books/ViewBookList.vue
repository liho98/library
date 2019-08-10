<template>
  <!-- <div id="view-book-list">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <span class="breadcrumb-item active">Book List</span>
      </div>
  </div>-->
  <div class="container">
    <!-- <app-book-list :books="books"></app-book-list> -->

    <v-container fluid grid-list-md>
      <v-data-iterator
        :items="books"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar dark color="blue darken-3" class="mb-1">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              label="Search"
            ></v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <!-- <div class="row">
            <div
              id="book-list-item"
              class="col-lg-2 col-md-3 col-sm-4"
              v-for="book in props.item"
              :key="book.title"
            >
              <v-card height="100%" v-bind:to="{name: 'view-book', params: {book_id: book.id}}">
                <v-img width="100%" v-bind:src="book.download_url" align="center"></v-img>
                <v-card-title style="font-size: large">{{ book.title }}</v-card-title>
              </v-card>
            </div>
          </div> -->

          <v-layout wrap>
            <v-flex v-for="book in props.items" :key="book.title" xs12 sm4 md3 lg2>
              <v-card height="100%" v-bind:to="{name: 'view-book', params: {book_id: book.id}}">
                <v-img width="100%" v-bind:src="book.download_url" align="center"></v-img>
                <v-card-title style="font-size: large">{{ book.title }}</v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </template>

        <template v-slot:footer>
          <v-layout mt-2 wrap align-center justify-center>
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn dark text color="primary" class="ml-2" v-on="on">
                  {{ itemsPerPage }}
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
            <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-layout>
        </template>
      </v-data-iterator>
    </v-container>
  </div>

  <!-- <app-progress-circular :value="value"></app-progress-circular>
  <app-book-list :books="books" @getValue="getValue"></app-book-list>-->
  <!-- </div> -->
</template>

<script>
// import BookList from "../../components/books/BookList.vue";
import db from "../../components/firestoreInit";
// import ProgressCircular from "../../components/ProgressCircular.vue";
// import { VListItem, VListItemTitle } from "vuetify/lib";
// import VListItem from 'vuetify/lib/components/VList/VListItem'

export default {
  components: {
    // "app-book-list": BookList
    // "v-list-item-title": VListItemTitle
  },
  data() {
    return {
      books: [],
      itemsPerPageArray: [18, 36, 72],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 18,
      sortBy: "title",
      keys: [
        "Name",
        "Calories",
        "Fat",
        "Carbs",
        "Protein",
        "Sodium",
        "Calcium",
        "Iron"
      ]
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    }
  },
  created() {
    this.$store.commit("startLoading");
  },
  updated() {
    this.$store.commit("stopLoading");
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    getBooks(vm) {
      db.collection("books")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id, // firebase document id
              title: doc.data().title,
              author: doc.data().author
            };
            if (
              doc.data().download_url === undefined ||
              doc.data().download_url === ""
            ) {
              const imgLink = require("../../assets/no-image.png");
              data.download_url = imgLink;
            } else {
              data.download_url = doc.data().download_url;
            }
            vm.books.push(data); // books will now equal to data
          });
        });
    },
    fetchData() {
      db.collection("books")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id, // firebase document id
              title: doc.data().title,
              author: doc.data().author
            };
            if (doc.data().download_url === undefined) {
              const imgLink = require("../../assets/no-image.png");
              data.download_url = imgLink;
            } else {
              data.download_url = doc.data().download_url;
            }
            this.books.push(data); // books will now equal to data
          });
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getBooks(vm);
    });
    // console.log(to.params.book_id);
  },
  watch: {
    $route: "fetchData"
  }
  // components: {
  //   "app-book-list": BookList,
  //   "app-progress-circular": ProgressCircular
  // },
  // vuefire library
  // firestore: {
  //   // get books that are available from firebase
  //   books: db.collection("books")
  // }
  // methods: {
  //   getValue: function(value) {
  //     this.value = value;
  //   }
  // }
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
