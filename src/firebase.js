// Import the functions you need from the SDKs you need
import { useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getDocs,
    getFirestore,
    limit,
    query,
    serverTimestamp,
    collection,
    addDoc,
    getDoc,
    doc,
    orderBy,
    updateDoc
  } from "firebase/firestore";
  
  
  import {
    getAuth,
    FacebookAuthProvider,
    GoogleAuthProvider,
    TwitterAuthProvider,
    signInWithRedirect,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
  } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDWD9t0fcyx73fX8K6Gg3uEUrTJZ7TZj5U",
    authDomain: "team-finder-967e8.firebaseapp.com",
    projectId: "team-finder-967e8",
    storageBucket: "team-finder-967e8.appspot.com",
    messagingSenderId: "462657424679",
    appId: "1:462657424679:web:59298fd1c73b19ff152d02",
    measurementId: "G-YYVCQFR725"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


const authProvider = {
  isAuthenticated: false,
  uid: "",
  user: {},
  setUser: null,
  firebaseSetup: function (user, setUser) {
    if (authProvider.isAuthenticated === false) {
      this.isAuthenticated = true;
      onAuthStateChanged(auth, res => {
        if (res) {
          this.user = res;
          this.uid = res.uid;
          this.setUser = setUser;
          setUser(res);
          console.log("Så er vi logget ind.", res.displayName)
        }
        else {
          setUser(null);
        }
      });
    }
  }
};


async function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password).then(
    (res) => {
      console.log("Vi er signed in.");
    }
  );
}

async function google() {
  console.log("Vi signer in med google");
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  await signInWithRedirect(auth, provider);
}

async function facebook() {
  const provider = new FacebookAuthProvider();
  await signInWithRedirect(auth, provider);
}

async function twitter() {
  const provider = new TwitterAuthProvider();
  await signInWithRedirect(auth, provider);
}


export {
  authProvider,
  google,
  facebook,
  twitter,
  signIn
}
