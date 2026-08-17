const firebaseConfig = {
  apiKey: "AIzaSyACc83rBZjnoZ8l-pZFIRqSs-fyVoiN6ck",
  authDomain: "mihadx-pro-bd.firebaseapp.com",
  projectId: "mihadx-pro-bd",
  storageBucket: "mihadx-pro-bd.firebasestorage.app",
  messagingSenderId: "478391400367",
  appId: "1:478391400367:web:86012d35014ee7350a215a",
  measurementId: "G-E8Y80PDVDD"
};

// Initialize Firebase App
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

