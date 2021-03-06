// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { collection, addDoc, query, limit, orderBy, getDocs } from "firebase/firestore";
import { where, onSnapshot, doc, getDoc, setDoc } from "firebase/firestore";

import {
  getAuth,
  signOut,
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getRedirectResult
} from "firebase/auth";

let unsubscribeOnAuthStateChanged;

const firebaseConfigP = {
  apiKey: "AIzaSyAoPgLuAFTqorFtDr3iEgyK9LrCXVFBrVc",
  authDomain: "team-finder-dde6e.firebaseapp.com",
  projectId: "team-finder-dde6e",
  storageBucket: "team-finder-dde6e.appspot.com",
  messagingSenderId: "841663490702",
  appId: "1:841663490702:web:c22ad0b3cb6e0c745ef7df"
};

const app = initializeApp(firebaseConfigP);
const db = getFirestore(app);
const auth = getAuth(app);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/*const firebaseConfig = {
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
const auth = getAuth(app);*/


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

function firebaseSetup(user, setUser) {
  let unsubscribe = onAuthStateChanged(auth, fbUser => {
    if (fbUser) {
      setUser(fbUser);
      console.log("onAuthStateChanged: S?? er vi logget ind.", fbUser.displayName);
    }
    else {
      console.log("onAuthStateChanged: Vi er logget ud.");
      setUser(null);
    }
  }, (e) => { console.log("onAuthStateChanged: Der opstod en fejl!") });
  unsubscribeOnAuthStateChanged = unsubscribe;
  return unsubscribe;
}


async function getFavorites(uid) {
  const docRef = doc(db, "favorites", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return (docSnap.data());
    //setUser(prevState => ({ ...user, favoritter: docSnap.data() }));
  } else {
    // doc.data() will be undefined in this case
    console.log("Ingen favoritter");
    return (undefined);
    //setUser(prevState => ([...user, {favoritter: docSnap.data()} ]));
  }
}

async function createFavorite(f, uid) {
  console.log("Vi er ved at gemme favorit-spil...", f);
  await setDoc(doc(db, "favorites", uid), f);
}


async function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password).then(
    (res) => {
      console.log("Vi er logget ind med email og password.");
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

async function createMessage(message, author, photoURL) {
  try {
    const timestamp = serverTimestamp();
    const docRef = await addDoc(collection(db, "messages"), {
      message: message,
      author: author,
      photoURL: photoURL,
      createdAt: timestamp
    });
    console.log("Et dokument blev skrevet til db. Dokumentet har id: ", docRef.id);
  } catch (e) {
    console.error("Fejl ved skrivning til db: ", e);
  }
}

function createSnapshotHandler(setDataList) {
  console.log("Vi opretter snapshotListener...");

  const messages = collection(db, "messages");
  const q = query(messages, orderBy('createdAt', 'desc'), limit(10));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({
        id: doc.id,
        message: doc.data().message,
        author: doc.data().author,
        photoURL: doc.data().photoURL,
        createdAt: convertTimestamp(doc.data().createdAt)
      });
    });
    setDataList(docs);
  });
  return unsubscribe;
}

async function getMessages(setDataList) {
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

function logout(user, setUser) {

  signOut(auth).then((res) => {
    console.log("Vi er nu logget ud af firebase!");
  }).catch((error) => {
    console.log("Noget gik galt da vi loggede ud af firebase.");
  });

}

export {
  firebaseSetup,
  google,
  facebook,
  twitter,
  signIn,
  createMessage,
  getMessages,
  createSnapshotHandler,
  logout,
  createFavorite,
  getFavorites,
}
