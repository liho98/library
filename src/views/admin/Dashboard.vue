<template>
  <div class="container">
    <div>
      <v-alert
        v-if="$store.getters.messages > 0"
        type="info"
        color="green"
        elevation="2"
        icon="fa fa-bell"
        close-label="fa fa-times"
      >
        You've got
        <strong>{{ $store.getters.messages }}</strong> new notification on your timeline!.
      </v-alert>
    </div>
    <v-container class="pa-0 ma-0" fluid>
      <v-row>
        <v-col v-for="(graph, i) in graphs" :key="i">
          <v-card class="pt-5 px-5">
            <v-sheet class="v-sheet--offset mx-auto py-1" color="cyan" elevation="5">
              <v-sparkline
                :labels="labels"
                :value="value"
                color="white"
                line-width="2"
                padding="16"
              ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-5">
              <div class="title font-weight-light mb-2">{{graph.title}}</div>
              <div class="subheading font-weight-light grey--text">{{graph.number}}</div>
              <v-divider class="my-2"></v-divider>
              <v-icon class="mr-2" small>fa fa-clock-o</v-icon>
              <span class="caption grey--text font-weight-light">{{graph.number}}</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0 ma-0" fluid>
      <v-row>
        <v-col v-for="(item, i) in items" :key="i">
          <v-card :color="item.color" dark>
            <v-list-item three-line>
              <v-list-item-content class="align-self-start">
                <v-card-text>
                  <v-list-item-title class="headline mb-2" v-text="item.title"></v-list-item-title>

                  <v-list-item-subtitle v-text="item.number"></v-list-item-subtitle>
                </v-card-text>
                <v-card-actions>
                  <v-btn text>View Now</v-btn>
                </v-card-actions>
              </v-list-item-content>

              <v-list-item-avatar size="125" tile>
                <v-img :src="item.src"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
var admin = require("firebase-admin");

export default {
  name: "dashboard",
  created() {
    this.$store.commit("startLoading");
    this.$store.commit("changePage", [
      { text: "Dashboard", disabled: false, to: "/dashboard" }
    ]);
  },
  updated() {
    this.$store.commit("stopLoading");
  },
  data: () => ({
    labels: ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm", "12pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240, 240],

    graphs:[
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Current Active User",
        number: 22
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Registration",
        number: 33
      }, 
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Book Viewed",
        number: 33
      }
    ],

    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Book Listed",
        number: 3
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Book Issued",
        number: 2
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Book Returned",
        number: 1
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Author Listed",
        number: 2
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Listed Categories",
        number: 3
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Book Not Return Yet",
        number: 4
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Book Borrowed",
        number: 4
      }
    ]
  })
};
</script>

<style scoped>
.v-sheet--offset {
  /* position: relative; */
}
</style>