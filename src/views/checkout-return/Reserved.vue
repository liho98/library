<template>
  <div class="checkout">
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" :top="true" right>
      {{ message }}
      <v-btn dark text @click="snackbar = false" style="text-transform: none">Close</v-btn>
    </v-snackbar>

    <!-- <app-progress-circular :value="loading"></app-progress-circular> -->

    <div class="container">
      <v-card>
        <v-card-title>
          Checkout Reserved Book
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="selected_row"
          :headers="headers"
          :items="reserve"
          :loading="loading"
          :search="search"
          :footer-props="{
            prevIcon: 'fa fa-angle-left',
            nextIcon: 'fa fa-angle-right'
          }"
          :height="530"
        >
          <template v-slot:item.action="{ item }">
            <v-btn
              color="primary"
              small
              style="text-transform: none"
              @click.stop="setSeleted(item); dialog = true"
            >Checkout</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Checkout reserved book?</v-card-title>
        <v-card-text style="padding-top: 16px">
          Are you sure you want to checkout
          <b>{{selected.title}}</b>?
        </v-card-text>
        <v-divider style="margin: 0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text style="text-transform: none; margin: 0 5px;" @click="dialog = false">Cancel</v-btn>
          <v-btn
            color="primary"
            style="text-transform: none; margin: 0 5px;"
            @click="checkoutCopy(selected, selected_row); dialog = false"
          >Checkout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "../../components/firestoreInit";
// import ProgressCircular from "../../components/ProgressCircular";

