// ১. ওয়েলকাম স্ক্রিন বন্ধ করার ফাংশন
function enterSite() {
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) welcomeScreen.classList.add('fade-out');
}

// ২. 🚀 পেজ ন্যাভিগেশন কন্ট্রোল (সরাসরি ক্লিক ট্র্যাকিং)
function showPage(pageId) {
    // সব পেজ হাইড করা
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    
    // ড্যাশবোর্ডের সব মেনু ট্যাব ডিসঅ্যাক্টিভ করা
    document.querySelectorAll('.nav-container .nav-item').forEach(link => link.classList.remove('active'));
    
    // সিলেক্টেড পেজ অ্যাক্টিভ করা
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) targetPage.classList.add('active');
    
    // সিলেক্টেড মেনু ট্যাব হাইলাইট করা
    const targetLink = document.getElementById('nav-' + pageId);
    if (targetLink) targetLink.classList.add('active');
    
    // স্মুথলি স্ক্রল করে পেজের একদম টপে নিয়ে যাওয়া
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ৩. 🌐 রিয়েল-টাইম ল্যাঙ্গুয়েজ চেঞ্জার লজিক
let currentLang = 'bn'; 

function toggleLanguage() {
    const langBtn = document.getElementById('lang-btn');
    
    // ভাষা অদলবদল করা
    currentLang = (currentLang === 'bn') ? 'en' : 'bn';
    
    // ফ্লোটিং বাটনের টেক্সট পরিবর্তন
    if (langBtn) langBtn.innerText = (currentLang === 'bn') ? 'EN' : 'BN';
    
    // সাইটের সমস্ত রেজিস্টার্ড টেক্সট এক ক্লিকে পরিবর্তন
    document.querySelectorAll('.lang-text').forEach(el => {
        const textValue = el.getAttribute('data-' + currentLang);
        if (textValue) el.innerText = textValue;
    });
    
    // অর্ডার ফর্মের প্লেসহোল্ডারগুলো ডাইনামিক ট্রান্সলেট করা
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

// ৪. 🛒 হোয়াটসঅ্যাপ অর্ডার প্রসেসর
function sendOrder(event) {
    event.preventDefault();
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const details = document.getElementById('clientDetails').value;

    const baseText = `*New Order from Portfolio!* 🔥\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n📝 *Details:* ${details}`;
    window.open(`https://wa.me/8801576502490?text=${encodeURIComponent(baseText)}`, '_blank');
}

