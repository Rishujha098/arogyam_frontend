// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKfmX--ggskTzzN8nHMlvn9ZzVfZXwlpw",
  authDomain: "zinnovatio-hackathon.firebaseapp.com",
  projectId: "zinnovatio-hackathon",
  storageBucket: "zinnovatio-hackathon.firebasestorage.app",
  messagingSenderId: "125247371883",
  appId: "1:125247371883:web:f8af4e61c7fab6d5fa4f2e",
  measurementId: "G-WVDSSX5LNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app};
