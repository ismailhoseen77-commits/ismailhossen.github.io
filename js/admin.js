import { auth, googleProvider, signInWithPopup, db, collection, onSnapshot } from './firebase-init.js';

const ADMIN_EMAIL = "ismailhoseen77@gmail.com";

window.adminLogin = async function() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        if (result.user.email === ADMIN_EMAIL) {
            document.getElementById('admin-lock').classList.add('hidden');
            document.getElementById('admin-content').classList.remove('hidden');
            loadAdminOrders();
        } else {
            alert("এক্সেস প্রত্যাখান করা হয়েছে! আপনি এই সিস্টেমের এডমিন নন।");
            await auth.signOut();
        }
    } catch (error) {
        alert("লগইন ব্যর্থ হয়েছে: " + error.message);
    }
};

function loadAdminOrders() {
    const ordersList = document.getElementById('admin-orders-list');
    onSnapshot(collection(db, "orders"), (snapshot) => {
        ordersList.innerHTML = '';
        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const card = document.createElement('div');
            card.className = "bg-gray-800 p-3 rounded-xl border border-gray-700 space-y-1";
            card.innerHTML = `
                <div class="flex justify-between text-indigo-400 font-bold">
                    <span>${data.product}</span>
                    <span>৳${data.price}</span>
                </div>
                <p><strong>Player Info:</strong> ${data.playerInfo}</p>
                <p><strong>TrxID:</strong> <span class="font-mono text-amber-300">${data.trxId}</span></p>
                <p class="text-gray-400 text-[10px]"><strong>User:</strong> ${data.userName} (${data.userEmail})</p>
            `;
            ordersList.appendChild(card);
        });
    });
}

