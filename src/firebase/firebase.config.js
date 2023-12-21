// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzu1G6wMJ68N0Xx-p0XbhpEI-C4fFPq10",
  authDomain: "intask-client.firebaseapp.com",
  projectId: "intask-client",
  storageBucket: "intask-client.appspot.com",
  messagingSenderId: "982582593436",
  appId: "1:982582593436:web:44700511f58fdb464c6a59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;
