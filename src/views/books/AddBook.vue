<template>
  <div id="add-book">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <!-- <a class="breadcrumb-item" href="index.html">Book</a> -->
        <span class="breadcrumb-item active">Add Book</span>
      </div>
    </div>

    <div class="add-book centre">
      <div class="alert alert-danger" v-show="errors.any()">
        <!-- <div v-if="errors.has('role')">{{ errors.first('role') }}</div> -->
        <div v-if="errors.has('id')">{{ errors.first('id') }}</div>
        <div v-if="errors.has('title')">{{ errors.first('title') }}</div>
        <div v-if="errors.has('author')">{{ errors.first('author') }}</div>
        <div v-if="errors.has('publisher')">{{ errors.first('publisher') }}</div>
        <div v-if="errors.has('year')">{{ errors.first('year') }}</div>
        <div v-if="errors.has('quantity')">{{ errors.first('quantity') }}</div>

      </div>

      <!-- <div class="btn-group btn-group-toggle" style="margin-bottom: 20px">
      </div>-->

      <input
        class="form-control"
        type="text"
        name="id"
        v-model="id"
        placeholder="Book ID"
        style="display: inline"
        v-validate="'required'"
        required
      />
      <br />

      <input
        class="form-control"
        type="text"
        name="title"
        v-model="title"
        placeholder="Book Title"
        style="display: inline"
        v-validate="'required'"
      />
      <br />

      <input
        class="form-control"
        type="text"
        name="author"
        v-model="author"
        placeholder="Author"
        style="display: inline"
        v-validate="'required'"
      />
      <br />

      <input
        class="form-control"
        type="text"
        name="publisher"
        v-model="publisher"
        v-validate="'required'"
        placeholder="Publisher"
        style="display: inline"
      />
      <br />
      <input
        class="form-control no-spinner"
        type="number"
        name="year"
        v-model="year"
        v-validate="'required|digits:4'"
        placeholder="Year"
        style="display: inline"
      />
      <br />
      <input
        class="form-control"
        type="number"
        name="quantity"
        v-model="quantity"
        v-validate="'required|integer'"
        placeholder="Quantity"
        style="display: inline"
      />
      <br />
      <input class="btn" type="submit" value="Add Book" @click="addBook" style="margin-bottom: 20px" />
    </div>
  </div>
</template>

<script>
import db from "./../../components/firestoreInit";
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  name: "add-book",
  data() {
    return {
      id: "",
      title: "",
      author: "",
      publisher: "",
      year: "",
      quantity: 1
    };
  },
  methods: {
    addBook() {
      if (this.id && this.title && this.author && this.publisher && this.year && this.quantity) {
        const createdAt = new Date();
        db.collection("books")
          .add({
            id: this.id,
            title: this.title,
            author: this.author,
            publisher: this.publisher,
            year: this.year,
            quantity: this.quantity,
            createdAt
          })
          .then(docRef => {
            console.log("Book added");
            alert("Book added!");
            this.$router.go({ path: this.path });
          })
          .catch(error => {
            console.error("Error adding book: ", error);
          });
      }
    }
  }
};
</script>

 <style scoped>
div.centre {
  text-align: center;
  width: 100%;
  margin: auto;
}

.sign-up {
  margin-top: 40px;
}

input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
input[type="radio"] {
  width: 30px;
}

.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

label.radio-inline {
  margin: 0px 10px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
