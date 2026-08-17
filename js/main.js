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

    if (tabId === 'home-tab') document.getElementById('nav-home').classList.replace('text-gray-400', 'text-indigo-600');
    if (tabId === 'orders-tab') {
        document.getElementById('nav-orders').classList.replace('text-gray-400', 'text-indigo-600');
        loadUserOrders();
    }
    if (tabId === 'profile-tab') document.getElementById('nav-profile').classList.replace('text-gray-400', 'text-indigo-600');
}

// Google Login
function loginWithGoogle() {
    auth.signInWithPopup(googleProvider).then(result => {
        console.log("Logged in:", result.user);
    }).catch(e => {
        alert("লগইন সমস্যা: " + e.message);
    });
}

// Logout
function logoutUser() {
    auth.signOut();
}

// Auth State Monitor
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('logged-out-box').classList.add('hidden');
        document.getElementById('logged-in-box').classList.remove('hidden');

        document.getElementById('profile-name').innerText = user.displayName || "User";
        document.getElementById('profile-email').innerText = user.email || "";
        document.getElementById('user-avatar').src = user.photoURL || "https://i.ibb.co/3s3W98t/efootball.png";

        document.getElementById('header-user-badge').classList.remove('hidden');
        document.getElementById('user-display-name').innerText = user.displayName ? user.displayName.split(' ')[0] : "User";
    } else {
        document.getElementById('logged-out-box').classList.remove('hidden');
        document.getElementById('logged-in-box').classList.add('hidden');
        document.getElementById('header-user-badge').classList.add('hidden');
    }
});

// Load Orders
function loadUserOrders() {
    const user = auth.currentUser;
    const container = document.getElementById('orders-list-container');
    container.innerHTML = `<p class="text-center text-xs text-gray-500 py-4">লোড হচ্ছে...</p>`;

    if (!user) {
        container.innerHTML = `
            <div class="bg-white p-6 rounded-2xl shadow-sm text-center space-y-2 border">
                <i class="fa-solid fa-box-open text-3xl text-gray-300"></i>
                <p class="text-xs text-gray-500 font-bold">অর্ডার হিস্ট্রি দেখতে প্রোফাইল থেকে লগইন করুন</p>
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
            card.innerHTML = `
                <div class="flex justify-between items-center border-b pb-2">
                    <span class="font-bold text-gray-800">${data.product}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded ${data.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">${data.status}</span>
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

