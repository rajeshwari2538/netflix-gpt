// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzs5iByMQwoyKlrF3x_MfM7SIj838Ir3M",
  authDomain: "netflixgpt-e259a.firebaseapp.com",
  projectId: "netflixgpt-e259a",
  storageBucket: "netflixgpt-e259a.appspot.com",
  messagingSenderId: "797503070387",
  appId: "1:797503070387:web:97fd7c12cf780641c090c6",
  measurementId: "G-V54Q8HXFLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
