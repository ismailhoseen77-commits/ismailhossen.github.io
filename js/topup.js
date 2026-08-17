const ADMIN_WA_NUMBER = "8801576502490";
let currentGame = "";
let selectedPkgName = "";
let selectedPkgPrice = 0;
let selectedPayOption = "wallet";

// Open Product Recharge Page
function openProductPage(type) {
    currentGame = type;
    selectedPkgName = "";
    selectedPkgPrice = 0;

    const grid = document.getElementById('recharge-grid');
    if (!grid) return;
    grid.innerHTML = '';

    let items = [];
    if (type === 'freefire') {
        const headerTitle = document.getElementById('product-header-title');
        const headerImg = document.getElementById('product-header-img');
        const ffFields = document.getElementById('ff-account-fields');
        const efFields = document.getElementById('efootball-account-fields');

        if (headerTitle) headerTitle.innerText = "FF UID TOP UP";
        if (headerImg) headerImg.src = "free-fire-logo.png";
        if (ffFields) ffFields.classList.remove('hidden');
        if (efFields) efFields.classList.add('hidden');

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
        const headerTitle = document.getElementById('product-header-title');
        const headerImg = document.getElementById('product-header-img');
        const ffFields = document.getElementById('ff-account-fields');
        const efFields = document.getElementById('efootball-account-fields');

        if (headerTitle) headerTitle.innerText = "E Football Coin TOP UP";
        if (headerImg) headerImg.src = "EFootball_logo.png";
        if (ffFields) ffFields.classList.add('hidden');
        if (efFields) efFields.classList.remove('hidden');

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

// Select Payment Option
function selectPaymentOption(opt) {
    selectedPayOption = opt;
    const walletEl = document.getElementById('pay-opt-wallet');
    const instantEl = document.getElementById('pay-opt-instant');

    if (!walletEl || !instantEl) return;

    if (opt === 'wallet') {
        walletEl.className = "border-2 border-indigo-600 bg-indigo-50/50 p-3 rounded-xl cursor-pointer text-center relative";
        instantEl.className = "border p-3 rounded-xl cursor-pointer text-center bg-gray-50";
    } else {
        instantEl.className = "border-2 border-indigo-600 bg-indigo-50/50 p-3 rounded-xl cursor-pointer text-center relative";
        walletEl.className = "border p-3 rounded-xl cursor-pointer text-center bg-gray-50";
    }
}

// Handle Buy Now (Supports both Guest and Logged-in Users)
function handleBuyNow() {
    if (!selectedPkgName) return alert('একটি রিচার্জ প্যাকেজ সিলেক্ট করুন!');

    if (currentGame === 'freefire') {
        const uidEl = document.getElementById('ff-uid');
        const uid = uidEl ? uidEl.value.trim() : "";
        if (!uid) return alert('আপনার Player UID প্রদান করুন!');
    } else {
        const idEl = document.getElementById('ef-id');
        const passEl = document.getElementById('ef-pass');
        const id = idEl ? idEl.value.trim() : "";
        const pass = passEl ? passEl.value.trim() : "";
        if (!id || !pass) return alert('Account ID এবং Password সঠিকভাবে দিন!');
    }

    const displayAmount = document.getElementById('checkout-amount-display');
    const instructionAmount = document.getElementById('instruction-amount');
    const modal = document.getElementById('bkash-checkout-modal');

    if (displayAmount) displayAmount.innerText = `৳ ${selectedPkgPrice}`;
    if (instructionAmount) instructionAmount.innerText = `${selectedPkgPrice}`;
    
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// Close Modal
function closeBkashModal() {
    const modal = document.getElementById('bkash-checkout-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Submit Final Order
function submitFinalOrder() {
    const trxInput = document.getElementById('trx-id-input');
    const trxId = trxInput ? trxInput.value.trim() : "";
    if (!trxId) return alert('ট্রানজেকশন আইডি প্রদান করুন!');

    const user = (typeof auth !== 'undefined') ? auth.currentUser : null;
    const userEmail = user ? user.email : "Guest User";

    let accInfo = "";
    if (currentGame === 'freefire') {
        const uidVal = document.getElementById('ff-uid') ? document.getElementById('ff-uid').value.trim() : "";
        accInfo = `UID: ${uidVal}`;
    } else {
        const typeVal = document.getElementById('ef-account-type') ? document.getElementById('ef-account-type').value : "Konami ID";
        const idVal = document.getElementById('ef-id') ? document.getElementById('ef-id').value.trim() : "";
        const passVal = document.getElementById('ef-pass') ? document.getElementById('ef-pass').value.trim() : "";
        const backupVal = document.getElementById('ef-backup') ? document.getElementById('ef-backup').value.trim() : "";
        
        accInfo = `Type: ${typeVal} | ID: ${idVal} | Pass: ${passVal} | Backup: ${backupVal}`;
    }

    const orderData = {
        userEmail: userEmail,
        product: `${currentGame.toUpperCase()} - ${selectedPkgName}`,
        price: selectedPkgPrice,
        accInfo: accInfo,
        trxId: trxId,
        status: "Pending",
        createdAt: (typeof firebase !== 'undefined') ? firebase.firestore.FieldValue.serverTimestamp() : new Date()
    };

    // Firebase-এ অর্ডার সেভ করার চেষ্টা করবে
    if (typeof db !== 'undefined') {
        db.collection("orders").add(orderData).then(() => {
            alert("অর্ডার সফলভাবে জমা হয়েছে!");
            sendWhatsAppMessage(userEmail, selectedPkgName, selectedPkgPrice, trxId, currentGame, accInfo);
        }).catch(e => {
            alert('ডাটাবেজে সমস্যা হলেও হোয়াটসঅ্যাপে মেসেজ পাঠানো হচ্ছে...');
            sendWhatsAppMessage(userEmail, selectedPkgName, selectedPkgPrice, trxId, currentGame, accInfo);
        });
    } else {
        sendWhatsAppMessage(userEmail, selectedPkgName, selectedPkgPrice, trxId, currentGame, accInfo);
    }
}

// WhatsApp Message Helper Function
function sendWhatsAppMessage(userEmail, pkgName, price, trxId, game, accInfo) {
    const msg = `🚨 *NEW TOPUP ORDER*\n` +
                `👤 *User:* ${userEmail}\n` +
                `📦 *Item:* ${pkgName}\n` +
                `💰 *Price:* ${price} BDT\n` +
                `💳 *TrxID:* ${trxId}\n` +
                `🎮 *Game:* ${game}\n` +
                `🆔 *Info:* ${accInfo}`;

    window.open(`https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    closeBkashModal();
            }
            
