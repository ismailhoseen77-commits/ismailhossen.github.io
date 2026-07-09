document.addEventListener("DOMContentLoaded", function() {
    const MY_NUMBER = "8801576502490";

    // থিম টগল
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // ল্যাঙ্গুয়েজ টগল
    let isBn = true;
    document.getElementById('lang-toggle').addEventListener('click', () => {
        isBn = !isBn;
        document.querySelectorAll('[data-bn]').forEach(el => {
            el.innerText = isBn ? el.getAttribute('data-bn') : el.getAttribute('data-en');
        });
    });

    // পেজ সুইচিং এবং হোয়াটসঅ্যাপ লজিক
    document.getElementById('continue-btn').addEventListener('click', () => {
        document.getElementById('welcome-page').style.display = 'none';
        document.getElementById('main-site').style.display = 'block';
    });

    document.querySelectorAll('.buy-now').forEach(btn => {
        btn.addEventListener('click', function() {
            window.open(`https://wa.me/${MY_NUMBER}?text=আমি ${this.getAttribute('data-item')} নিতে চাই`, '_blank');
        });
    });
});
