// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQkvRnNbKME2WjotL-9MBf4fDjWIWPolk",
  authDomain: "sspproject-bd6b0.firebaseapp.com",
  databaseURL: "https://sspproject-bd6b0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sspproject-bd6b0",
  storageBucket: "sspproject-bd6b0.appspot.com",
  messagingSenderId: "271583266017",
  appId: "1:271583266017:web:e915b5f2ff25e56747e3a0",
  measurementId: "G-NWS2BPDR5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging=app.messaging();
const db=app.db();
const analytics = getAnalytics(app);