// Admin Panel Initialization
document.addEventListener("DOMContentLoaded", () => {
    loadPackages();
    loadOrders();
});

// Update Homepage Notice
function updateNotice() {
    const text = document.getElementById('admin-notice-input').value.trim();
    if (!text) return alert("নোটিশ ফিল্ড খালি রাখা যাবে না!");

    db.collection("settings").doc("notice").set({ text: text }).then(() => {
        alert("নোটিশ সফলভাবে আপডেট হয়েছে!");
        document.getElementById('admin-notice-input').value = "";
    }).catch(e => alert("সমস্যা হয়েছে: " + e.message));
}

// Add New Package
function addNewPackage() {
    const game = document.getElementById('pkg-game-type').value;
    const name = document.getElementById('pkg-name-input').value.trim();
    const price = Number(document.getElementById('pkg-price-input').value);

    if (!name || !price) return alert("প্যাকেজের নাম ও সঠিক দাম লিখুন!");

    db.collection("packages").add({
        game: game,
        name: name,
        price: price,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("নতুন প্যাকেজ যুক্ত হয়েছে!");
        document.getElementById('pkg-name-input').value = "";
        document.getElementById('pkg-price-input').value = "";
        loadPackages();
    }).catch(e => alert("সমস্যা হয়েছে: " + e.message));
}

// Load Packages List
function loadPackages() {
    const container = document.getElementById('admin-packages-list');
    
    db.collection("packages").get().then(snapshot => {
        if (snapshot.empty) {
            container.innerHTML = `<p class="text-xs text-gray-400 col-span-2 text-center py-2">কোনো প্যাকেজ যুক্ত করা নেই!</p>`;
            return;
        }

        container.innerHTML = "";
        snapshot.forEach(doc => {
            const pkg = doc.data();
            const card = document.createElement('div');
            card.className = "flex justify-between items-center bg-gray-50 p-3 rounded-xl border text-xs";
            card.innerHTML = `
                <div>
                    <span class="font-bold text-gray-800">${pkg.name}</span>
                    <p class="text-[10px] text-gray-500">${pkg.game.toUpperCase()} - ৳${pkg.price}</p>
                </div>
                <button onclick="deletePackage('${doc.id}')" class="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            container.appendChild(card);
        });
    });
}

// Delete Package
function deletePackage(id) {
    if (confirm("আপনি কি নিশ্চিত এই প্যাকেজটি মুছে ফেলতে চান?")) {
        db.collection("packages").doc(id).delete().then(() => loadPackages());
    }
}

// Load Orders List
function loadOrders() {
    const container = document.getElementById('admin-orders-list');

    db.collection("orders").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        if (snapshot.empty) {
            container.innerHTML = `<p class="text-xs text-gray-400 text-center py-2">কোনো অর্ডার পাওয়া যায়নি!</p>`;
            return;
        }

        container.innerHTML = "";
        snapshot.forEach(doc => {
            const item = doc.data();
            const id = doc.id;
            const statusClass = item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : (item.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700');

            const card = document.createElement('div');
            card.className = "bg-gray-50 p-4 rounded-xl border space-y-2 text-xs";
            card.innerHTML = `
                <div class="flex justify-between items-center font-bold border-b pb-2">
                    <span class="text-gray-800">${item.product}</span>
                    <span class="text-[10px] px-2 py-0.5 rounded ${statusClass}">${item.status}</span>
                </div>
                <div class="space-y-1 text-gray-600 text-[11px]">
                    <p><b>ইউজার:</b> ${item.userEmail}</p>
                    <p><b>একাউন্ট ইনফো:</b> ${item.accInfo}</p>
                    <p><b>TrxID:</b> <span class="font-mono text-indigo-600 font-bold">${item.trxId}</span> | <b>দাম:</b> ৳${item.price}</p>
                </div>
                <div class="flex gap-2 pt-2 border-t">
                    <button onclick="updateOrderStatus('${id}', 'Completed')" class="flex-1 bg-emerald-600 text-white font-bold py-1.5 rounded-lg text-[11px]">Completed</button>
                    <button onclick="updateOrderStatus('${id}', 'Pending')" class="flex-1 bg-amber-500 text-white font-bold py-1.5 rounded-lg text-[11px]">Pending</button>
                    <button onclick="updateOrderStatus('${id}', 'Cancelled')" class="flex-1 bg-red-600 text-white font-bold py-1.5 rounded-lg text-[11px]">Cancelled</button>
                </div>
            `;
            container.appendChild(card);
        });
    });
}

// Update Order Status
function updateOrderStatus(id, newStatus) {
    db.collection("orders").doc(id).update({
        status: newStatus
    }).catch(e => alert("স্ট্যাটাস আপডেট হয়নি: " + e.message));
}
