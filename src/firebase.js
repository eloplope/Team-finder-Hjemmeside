// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { collection, addDoc, query, limit, orderBy, getDocs } from "firebase/firestore";
import { where, onSnapshot } from "firebase/firestore";

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
const db = getFirestore(app);
const auth = getAuth(app);

function convertTimestamp(timestamp) {
  if (timestamp != null) {
    let date = timestamp.toDate();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    let clock = date.toLocaleTimeString();

    date = dd + '/' + mm + '/' + yyyy + " " + clock;
    return date;
  }
}

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

async function createMessage(message, author) {
  try {
    const timestamp = serverTimestamp();
    const docRef = await addDoc(collection(db, "messages"), {
      message: message,
      author: author,
      createdAt: timestamp
    });
    console.log("Et dokument blev skrevet til db. Dokumentet har id: ", docRef.id);
  } catch (e) {
    console.error("Fejl ved skrivning til db: ", e);
  }
}

async function createSnapshotHandler(dataList, setDataList) {

  const messages = collection(db, "messages");
  const q = query(messages, orderBy('createdAt', 'desc'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      //docs.push(doc.data().name);
      docs.push({
        id: doc.id,
        message: doc.data().message,
        author: doc.data().author,
        createdAt: convertTimestamp(doc.data().createdAt)
      });
    });
    setDataList(docs);
  });
}

async function getMessages(dataList, setDataList) {
  try {
    const messages = collection(db, "messages");
    const q = query(messages, limit(10), orderBy('createdAt', 'desc'));

    const data = await getDocs(q);
    const tmp = data.docs.map((doc) => ({
      id: doc.id,
      message: doc.data().message,
      createdAt: convertTimestamp(doc.data().createdAt),
    }));
    setDataList(tmp);
  }
  catch (e) {
    console.log("Noget gik galt, da vi hentede messages.");
  }

}


export {
  authProvider,
  google,
  facebook,
  twitter,
  signIn,
  createMessage,
  getMessages,
  createSnapshotHandler
}
