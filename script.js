// 🚪 Welcome Screen Closing
function enterSite() {
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) welcomeScreen.classList.add('fade-out');
}

// 🍔 🌟 SIDEBAR TOGGLE LOGIC (থ্রি ডট বাটন অন/অফ লজিক)
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
    }
}

// 🚀 PAGE NAVIGATION SYSTEM
function showPage(pageId) {
    // সব পেজ হাইড করা
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    
    // মেনুর সব লিঙ্ক নিষ্ক্রিয় করা
    document.querySelectorAll('.sidebar-links a').forEach(link => link.classList.remove('active'));
    
    // সিলেক্টেড পেজ ও লিঙ্ক অ্যাক্টিভ করা
    const targetPage = document.getElementById('page-' + pageId);
    const targetLink = document.getElementById('nav-' + pageId);
    
    if (targetPage) targetPage.classList.add('active');
    if (targetLink) targetLink.classList.add('active');
    
    // পেজ চেঞ্জের পর মেনু অটো বন্ধ হয়ে যাবে
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 🌐 LANGUAGE SWITCHER
let currentLang = 'bn'; 

function toggleLanguage() {
    const langBtn = document.getElementById('lang-btn');
    currentLang = (currentLang === 'bn') ? 'en' : 'bn';
    if (langBtn) langBtn.innerText = (currentLang === 'bn') ? 'EN' : 'BN';
    
    document.querySelectorAll('.lang-text').forEach(el => {
        const textValue = el.getAttribute('data-' + currentLang);
        if (textValue) el.innerText = textValue;
    });
    
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

    const baseText = `*New Order from Portfolio!* 🔥\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n📝 *Details:* ${details}`;
    window.open(`https://wa.me/8801576502490?text=${encodeURIComponent(baseText)}`, '_blank');
}
