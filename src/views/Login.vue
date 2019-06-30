<template>
  <div id="login">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container">
        <a class="breadcrumb-item" href="index.html">Home</a>
        <span class="breadcrumb-item active">Login</span>
      </div>
    </div>

    <div class="login centre">
      <!-- <h3>Login</h3> -->
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
      <button class="btn" @click="login" style="margin-bottom: 20px">Login</button>
      <p>
        You don't have an account ? You can
        <router-link to="/register">create one</router-link>
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
    };
  },
  methods: {
    login: function() {
      // this.$router.replace('home');
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert("Login successfully!");
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

.login {
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
