import { auth, googleProvider, signInWithPopup } from "./firebase-init.js";

const loginBtn = document.getElementById('google-login-btn');
const errorBox = document.getElementById('login-error');

if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            if (user.email === "ismailhoseen77@gmail.com") {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        } catch (error) {
            if (errorBox) errorBox.innerText = error.message;
        }
    });
}
