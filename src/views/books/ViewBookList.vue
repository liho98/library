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
        dark
        :items="filteredBooks"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :no-data-text="no_data_text"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <!-- <v-row>
            <v-col cols="12">
              <v-sheet dark style="border-radius:5px" elevation="10" class="py-2 px-6">
                <v-chip-group show-arrows next-icon="fa fa-angle-right" prev-icon="fa fa-angle-left" dark multiple active-class="primary--text">
                  <v-chip dark v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>-->

          <v-toolbar style="border-radius:5px" dark class="mb-1 py-2 px-2">
            <v-toolbar-title color="white">
              <v-icon>fa-fw fa-search</v-icon>
            </v-toolbar-title>
            <!-- <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              label="Search"
            ></v-text-field>-->
            <!-- <v-flex xs12> -->
            <v-autocomplete
              v-model="select"
              :loading="loading"
              :items="titles"
              :search-input.sync="search"
              cache-items
              class="mx-4"
              flat
              hide-no-data
              hide-details
              label="Book name"
              solo-inverted
            ></v-autocomplete>
            <!-- </v-flex> -->

            <!-- <v-flex xs12> -->
            <v-autocomplete
              v-model="category"
              :loading="loading"
              :items="categories"
              cache-items
              class="mx-2"
              flat
              hide-no-data
              hide-details
              label="Categories"
              solo-inverted
            >
              <!-- @input="filterWithCategory" -->

              <template v-slot:selection="data">
                <span style="text-transform: capitalize">{{ data.item }}</span>
              </template>
              <template v-slot:item="data">
                <v-list-item-content v-text="data.item" style="text-transform: capitalize"></v-list-item-content>
              </template>
            </v-autocomplete>
            <!-- </v-flex> -->
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
          </div>-->

          <v-layout wrap>
            <v-flex v-for="book in props.items" :key="book.title" xs12 sm4 md3 lg2>
              <v-card height="100%" v-bind:to="{name: 'view-book', params: {book_id: book.id}}">
                <v-img
                  height="75%"
                  style="box-shadow: 0px 2px 10px 0px #555555;"
                  v-bind:src="book.download_url"
                  align="center"
                ></v-img>
                <v-card-title style="font-size: large;">{{ book.title }}</v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </template>

        <template v-slot:footer>
          <v-layout mt-2 wrap align-center justify-center>
            <span class="grey--text">Books per page</span>
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
            <v-btn dark fab light class="mr-1" @click="formerPage">
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn dark fab light class="ml-1" @click="nextPage">
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
import db from "../../firebase/firestoreInit";
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
      categories: [],
      category: "",
      books: [],
      itemsPerPageArray: [18, 36, 72],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      loading: false,
      searchCategory: "",
      select: null,
      itemsPerPage: 18,
      sortBy: "title",
      no_data_text: "Loading Books Details ...",
      titles: [],
      tags: [
        "Information technology",
        "Biology",
        "Academic",
        "Food",
        "Programming",
        "Financial",
        "Hospitality & Management",
        "Chemistry",
        "Mathematics"
      ]
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter(i => {
        return !this.category || i.category === this.category;
      });
    },
    numberOfPages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    }
  },
  created() {
    this.$store.commit("startLoading");
    this.$store.commit("changePage", [
      { text: "Book List", disabled: false, to: "/view-book-list" }
    ]);
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
              author: doc.data().author,
              category: doc.data().category,
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
            this.titles.push(doc.data().title);
          });
        })
        .then(() => {
          db.collection("categories")
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                vm.categories.push(doc.id); // books will now equal to data
              });
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
              author: doc.data().author,
              category: doc.data().category,
            };
            if (doc.data().download_url === undefined) {
              const imgLink = require("../../assets/no-image.png");
              data.download_url = imgLink;
            } else {
              data.download_url = doc.data().download_url;
            }
            this.books.push(data); // books will now equal to data
          });
        })
        .then(() => {
          db.collection("categories")
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.categories.push(doc.id); // books will now equal to data
              });
            });
        });
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.titles.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    // filterWithCategory(items, search, filter) {
    //   this.loading = true;
    //   // Simulated ajax query
    //   setTimeout(() => {
    //     return items.filter(row => filter(row["category"], search));
    //     // return items.filter(i => {
    //     //   return !this.category || i.category === this.category;
    //     // });
    //     this.loading = false;
    //   }, 500);
    // }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getBooks(vm);
    });
    // console.log(to.params.book_id);
  },
  watch: {
    $route: "fetchData",
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
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
