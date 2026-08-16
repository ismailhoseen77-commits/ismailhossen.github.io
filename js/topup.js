import { db, collection, getDocs, query, where } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', async () => {
    const packagesGrid = document.getElementById('packages-grid');
    const productsGrid = document.getElementById('products-grid');
    const gameButtons = document.querySelectorAll('.game-btn');

    let currentGame = 'freefire';

    // Function to load packages from Firestore
    async function loadPackages(gameName) {
        if (!packagesGrid) return;
        
        // Loading State
        packagesGrid.innerHTML = `<div class="state-box"><i class="fa-solid fa-spinner fa-spin"></i> প্যাকেজ লোড হচ্ছে...</div>`;

        try {
            // Assuming collection name is 'packages' with fields: game, title, price
            const q = query(collection(db, "packages"), where("game", "==", gameName));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                // Empty State fallback with default static demo cards if database is empty
                renderDefaultPackages(gameName);
                return;
            }

            packagesGrid.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const pkg = doc.data();
                packagesGrid.innerHTML += `
                    <div class="card">
                        <h3>${pkg.title || 'Top-Up Package'}</h3>
                        <p>৳ ${pkg.price || '0'}</p>
                        <button class="btn-buy" onclick="alert('অর্ডার করতে বিকাশ করুন: 01309735129')">Buy Now</button>
                    </div>
                `;
            });
        } catch (error) {
            console.error("Error loading packages:", error);
            renderDefaultPackages(gameName); // Fallback on error
        }
    }

    // Default Fallback Packages so screen is never blank
    function renderDefaultPackages(game) {
        const demoData = game === 'freefire' ? [
            { title: '115 Diamonds', price: '85' },
            { title: '240 Diamonds', price: '170' },
            { title: '610 Diamonds', price: '420' }
        ] : [
            { title: '100 myClub Coins', price: '100' },
            { title: '310 myClub Coins', price: '300' }
        ];

        packagesGrid.innerHTML = '';
        demoData.forEach(item => {
            packagesGrid.innerHTML += `
                <div class="card">
                    <h3>${item.title}</h3>
                    <p>৳ ${item.price}</p>
                    <button class="btn-buy" onclick="alert('বিকাশ পেমেন্ট করুন: 01309735129')">Buy Now</button>
                </div>
            `;
        });
    }

    // Function to load E-commerce products
    async function loadProducts() {
        if (!productsGrid) return;
        productsGrid.innerHTML = `<div class="state-box"><i class="fa-solid fa-spinner fa-spin"></i> প্রোডাক্ট লোড হচ্ছে...</div>`;

        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            if (querySnapshot.empty) {
                productsGrid.innerHTML = `
                    <div class="card" style="grid-column: 1/-1;">
                        <h3>Gaming Accounts & Accessories</h3>
                        <p>৳ 500</p>
                        <button class="btn-buy" onclick="alert('যোগাযোগ করুন: 01576502490')">Order Now</button>
                    </div>`;
                return;
            }

            productsGrid.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const prod = doc.data();
                productsGrid.innerHTML += `
                    <div class="card">
                        <h3>${prod.name || 'Product'}</h3>
                        <p>৳ ${prod.price || '0'}</p>
                        <button class="btn-buy">Order Now</button>
                    </div>
                `;
            });
        } catch (e) {
            productsGrid.innerHTML = `<div class="state-box">প্রডাক্ট লোড করতে সমস্যা হয়েছে।</div>`;
        }
    }

    // Event listeners for game switch buttons
    gameButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            gameButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentGame = e.target.getAttribute('data-game');
            loadPackages(currentGame);
        });
    });

    // Initial Load
    loadPackages(currentGame);
    loadProducts();
});
        
