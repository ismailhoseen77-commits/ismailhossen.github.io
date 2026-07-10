/**
 * ================================
 * ISMAIL HOSSEN - SIMPLE SCRIPT
 * ================================
 * NO Loading Screen - Direct to Home
 */

// ================================
// CONFIGURATION
// ================================

const CONFIG = {
    THEME_KEY: 'ismail_theme_mode',
    LANGUAGE_KEY: 'ismail_language_preference',
    DEFAULT_THEME: 'light',
    DEFAULT_LANGUAGE: 'bn',
    STORAGE_AVAILABLE: typeof Storage !== 'undefined'
};

// ================================
// TRANSLATIONS (বাংলা ↔ English)
// ================================

const TRANSLATIONS = {
    bn: {
        'হোম': 'হোম',
        'আমার কাজ': 'আমার কাজ',
        'ই-কমার্স': 'ই-কমার্স',
        'সেবা অর্ডার': 'সেবা অর্ডার'
    },
    en: {
        'হোম': 'Home',
        'আমার কাজ': 'My Work',
        'ই-কমার্স': 'E-Commerce',
        'সেবা অর্ডার': 'Order Services'
    }
};

// ================================
// INITIALIZATION
// ================================

window.addEventListener('load', function() {
    console.log('🚀 পোর্টফোলিও লোড হচ্ছে...');
    
    // Initialize theme
    initializeTheme();
    
    // Initialize language
    initializeLanguage();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
    
    // Add event listeners
    addEventListeners();
    
    console.log('✅ পোর্টফোলিও সফলভাবে লোড হয়েছে!');
});

// ================================
// THEME MANAGEMENT (Dark/Light Mode)
// ================================

function initializeTheme() {
    const savedTheme = CONFIG.STORAGE_AVAILABLE ? localStorage.getItem(CONFIG.THEME_KEY) : null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (prefersDark ? 'dark' : CONFIG.DEFAULT_THEME);
    applyTheme(theme);
}

function applyTheme(theme) {
    const htmlElement = document.documentElement;
    
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    
    if (CONFIG.STORAGE_AVAILABLE) {
        localStorage.setItem(CONFIG.THEME_KEY, theme);
    }
    
    updateThemeToggle(theme);
}

function toggleTheme() {
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    applyTheme(newTheme);
}

function updateThemeToggle(theme) {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    
    if (theme === 'dark') {
        toggleBtn.innerHTML = '<i class="fas fa-moon hidden dark:block"></i><i class="fas fa-sun dark:hidden"></i>';
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-sun dark:hidden"></i><i class="fas fa-moon hidden dark:block"></i>';
    }
}

// ================================
// LANGUAGE MANAGEMENT
// ================================

function initializeLanguage() {
    const savedLanguage = CONFIG.STORAGE_AVAILABLE ? localStorage.getItem(CONFIG.LANGUAGE_KEY) : null;
    const language = savedLanguage || CONFIG.DEFAULT_LANGUAGE;
    
    setLanguage(language);
}

function setLanguage(language) {
    const validLanguages = ['bn', 'en'];
    const lang = validLanguages.includes(language) ? language : CONFIG.DEFAULT_LANGUAGE;
    
    if (CONFIG.STORAGE_AVAILABLE) {
        localStorage.setItem(CONFIG.LANGUAGE_KEY, lang);
    }
    
    // Update language toggle button
    const langToggle = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    if (langToggle && langText) {
        langText.textContent = lang.toUpperCase();
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Store current language
    window.currentLanguage = lang;
}

function toggleLanguage() {
    const currentLang = window.currentLanguage || CONFIG.DEFAULT_LANGUAGE;
    const newLang = currentLang === 'en' ? 'bn' : 'en';
    setLanguage(newLang);
}

// ================================
// NAVIGATION MANAGEMENT
// ================================

function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when a link is clicked
        const navLinks = mobileMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// ================================
// SMOOTH SCROLL
// ================================

function smoothScroll(e) {
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

// ================================
// EVENT LISTENERS
// ================================

function addEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Language toggle
    const languageToggle = document.getElementById('lang-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
    
    // Navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Close mobile menu on outside click
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (mobileMenu && mobileMenuBtn && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    // Navbar link active state
    addNavbarActiveState();
}

// ================================
// NAVBAR ACTIVE STATE
// ================================

function addNavbarActiveState() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active', 'text-blue-600', 'dark:text-blue-400');
            
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active', 'text-blue-600', 'dark:text-blue-400');
            }
        });
    });
}

// ================================
// UTILITY FUNCTIONS
// ================================

function getCurrentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getCurrentLanguage() {
    return window.currentLanguage || CONFIG.DEFAULT_LANGUAGE;
}

// ================================
// EXPORT FOR DEBUGGING
// ================================

window.ismailDebug = {
    getCurrentTheme,
    getCurrentLanguage,
    toggleTheme,
    toggleLanguage,
    CONFIG,
    TRANSLATIONS
};

console.log('✅ সাইট সম্পূর্ণভাবে প্রস্তুত এবং লাইভ!');
        
