// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI7KfIKgYqMcPk9-1sltm7-LdzEYpiTBQ",
  authDomain: "portify-login.firebaseapp.com",
  projectId: "portify-login",
  storageBucket: "portify-login.firebasestorage.app",
  messagingSenderId: "1061328076599",
  appId: "1:1061328076599:web:de30da4f596fcfc0e1e4b2",
  measurementId: "G-X8ZNWFVJKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };