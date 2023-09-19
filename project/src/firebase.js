// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADOWrmA7lK7RnQEjcNXzZWAVhUSnuBx_w",
  authDomain: "weather-app-acbb8.firebaseapp.com",
  projectId: "weather-app-acbb8",
  storageBucket: "weather-app-acbb8.appspot.com",
  messagingSenderId: "680778474210",
  appId: "1:680778474210:web:0f77a2eeddda8bea3574bb",
  measurementId: "G-JV7L8ETJ0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const favoriteCities = collection(db, 'favoriteCities');
export const users = collection(db, 'users');