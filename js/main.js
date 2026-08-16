import { auth, onAuthStateChanged, signOut } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        const authSection = document.getElementById('auth-section');
        if (user) {
            if (authSection) {
                authSection.innerHTML = `<button id="logout-btn" class="btn-login"><i class="fa-solid fa-sign-out-alt"></i> Logout</button>`;
                document.getElementById('logout-btn').addEventListener('click', () => {
                    signOut(auth).then(() => { window.location.href = 'index.html'; });
                });
            }
        }
    });
});
