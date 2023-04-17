import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKkN3iunIv5hMyEqw5lQuxRTLZGFrdZ64",
  authDomain: "thedojoapp-20090.firebaseapp.com",
  projectId: "thedojoapp-20090",
  storageBucket: "thedojoapp-20090.appspot.com",
  messagingSenderId: "198437067620",
  appId: "1:198437067620:web:71c44a95ce8c816f823871",
};

// initialize app
firebase.initializeApp(firebaseConfig);

//initialize services
const projectFirestore = firebase.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
const projectAuth = firebase.auth();
export { projectAuth, projectFirestore, timeStamp };
