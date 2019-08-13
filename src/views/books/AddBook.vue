<template>
  <div id="add-book">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <!-- <a class="breadcrumb-item" href="index.html">Book</a> -->
        <span class="breadcrumb-item active">Add Book</span>
      </div>
    </div>

    <div class="container centre">
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
      * All fields required unless specified
      <br />
      <div class="form-row justify-content-center">
        <div class="col-md-4">
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
        </div>
      </div>
      <div class="form-row justify-content-center">
        <div class="col-md-4">
          <input
            class="form-control"
            type="text"
            name="title"
            v-model="title"
            placeholder="Book Title"
            style="display: inline"
            v-validate="'required'"
          />
        </div>
      </div>

      <div class="form-row justify-content-center">
        <div class="col-md-4">
          <input
            class="form-control"
            type="text"
            name="author"
            v-model="author"
            placeholder="Author"
            style="display: inline"
            v-validate="'required'"
          />
        </div>
      </div>
      <div class="form-row justify-content-center">
        <div class="col-md-4">
          <input
            class="form-control"
            type="text"
            name="publisher"
            v-model="publisher"
            v-validate="'required'"
            placeholder="Publisher"
            style="display: inline"
          />
        </div>
      </div>
      <div class="form-row justify-content-center">
        <div class="col-md-4">
          <input
            class="form-control no-spinner"
            type="number"
            name="year"
            v-model="year"
            v-validate="'required|digits:4'"
            placeholder="Year"
            style="display: inline"
          />
        </div>
      </div>
      <div class="form-row justify-content-center">
        <div class="col-md-4">
          <input
            class="form-control"
            type="number"
            value
            name="quantity"
            v-model="quantity"
            v-validate="'required|integer'"
            placeholder="Quantity"
            style="display: inline"
          />
        </div>
      </div>
      <div class="form-row justify-content-center">
        <div class="col-md-4">
          <textarea
            class="form-control"
            rows="5"
            id="comment"
            placeholder="Book Description (Optional)"
            v-model="description"
          ></textarea>
        </div>
      </div>
      <div class="form-row justify-content-center">
        <div class="col-md-4">
          <app-file-uploader @uploaded="onImgUploaded" @downloadURL="getDownloadURL"></app-file-uploader>
        </div>
      </div>

      <v-btn
        color="primary"
        large
        @click="addBook"
        style="margin-bottom: 20px; background-color: #ff9700; text-transform: none;"
      >Add Book</v-btn>
    </div>
  </div>
</template>

<script>
import db from "./../../firebase/firestoreInit";
import Vue from "vue";
import VeeValidate from "vee-validate";
import FileUploader from "./../../components/FileUploader";

Vue.use(VeeValidate);

export default {
  name: "add-book",
  components: {
    "app-file-uploader": FileUploader
  },
  data() {
    return {
      id: "",
      title: "",
      author: "",
      publisher: "",
      year: "",
      quantity: undefined,
      fileName: "",
      downloadURL: "",
      description: ""
    };
  },
  methods: {
    addBook() {
      const createdAt = new Date();
      if (
        this.id &&
        this.title &&
        this.author &&
        this.publisher &&
        this.year &&
        this.quantity
      ) {
        db.collection("books")
          .add({
            book_id: this.id,
            title: this.title,
            author: this.author,
            publisher: this.publisher,
            year: this.year,
            quantity: Number(this.quantity),
            created_at: createdAt,
            current_quantity: Number(this.quantity),
            cover_image: this.fileName,
            download_url: this.downloadURL,
            description: this.description
          })
          .then(docRef => {
            // add copies based on book quantity
            for (var i = 0; i < this.quantity; i++) {
              db.collection("books")
                .doc(docRef.id)
                .collection("copies")
                .add({
                  status: "available",
                  created_at: createdAt
                });
            }
            this.id = "";
            this.title = "";
            this.author = "";
            this.publisher = "";
            this.year = "";
            this.quantity = undefined;
            this.fileName = "";
            this.downloadURL = "";
            this.description = "";

            console.log("Book added");
            alert("Book added!");
            // this.$router.go({ path: this.path });
          })
          .catch(error => {
            console.error("Error adding book: ", error);
          });
      }
    },
    onImgUploaded(value) {
      this.fileName = value;
    },
    getDownloadURL(value) {
      this.downloadURL = value;
    }
  }
};
</script>

 <style scoped>
.col-md-4 {
  padding: 0;
}
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
  padding: 15px;
}

input[type="number"] {
  width: 100%;
}

textarea {
  margin: 10px 0;
  padding: 15px;
  display: inline;
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
