<template>
  <div class="container">
    <!-- {{countAuthor()}} -->
    <!-- <v-subheader>Last updated: {{momentStr}}</v-subheader> -->
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
        <v-col
          v-for="(graph, i) in graphs"
          :key="i"
          v-show="graph.role.includes(role) || graph.role === 'all'"
        >
          <v-card class="pt-5 px-5">
            <v-sheet class="v-sheet--offset mx-auto py-1" color="primary" elevation="5">
              <v-sparkline
                auto-draw
                :labels="labels2"
                :value="graph.value"
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
              <span class="caption grey--text font-weight-light">{{graph.moment}}</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0 ma-0" fluid>
      <v-row>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          v-show="item.role.includes(role) || item.role === 'all'"
        >
          <v-card color="primary" dark>
            <v-list-item three-line>
              <v-list-item-content class="align-self-start">
                <v-card-text>
                  <v-list-item-title class="headline mb-2" v-text="item.title"></v-list-item-title>

                  <v-list-item-subtitle v-text="item.number"></v-list-item-subtitle>
                </v-card-text>
                <v-card-actions>
                  <v-btn text router :to="item.to">View Now</v-btn>
                </v-card-actions>
              </v-list-item-content>

              <v-list-item-avatar size="80" tile>
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
// var admin = require("firebase-admin");
import db from "../../firebase/firestoreInit";
import firebase from "firebase";

var moment = require("moment");
moment().format();

var books = [];
var categories = [];
var checkout = [];
var librarians = [];
var reserve = [];
var returns = [];
var students = [];

var values = [0, 0, 0, 0];

