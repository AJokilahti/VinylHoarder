// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase, push, ref, onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB44gLJ6NkSRuGEi9EgLlwrP3UGScXhRhI",
  authDomain: "fir-auth-2a472.firebaseapp.com",
  projectId: "fir-auth-2a472",
  databaseURL: "https://fir-auth-2a472-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "fir-auth-2a472.appspot.com",
  messagingSenderId: "208482812301",
  appId: "1:208482812301:web:157b269c6958e6c9423dc4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };