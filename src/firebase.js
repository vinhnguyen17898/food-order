// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABVBd7cIaMB_1bbrHcbexdax1SbdkEKtg",
  authDomain: "food-order-ebd81.firebaseapp.com",
  projectId: "food-order-ebd81",
  storageBucket: "food-order-ebd81.appspot.com",
  messagingSenderId: "858733929222",
  appId: "1:858733929222:web:9cf21b8c57439de5b93487",
  measurementId: "G-PZ1W18DN18",
  databaseURL: "https://food-order-ebd81-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);
export {auth, provider, db};