// var user = firebase.auth().currentUser;
// console.log(user.uid);
var today = new Date();
export default {
  name: "dashboard",
  created() {
    if (firebase.auth().currentUser) {
      var currentUser = firebase.auth().currentUser;
      this.role = currentUser.photoURL;
    }
    // var user = firebase.auth().currentUser;
    // this.role = user.photoURL;
    this.$store.commit("startLoading");
    this.$store.commit("changePage", [
      { text: "Dashboard", disabled: false, to: "/dashboard" }
    ]);

    db.collection("books").onSnapshot(function(querySnapshot) {
      var x = [];
      querySnapshot.forEach(function(doc) {
        x.push(doc.data());
      });
      books.splice(0, books.length, ...x);
      // console.log("Books : ", books.join(", "));
      // console.log(books.length);
    });

    db.collection("categories").onSnapshot(function(querySnapshot) {
      var x = [];
      querySnapshot.forEach(function(doc) {
        x.push(doc.data());
      });
      categories.splice(0, categories.length, ...x);
      // console.log("Categories : ", categories.join(", "));
      // console.log(categories.length);
    });

    db.collection("checkout").onSnapshot(function(querySnapshot) {
      var x = [];
      querySnapshot.forEach(function(doc) {
        x.push(doc.data());
      });
      checkout.splice(0, checkout.length, ...x);
      // console.log("Checkouts : ", checkout.join(", "));
      // console.log(checkout.length);
    });

    db.collection("librarians").onSnapshot(function(querySnapshot) {
      var x = [];
      querySnapshot.forEach(function(doc) {
        x.push(doc.data());
      });
      librarians.splice(0, librarians.length, ...x);
      // console.log("Librarians : ", librarians.join(", "));
      // console.log(librarians.length);
    });
    db.collection("reserve").onSnapshot(function(querySnapshot) {
      var x = [];
      querySnapshot.forEach(function(doc) {
        x.push(doc.data());
      });
      reserve.splice(0, reserve.length, ...x);
      // console.log("Reserves : ", reserve.join(", "));
      // console.log(reserve.length);
    });
    db.collection("return").onSnapshot(function(querySnapshot) {
      var x = [];
      querySnapshot.forEach(function(doc) {
        x.push(doc.data());
      });
      returns.splice(0, returns.length, ...x);
      // console.log("Returns : ", returns.join(", "));
      // console.log(returns.length);
    });
    db.collection("students").onSnapshot(function(querySnapshot) {
      var x = [];
      querySnapshot.forEach(function(doc) {
        x.push(doc.data());
      });
      
      students.splice(0, students.length, ...x);
      // console.log("Students : ", students.join(", "));
      // console.log(students.length);
    });
    
  },
  updated() {
    this.$store.commit("stopLoading");
    today = new Date();
    this.momentStr = moment(today).fromNow();
    // this.bookCount = book.length;

    this.graphs[0]["number"] = students.length;
    this.graphs[1]["number"] = librarians.length;

    if (firebase.auth().currentUser.photoURL === "students") {
      this.graphs[2]["number"] = this.bookBorrowed();
    } else {
      this.graphs[2]["number"] = checkout.length;
    }

    this.graphs[0]["value"][0] = 1;
    this.graphs[0]["value"][1] = 2;
    this.graphs[0]["value"][2] = 3;
    this.graphs[0]["value"][3] = 4;

    // this.graphs[0]["value"][0] = this.borrowFrequency()[0];
    // this.graphs[0]["value"][1] = this.borrowFrequency()[1];
    // this.graphs[0]["value"][2] = this.borrowFrequency()[2];
    // this.graphs[0]["value"][3] = this.borrowFrequency()[3];

    // values[0] = this.borrowFrequency()[0];
    // values[1] = this.borrowFrequency()[1];
    // values[2] = this.borrowFrequency()[2];
    // values[3] = this.borrowFrequency()[3];
    // this.graphs[0]["value"] = values;

    this.items[0]["number"] = books.length;
    // this.items[1]["number"] = checkout.length;
    this.items[1]["number"] = this.countAuthor();

    this.items[2]["number"] = categories.length;
    this.items[3]["number"] = checkout.length;
    // this.items[3]["number"] = this.bookReturned();

    if (firebase.auth().currentUser.photoURL === "students") {
      this.items[4]["number"] = this.bookReserved();
      this.items[4]["to"] = "/reserved-history";
    } else {
      this.items[4]["number"] = reserve.length;
      this.items[4]["to"] = "/reserved";
    }

    this.items[5]["number"] = this.bookBorrowed();
    this.items[6]["number"] = this.bookReturned();

    if (firebase.auth().currentUser.photoURL === "students") {
      this.items[7]["number"] = this.bookNotyetReturned();
      this.items[7]["to"] = "/checkout-return-history";
    } else {
      this.items[7]["number"] = this.countDaysLate();
      this.items[7]["to"] = "/manage-book";
    }

    // this.value[0] = 0;
    // console.log(this.graphs[0]["value"]);
    this.borrowFrequency();
    console.log(this.$store.getters.graph);
  },

  methods: {
    countAuthor: function() {
      let author = [];
      books.forEach(function(element) {
        var temp = element["author"].split(",");
        temp.forEach(function(i) {
          author.push(i.trim());
          // console.log(i.trim());
        });
        //console.log(element["author"].split(',')+" "+element["author"].split(',').length);
      });
      // console.log([...new Set(author)]);

      return Object.keys([...new Set(author)]).length;
    },
    countDaysLate: function() {
      let count = 0;
      returns.forEach(function(element) {
        if (element["days_late"] > 0) {
          count++;
        }
      });
      return count;
    },
    bookNotyetReturned: function() {
      let count = 0;
      returns.forEach(function(element) {
        if (
          element["days_late"] > 0 &&
          element["student_did"] === String(firebase.auth().currentUser.uid)
        ) {
          count++;
        }
      });
      return count;
    },
    bookBorrowed: function() {
      let count = 0;
      checkout.forEach(function(element) {
        if (
          element["student_did"] === String(firebase.auth().currentUser.uid)
        ) {
          count++;
        }
      });
      return count;
    },
    bookReturned: function() {
      let count = 0;
      returns.forEach(function(element) {
        if (
          element["student_did"] === String(firebase.auth().currentUser.uid)
        ) {
          count++;
        }
      });
      return count;
    },
    bookReserved: function() {
      let count = 0;
      reserve.forEach(function(element) {
        if (
          element["student_did"] === String(firebase.auth().currentUser.uid)
        ) {
          count++;
        }
      });
      return count;
    },
    borrowFrequency: async function() {
      // console.log((new Date()).getMonth());(new Date()).getFullYear, (new Date()).getMonth(),
      let x = new Date();
      var i;
      var days = [];

      x.setDate(0);
      for (i = 0; i < x.getDate(); i++) {
        days.push({ key: i + 1, value: 0 });
        // days[i]["value"] = days[i]["value"] +1 ;
      }
      // console.log(days);
      // let temp = { "1-7": 0, "8-14": 0, "15-21": 0, "22-31": 0 };
      let timestamp = [];
      checkout.forEach(function(element) {
        timestamp.push(element["borrowed_date"]);
      });

      //  console.log(timestamp);
      timestamp.forEach(function(element) {
        if (element.toDate().getMonth() == new Date().getMonth()) {
          // for(let i = 0; i < x ; i++){
          //   console.log(i);
          // }
          days[element.toDate().getDate() - 1]["value"] =
            days[element.toDate().getDate() - 1]["value"] + 1;
        }
      });
      values[0] = 0;
      values[1] = 0;
      values[2] = 0;
      values[3] = 0;
      for (i = 1; i < x.getDate() + 1; i++) {
        if (i >= 1 && i <= 7) {
          values[0] = values[0] + days[i - 1]["value"];
        } else if (i >= 8 && i <= 14) {
          values[1] = values[1] + days[i - 1]["value"];
        } else if (i >= 15 && i <= 21) {
          values[2] = values[2] + days[i - 1]["value"];
        } else {
          values[3] = values[3] + days[i - 1]["value"];
        }
      }
      this.updateGraph(values);
      return values;
    },
    updateGraph: function() {
      this.$store.commit("updateGraph", values);
    }
  },
  data() {
    return {
      momentStr: "",
      role: "",
      labels: [
        "8am",
        "10am",
        "12pm",
        "2pm",
        "4pm",
        "6pm",
        "8pm",
        "10pm",
        "12pm"
      ],
      labels2: ["1-7", "8-14", "15-21", "22-31"],
      // value: [1,0,0,0],
      // bookCount: 0,
      graphs: [
        {
          color: "primary",
          value: [2,1,3,4],
          moment: moment(today).fromNow(),
          title: "Student",
          number: students,
          to: "/",
          role: "admins,librarians"
        },
        {
          color: "#952175",
          value: [1, 0, 4, 0],
          moment: moment(today).fromNow(),
          title: "Librarian",
          number: 0,
          to: "/",
          role: "admins"
        },
        {
          color: "#952175",
          value: [2, 3, 2, 0],
          moment: moment(today).fromNow(),
          title: "Book Viewed Frequency",
          number: 0,
          to: "/",
          role: "all"
        }
      ],
      items: [
        {
          color: "#00000",
          src: "https://i.ibb.co/TggqRSn/image.png",
          title: "Book Listed",
          number: 3,
          to: "/view-book-list",
          role: "all"
        },
        {
          color: "#00000",
          src: "https://i.ibb.co/s1h0MB2/imageedit-22-7818853694.png",
          title: "Author Listed",
          number: 0,
          to: "/view-book-list",
          role: "all"
        },
        {
          color: "#00000",
          src: "https://i.ibb.co/VSt5dXb/image-4.png",
          title: "Category Listed",
          number: 0,
          to: "/view-book-list",
          role: "all"
        },
        {
          color: "#00000",
          src: "https://i.ibb.co/nzY1RrN/image-6.png",
          title: "Book Issued",
          number: 0,
          to: "/manage-book",
          role: "admins,librarians"
        },
        {
          color: "#00000",
          src: "https://i.ibb.co/tMr1fDy/image-9.png",
          title: "Book Reserved",
          number: 0,
          to: "/reserved",
          role: "all"
        },
        {
          color: "#00000",
          src: "https://i.ibb.co/Y0vxCZ8/image-5.png",
          title: "Book Borrowed",
          number: 0,
          to: "/checkout-return-history",
          role: "students"
        },
        {
          color: "#00000",
          src: "https://i.ibb.co/PtBZbj0/image-3.png",
          title: "Book Returned",
          number: 0,
          to: "/checkout-return-history",
          role: "students"
        },
        {
          color: "#00000",
          src: "https://i.ibb.co/DQv6RdK/image-7.png",
          title: "Book Not Return Yet",
          number: 0,
          to: "/manage-book",
          role: "all"
        }
      ]
    };
  },
  watch: {
    graphs:{
    handler: function(val) {

    // this.graphs[0]["value"][0] = this.borrowFrequency()[0];
    // this.graphs[0]["value"][1] = this.borrowFrequency()[1];
    // this.graphs[0]["value"][2] = this.borrowFrequency()[3];
    // this.graphs[0]["value"][3] = 3;
      // this.graphs[0]["value"] = [10,1,0,1];
      // console.log(val);
    },
    deep: true,
    immediate: true
      
    }

    
  }
};
</script>

<style scoped>
.v-sheet--offset {
  /* position: relative; */
}
</style>