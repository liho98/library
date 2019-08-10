<template>
  <div id="login">
        <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" :top="true">
      {{ message }}
      <v-btn dark text @click="snackbar = false" style="text-transform: none">Close</v-btn>
    </v-snackbar>

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
        <div class="col-md-4" style="padding: 0 5px">
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
      <div class="form-row justify-content-center" style="padding: 0 5px">
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

        <br />
        <br />Forget your password?
        <a @click="dialog = true">Click here</a>
      </p>
      <p>
        <b>
          Admin:
          <br />Email: admin@admin.admin
          <br />Password: qweqwe
        </b>
      </p>
    </div>


    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title>
          <span class="headline">Forgot Password</span>
        </v-card-title>
        <v-card-text style="padding-top: 0px">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="forgot_pass_email"
                  label="Email"
                  type="email"
                  :rules="[v => (v && v.length) >= 1 || 'Required']"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>Reset password email will be send to your email</small>
        </v-card-text>
        <v-card-actions>
        <v-divider style="margin: 0"></v-divider>
          <v-btn
          large
            color="blue darken-1"
            style="text-transform: none; margin: 0 5px;"
            text
            @click="dialog = false"
          >Close</v-btn>
          <v-btn
          large
            color="primary"
            style="text-transform: none; width: fit-content; margin: 0 5px;"
            @click="sendEmail(); dialog = false"
          >Reset Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      snackbar: false,
      color: "",
      timeout: 5000, // 5 seconds
      message: "",


      email: "",
      password: "",
      forgot_pass_email: "",
      dialog: false
      // role: ""
    };
  },
  methods: {
    login() {
      // this.$router.replace('home');
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            // alert("Login successfully!");
            this.$router.go("/");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    },
    sendEmail() {
      var auth = firebase.auth();
      var emailAddress = this.forgot_pass_email;
      if (this.forgot_pass_email == "") {
            this.snackbar = true;
            this.message = "Please enter an email first!";
            this.color = "error";

        // alert("Please enter an email first!");
      }
      auth
        .sendPasswordResetEmail(emailAddress)
        .then(() => {
            this.snackbar = true;
            this.message = "Email has sent to " + this.forgot_pass_email;
            this.color = "success";

          // alert("Email has sent to " + this.email);
        })
        .catch(function(error) {});
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
