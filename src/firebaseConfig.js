// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBOZLKt_ZgIUjpHtqxdC_5Zkzc5Kk4NHQg",
  authDomain: "medreact-d2f97.firebaseapp.com",
  projectId: "medreact-d2f97",
  storageBucket: "medreact-d2f97.appspot.com",
  messagingSenderId: "795530240475",
  appId: "1:795530240475:web:c26d32e6eefa3c4574c7fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };