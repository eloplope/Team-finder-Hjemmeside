// Import the functions you need from the SDKs you need
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  serverTimestamp,
  collection,
  addDoc
} from "firebase/firestore";

import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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

function tilføjTest() {
  // Add a new document in collection "cities"
  console.log("Er vi her?");
  db.collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

function createMessage(message, author) {
  try {
    console.log("Vi skriver en besked til db", message, author);
    if (message == null) throw new Error("Titel er tom!");

    const messages = collection(db, "messages");

    tilføjTest();

    const docRef = addDoc(messages, {
      author: author,
      message: message,
      createdAt: serverTimestamp()
    }).then(res => {
      console.log("Et dokument blev skrevet til db. Dokument havde id: ", docRef.id);
    }).catch(e => {
      console.error("Fejl opstod da dokument skulle oprettes: ", e);
    });
  }
  catch (e) {
    console.log("Noget gik galt!", e);
  }
}

function getMessages() {
}


export {
  authProvider,
  google,
  facebook,
  twitter,
  signIn,
  createMessage
}