export default {
  name: "reserved",
  //   components: {
  //     "app-progress-circular": ProgressCircular
  //   },
  data() {
    return {
      snackbar: false,
      color: "",
      timeout: 5000, // 5 seconds
      message: "",

      selected_row: [],

      search: "",
      books: [],
      reserve: [],
      checkout: [],
      due_date: "",
      loading: true,
      progressBar: true,
      dialog: false,
      checkout_did: "",
      selected: {},

      headers: [
        {
          text: "Book Title",
          value: "title",
          align: "left",
          sortable: false
        },
        {
          text: "Copy ID",
          value: "copies_did",
          align: "left",
          sortable: false
        },
        {
          text: "Student ID",
          value: "student",
          align: "left",
          sortable: false
        },
        { text: "Due Date", value: "due_date", align: "left", sortable: false },
        { text: "Actions", value: "action", sortable: false }

        // {
        //   text: "",
        //   value: "days_late",
        //   align: "left"
        // }
      ]
      //   pagination: { sortBy: "due_date", descending: true, rowsPerPage: -1 }
    };
  },

  created() {
    this.$store.commit("startLoading");
    this.$store.commit("changePage", [
      { text: "Reserve", disabled: false, to: "/reserved" }
    ]);

    // db.collection("checkout")
    //   .where("student_did", "==", String(localStorage.userId))
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       const data = {
    //         id: doc.id, // firebase document id
    //         book_did: doc.data().book_did,
    //         borrowed_date: doc.data().borrowed_date.toDate(),
    //         borrowed_date_str: doc
    //           .data()
    //           .borrowed_date.toDate()
    //           .toLocaleString("en-GB", { timeZone: "UTC", hour12: true }),
    //         copies_did: doc.data().copies_did,
    //         due_date: doc.data().due_date.toDate(),
    //         due_date_str: doc
    //           .data()
    //           .due_date.toDate()
    //           .toLocaleString("en-GB", { timeZone: "UTC", hour12: true }),
    //         book_title: null, // very important
    //         returned_date: null, // very important
    //         days_late: null // very important
    //       };
    //       // // get days late
    //       // const diffTime = Math.abs(
    //       //   this.return_date.getTime() - this.due_date.getTime()
    //       // );
    //       // this.days_late = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
    //       // this.fine = this.days_late * 0.5;
    //       // this.fine = this.fine.toFixed(2);
    //       this.checkout.push(data); // books will now equal to data
    //     });
    //     Object.keys(this.checkout).forEach(key => {
    //       db.collection("return")
    //         .where("checkout_did", "==", this.checkout[key].id)
    //         .get()
    //         .then(snapshot => {
    //           snapshot.forEach(doc => {
    //             this.checkout[
    //               key
    //             ].returned_date = doc.data().return_date.toDate();
    //             this.checkout[key].returned_date_str = doc
    //               .data()
    //               .return_date.toDate()
    //               .toLocaleString("en-GB", { timeZone: "UTC", hour12: true });
    //             if (doc.data().days_late != 0) {
    //               this.checkout[key].days_late =
    //                 doc.data().days_late.toString() + " days late";
    //             } else {
    //               const diffTime = Math.abs(
    //                 this.checkout[key].returned_date.getTime() -
    //                   this.checkout[key].borrowed_date.getTime()
    //               );
    //               this.checkout[key].days_late =
    //                 Math.ceil(diffTime / (1000 * 60 * 60 * 24)) -
    //                 1 +
    //                 " days borrowed";
    //             }
    //           });
    //         });
    //       if (this.checkout[key].returned_date == null) {
    //         let today = new Date();
    //         const diffTime = Math.abs(
    //           this.checkout[key].due_date.getTime() - today.getTime()
    //         );
    //         this.checkout[key].days_late =
    //           Math.ceil(diffTime / (1000 * 60 * 60 * 24)) -
    //           1 +
    //           " days remaining";
    //       }
    //     });
    //     Object.keys(this.checkout).forEach(key => {
    //       db.collection("books")
    //         .doc(this.checkout[key].book_did)
    //         .get()
    //         .then(snapshot => {
    //           this.checkout[key].book_title = snapshot.data().title;
    //         });
    //     });
    //   });
  },

  updated() {
    this.loading = false;
    this.$store.commit("stopLoading");
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getReserve(vm);
    });

    // db.collection("books")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       next(vm => {
    //         const data = {
    //           id: doc.id, // firebase document id
    //           book_id: doc.data().id,
    //           title: doc.data().title,
    //           author: doc.data().author,
    //           publisher: doc.data().publisher,
    //           year: doc.data().year,
    //           quantity: doc.data().quantity,
    //           current_quantity: doc.data().current_quantity
    //         };
    //         vm.books.push(data); // books will now equal to data
    //       });
    //     });
    //   });
    // next.checkout = db.collection("checkout");
    // console.log("beforeRouteEnter: " + String(checkout));
    // db.collection("checkout")
    //   // .where("student_did", "==", String(localStorage.userId))
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       next(vm => {
    //         const data = {
    //           id: doc.id, // firebase document id
    //           book_did: doc.data().book_did,
    //           borrowed_date: doc.data().borrowed_date,
    //           copies_did: doc.data().copies_did,
    //           due_date: doc.data().due_date
    //         };
    //         console.log("beforeRouteEnter: " + String(data));

    //         vm.checkout.push(data); // books will now equal to data
    //       });
    //     });
    //   });

    // this.books = db.collection("books");
    // this.checkout = db
    //   .collection("checkout")
    //   .where("student_did", "==", String(localStorage.userId));
    // db.collection("return").where(
    //   "student_did",
    //   "==",
    //   String(localStorage.userId)
    // );
  },
  methods: {
    setSeleted(selected) {
      this.selected = selected;
    },
    checkoutCopy(selected, selected_row) {
      // decrease book quantity
      console.log(selected.title);
      const new_quantity = selected.current_quantity - 1;
      db.collection("books")
        .doc(selected.book_did)
        .update({ current_quantity: new_quantity });

      const created_at = new Date();
      const due_date = new Date(created_at.setDate(created_at.getDate() + 14));
      // add new checkout record
      db.collection("checkout")
        .add({
          // use document id instead of book id or student id for easy query later
          book_did: selected.book_did,
          copies_did: selected.copies_did,
          borrowed_date: new Date(),
          due_date: due_date,
          student_did: selected.student_did
        })
        .then(docRef => {
          // update copies to borrowed and add checkout id to refer
          this.checkout_did = docRef.id;
          db.collection("books")
            .doc(selected.book_did)
            .collection("copies")
            .doc(selected.copies_did)
            .update({
              status: "borrowed",
              checkout_did: docRef.id,
              student_did: selected.student_did
            });
        })
        .then(() => {
          // update reserve record
          console.log("checkout id2: " + this.checkout_did);
          console.log("reserve id2: " + selected.id);

          db.collection("reserve")
            .doc(selected.id)
            .update({
              status: "collected",
              checkout_did: this.checkout_did
            });
          // console.log("Check out book successfully");
          // alert("Check out book successfully");
          // this.$router.go({ path: this.path });

          const index = this.reserve.indexOf(this.selected);
          this.reserve.splice(index, 1);

          this.snackbar = true;
          this.message = "Checkout reserved book successfully";
          this.color = "primary";
        })
        .catch(error => {
          console.error("Error checking out book: ", error);
        });

      // update isAvailable

      // this.books_checkout = [this.books_checkout]

      // // loop throught every selected book to checkout
      // Object.keys(this.books_checkout).forEach(key => {

      // });
    },
    getReserve(vm) {
      db.collection("reserve")
        .where("status", "==", "ready")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id, // firebase document id
              book_did: doc.data().book_did,
              copies_did: doc.data().copies_did,
              due_date: doc
                .data()
                .due_date.toDate()
                .toLocaleString("en-GB", { timeZone: "UTC", hour12: true }),
              student_did: doc.data().student_did,
              title: "",
              student: "",
              current_quantity: 0
            };
            vm.reserve.push(data); // books will now equal to data
          });
          vm.getBook(vm);
        });
    },
    getBook(vm) {
      Object.keys(vm.reserve).forEach(key => {
        db.collection("books")
          .doc(vm.reserve[key].book_did)
          .get()
          .then(doc => {
            vm.reserve[key].title = doc.data().title;
            vm.reserve[key].current_quantity = doc.data().current_quantity;
          });
        vm.getStudent(vm);
      });
    },
    getStudent(vm) {
      Object.keys(vm.reserve).forEach(key => {
        db.collection("students")
          .doc(vm.reserve[key].student_did)
          .get()
          .then(doc => {
            vm.reserve[key].student = doc.data().student_id;
            // doc.data().name + ", " + doc.data().student_id;
          });
      });
    },
    fetchData() {
      db.collection("reserve")
        .where("status", "==", "ready")
        .get()
        .then(querySnapshot => {
          querySnapshot
            .forEach(doc => {
              const data = {
                id: doc.id, // firebase document id
                book_did: doc.data().book_did,
                copies_did: doc.data().copies_did,
                due_date: doc
                  .data()
                  .due_date.toDate()
                  .toLocaleString("en-GB", { timeZone: "UTC", hour12: true }),
                student_did: doc.data().student_did
              };
              this.reserve.push(data); // books will now equal to data
            })
            .then(() => {
              Object.keys(this.reserve)
                .forEach(key => {
                  db.collection("book")
                    .doc(this.reserve[key].book_did)
                    .get()
                    .then(querySnapshot => {
                      querySnapshot.forEach(doc => {
                        this.reserve[key].title = doc.data().title;
                        this.reserve[
                          key
                        ].current_quantity = doc.data().current_quantity;
                      });
                    });
                })
                .then(() => {
                  Object.keys(this.reserve).forEach(key => {
                    db.collection("students")
                      .doc(this.reserve[key].student_did)
                      .get()
                      .then(doc => {
                        this.reserve[key].student = doc.data().student_id;
                      });
                  });
                });
            });
        });
    }
  },
  watch: {
    $route: "fetchData"
  }
};
</script>

<style scoped>
div.centre {
  text-align: justify;
  width: 75%;
  margin: auto;
  margin-bottom: 20px;
}
.borrowing {
  background-color: #99cc33 !important;
}
.late {
  background-color: #ff9966;
}
</style>
