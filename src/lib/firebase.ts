// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ====================================================================================
// TODO: PASTE YOUR FIREBASE CONFIGURATION OBJECT HERE
// ====================================================================================
// You can get this from the Firebase console for your "App-Mobi" project.
// Go to Project Settings > General > Your apps > SDK setup and configuration.
// Select "Config" and copy the entire firebaseConfig object.
//
// It should look like this:
//
// const firebaseConfig = {
//   apiKey: "AIza...",
//   authDomain: "app-mobi.firebaseapp.com",
//   projectId: "app-mobi",
//   storageBucket: "app-mobi.appspot.com",
//   messagingSenderId: "1234567890",
//   appId: "1:1234567890:web:abcde..."
// };
//
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
// ====================================================================================
// END OF FIREBASE CONFIGURATION
// ====================================================================================


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
