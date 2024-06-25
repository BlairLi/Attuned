// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHBORsDs1WgkOs58bQ_4BgdnG_4mPgL7I",
  authDomain: "attuned-test-23b00.firebaseapp.com",
  projectId: "attuned-test-23b00",
  storageBucket: "attuned-test-23b00.appspot.com",
  messagingSenderId: "77024130554",
  appId: "1:77024130554:web:2c18f7c07cfe0693556043",
  measurementId: "G-31K2J291BG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);