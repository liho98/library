<template>
  <div id="search-book">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        <!-- <a class="breadcrumb-item" href="index.html">Book</a> -->
        <span class="breadcrumb-item active">Search Book</span>
      </div>
    </div>


    <div class="search-book centre">

      <input
        class="form-control"
        type="text"
        name="keyword"
        v-model="id"
        placeholder="Keyword"
        style="display: inline"
        v-validate="'required'"
        required
      />
      <br />

      <input
        class="btn"
        type="submit"
        value="Search"
        style="margin-bottom: 20px"
      />
    </div>
  </div>
</template>

<script>
import db from "./../../components/firestoreInit";
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  name: "search-book"
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
