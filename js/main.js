// Google Login Handler
function loginWithGoogle() {
    if (typeof auth === 'undefined' || typeof googleProvider === 'undefined') {
        alert("Firebase সঠিকভাবে লোড হয়নি!");
        return;
    }

    auth.signInWithPopup(googleProvider)
        .then((result) => {
            const user = result.user;
            // Save or Update user doc in Firestore
            db.collection("users").doc(user.uid).set({
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            
            alert("লগইন সফল হয়েছে!");
        })
        .catch((error) => {
            console.error("Login Error:", error);
            if (error.code === 'auth/unauthorized-domain') {
                alert("Firebase Console-এ Authorised domains যুক্ত করা নেই!");
            } else if (error.code === 'auth/popup-blocked') {
                alert("ব্রাউজারের Pop-up blocked! অনুগ্রহ করে Pop-up allow করুন।");
            } else {
                alert("লগইন সমস্যা: " + error.message);
            }
        });
}

// User State Change
auth.onAuthStateChanged(user => {
    const loggedOutBox = document.getElementById('logged-out-box');
    const loggedInBox = document.getElementById('logged-in-box');
    const headerBadge = document.getElementById('header-user-badge');

    if (user) {
        if (loggedOutBox) loggedOutBox.classList.add('hidden');
        if (loggedInBox) loggedInBox.classList.remove('hidden');

        const profileName = document.getElementById('profile-name');
        const profileEmail = document.getElementById('profile-email');
        const userAvatar = document.getElementById('user-avatar');
        const userDisplayName = document.getElementById('user-display-name');

        if (profileName) profileName.innerText = user.displayName || "User";
        if (profileEmail) profileEmail.innerText = user.email || "";
        if (userAvatar) userAvatar.src = user.photoURL || "https://i.ibb.co/3s3W98t/efootball.png";

        if (headerBadge) headerBadge.classList.remove('hidden');
        if (userDisplayName) userDisplayName.innerText = user.displayName ? user.displayName.split(' ')[0] : "User";
    } else {
        if (loggedOutBox) loggedOutBox.classList.remove('hidden');
        if (loggedInBox) loggedInBox.classList.add('hidden');
        if (headerBadge) headerBadge.classList.add('hidden');
    }
});

function logoutUser() {
    auth.signOut().then(() => {
        alert("লগআউট সফল হয়েছে!");
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.remove('hidden');

    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('text-indigo-600');
        btn.classList.add('text-gray-400');
    });

    if (tabId === 'home-tab') document.getElementById('nav-home')?.classList.replace('text-gray-400', 'text-indigo-600');
    if (tabId === 'orders-tab') {
        document.getElementById('nav-orders')?.classList.replace('text-gray-400', 'text-indigo-600');
        loadUserOrders();
    }
    if (tabId === 'profile-tab') document.getElementById('nav-profile')?.classList.replace('text-gray-400', 'text-indigo-600');
}

function loadUserOrders() {
    const container = document.getElementById('orders-list-container');
    if (!container) return;

    container.innerHTML = `<p class="text-center text-xs text-gray-500 py-4">লোড হচ্ছে...</p>`;
    const user = auth.currentUser;

    if (!user) {
        container.innerHTML = `<p class="text-center text-xs text-gray-500 py-4">অর্ডার লিস্ট দেখতে লগইন করুন।</p>`;
        return;
    }

    db.collection("orders").where("userEmail", "==", user.email).get().then(snapshot => {
        if (snapshot.empty) {
            container.innerHTML = `<p class="text-center text-xs text-gray-400 py-4">কোনো অর্ডার পাওয়া যায়নি!</p>`;
            return;
        }
        container.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const card = document.createElement('div');
            card.className = "bg-white p-3 rounded-xl border text-xs space-y-1 shadow-sm";
            card.innerHTML = `<div class="flex justify-between font-bold"><span>${data.product}</span><span class="text-indigo-600">${data.status}</span></div><p class="text-gray-500">Trx: ${data.trxId} | ৳${data.price}</p>`;
            container.appendChild(card);
        });
    });
}

