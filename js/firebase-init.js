import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyACc83rBZjnoZ8l-pZFIRqSs-fyVoiN6ck",
  authDomain: "mihadx-pro-bd.firebaseapp.com",
  projectId: "mihadx-pro-bd",
  storageBucket: "mihadx-pro-bd.firebasestorage.app",
  messagingSenderId: "478391400367",
  appId: "1:478391400367:web:86012d35014ee7350a215a",
  measurementId: "G-E8Y80PDVDD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, collection, addDoc, getDocs, doc, getDoc, updateDoc, query, where, orderBy };
