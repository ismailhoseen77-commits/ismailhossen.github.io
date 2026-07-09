// এলিমেন্টগুলো সিলেক্ট করা
const welcomePage = document.getElementById('welcome-page');
const mainSite = document.getElementById('main-site');
const continueBtn = document.getElementById('continue-btn');
const infoForm = document.getElementById('info-form');

// ১. স্বাগতম পেজ বন্ধ করে মেইন সাইট খোলার পারফেক্ট ফাংশন
function entryToMainSite() {
    // স্বাগতম পেজকে হাইড করা
    welcomePage.classList.add('hidden-page');
    // মেইন সাইট শো করা
    mainSite.classList.add('show-site');
}

// চালিয়ে যান বাটনে ক্লিক করলে
continueBtn.addEventListener('click', entryToMainSite);

// ফর্ম সাবমিট করলেও মেইন সাইটে নিয়ে যাবে
infoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    entryToMainSite();
});

// ২. ট্যাব ভিত্তিক আলাদা পেজ ওপেন করার রিয়েল লজিক (স্ক্রল হবে না)
const navButtons = document.querySelectorAll('.nav-btn');
const pageSections = document.querySelectorAll('.page-section');
const logoHome = document.getElementById('logo-home');

function switchPage(targetId) {
    // প্রথমে সব সেকশন থেকে active ক্লাস রিমুভ করে হাইড করা
    pageSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // যে ট্যাব এ ক্লিক করা হয়েছে শুধু সেই নির্দিষ্ট সেকশনটি অন করা
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // নেভিগেশন বারের একটিভ ডিজাইন ঠিক করা
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-target') === targetId) {
            btn.classList.add('active');
        }
    });
}

// প্রতিটা নেভিগেশন বাটনে ক্লিক লজিক
navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = button.getAttribute('data-target');
        switchPage(target);
    });
});

// লোগোতে ক্লিক করলে হোমে নিয়ে যাবে
logoHome.addEventListener('click', () => {
    switchPage('home');
});

// ৩. হোয়াটসঅ্যাপ অর্ডার প্রসেসিং
const buyButtons = document.querySelectorAll('.buy-now');
buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const itemName = btn.getAttribute('data-item');
        const whatsappNumber = "8801XXXXXXXXX"; // তোর নাম্বার দিবি এখানে
        const message = `হ্যালো মিহাদ ভাই, আমি আপনার সাইট থেকে "${itemName}" প্রোডাক্টটি অর্ডার করতে চাই।`;
        
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    });
});

