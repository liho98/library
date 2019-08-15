import {initializeApp} from 'firebase';

const app =  initializeApp({
    apiKey: "AIzaSyCmCkNeF7UYDgHCTJO-qmt8hjQxftuUd9I",
    authDomain: "library-system-1998.firebaseapp.com",
    databaseURL: "https://library-system-1998.firebaseio.com",
    projectId: "library-system-1998",
    storageBucket: "library-system-1998.appspot.com",
    messagingSenderId: "508756013751",
    appId: "1:508756013751:web:1a0e1e0f7292953e"  
})

export const db = app.database();
