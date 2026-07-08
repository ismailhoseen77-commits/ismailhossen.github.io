function enterSite() {
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.classList.add('fade-out');
    }
}

function showPage(pageId) {
    // সব পেজ হাইড করা
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // সব নেভলিঙ্ক ডিলিংক করা
    document.querySelectorAll('.bottom-nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // নির্দিষ্ট পেজ ও বটম নেভলিঙ্ক অ্যাক্টিভ করা
    const targetPage = document.getElementById('page-' + pageId);
    const targetLink = document.getElementById('nav-' + pageId);
    
    if (targetPage) targetPage.classList.add('active');
    if (targetLink) targetLink.classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

let currentLang = 'bn'; 

function toggleLanguage() {
    const langBtn = document.getElementById('lang-btn');
    
    if (currentLang === 'bn') {
        currentLang = 'en';
        if (langBtn) langBtn.innerText = 'BN';
    } else {
        currentLang = 'bn';
        if (langBtn) langBtn.innerText = 'EN';
    }
    
    // সমস্ত ডাইনামিক বড় টেক্সট পরিবর্তন
    document.querySelectorAll('.lang-text').forEach(el => {
        const textValue = el.getAttribute('data-' + currentLang);
        if (textValue) {
            el.innerText = textValue;
        }
    });
    
    // প্লেসহোল্ডার টেক্সট আপডেট
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
