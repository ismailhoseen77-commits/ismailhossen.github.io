// Tab Switching System
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.remove('hidden');
    }

    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('text-indigo-600');
        btn.classList.add('text-gray-400');
    });

    if (tabId === 'home-tab') {
        const navHome = document.getElementById('nav-home');
        if (navHome) navHome.classList.replace('text-gray-400', 'text-indigo-600');
    }
    if (tabId === 'orders-tab') {
        const navOrders = document.getElementById('nav-orders');
        if (navOrders) navOrders.classList.replace('text-gray-400', 'text-indigo-600');
        loadUserOrders();
    }
    if (tabId === 'profile-tab') {
        const navProfile = document.getElementById('nav-profile');
        if (navProfile) navProfile.classList.replace('text-gray-400', 'text-indigo-600');
    }
}

// Google Login with Popup & Redirect Fallback
function loginWithGoogle() {
    if (typeof auth === 'undefined' || typeof googleProvider === 'undefined') {
        alert("Firebase সঠিকভাবে লোড হয়নি! firebase-init.js ফাইলটি চেক করুন।");
        return;
    }

    auth.signInWithPopup(googleProvider).catch(error => {
        if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
            auth.signInWithRedirect(googleProvider);
        } else {
            alert("লগইন সমস্যা: " + error.message);
        }
    });
}

// Handle Redirect Login Result
if (typeof auth !== 'undefined') {
    auth.getRedirectResult().then(result => {
        if (result && result.user) {
            console.log("Logged in via redirect:", result.user);
        }
    }).catch(e => {
        console.error("Redirect login error:", e);
    });

    // Auth State Monitor
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
}

// Logout User
function logoutUser() {
    if (typeof auth !== 'undefined') {
        auth.signOut();
    }
}

// Load Orders List
function loadUserOrders() {
    const container = document.getElementById('orders-list-container');
    if (!container) return;

    container.innerHTML = `<p class="text-center text-xs text-gray-500 py-4">লোড হচ্ছে...</p>`;

    const user = (typeof auth !== 'undefined') ? auth.currentUser : null;

    if (!user) {
        container.innerHTML = `
            <div class="bg-white p-6 rounded-2xl shadow-sm text-center space-y-2 border">
                <i class="fa-solid fa-box-open text-3xl text-gray-300"></i>
                <p class="text-xs text-gray-500 font-bold">লগইন ছাড়া অর্ডার করলে তা আপনার ডিভাইসের হোয়াটসঅ্যাপ চ্যাটে সেভ থাকবে।</p>
                <p class="text-[11px] text-gray-400">ওয়েবসাইটে আপনার অর্ডারের ইতিহাস দেখতে প্রোফাইল থেকে লগইন করুন।</p>
            </div>
        `;
        return;
    }

    db.collection("orders").where("userEmail", "==", user.email).get().then(snapshot => {
        if (snapshot.empty) {
            container.innerHTML = `
                <div class="bg-white p-6 rounded-2xl shadow-sm text-center space-y-2 border">
                    <i class="fa-solid fa-circle-exclamation text-3xl text-indigo-300"></i>
                    <p class="text-xs text-gray-600 font-bold">কোনো অর্ডার পাওয়া যায়নি!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const card = document.createElement('div');
            card.className = "bg-white p-4 rounded-2xl shadow-sm border space-y-2 text-xs";
            
            const statusColor = data.status === 'Completed' 
                ? 'bg-emerald-100 text-emerald-700' 
                : (data.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700');

            card.innerHTML = `
                <div class="flex justify-between items-center border-b pb-2">
                    <span class="font-bold text-gray-800">${data.product}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded ${statusColor}">${data.status}</span>
                </div>
                <div class="flex justify-between text-gray-500 text-[11px]">
                    <span>মূল্য: ৳${data.price}</span>
                    <span>TrxID: ${data.trxId}</span>
                </div>
            `;
            container.appendChild(card);
        });
    }).catch(e => {
        container.innerHTML = `<p class="text-center text-xs text-red-500 py-4">ডাটা লোড হতে সমস্যা হয়েছে!</p>`;
    });
                }
                                                
