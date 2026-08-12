/**
 * ================================
 * ISMAIL HOSSEN - FIXED SCRIPT
 * ================================
 */

const CONFIG = {
    THEME_KEY: 'ismail_theme',
    LANGUAGE_KEY: 'ismail_language',
    DEFAULT_THEME: 'light',
    DEFAULT_LANGUAGE: 'bn'
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ মোবাইল সাইট লোড হয়েছে!');
    
    // Initialize Theme and Language
    initializeTheme();
    initializeLanguage();
    
    // Add event listeners
    addEventListeners();
});

// ================================
// THEME MANAGEMENT
// ================================

function initializeTheme() {
    const savedTheme = localStorage.getItem(CONFIG.THEME_KEY) || CONFIG.DEFAULT_THEME;
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    localStorage.setItem(CONFIG.THEME_KEY, theme);
}

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
}

// ================================
// LANGUAGE MANAGEMENT (FIXED)
// ================================

function initializeLanguage() {
    const savedLang = localStorage.getItem(CONFIG.LANGUAGE_KEY) || CONFIG.DEFAULT_LANGUAGE;
    setLanguage(savedLang);
}

function setLanguage(lang) {
    localStorage.setItem(CONFIG.LANGUAGE_KEY, lang);
    document.documentElement.lang = lang;
    
    // Change button text indicator
    const langText = document.getElementById('lang-text');
    if (langText) {
        langText.textContent = lang === 'bn' ? 'EN' : 'BN';
    }
    
    // Update all elements with translations
    document.querySelectorAll('[data-bn]').forEach(el => {
        if (lang === 'en') {
            if (el.getAttribute('data-en')) {
                el.innerHTML = el.getAttribute('data-en');
            }
        } else {
            if (el.getAttribute('data-bn')) {
                el.innerHTML = el.getAttribute('data-bn');
            }
        }
    });
}

function toggleLanguage() {
    const currentLang = localStorage.getItem(CONFIG.LANGUAGE_KEY) || CONFIG.DEFAULT_LANGUAGE;
    const newLang = currentLang === 'en' ? 'bn' : 'en';
    setLanguage(newLang);
}

// ================================
// EVENT LISTENERS
// ================================

function addEventListeners() {
    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    
    // Language toggle button
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
}

