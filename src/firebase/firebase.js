// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMXyU8e5niP7gAZ4vhjsfgCtxum91uOfs",
  authDomain: "weaterappyt.firebaseapp.com",
  projectId: "weaterappyt",
  storageBucket: "weaterappyt.appspot.com",
  messagingSenderId: "127582803661",
  appId: "1:127582803661:web:a8661d043a8b7b9bee7b84",
  measurementId: "G-0KP9MKS06Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db, collection, getDocs, setDoc , updateDoc, deleteDoc, doc, query, where, onSnapshot };