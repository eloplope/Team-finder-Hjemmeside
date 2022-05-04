// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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