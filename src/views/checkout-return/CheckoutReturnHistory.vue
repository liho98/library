<template>
  <div class="checkout">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <span class="breadcrumb-item active">Your Borrowed Book</span>
      </div>
    </div>
    <div class="container">
      <v-card>
        <v-card-title>
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
          class="elevation-1"
          :items-per-page="5"
          :headers="headers"
          :items="checkout"
          :search="search"
          :loading="loading"
        >
          <!-- :sort-by="borrowed_date"
          :sort-desc=true-->

          <!-- <template v-slot:items="props">
            :style="{backgroundColor: (typeof props.item.days_late == 'string' ? '#ff9966' : 'transparent' ) }"
            :style="{backgroundColor:  (props.item.returned_date == null ? '#99cc33' : props.item.days_late.includes('late') ? '#ff9966' : ''  ) }"

            <tr>
              <td>{{ props.item.book_title }}</td>
              <td class="text-xs-left">{{ props.item.borrowed_date_str }}</td>
              <td class="text-xs-left">{{ props.item.due_date_str }}</td>
              <td class="text-xs-left">{{ props.item.returned_date_str }}</td>
              <td class="text-xs-left">{{ props.item.days_late }}</td>
            </tr>
          </template>-->

          <!-- <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.book_title }}</td>
                <td>{{ item.borrowed_date_str }}</td>
                <td>{{ item.due_date_str }}</td>
                <td>CONTENT</td>
                <td>CONTENT</td>
              </tr>
            </tbody>
          </template>-->
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import db from "../../components/firestoreInit";
import Vue from "vue";
import { firestorePlugin } from "vuefire";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);
Vue.use(firestorePlugin);

