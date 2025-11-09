// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApalZXM1GobcSCgWgWUTwpUo5yiSzsejQ",
  authDomain: "travelease-b12a09.firebaseapp.com",
  projectId: "travelease-b12a09",
  storageBucket: "travelease-b12a09.firebasestorage.app",
  messagingSenderId: "864337633889",
  appId: "1:864337633889:web:97d951564aaf082070c020",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
