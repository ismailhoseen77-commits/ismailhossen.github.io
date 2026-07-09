document.addEventListener("DOMContentLoaded", function() {
    // ওয়েলকাম পেজ থেকে মেইন সাইটে যাওয়া
    const welcomePage = document.getElementById('welcome-page');
    const mainSite = document.getElementById('main-site');

    document.getElementById('continue-btn').addEventListener('click', () => {
        welcomePage.style.display = 'none';
        mainSite.style.display = 'block';
    });

    document.getElementById('info-form').addEventListener('submit', (e) => {
        e.preventDefault();
        welcomePage.style.display = 'none';
        mainSite.style.display = 'block';
    });

    // হোয়াটসঅ্যাপ অর্ডার সিস্টেম
    const orderButtons = document.querySelectorAll('.whatsapp-order');
    orderButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.getAttribute('data-item');
            const phoneNumber = "8801576502490"; // তোর নাম্বার
            const message = `হ্যালো, আমি ${item} অর্ডার করতে চাই।`;
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    });
});
