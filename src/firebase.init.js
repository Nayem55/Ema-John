// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0sZmP85meP4M3n28VGGHNamV-j6APgM8",
  authDomain: "ema-john-main-77993.firebaseapp.com",
  projectId: "ema-john-main-77993",
  storageBucket: "ema-john-main-77993.appspot.com",
  messagingSenderId: "295867556866",
  appId: "1:295867556866:web:4490d185d023a9f885f31b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;