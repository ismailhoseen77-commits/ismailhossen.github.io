/**
 * ================================
 * ISMAIL HOSSEN - FIXED JAVASCRIPT
 * ================================
 * FIXED: Loading Screen Issue
 * Dark Mode | Language Switch | Navigation | Animations
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
        'সেবা অর্ডার': 'সেবা অর্ডার',
        'লোড হচ্ছে...': 'লোড হচ্ছে...',
        'IsmaIL': 'IsmaIL',
        'যোগাযোগ করুন': 'যোগাযোগ করুন',
        'আমার দক্ষতা দেখুন': 'আমার দক্ষতা দেখুন',
        'আমার কাজ ও দক্ষতা': 'আমার কাজ ও দক্ষতা',
        'আমাদের পণ্য': 'আমাদের পণ্য',
        'আমার সেবা অর্ডার করুন': 'আমার সেবা অর্ডার করুন',
        'আমাদের সাথে যোগাযোগ করুন': 'আমাদের সাথে যোগাযোগ করুন',
        'সেবা': 'সেবা',
        'পেজ': 'পেজ',
        'যোগাযোগ': 'যোগাযোগ',
        'অবস্থান': 'অবস্থান',
        'সর্বাধিকার সংরক্ষিত': 'সর্বাধিকার সংরক্ষিত'
    },
    en: {
        'হোম': 'Home',
        'আমার কাজ': 'My Work',
        'ই-কমার্স': 'E-Commerce',
        'সেবা অর্ডার': 'Order Services',
        'লোড হচ্ছে...': 'Loading...',
        'IsmaIL': 'IsmaIL',
        'যোগাযোগ করুন': 'Contact Me',
        'আমার দক্ষতা দেখুন': 'View My Skills',
        'আমার কাজ ও দক্ষতা': 'My Work & Skills',
        'আমাদের পণ্য': 'Our Products',
        'আমার সেবা অর্ডার করুন': 'Order My Services',
        'আমাদের সাথে যোগাযোগ করুন': 'Contact Us',
        'সেবা': 'Services',
        'পেজ': 'Pages',
        'যোগাযোগ': 'Contact',
        'অবস্থান': 'Location',
        'সর্বাধিকার সংরক্ষিত': 'All Rights Reserved'
    }
};

// ================================
// LOADING SCREEN - IMMEDIATE FIX
// ================================

// Function to hide loading screen
function hideLoadingScreenNow() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        loadingScreen.style.pointerEvents = 'none';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Hide loading screen after 1.5 seconds
setTimeout(hideLoadingScreenNow, 1500);

// Also hide when page fully loads
window.addEventListener('load', function() {
    hideLoadingScreenNow();
});

// Hide on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    hideLoadingScreenNow();
});

// ================================
// MAIN INITIALIZATION
// ================================

window.addEventListener('load', function() {
    console.log('🚀 ইসমাইল পোর্টফোলিও লোড হচ্ছে...');
    
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
    
    // Final loading screen hide
    hideLoadingScreenNow();
    
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
    
    // Update all translations
    updateAllTranslations(lang);
}

function updateAllTranslations(language) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = TRANSLATIONS[language] && TRANSLATIONS[language][key];
        
        if (translation) {
            element.textContent = translation;
        }
    });
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
            const sectionHeight = section.clientHeight;
            
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

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// ================================
// SHOW NOTIFICATION
// ================================

function showNotification(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white px-6 py-4 rounded-lg shadow-lg fixed bottom-24 right-4 z-50`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// ================================
// PERFORMANCE MONITORING
// ================================

function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const connectTime = timing.responseEnd - timing.requestStart;
        
        console.log(`⏱️ পেজ লোড টাইম: ${loadTime}ms`);
        console.log(`🌐 সংযোগ টাইম: ${connectTime}ms`);
    }
}

// Log metrics when page is fully loaded
window.addEventListener('load', function() {
    setTimeout(logPerformanceMetrics, 0);
});

// ================================
// LAZY LOADING
// ================================

function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// ================================
// SCROLL TO TOP BUTTON
// ================================

function handleScrollToTop() {
    window.addEventListener('scroll', function() {
        const scrollTopBtn = document.querySelector('.scroll-to-top');
        if (window.pageYOffset > 300) {
            if (scrollTopBtn) scrollTopBtn.style.display = 'block';
        } else {
            if (scrollTopBtn) scrollTopBtn.style.display = 'none';
        }
    });
}

handleScrollToTop();

// ================================
// EXPORT FOR DEBUGGING
// ================================

window.ismailDebug = {
    getCurrentTheme,
    getCurrentLanguage,
    toggleTheme,
    toggleLanguage,
    hideLoadingScreenNow,
    CONFIG,
    TRANSLATIONS,
    showNotification
};

console.log('💡 ডিবাগ ইনফো উপলব্ধ: window.ismailDebug');
