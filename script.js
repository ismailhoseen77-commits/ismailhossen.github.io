// ১. স্বাগতম পেজ কন্ট্রোল (ক্লিক করলে মূল সাইট ওপেন হবে)
const welcomePage = document.getElementById('welcome-page');
const mainSite = document.getElementById('main-site');
const continueBtn = document.getElementById('continue-btn');
const infoForm = document.getElementById('info-form');

function showMainSite() {
    welcomePage.classList.add('hidden');
    mainSite.classList.remove('hidden');
}

continueBtn.addEventListener('click', showMainSite);

infoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // এখানে চাইলে ডাটা সেভ করার লজিক রাখতে পারিস
    showMainSite();
});

// ২. পিওর নেভিগেশন ও পেজ পরিবর্তন সিস্টেম (স্ক্রল হবে না, নতুন পেজ খুলবে)
const navButtons = document.querySelectorAll('.nav-btn');
const pageSections = document.querySelectorAll('.page-section');
const logoHome = document.getElementById('logo-home');

function switchPage(targetId) {
    // সব সেকশন থেকে active ক্লাস রিমুভ করা
    pageSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // নির্দিষ্ট সেকশনটি অন করা
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // বরের একটিভ বাটন চেঞ্জ করা
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-target') === targetId) {
            btn.classList.add('active');
        }
    });
}

navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = button.getAttribute('data-target');
        switchPage(target);
    });
});

logoHome.addEventListener('click', () => {
    switchPage('home');
});

// ৩. ঝটপট হোয়াটসঅ্যাপ অর্ডার সিস্টেম
const buyButtons = document.querySelectorAll('.buy-now');
buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const itemName = btn.getAttribute('data-item');
        const whatsappNumber = "8801XXXXXXXXX"; // তোর নিজের নাম্বার এখানে দিবি
        const message = `হ্যালো মিহাদ ভাই, আমি আপনার সাইট থেকে "${itemName}" প্রোডাক্টটি অর্ডার করতে চাই।`;
        
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    });
});
