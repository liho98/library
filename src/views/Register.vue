<template>
  <div id="register">
    <div class="breadcrumb" style="margin-bottom: 0">
      <div class="container" style="padding: 10px 20px;">
        <!-- <a class="breadcrumb-item" href="index.html">Home</a> -->
        <span class="breadcrumb-item active">Register</span>
      </div>
    </div>

    <div class="container centre">
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

      <div class="form-row justify-content-center">
        <div class="col-md-4">
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
        </div>
      </div>
      <div class="form-row justify-content-center">
        <div class="col-md-4">
          <input
            class="form-control"
            type="text"
            name="id"
            v-model="id"
            placeholder="Student ID"
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
            name="email"
            v-model="email"
            placeholder="Email"
            style="display: inline"
            v-validate="'required|email'"
          />
        </div>
      </div>
      <div class="form-row justify-content-center">
        <div class="col-md-4">
          <input
            class="form-control"
            type="number"
            name="contact"
            v-model="contact"
            placeholder="Contact Number"
            style="display: inline"
            v-validate="'required'"
          />
        </div>
      </div>
      <div class="form-row justify-content-center">
        <div class="col-md-4">
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
        </div>
      </div>
      <div class="form-row justify-content-center">
        <div class="col-md-4">
          <input
            class="form-control"
            type="password"
            name="password_confirmation"
            v-validate="'required|confirmed:password'"
            placeholder="Confirm Password"
            style="display: inline"
            data-vv-as="password"
          />
        </div>
      </div>

      <v-btn
        color="primary"
        large
        style="background-color: #ff9700; text-transform: none;"
        @click="signUp()"
      >Register</v-btn>

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
      uid: "",
      contact:""
    };
  },
  methods: {
    addUser(uid, id, name, email, role, contact) {
      const createdAt = new Date();

      if (role === "students") {
        db.collection("students")
          .doc(uid)
          .set({ name, student_id: id, email, contact, created_at: createdAt })
          .then(() => {
            console.log("User added: ");
            alert("Your account has been created!");
            this.$router.go({ path: "/" });
          })
          .catch(error => {
            console.error("Error adding user: ", error);
          });
      } else {
        db.collection("librarians")
          .doc(uid)
          .set({ name, librarian_id: id, email, contact, created_at: createdAt })
          .then(() => {
            console.log("User added: ");
            alert("Your account has been created!");
            this.$router.go({ path: "/" });
          })
          .catch(error => {
            console.error("Error adding user: ", error);
          });
      }
    },
    signUp() {
      if (this.role && this.name && this.email && this.id && this.password && this.contact) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            () => {
              var currentUser = firebase.auth().currentUser;
              var uid = currentUser.uid;
              console.log("name: " + this.name);
              // update user profile
              currentUser.updateProfile({
                displayName: this.name,
                photoURL: this.role
              });

              this.addUser(uid, this.id, this.name, this.email, this.role, this.contact);
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
