const ADMIN_WA_NUMBER = "8801576502490";
let currentGame = "";
let selectedPkgName = "";
let selectedPkgPrice = 0;

// Load Dynamic Notice & E-Commerce Items on Page Load
document.addEventListener("DOMContentLoaded", () => {
    loadNotice();
    loadEcommerceProducts();
});

function loadNotice() {
    if (typeof db === 'undefined') return;
    db.collection("settings").doc("notice").get().then(doc => {
        if (doc.exists) {
            const data = doc.data();
            const box = document.getElementById('notice-banner-box');
            const img = document.getElementById('notice-img');
            const txtBox = document.getElementById('notice-text-box');
            const txt = document.getElementById('notice-text');

            if (data.image) {
                img.src = data.image;
                img.classList.remove('hidden');
            }
            if (data.text) {
                txt.innerText = data.text;
                txtBox.classList.remove('hidden');
            }
            if (data.image || data.text) box.classList.remove('hidden');
        }
    });
}

function loadEcommerceProducts() {
    const grid = document.getElementById('ecommerce-products-grid');
    if (!grid || typeof db === 'undefined') return;

    db.collection("products").onSnapshot(snapshot => {
        if (snapshot.empty) {
            grid.innerHTML = `<p class="text-xs text-gray-400 col-span-2 text-center py-4">কোনো প্রোডাক্ট যুক্ত করা নেই!</p>`;
            return;
        }

        grid.innerHTML = "";
        snapshot.forEach(doc => {
            const p = doc.data();
            const card = document.createElement('div');
            card.className = "bg-gray-50 border rounded-xl p-2.5 space-y-2 flex flex-col justify-between";
            card.innerHTML = `
                <img src="${p.image || 'https://via.placeholder.com/150'}" class="w-full h-24 object-cover rounded-lg">
                <div>
                    <p class="font-bold text-xs text-gray-800">${p.title}</p>
                    <p class="text-xs font-extrabold text-indigo-600">৳${p.price}</p>
                </div>
                <button onclick="buyProductDirect('${p.title}', ${p.price})" class="w-full bg-indigo-600 text-white font-bold py-1.5 rounded-lg text-[10px]">Buy Now</button>
            `;
            grid.appendChild(card);
        });
    });
}

function buyProductDirect(title, price) {
    selectedPkgName = title;
    selectedPkgPrice = price;
    currentGame = "Ecommerce Product";
    handleBuyNow();
}

// Open Recharge Top-up Page (No hardcoded packages anymore)
function openProductPage(type) {
    currentGame = type;
    selectedPkgName = "";
    selectedPkgPrice = 0;

    const grid = document.getElementById('recharge-grid');
    if (!grid) return;
    grid.innerHTML = `<p class="text-xs text-gray-400 col-span-2 py-4">প্যাকেজ লোড হচ্ছে...</p>`;

    if (type === 'freefire') {
        document.getElementById('product-header-title').innerText = "FF UID TOP UP";
        document.getElementById('product-header-img').src = "free-fire-logo.png";
        document.getElementById('ff-account-fields').classList.remove('hidden');
        document.getElementById('efootball-account-fields').classList.add('hidden');
    } else {
        document.getElementById('product-header-title').innerText = "E Football Coin TOP UP";
        document.getElementById('product-header-img').src = "EFootball_logo.png";
        document.getElementById('ff-account-fields').classList.add('hidden');
        document.getElementById('efootball-account-fields').classList.remove('hidden');
    }

    // Load Packages from Firestore Database
    db.collection("packages").where("game", "==", type).get().then(snapshot => {
        if (snapshot.empty) {
            grid.innerHTML = `<p class="text-xs text-gray-400 col-span-2 py-4">কোনো প্যাকেজ যুক্ত করা নেই!</p>`;
            return;
        }

        grid.innerHTML = '';
        snapshot.forEach(doc => {
            const pkg = doc.data();
            const card = document.createElement('div');
            card.className = "border rounded-xl p-2.5 cursor-pointer bg-white hover:border-indigo-600 transition flex flex-col justify-center items-center pkg-card-item";
            card.innerHTML = `<p class="font-bold text-xs text-gray-800">${pkg.name}</p><p class="text-[11px] font-extrabold text-indigo-600">BDT ${pkg.price}</p>`;

            card.onclick = () => {
                document.querySelectorAll('.pkg-card-item').forEach(c => c.classList.remove('border-2', 'border-indigo-600', 'bg-indigo-50'));
                card.classList.add('border-2', 'border-indigo-600', 'bg-indigo-50');
                selectedPkgName = pkg.name;
                selectedPkgPrice = pkg.price;
            };
            grid.appendChild(card);
        });
    });

    switchTab('product-view');
}

function handleBuyNow() {
    if (!selectedPkgName) return alert('একটি প্যাকেজ বা প্রোডাক্ট সিলেক্ট করুন!');

    document.getElementById('checkout-amount-display').innerText = `৳ ${selectedPkgPrice}`;
    const modal = document.getElementById('bkash-checkout-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeBkashModal() {
    const modal = document.getElementById('bkash-checkout-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function submitFinalOrder() {
    const trxId = document.getElementById('trx-id-input').value.trim();
    if (!trxId) return alert('ট্রানজেকশন আইডি প্রদান করুন!');

    const user = (typeof auth !== 'undefined') ? auth.currentUser : null;
    const userEmail = user ? user.email : "Guest User";

    let accInfo = "";
    if (currentGame === 'freefire') {
        accInfo = `UID: ${document.getElementById('ff-uid').value.trim()}`;
    } else if (currentGame === 'efootball') {
        accInfo = `Type: ${document.getElementById('ef-account-type').value} | ID: ${document.getElementById('ef-id').value.trim()} | Pass: ${document.getElementById('ef-pass').value.trim()}`;
    } else {
        accInfo = "Direct E-Commerce Order";
    }

    const orderData = {
        userEmail: userEmail,
        product: selectedPkgName,
        price: selectedPkgPrice,
        accInfo: accInfo,
        trxId: trxId,
        status: "Pending",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection("orders").add(orderData).then(() => {
        alert("অর্ডার সফলভাবে জমা হয়েছে!");
        const msg = `🚨 *NEW ORDER*\n👤 *User:* ${userEmail}\n📦 *Item:* ${selectedPkgName}\n💰 *Price:* ${selectedPkgPrice} BDT\n💳 *TrxID:* ${trxId}\n🆔 *Info:* ${accInfo}`;
        window.open(`https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
        closeBkashModal();
    });
}
