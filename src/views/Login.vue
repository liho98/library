<template>
  <div id="login">
    <div class="breadcrumb">
      <div class="container" style="padding: 10px 20px;">
        <!-- <a class="breadcrumb-item" href="index.html">Home</a> -->
        <span class="breadcrumb-item active">Login</span>
      </div>
    </div>

    <div class="container centre" style="padding-top: 0">
      <!-- <h3>Login</h3> -->
      <!-- <label class="radio-inline">
        <input name="role" type="radio" value="student" checked autocomplete="false" v-model="role" />
        Student
      </label>

      <label class="radio-inline">
        <input name="role" type="radio" value="librarian" v-model="role" />
        Librarian
      </label>-->
      <div class="form-row justify-content-center">
        <div class="col-md-4">
          <input
            class="form-control"
            type="text"
            v-model="email"
            placeholder="Email"
            style="display: inline"
            required
            v-on:keyup.enter="login"
          />
        </div>
      </div>
      <div class="form-row justify-content-center">
        <div class="col-md-4">
          <input
            class="form-control"
            type="password"
            v-model="password"
            placeholder="Password"
            style="display: inline"
            required
            v-on:keyup.enter="login"
          />
        </div>
      </div>
      <v-btn
        color="primary"
        large
        style="background-color: #ff9700; text-transform: none;"
        @click="login"
      >Login</v-btn>

      <!-- <input type="submit" class="btn" @click="login" value="Login" /> -->
      <!-- <button type="submit" class="btn" @click="login" >Login</button> -->
      <p>
        You don't have an account ? You can
        <router-link to="/register">create one</router-link>
      </p>

      <p>
        <b>
          Admin:
          <br />Email: a@a.aa
          <br />Password: aaaaaa
        </b>
      </p>
    </div>
    <!-- <section class="static about-sec">
      <div class="container">
        <h1>My Account / Login</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and scrambled it to make a type specimen book. It has survived not only fiveLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem</p>
        <div class="form">
          <form>
            <div class="row">
              <div class="col-md-5">
                <input placeholder="Enter User Name" required />
                <span class="required-star">*</span>
              </div>
              <div class="col-md-5">
                <input type="email" placeholder="Enter Email Address" required />
                <span class="required-star">*</span>
              </div>
              <div class="col-lg-8 col-md-12">
                <button class="btn black">Login</button>
                <h5>
                  not Registered?
                  <a href="register.html">REgister here</a>
                </h5>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>-->
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
      // role: ""
    };
  },
  methods: {
    login() {
      // this.$router.replace('home');
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
            // alert("Login successfully!");
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
/* "scoped" attribute limit the CSS to this component only */
div.centre {
  text-align: center;
  width: 100%;
  margin: auto;
}
input {
  margin: 10px 0;
  padding: 15px;
}
input[type="radio"] {
  width: 30px;
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
