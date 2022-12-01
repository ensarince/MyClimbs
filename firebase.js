import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/storage'
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwCPvZZUH3mWP_2-dDMcCUhGft1Jam7vs",
    authDomain: "my-climbs.firebaseapp.com",
    projectId: "my-climbs",
    storageBucket: "my-climbs.appspot.com",
    messagingSenderId: "230094047834",
    appId: "1:230094047834:web:c1b2dc4e56b25e0feea663",
    measurementId: "G-PT781S25F9"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth();
var storage = getStorage(firebaseApp)

//we can make a lot of explicit exports
export { auth, db, storage }
