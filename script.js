// ==========================================================================
// 🚪 1. WELCOME SCREEN CLOSING LOGIC (স্বাগতম স্ক্রিন বন্ধ করা)
// ==========================================================================
function enterSite() {
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.classList.add('fade-out');
    }
}

// ==========================================================================
// 🚀 2. PAGE NAVIGATION SYSTEM (SPA)
// ==========================================================================
function showPage(pageId) {
    // সব পেজ হাইড করা
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // সব নেভলিঙ্ক নিষ্ক্রিয় করা
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // নির্দিষ্ট পেজ ও নেভলিঙ্ক অ্যাক্টিভ করা
    const targetPage = document.getElementById('page-' + pageId);
    const targetLink = document.getElementById('nav-' + pageId);
    
    if (targetPage) targetPage.classList.add('active');
    if (targetLink) targetLink.classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================================
// 🌐 3. PERFECT LANGUAGE TOGGLE SYSTEM (বাংলা ও ইংরেজি পরিবর্তন)
// ==========================================================================
let currentLang = 'bn'; // ডিফল্ট ভাষা বাংলা

function toggleLanguage() {
    const langBtn = document.getElementById('lang-btn');
    
    if (currentLang === 'bn') {
        currentLang = 'en';
        if (langBtn) langBtn.innerText = 'BN';
    } else {
        currentLang = 'bn';
        if (langBtn) langBtn.innerText = 'EN';
    }
    
    // সমস্ত টেক্সট পরিবর্তন করা
    document.querySelectorAll('.lang-text').forEach(el => {
        const textValue = el.getAttribute('data-' + currentLang);
        if (textValue) {
            el.innerText = textValue;
        }
    });
    
    // প্লেসহোল্ডার টেক্সট কাস্টমাইজেশন (অর্ডার ফর্মের জন্য)
    const nameInput = document.getElementById('clientName');
    const phoneInput = document.getElementById('clientPhone');
    const detailsInput = document.getElementById('clientDetails');
    
    if (nameInput && phoneInput && detailsInput) {
        if (currentLang === 'en') {
            nameInput.placeholder = "Your Name";
            phoneInput.placeholder = "Phone Number";
            detailsInput.placeholder = "Task Details & Address...";
        } else {
            nameInput.placeholder = "আপনার নাম";
            phoneInput.placeholder = "মোবাইল নম্বর";
            detailsInput.placeholder = "বিস্তারিত ঠিকানা ও কাজের বিবরণ...";
        }
    }
}

// ==========================================================================
// 🛍️ 4. WHATSAPP ORDER SUBMISSION
// ==========================================================================
function sendOrder(event) {
    event.preventDefault();

    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const details = document.getElementById('clientDetails').value;

    const baseText = `*New Order from Portfolio!* 🔥\n\n` +
                     `👤 *Name:* ${name}\n` +
                     `📞 *Phone:* ${phone}\n` +
                     `📝 *Details:* ${details}`;

    const encodedText = encodeURIComponent(baseText);
    const whatsappURL = `https://wa.me/8801576502490?text=${encodedText}`;
    
    window.open(whatsappURL, '_blank');
        }