export default {
  name: "checkout-history",
  data() {
    return {
      search: "",
      loading: true,
      books: [],
      checkout: [],
      due_date: null,
      headers: [
        {
          text: "Book Title",
          value: "book_title",
          align: "left",
          sortable: true
        },
        {
          text: "Borrowed Date",
          value: "borrowed_date_str",
          align: "left",
          sortable: true
        },
        {
          text: "Due Date",
          value: "due_date_str",
          align: "left",
          sortable: true
        },
        {
          text: "Returned Date ",
          value: "returned_date_str",
          align: "left",
          sortable: true
        },
        {
          text: "",
          value: "days_late",
          align: "left"
        }
      ]
    };
  },
  // vuefire library
  firestore: {
    // get books that are available from firebase
  },

  created() {
    db.collection("checkout")
      .where("student_did", "==", String(localStorage.userId))
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id, // firebase document id
            book_did: doc.data().book_did,
            borrowed_date: doc.data().borrowed_date.toDate(),
            borrowed_date_str: doc
              .data()
              .borrowed_date.toDate()
              .toLocaleString("en-GB", { timeZone: "UTC", hour12: true }),
            copies_did: doc.data().copies_did,
            due_date: doc.data().due_date.toDate(),
            due_date_str: doc
              .data()
              .due_date.toDate()
              .toLocaleString("en-GB", { timeZone: "UTC", hour12: true }),

            book_title: null, // very important
            returned_date: null, // very important
            days_late: null // very important
          };

          // // get days late
          // const diffTime = Math.abs(
          //   this.return_date.getTime() - this.due_date.getTime()
          // );
          // this.days_late = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
          // this.fine = this.days_late * 0.5;
          // this.fine = this.fine.toFixed(2);

          this.checkout.push(data); // books will now equal to data
        });

        Object.keys(this.checkout).forEach(key => {
          db.collection("return")
            .where("checkout_did", "==", this.checkout[key].id)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                this.checkout[
                  key
                ].returned_date = doc.data().return_date.toDate();
                this.checkout[key].returned_date_str = doc
                  .data()
                  .return_date.toDate()
                  .toLocaleString("en-GB", { timeZone: "UTC", hour12: true });

                if (doc.data().days_late != 0) {
                  this.checkout[key].days_late =
                    doc.data().days_late.toString() + " days late";
                } else {
                  const diffTime = Math.abs(
                    this.checkout[key].returned_date.getTime() -
                      this.checkout[key].borrowed_date.getTime()
                  );
                  this.checkout[key].days_late =
                    Math.ceil(diffTime / (1000 * 60 * 60 * 24)) -
                    1 +
                    " days borrowed";
                }
              });
            });

          if (this.checkout[key].returned_date == null) {
            let today = new Date();
            const diffTime = Math.abs(
              this.checkout[key].due_date.getTime() - today.getTime()
            );

            this.checkout[key].days_late =
              Math.ceil(diffTime / (1000 * 60 * 60 * 24)) -
              1 +
              " days remaining";
          }
        });

        Object.keys(this.checkout).forEach(key => {
          db.collection("books")
            .doc(this.checkout[key].book_did)
            .get()
            .then(snapshot => {
              this.checkout[key].book_title = snapshot.data().title;
              this.loading = false;
            });
        });
      });

    // });

    //   Object.keys(this.checkout).forEach(([key, val]) => {
    //   console.log(`key-${key}-val-${JSON.stringify(val)}`)
    // });
    //  book_dids.push(this.checkout[key].book_did);

    // console.log(book_dids)
    //   db.collection("books")
    // .doc(this.checkout[key].book_did)
    // .get()
    // .then(snapshot => {
    //   this.checkout[key].title = snapshot.data().title;
    //   console.log(snapshot.data().title);
    //   // do something with document
    // });

    //           const title = null
    //           db.collection("books")
    //             .doc(doc.data().book_did)
    //             .get()
    //             .then(snapshot => {
    //               title = snapshot.data();
    //               // do something with document
    //             });
    // console.log(title)

    // db.collection("return")
    //   .where("student_did", "==", String(localStorage.userId))
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       const data = {
    //         id: doc.id, // firebase document id
    //         book_did: doc.data().book_did,
    //         return_date: doc
    //           .data()
    //           .return_date.toDate()
    //           .toLocaleString("en-GB", { timeZone: "UTC", hour12: true }),
    //         checkout_did: doc.data().checkout_did,
    //         days_late: doc.data().days_late
    //       };
    //       this.returns.push(data); // books will now equal to data
    //     });

    //     Object.keys(this.returns).forEach(key => {
    //       db.collection("books")
    //         .doc(this.returns[key].book_did)
    //         .get()
    //         .then(snapshot => {
    //           this.returns[key].title = snapshot.data().title;
    //         });
    //     });
    //   });

    // db.collection("books")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       const data = {
    //         id: doc.id, // firebase document id
    //         book_id: doc.data().id,
    //         title: doc.data().title
    //         // author: doc.data().author,
    //         // publisher: doc.data().publisher,
    //         // year: doc.data().year,
    //         // quantity: doc.data().quantity,
    //         // current_quantity: doc.data().current_quantity
    //       };
    //       this.books.push(data); // books will now equal to data
    //     });
    //   });

    //// OLD METHOD
    // db.collection("books")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       const data = {
    //         id: doc.id, // firebase document id
    //         book_id: doc.data().id,
    //         title: doc.data().title,
    //         author: doc.data().author,
    //         publisher: doc.data().publisher,
    //         year: doc.data().year,
    //         quantity: doc.data().quantity
    //       };
    //       this.books.push(data) // books will now equal to data
    //     })
    //   })
    // db.collection("students")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       const data = {
    //         id: doc.id, // firebase document id
    //         student_id: doc.data().id,
    //         name: doc.data().name,
    //         email: doc.data().email
    //       };
    //       this.students.push(data) // books will now equal to data
    //     });
    //   });
  },
  methods: {
    fetchData() {
      db.collection("books")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id, // firebase document id
              book_id: doc.data().id,
              title: doc.data().title,
              author: doc.data().author,
              publisher: doc.data().publisher,
              year: doc.data().year,
              quantity: doc.data().quantity,
              current_quantity: doc.data().current_quantity
            };
            this.books.push(data); // books will now equal to data
          });
        });

      db.collection("checkout")
        // .where("student_did", "==", String(localStorage.userId))
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id, // firebase document id
              book_did: doc.data().book_did,
              borrowed_date: doc.data().borrowed_date,
              copies_did: doc.data().copies_did,
              due_date: doc.data().due_date
            };
            this.checkout.push(data); // books will now equal to data
          });
        });
    },
    setRowColor(item) {
      // if (item.returned_date == null) {
      //   return "borrowing";
      // } else if (item.days_late.includes("late")) {
      //   return "late";
      // }
      // console.log(item.due_date);
    }
    // },
    // checkout() {
    //   // decrease book quantity
    //   const new_quantity = this.books_checkout.quantity - 1;
    //   db.collection("books")
    //     .doc(this.books_checkout.id)
    //     .update({ current_quantity: new_quantity });
    //   const createdAt = new Date();
    //   // add new checkout record
    //   db.collection("checkout")
    //     .add({
    //       // use document id instead of book id or student id for easy query later
    //       book_did: this.books_checkout.id,
    //       copies_did: this.copies_checkout.id,
    //       borrowed_date: createdAt,
    //       due_date: this.due_date,
    //       student_did: this.student_checkout.id
    //     })
    //     .then(docRef => {
    //       // update copies to borrowed and add checkout id to refer
    //       db.collection("books")
    //         .doc(this.books_checkout.id)
    //         .collection("copies")
    //         .doc(this.copies_checkout.id)
    //         .update({ status: "borrowed", checkout_did: docRef.id });
    //       console.log("Check out book successfully");
    //       alert("Check out book successfully");
    //       this.$router.go({ path: this.path });
    //     })
    //     .catch(error => {
    //       console.error("Error checking out book: ", error);
    //     });
    //   // update isAvailable
    //   // this.books_checkout = [this.books_checkout]
    //   // // loop throught every selected book to checkout
    //   // Object.keys(this.books_checkout).forEach(key => {
    //   // });
    // }
  }
  // computed: {
  //   getColor(item) {
  //     console.log(item.due_date);
  //   }
  // }
  // beforeRouteEnter(to, from, next) {
  //   db.collection("books")
  //     .get()
  //     .then(querySnapshot => {
  //       querySnapshot.forEach(doc => {
  //         next(vm => {
  //           const data = {
  //             id: doc.id, // firebase document id
  //             book_id: doc.data().id,
  //             title: doc.data().title,
  //             author: doc.data().author,
  //             publisher: doc.data().publisher,
  //             year: doc.data().year,
  //             quantity: doc.data().quantity,
  //             current_quantity: doc.data().current_quantity
  //           };
  //           vm.books.push(data); // books will now equal to data
  //         });
  //       });
  //     });
  // next.checkout = db.collection("checkout")
  // console.log("beforeRouteEnter: " + String(checkout))
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
  //         console.log("beforeRouteEnter: " + String(data))

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
  // },
  // watch: {
  //   '$route': "fetchData"
  // }
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
