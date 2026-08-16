import { auth, db, collection, getDocs, updateDoc, doc, onAuthStateChanged } from "../js/firebase-init.js";

onAuthStateChanged(auth, (user) => {
    if (!user || user.email !== "ismailhoseen77@gmail.com") {
        alert("Unauthorized Access! Please login as Admin.");
        window.location.href = 'login.html';
    } else {
        document.getElementById('admin-user-email').innerText = `Logged in as: ${user.email}`;
    }
});

