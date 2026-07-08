// ==========================================================================
// 🚀 1. SINGLE PAGE APPLICATION (SPA) SYSTEM (ট্যাব লেআউট পরিবর্তন)
// ==========================================================================
function showPage(pageId) {
    // সব পেজ সেকশন থেকে active ক্লাস রিমুভ করা
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // সব নেভিগেশন লিংক থেকে active ক্লাস রিমুভ করা
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // যে পেজে ক্লিক করা হয়েছে সেটিকে active করা
    const targetPage = document.getElementById('page-' + pageId);
    const targetNavLink = document.getElementById('nav-' + pageId);
    
    if (targetPage) {
        targetPage.classList.add('active');
    }
    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }
    
    // প্রতিবার ট্যাব পরিবর্তনের পর স্মুথলি স্ক্রিনের ওপরে চলে যাওয়া
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================================
// 🌙 2. DARK / LIGHT MODE SWITCHER (থিম পরিবর্তন ও মনে রাখা)
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');

// ব্রাউজারের মেমোরি (LocalStorage) চেক করে আগের থিম সেট করা
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // বাটন আইকন পরিবর্তন এবং মেমোরিতে সেভ রাখা
        if (document.body.classList.contains('dark-mode')) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ==========================================================================
// 🌐 3. LANGUAGE TOGGLE SYSTEM (বাংলা এবং ইংরেজি পরিবর্তন)
// ==========================================================================
function toggleLanguage() {
    const langBtn = document.getElementById('lang-btn');
    
    if (document.body.classList.contains('show-en')) {
        document.body.classList.remove('show-en');
        document.body.classList.add('show-bn');
        if (langBtn) langBtn.innerText = 'EN';
    } else {
        document.body.classList.remove('show-bn');
        document.body.classList.add('show-en');
        if (langBtn) langBtn.innerText = 'BN';
    }
}

// ==========================================================================
// ⬆️ 4. SCROLL TO TOP SYSTEM (ওপরে ওঠার বোতাম)
// ==========================================================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.onscroll = function() {
    if (scrollTopBtn) {
        // স্ক্রিন ১০০ পিক্সেলের বেশি নিচে নামলে বাটনটি দৃশ্যমান হবে
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.style.display = "flex";
        } else {
            scrollTopBtn.style.display = "none";
        }
    }
};

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

