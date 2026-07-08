// ==========================================================================
// 🚀 1. SINGLE PAGE APPLICATION (SPA) SYSTEM (ট্যাব পরিবর্তন)
// ==========================================================================
function showPage(pageId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.classList.remove('active'));
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const targetPage = document.getElementById('page-' + pageId);
    const targetNavLink = document.getElementById('nav-' + pageId);
    
    if (targetPage) {
        targetPage.classList.add('active');
    }
    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================================
// 🌙 2. DARK / LIGHT MODE SWITCHER (থিম মেমোরি)
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
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
// 🌐 3. LANGUAGE TOGGLE SYSTEM (বাংলা ও ইংরেজি পরিবর্তন)
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
// ⬆️ 4. SCROLL TO TOP SYSTEM
// ==========================================================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.onscroll = function() {
    if (scrollTopBtn) {
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

// ==========================================================================
// 🛍️ 5. WHATSAPP CUSTOM ORDER SUBMISSION SYSTEM
// ==========================================================================
function sendOrder(event) {
    event.preventDefault();

    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const service = document.getElementById('serviceType').value;
    const details = document.getElementById('clientDetails').value;

    const baseText = `*New Order Received from Portfolio!* 🔥\n\n` +
                     `👤 *Name:* ${name}\n` +
                     `📞 *Phone:* ${phone}\n` +
                     `💼 *Service:* ${service}\n` +
                     `📝 *Details & Address:* ${details}`;

    const encodedText = encodeURIComponent(baseText);
    const whatsappURL = `https://wa.me/8801576502490?text=${encodedText}`;
    
    window.open(whatsappURL, '_blank');
}

