import { db, collection, getDocs, query, where } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', async () => {
    const packagesGrid = document.getElementById('packages-grid');
    const productsGrid = document.getElementById('products-grid');
    const gameButtons = document.querySelectorAll('.game-btn');
    const noticeText = document.getElementById('notice-text');

    let currentGame = 'freefire';

    // 1. Fetch Notice from Admin Firebase
    async function loadNotice() {
        try {
            const querySnapshot = await getDocs(collection(db, "notices"));
            if (!querySnapshot.empty) {
                let latestNotice = "";
                querySnapshot.forEach(doc => {
                    latestNotice = doc.data().text || doc.data().notice;
                });
                if (noticeText && latestNotice) {
                    noticeText.innerText = latestNotice;
                }
            }
        } catch (e) {
            console.log("Notice load default fallback.");
        }
    }

    // 2. Fetch Packages from Admin Firebase (Add/Edit/Delete supported)
    async function loadPackages(gameName) {
        if (!packagesGrid) return;
        packagesGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:20px; color:#94a3b8;">প্যাকেজ লোড হচ্ছে...</div>`;

        try {
            const q = query(collection(db, "packages"), where("game", "==", gameName));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                renderDefaultPackages(gameName);
                return;
            }

            packagesGrid.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const pkg = doc.data();
                packagesGrid.innerHTML += `
                    <div class="card">
                        ${pkg.image ? `<img src="${pkg.image}" alt="pkg">` : `<i class="fa-solid fa-gem" style="font-size:24px; color:#ffc107; margin-bottom:10px;"></i>`}
                        <h3>${pkg.title || pkg.name}</h3>
                        <p>৳ ${pkg.price}</p>
                        <button class="btn-buy" onclick="alert('বিকাশ করুন: 01309735129')">Buy Now</button>
                    </div>
                `;
            });
        } catch (error) {
            renderDefaultPackages(gameName);
        }
    }

    function renderDefaultPackages(game) {
        const demoData = game === 'freefire' ? [
            { title: '115 Diamonds', price: '78' },
            { title: '240 Diamonds', price: '155' },
            { title: '610 Diamonds', price: '390' }
        ] : [
            { title: '100 Coins', price: '100' },
            { title: '300 Coins', price: '360' }
        ];

        packagesGrid.innerHTML = '';
        demoData.forEach(item => {
            packagesGrid.innerHTML += `
                <div class="card">
                    <i class="fa-solid fa-gamepad" style="font-size:24px; color:#ffc107; margin-bottom:10px;"></i>
                    <h3>${item.title}</h3>
                    <p>৳ ${item.price}</p>
                    <button class="btn-buy" onclick="alert('বিকাশ পেমেন্ট করুন: 01309735129')">Buy Now</button>
                </div>
            `;
        });
    }

    // 3. Fetch E-commerce Products (Admin Controlled with Image & Details)
    async function loadProducts() {
        if (!productsGrid) return;
        productsGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:20px; color:#94a3b8;">প্রোডাক্ট লোড হচ্ছে...</div>`;

        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            if (querySnapshot.empty) {
                productsGrid.innerHTML = `
                    <div class="card">
                        <h3>eFootball ID</h3>
                        <p>৳ 490</p>
                        <button class="btn-buy" onclick="alert('যোগাযোগ: 01576502490')">Order Now</button>
                    </div>`;
                return;
            }

            productsGrid.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const prod = doc.data();
                productsGrid.innerHTML += `
                    <div class="card">
                        ${prod.image ? `<img src="${prod.image}" alt="prod">` : `<i class="fa-solid fa-bag-shopping" style="font-size:24px; color:#ffc107; margin-bottom:10px;"></i>`}
                        <h3>${prod.name}</h3>
                        <p>৳ ${prod.price}</p>
                        <button class="btn-buy" onclick="alert('অর্ডার সফল হয়েছে!')">Order Now</button>
                    </div>
                `;
            });
        } catch (e) {
            productsGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:#94a3b8;">প্রোডাক্ট পাওয়া যায়নি।</div>`;
        }
    }

    gameButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            gameButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentGame = e.target.getAttribute('data-game');
            loadPackages(currentGame);
        });
    });

    loadNotice();
    loadPackages(currentGame);
    loadProducts();
});
