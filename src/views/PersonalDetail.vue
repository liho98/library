<template>
  <div id="personal-detail">
    <div class="breadcrumb" style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <router-link class="breadcrumb-item" to="/">Home</router-link>
        
        <span class="breadcrumb-item active">Personal Detail</span>
      </div>
    </div>
      <div class="centre">
        
        <div class="col-md-8" style="padding-top: 10px">
          <table class="table table-hover table-borderless">
            <tbody>
              <tr class="d-flex">
                <th class="col-2 text-right">ID:</th>
                <td class="col-8">{{this.id}}</td>
              <tr class="d-flex">
                <th class="col-2 text-right">Name:</th>
                <td class="col-8">{{this.name}}</td>
              </tr>
              <tr class="d-flex">
                <th class="col-2 text-right">Email:</th>
                <td class="col-8">{{this.email}}</td>
                <td class="text-xs-left"><v-icon
                small
                @click="updateEmail(props.item)"
            >update</v-icon></td>
              </tr>
              <tr class="d-flex">
                <th class="col-2 text-right">Contact:</th>
                <td class="col-8">{{this.contact}}</td>
                <td class="text-xs-left"><v-icon
                small
                @click="updateContact(props.item)"
            >update</v-icon></td>
                
              </tr>
              
            </tbody>
          </table>
        </div>
        </div>
      </div>
   
</template>

<script>
import db from "./../components/firestoreInit";
import firebase from "firebase";

export default {
  name: "personal-detail",
  data () {
    return {
      id: "",
      name: "",
      email: "",
      contact: "",
      role: "",
      uid:"",
      
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      var currentUser = firebase.auth().currentUser;
      this.role = currentUser.photoURL;
      this.email = currentUser.email;
      this.name = currentUser.displayName;
      this.uid = currentUser.uid;
      
      if(this.role=='admins'||this.role=='librarians'){
        db.collection("librarians")
        .doc(this.uid)
        .get()
        .then(doc => {
          this.id = doc.data().librarian_id;
          this.contact = doc.data().contact;
          }
        );
      }
      if(this.role=='students'){
        db.collection("students")
        .doc(this.uid)
        .get()
        .then(doc => {
          this.id = doc.data().student_id;
         this.contact = doc.data().contact;
          }
        );
      }
     }
  },
  methods: {
    updateEmail(){
      
    }
  }
};
</script>

<style scoped>
div.centre {
  text-align: center;
  width: 150%;
  margin: auto;
  align-content: center;
  
}

div.col-md-8{
  display: inline-block;
}
.sign-up {
  margin-top: 40px;
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

table {
  border-collapse: collapse;
  width: 50%;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {background-color:#f5f5f5;}
</style>


