// ১. ওয়েলকাম স্ক্রিন বন্ধ করার ফাংশন
function enterSite() {
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) welcomeScreen.classList.add('fade-out');
}

// ২. 🍔 সরাসরি অন-ক্লিক মেথড (মেনু ওপেন এবং ক্লোজ করার জন্য)
function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebarOverlay').classList.add('open');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
}

// ৩. 🚀 পেজ ন্যাভিগেশন কন্ট্রোল
function showPage(pageId) {
    // সব পেজ হাইড করা
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    
    // মেনুর সব লিঙ্ক ডিসঅ্যাক্টিভ করা
    document.querySelectorAll('.sidebar-links .nav-item').forEach(link => link.classList.remove('active'));
    
    // সিলেক্টেড পেজ অ্যাক্টিভ করা
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) targetPage.classList.add('active');
    
    // সিলেক্টেড লিঙ্ক হাইলাইট করা
    const targetLink = document.getElementById('nav-' + pageId);
    if (targetLink) targetLink.classList.add('active');
    
    // পেজ বদলানোর পর মেনু নিজে থেকেই ক্লোজ হয়ে যাবে
    closeSidebar();
    
    // স্মুথলি স্ক্রল করে পেজের টপে যাওয়া
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ৪. 🌐 ল্যাঙ্গুয়েজ চেঞ্জার লজিক (রিয়েল-টাইম ট্রান্সলেশন ফিক্স)
let currentLang = 'bn'; 

function toggleLanguage() {
    const langBtn = document.getElementById('lang-btn');
    
    // ভাষা টগল করা
    currentLang = (currentLang === 'bn') ? 'en' : 'bn';
    
    // ফ্লোটিং বাটনের ভেতরের লেখা পরিবর্তন
    if (langBtn) langBtn.innerText = (currentLang === 'bn') ? 'EN' : 'BN';
    
    // সাইটের সমস্ত টেক্সট এক ক্লিকে পরিবর্তন
    document.querySelectorAll('.lang-text').forEach(el => {
        const textValue = el.getAttribute('data-' + currentLang);
        if (textValue) el.innerText = textValue;
    });
    
    // অর্ডার ফর্মের প্লেসহোল্ডারগুলো ট্রান্সলেট করা
    const nameInput = document.getElementById('clientName');
    const phoneInput = document.getElementById('clientPhone');
    const detailsInput = document.getElementById('clientDetails');
    
    if (nameInput && phoneInput && detailsInput) {
        if (currentLang === 'en') {
            nameInput.placeholder = "Your Name";
            phoneInput.placeholder = "Phone Number";
            detailsInput.placeholder = "Write task details here...";
        } else {
            nameInput.placeholder = "আপনার নাম";
            phoneInput.placeholder = "মোবাইল নম্বর";
            detailsInput.placeholder = "কাজের বিস্তারিত বিবরণ এখানে লিখুন...";
        }
    }
}

// ৫. 🛒 হোয়াটসঅ্যাপ অর্ডার সিস্টেম
function sendOrder(event) {
    event.preventDefault();
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const details = document.getElementById('clientDetails').value;

    const baseText = `*New Order from Portfolio!* 🔥\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n📝 *Details:* ${details}`;
    window.open(`https://wa.me/8801576502490?text=${encodeURIComponent(baseText)}`, '_blank');
}

