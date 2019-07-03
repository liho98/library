<template>
  <div id="register">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container">
        <!-- <a class="breadcrumb-item" href="index.html">Home</a> -->
        <span class="breadcrumb-item active">Register</span>
      </div>
    </div>

    <div class="sign-up centre">
      <div class="alert alert-danger" v-show="errors.any()">
        <!-- <div v-if="errors.has('role')">{{ errors.first('role') }}</div> -->
        <div v-if="errors.has('name')">{{ errors.first('name') }}</div>
        <div v-if="errors.has('id')">{{ errors.first('id') }}</div>
        <div v-if="errors.has('email')">{{ errors.first('email') }}</div>
        <div v-if="errors.has('password')">{{ errors.first('password') }}</div>
        <div v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</div>
      </div>

      <!-- <div class="btn-group btn-group-toggle" style="margin-bottom: 20px">
      </div>-->
      <label class="radio-inline">
        <input
          name="role"
          type="radio"
          value="students"
          checked
          autocomplete="false"
          v-model="role"
          v-validate="'required'"
        />
        Student
      </label>

      <label class="radio-inline">
        <input name="role" type="radio" value="librarians" v-model="role" />
        Librarian
      </label>
      <br />

      <input
        class="form-control"
        type="text"
        name="name"
        v-model="name"
        placeholder="Name"
        style="display: inline"
        v-validate="'required'"
        required
      />
      <br />

      <input
        class="form-control"
        type="text"
        name="id"
        v-model="id"
        placeholder="Student ID"
        style="display: inline"
        v-validate="'required'"
      />
      <br />

      <input
        class="form-control"
        type="text"
        name="email"
        v-model="email"
        placeholder="Email"
        style="display: inline"
        v-validate="'required|email'"
      />
      <br />
      <input
        class="form-control"
        type="password"
        name="password"
        v-model="password"
        v-validate="'required'"
        ref="password"
        placeholder="Password"
        style="display: inline"
      />
      <br />
      <input
        class="form-control"
        type="password"
        name="password_confirmation"
        v-validate="'required|confirmed:password'"
        placeholder="Confirm Password"
        style="display: inline"
        data-vv-as="password"
      />
      <br />
      <input class="btn" type="submit" value="Register" @click="signUp" />

      <p>
        or go back to
        <router-link to="/login">login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "./../components/firestoreInit";
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  name: "register",
  data() {
    return {
      role: "",
      name: "",
      id: "",
      email: "",
      password: "",
      uid: ""
    };
  },
  methods: {
    addUser(uid, student_id, name, email, role) {
      const createdAt = new Date();
      db.collection(role)
        .doc(uid)
        .set({ name, student_id, email, created_at: createdAt })
        .then(docRef => {
          console.log("User added: ");
          alert("Your account has been created!");
          this.$router.go({ path: "/" });
        })
        .catch(error => {
          console.error("Error adding user: ", error);
        });
    },
    signUp: function() {
      if(this.role && this.name && this.email && this.id && this.password){
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            user => {
              var currentUser = firebase.auth().currentUser;
              var uid = currentUser.uid;

              // update user profile
              currentUser.updateProfile({
                displayName: this.name,
                photoURL: this.role
              })

              this.addUser(uid, this.id, this.name, this.email, this.role);
            },
            err => {
              alert("Oops. " + err.message);
            }
          );
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
