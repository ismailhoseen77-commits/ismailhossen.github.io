/**
 * ================================
 * ISMAIL HOSSEN - MOBILE SCRIPT
 * ================================
 * Simple Theme Toggle + Language Support
 */

// ================================
// CONFIGURATION
// ================================

const CONFIG = {
    THEME_KEY: 'ismail_theme',
    LANGUAGE_KEY: 'ismail_language',
    DEFAULT_THEME: 'light',
    DEFAULT_LANGUAGE: 'bn'
};

// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ মোবাইল সাইট লোড হয়েছে!');
    
    // Initialize theme
    initializeTheme();
    
    // Add event listeners
    addEventListeners();
});

// ================================
// THEME MANAGEMENT
// ================================

function initializeTheme() {
    const savedTheme = localStorage.getItem(CONFIG.THEME_KEY) || CONFIG.DEFAULT_THEME;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (prefersDark ? 'dark' : CONFIG.DEFAULT_THEME);
    applyTheme(theme);
}

function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    localStorage.setItem(CONFIG.THEME_KEY, theme);
    updateThemeButton(theme);
}

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
}

function updateThemeButton(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    
    if (theme === 'dark') {
        btn.innerHTML = '<i class="fas fa-moon hidden dark:block"></i><i class="fas fa-sun dark:hidden"></i>';
    } else {
        btn.innerHTML = '<i class="fas fa-sun dark:hidden"></i><i class="fas fa-moon hidden dark:block"></i>';
    }
}

// ================================
// LANGUAGE MANAGEMENT
// ================================

function initializeLanguage() {
    const savedLang = localStorage.getItem(CONFIG.LANGUAGE_KEY) || CONFIG.DEFAULT_LANGUAGE;
    setLanguage(savedLang);
}

function setLanguage(lang) {
    localStorage.setItem(CONFIG.LANGUAGE_KEY, lang);
    document.documentElement.lang = lang;
    
    const langText = document.getElementById('lang-text');
    if (langText) {
        langText.textContent = lang.toUpperCase();
    }
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
    
    // Smooth scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ================================
// PERFORMANCE
// ================================

// Log when page is fully loaded
window.addEventListener('load', function() {
    console.log('🚀 সব কিছু সফলভাবে লোড হয়েছে!');
    
    // Show performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('⏱️ পেজ লোড সময়: ' + pageLoadTime + 'ms');
    }
});

// ================================
// UTILITY FUNCTIONS
// ================================

function getCurrentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getCurrentLanguage() {
    return localStorage.getItem(CONFIG.LANGUAGE_KEY) || CONFIG.DEFAULT_LANGUAGE;
}

// ================================
// EXPORT DEBUG
// ================================

window.ismailDebug = {
    getCurrentTheme,
    getCurrentLanguage,
    toggleTheme,
    toggleLanguage,
    CONFIG
};

console.log('💡 ডিবাগ: window.ismailDebug ব্যবহার করুন');
