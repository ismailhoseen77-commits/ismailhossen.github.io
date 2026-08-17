const ADMIN_WA_NUMBER = "8801576502490";
let currentGame = "";
let selectedPkgName = "";
let selectedPkgPrice = 0;
let selectedPayOption = "wallet";

function openProductPage(type) {
    currentGame = type;
    selectedPkgName = "";
    selectedPkgPrice = 0;

    const grid = document.getElementById('recharge-grid');
    grid.innerHTML = '';

    let items = [];
    if (type === 'freefire') {
        document.getElementById('product-header-title').innerText = "FF UID TOP UP";
        document.getElementById('product-header-img').src = "free-fire-logo.png";
        document.getElementById('ff-account-fields').classList.remove('hidden');
        document.getElementById('efootball-account-fields').classList.add('hidden');

        items = [
            { name: "25 Diamond", price: 20 },
            { name: "50 Diamond", price: 35 },
            { name: "115 Diamond", price: 79 },
            { name: "240 Diamond", price: 158 },
            { name: "355 Diamond", price: 237 },
            { name: "480 Diamond", price: 316 },
            { name: "610 Diamond", price: 400 },
            { name: "850 Diamond", price: 550 },
            { name: "1240 Diamond", price: 800 },
            { name: "2530 Diamond", price: 1610 },
            { name: "Weekly Membership", price: 160 },
            { name: "Monthly Membership", price: 780 }
        ];
    } else {
        document.getElementById('product-header-title').innerText = "E Football Coin TOP UP";
        document.getElementById('product-header-img').src = "EFootball_logo.png";
        document.getElementById('ff-account-fields').classList.add('hidden');
        document.getElementById('efootball-account-fields').classList.remove('hidden');

        items = [
            { name: "100 Coin", price: 100 },
            { name: "260 Coin", price: 190 },
            { name: "520 Coin", price: 540 },
            { name: "1040 Coin", price: 1020 },
            { name: "2130 Coin", price: 2020 },
            { name: "3250 Coin", price: 3040 }
        ];
    }

    items.forEach(pkg => {
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

    switchTab('product-view');
}

function selectPaymentOption(opt) {
    selectedPayOption = opt;
    const walletEl = document.getElementById('pay-opt-wallet');
    const instantEl = document.getElementById('pay-opt-instant');

    if(opt === 'wallet') {
        walletEl.className = "border-2 border-indigo-600 bg-indigo-50/50 p-3 rounded-xl cursor-pointer text-center relative";
        instantEl.className = "border p-3 rounded-xl cursor-pointer text-center bg-gray-50";
    } else {
        instantEl.className = "border-2 border-indigo-600 bg-indigo-50/50 p-3 rounded-xl cursor-pointer text-center relative";
        walletEl.className = "border p-3 rounded-xl cursor-pointer text-center bg-gray-50";
    }
}

function handleBuyNow() {
    if (!selectedPkgName) return alert('একটি রিচার্জ প্যাকেজ সিলেক্ট করুন!');

    if (currentGame === 'freefire') {
        const uid = document.getElementById('ff-uid').value.trim();
        if (!uid) return alert('আপনার Player UID প্রদান করুন!');
    } else {
        const id = document.getElementById('ef-id').value.trim();
        const pass = document.getElementById('ef-pass').value.trim();
        if (!id || !pass) return alert('Account ID এবং Password দিন!');
    }

    document.getElementById('checkout-amount-display').innerText = `৳ ${selectedPkgPrice}`;
    document.getElementById('instruction-amount').innerText = `${selectedPkgPrice}`;
    document.getElementById('bkash-checkout-modal').classList.remove('hidden');
    document.getElementById('bkash-checkout-modal').classList.add('flex');
}

function closeBkashModal() {
    document.getElementById('bkash-checkout-modal').classList.add('hidden');
    document.getElementById('bkash-checkout-modal').classList.remove('flex');
}

function submitFinalOrder() {
    const trxId = document.getElementById('trx-id-input').value.trim();
    if (!trxId) return alert('ট্রানজেকশন আইডি প্রদান করুন!');

    const user = auth.currentUser;
    let accInfo = currentGame === 'freefire' 
        ? document.getElementById('ff-uid').value.trim()
        : `Type: ${document.getElementById('ef-account-type').value} | ID: ${document.getElementById('ef-id').value.trim()} | Pass: ${document.getElementById('ef-pass').value.trim()}`;

    const orderData = {
        userEmail: user ? user.email : "Guest",
        product: `${currentGame.toUpperCase()} - ${selectedPkgName}`,
        price: selectedPkgPrice,
        accInfo: accInfo,
        trxId: trxId,
        status: "Pending",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection("orders").add(orderData).then(() => {
        const msg = `🚨 *NEW TOPUP ORDER*\n` +
                    `📦 *Item:* ${selectedPkgName}\n` +
                    `💰 *Price:* ${selectedPkgPrice} BDT\n` +
                    `💳 *TrxID:* ${trxId}\n` +
                    `🎮 *Game:* ${currentGame}\n` +
                    `🆔 *Info:* ${accInfo}`;

        window.open(`https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
        closeBkashModal();
    }).catch(e => {
        alert('অর্ডার সাবমিট করতে ব্যর্থ হয়েছে: ' + e.message);
    });
        }
