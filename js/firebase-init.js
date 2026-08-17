import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup, signOut, onAuthStateChanged, doc, setDoc, getDoc, collection, addDoc, onSnapshot, serverTimestamp };
