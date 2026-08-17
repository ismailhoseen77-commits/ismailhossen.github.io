import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged } from './firebase-init.js';

window.loginWithGoogle = async function() {
    try {
        await signInWithPopup(auth, googleProvider);
        alert('সফলভাবে গুগল দিয়ে লগইন হয়েছে!');
    } catch(e) {
        alert('লগইন ব্যর্থ হয়েছে: ' + e.message);
    }
};

window.openCompModal = function(serviceName) {
    const modal = document.getElementById('comp-modal');
    document.getElementById('comp-title').innerText = serviceName;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.sendCompToWhatsapp = function() {
    const serviceName = document.getElementById('comp-title').innerText;
    const details = document.getElementById('comp-details').value.trim();
    if(!details) return alert('কাজের বিবরণ লিখুন!');

    const msg = `🖥️ *NEW COMPUTER WORK REQUEST*\nService: ${serviceName}\nDetails: ${details}`;
    window.open(`https://wa.me/8801576502490?text=${encodeURIComponent(msg)}`, '_blank');
    closeModals();
};

onAuthStateChanged(auth, (user) => {
    const authBtn = document.getElementById('user-auth-btn');
    if (authBtn) {
        if (user) {
            authBtn.innerHTML = `
                <div class="flex items-center gap-2">
                    <img src="${user.photoURL}" class="w-6 h-6 rounded-full border">
                    <button onclick="logout()" class="text-[10px] bg-red-500 text-white px-2 py-1 rounded">Logout</button>
                </div>`;
        } else {
            authBtn.innerHTML = `
                <button onclick="loginWithGoogle()" class="bg-white text-indigo-600 px-3 py-1.5 rounded-full text-xs font-bold shadow flex items-center gap-1">
                    <i class="fa-brands fa-google"></i> Login
                </button>`;
        }
    }
});

window.logout = () => signOut(auth);
