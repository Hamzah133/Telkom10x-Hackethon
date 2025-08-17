// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWzyRl5iSWIcu8K2uN5Avzwoz2h9IeE-I",
  authDomain: "skillsync-706d4.firebaseapp.com",
  projectId: "skillsync-706d4",
  storageBucket: "skillsync-706d4.appspot.com",
  messagingSenderId: "822785045283",
  appId: "1:822785045283:web:809b1d1e5779d5aab45296"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
