const IMGBB_API_KEY = "6d257f6977717c192108108ae3202982";

document.addEventListener("DOMContentLoaded", () => {
    loadPackages();
    loadOrders();
});

// Image Upload Handler using ImgBB API
async function uploadImageToImgBB(fileInputId) {
    const fileInput = document.getElementById(fileInputId);
    if (!fileInput.files || fileInput.files.length === 0) return "";

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        if (data.success) {
            return data.data.url;
        } else {
            alert("ছবি আপলোড ব্যর্থ হয়েছে!");
            return "";
        }
    } catch (e) {
        alert("ছবি আপলোডে নেটওয়ার্ক সমস্যা: " + e.message);
        return "";
    }
}

async function updateNotice() {
    const text = document.getElementById('admin-notice-input').value.trim();
    const btn = document.getElementById('btn-notice');
    
    btn.innerText = "আপলোড হচ্ছে...";
    btn.disabled = true;

    const imageUrl = await uploadImageToImgBB('admin-notice-file');

    db.collection("settings").doc("notice").set({
        text: text,
        image: imageUrl
    }).then(() => {
        alert("নোটিশ সেভ হয়েছে!");
        btn.innerText = "Save Notice";
        btn.disabled = false;
    }).catch(e => {
        alert("সমস্যা: " + e.message);
        btn.innerText = "Save Notice";
        btn.disabled = false;
    });
}

async function addEcommerceProduct() {
    const title = document.getElementById('prod-title-input').value.trim();
    const price = Number(document.getElementById('prod-price-input').value);
    const btn = document.getElementById('btn-prod');

    if (!title || !price) return alert("প্রোডাক্টের নাম ও দাম দিন!");

    btn.innerText = "আপলোড হচ্ছে...";
    btn.disabled = true;

    const imageUrl = await uploadImageToImgBB('prod-img-file');

    db.collection("products").add({
        title: title,
        price: price,
        image: imageUrl
    }).then(() => {
        alert("প্রোডাক্ট যুক্ত হয়েছে!");
        document.getElementById('prod-title-input').value = "";
        document.getElementById('prod-price-input').value = "";
        btn.innerText = "+ প্রোডাক্ট প্রকাশ করুন";
        btn.disabled = false;
    }).catch(e => {
        alert("সমস্যা: " + e.message);
        btn.innerText = "+ প্রোডাক্ট প্রকাশ করুন";
        btn.disabled = false;
    });
}

function addNewPackage() {
    const game = document.getElementById('pkg-game-type').value;
    const name = document.getElementById('pkg-name-input').value.trim();
    const price = Number(document.getElementById('pkg-price-input').value);

    if (!name || !price) return alert("প্যাকেজের তথ্য দিন!");

    db.collection("packages").add({
        game: game,
        name: name,
        price: price
    }).then(() => {
        alert("প্যাকেজ যুক্ত করা হয়েছে!");
        loadPackages();
    });
}

function loadPackages() {
    const container = document.getElementById('admin-packages-list');
    db.collection("packages").get().then(snapshot => {
        container.innerHTML = "";
        snapshot.forEach(doc => {
            const p = doc.data();
            const card = document.createElement('div');
            card.className = "flex justify-between items-center bg-gray-50 p-2 rounded-lg border text-xs";
            card.innerHTML = `<span><b>${p.name}</b> (${p.game}) - ৳${p.price}</span>
            <button onclick="deleteDoc('packages', '${doc.id}')" class="text-red-500 font-bold">Delete</button>`;
            container.appendChild(card);
        });
    });
}

function loadOrders() {
    const container = document.getElementById('admin-orders-list');
    db.collection("orders").onSnapshot(snapshot => {
        container.innerHTML = "";
        snapshot.forEach(doc => {
            const o = doc.data();
            const card = document.createElement('div');
            card.className = "bg-gray-50 p-3 rounded-lg border text-xs space-y-1 shadow-sm";
            card.innerHTML = `
                <div class="flex justify-between font-bold"><span>${o.product}</span><span class="text-indigo-600">${o.status}</span></div>
                <p>User: ${o.userEmail} | Trx: ${o.trxId}</p>
                <div class="flex gap-2 pt-1">
                    <button onclick="updateOrderStatus('${doc.id}', 'Completed')" class="bg-emerald-600 text-white px-2 py-1 rounded text-[10px]">Completed</button>
                    <button onclick="updateOrderStatus('${doc.id}', 'Cancelled')" class="bg-red-600 text-white px-2 py-1 rounded text-[10px]">Cancelled</button>
                </div>
            `;
            container.appendChild(card);
        });
    });
}

function deleteDoc(col, id) {
    db.collection(col).doc(id).delete().then(() => loadPackages());
}

function updateOrderStatus(id, status) {
    db.collection("orders").doc(id).update({ status: status });
}

