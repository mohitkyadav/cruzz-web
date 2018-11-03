import firebase from "firebase/app";
import "firebase/storage"


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDjjAxLOgctgF3w1-BVIPfvf1JNZvG4XC0",
  authDomain: "cruzz-503cd.firebaseapp.com",
  databaseURL: "https://cruzz-503cd.firebaseio.com",
  projectId: "cruzz-503cd",
  storageBucket: "cruzz-503cd.appspot.com",
  messagingSenderId: "706067637651"
};
firebase.initializeApp(config);

const fireStorage = firebase.storage();

export {
  firebase, fireStorage as default
}
