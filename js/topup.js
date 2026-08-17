import { auth, db, collection, addDoc, serverTimestamp } from './firebase-init.js';

const ADMIN_WA_NUMBER = "8801576502490";
let selectedProduct = null;
let selectedPrice = 0;

window.openTopupModal = function(category) {
    const modal = document.getElementById('topup-modal');
    const pkgContainer = document.getElementById('package-list');
    pkgContainer.innerHTML = '';

    let packages = [];
    if(category === 'freefire') {
        document.getElementById('topup-title').innerText = "Free Fire Diamond Top-Up";
        packages = [
            { name: "115 Diamonds", price: 80 },
            { name: "240 Diamonds", price: 160 },
            { name: "610 Diamonds", price: 400 },
            { name: "Weekly Membership", price: 160 },
            { name: "Monthly Membership", price: 780 }
        ];
    } else if(category === 'efootball') {
        document.getElementById('topup-title').innerText = "eFootball Coin Top-Up";
        packages = [
            { name: "130 Coins", price: 120 },
            { name: "520 Coins", price: 450 },
            { name: "1050 Coins", price: 890 }
        ];
    }

    packages.forEach(pkg => {
        const btn = document.createElement('button');
        btn.className = "border border-indigo-200 bg-indigo-50/50 p-2.5 rounded-xl text-left hover:border-indigo-600 focus:border-indigo-600 focus:bg-indigo-100 transition";
        btn.innerHTML = `<p class="font-bold text-xs text-indigo-900">${pkg.name}</p><p class="text-xs text-indigo-600 font-extrabold">৳ ${pkg.price}</p>`;
        btn.onclick = () => {
            selectedProduct = `${category.toUpperCase()} - ${pkg.name}`;
            selectedPrice = pkg.price;
        };
        pkgContainer.appendChild(btn);
    });

    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeModals = function() {
    const modal = document.getElementById('topup-modal');
    const compModal = document.getElementById('comp-modal');
    if(modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
    if(compModal) { compModal.classList.add('hidden'); compModal.classList.remove('flex'); }
};

window.submitTopupOrder = async function() {
    const playerInfo = document.getElementById('player-id').value.trim();
    const trxId = document.getElementById('trx-id').value.trim();
    const user = auth.currentUser;

    if(!selectedProduct) return alert('অনুগ্রহ করে একটি প্যাকেজ সিলেক্ট করুন!');
    if(!playerInfo) return alert('Player UID অথবা অ্যাকাউন্ট ডিটেইলস দিন!');
    if(!trxId) return alert('বিকাশ TrxID প্রদান করুন!');

    const orderData = {
        userEmail: user ? user.email : "Guest User",
        userName: user ? user.displayName : "Guest",
        product: selectedProduct,
        price: selectedPrice,
        playerInfo: playerInfo,
        trxId: trxId,
        paymentMethod: "bKash (01309735129)",
        status: "Pending",
        createdAt: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "orders"), orderData);

        const message = `🛒 *NEW TOP-UP ORDER*\n` +
                        `--------------------------\n` +
                        `📦 *Product:* ${selectedProduct}\n` +
                        `💰 *Price:* ৳${selectedPrice}\n` +
                        `🆔 *Player Info:* ${playerInfo}\n` +
                        `💳 *Payment Method:* bKash\n` +
                        `🧾 *TrxID:* ${trxId}\n` +
                        `👤 *User:* ${orderData.userName} (${orderData.userEmail})\n` +
                        `--------------------------\n` +
                        `অর্ডারটি দ্রুত প্রসেস করুন।`;

        const waUrl = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(message)}`;
        alert('অর্ডার সাবমিট হয়েছে! এখন আপনার হোয়াটসঅ্যাপে নিয়ে যাওয়া হচ্ছে...');
        window.open(waUrl, '_blank');
        closeModals();
    } catch (e) {
        alert('অর্ডার তৈরিতে সমস্যা হয়েছে: ' + e.message);
    }
};
