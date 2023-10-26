// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc7a65kaF4G63_ip5riVPvegpPgnS0l1U",
  authDomain: "barcodescanner-adc92.firebaseapp.com",
  projectId: "barcodescanner-adc92",
  storageBucket: "barcodescanner-adc92.appspot.com",
  messagingSenderId: "22012219316",
  appId: "1:22012219316:web:2e2bd92fed93088fa4ace1",
  measurementId: "G-48WPT05GXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const MESSAGES = "messages";

export {
  firestore,
  collection,
  addDoc,
  getDocs,
  MESSAGES
};

console.log("Firebase initialized");