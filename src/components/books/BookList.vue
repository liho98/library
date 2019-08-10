<template>
  <v-container fluid grid-list-md style="padding: 0">
    <v-data-iterator
      :items="books"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      hide-default-footer
    >
      <!-- :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"-->

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

          <!-- <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="search"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed color="blue" :value="false">
                  <v-icon>arrow_upward</v-icon>
                </v-btn>
                <v-btn large depressed color="blue" :value="true">
                  <v-icon>arrow_downward</v-icon>
                </v-btn>
              </v-btn-toggle>
          </template>-->
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <!-- <v-layout wrap> -->
        <div class="row">
          <div
            id="book-list-item"
            class="col-lg-2 col-md-3 col-sm-4"
            v-for="book in books"
            :key="book.title"
          >
            <v-card height="100%" v-bind:to="{name: 'view-book', params: {book_id: book.id}}">
              <v-img width="100%" v-bind:src="book.download_url" align="center"></v-img>
              <v-card-title style="font-size: large">{{ book.title }}</v-card-title>
            </v-card>
          </div>
        </div>
        <!-- <v-flex v-for="book in books" :key="book.id" xs12 sm6 md4 lg2>
        </v-flex>-->
        <!-- </v-layout> -->
      </template>

      <template v-slot:footer>
        <v-layout mt-2 wrap align-center justify-center>
          <!-- <span class="grey--text">Items per page</span>
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
          </v-menu> -->

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
</template>

<script>
// import BookListItem from "./BookListItem";

export default {
  data() {
    return {
      // itemsPerPageArray: [9, 18, 24],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 9,
      sortBy: "title",
      keys: [],
    };
  },
  props: ["books"],
  // components: {
  //   "app-book-list-item": BookListItem
  // },
  updated() {
    this.$store.commit("stopLoading");
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
    }
    // filteredKeys() {
    //   return this.keys.filter(key => key !== `Name`);
    // }
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
    }
  }
};
</script>

<style>
</style>
