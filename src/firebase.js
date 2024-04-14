// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTHDOMAIN,
  projectId: YOUR_PROJECTID,
  storageBucket: YOUR_STORAGEBUCKET,
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
  appId: YOUR_APPID,
  measurementId: YOUR_MEASUREMENT_ID
};

// Initialize Firebase

// Using the app with the firebaseConfig by the function initializeApp
const app = initializeApp(firebaseConfig);
// Exporting db to use it in the other files by the firestore in firebase
export const db = getFirestore(app)