// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVs8Of2dx6e22nHx7pDDpP4vSGuq4PSII",
  authDomain: "expense-tracker-fa5c9.firebaseapp.com",
  projectId: "expense-tracker-fa5c9",
  storageBucket: "expense-tracker-fa5c9.appspot.com",
  messagingSenderId: "994169891522",
  appId: "1:994169891522:web:8df9fd808d6015db9de95b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);