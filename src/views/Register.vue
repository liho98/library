<template>
  <div id="register">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container">
        <a class="breadcrumb-item" href="index.html">Home</a>
        <span class="breadcrumb-item active">Register</span>
      </div>
    </div>

    <div class="sign-up centre">
      <input
        class="form-control"
        type="text"
        v-model="email"
        placeholder="Email"
        style="display: inline"
      />
      <br />
      <input
        class="form-control"
        type="password"
        v-model="password"
        placeholder="Password"
        style="display: inline"
      />
      <br />
      <button class="btn" @click="signUp" style="margin-bottom: 20px">Register</button>

      <p>
        or go back to
        <router-link to="/login">login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "register",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert("Your account has been created!");
            this.$router.go("/");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
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
