document.addEventListener('DOMContentLoaded', function() {
    // --- Dark Mode Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        htmlElement.classList.add('dark');
    }

    themeToggleBtn.addEventListener('click', function() {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Language Toggle Logic ---
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');

    // Text translations object
    const translations = {
        bn: {
            name: "ইসমাইল হোসেন",
            subtitle: "নিহাদ",
            aboutTitle: "আমার সম্পর্কে",
            aboutDesc: "আমি ইসমাইল হোসেন নিহাদ। আমি একজন আগ্রহী শিক্ষার্থী এবং বর্তমানে Computer Operation, Web Development ও Freelancing-এর দক্ষতা অর্জন করছি।",
            waText: "WhatsApp এ যোগাযোগ করুন",
            fbText: "Facebook এ দেখুন",
            skillsTitle: "আমার দক্ষতা ও কাজ",
            wordDesc: "ডকুমেন্ট, ফরম্যাটিং, CV তৈরি",
            excelDesc: "ডাটা এন্ট্রি, ফর্মুলা, রিপোর্ট",
            toggleBtn: "EN"
        },
        en: {
            name: "Ismail Hossen",
            subtitle: "Nihad",
            aboutTitle: "About Me",
            aboutDesc: "I am Ismail Hossen Nihad. I am an enthusiastic student currently acquiring skills in Computer Operation, Web Development, and Freelancing.",
            waText: "Contact on WhatsApp",
            fbText: "View on Facebook",
            skillsTitle: "My Skills & Work",
            wordDesc: "Documents, Formatting, CV",
            excelDesc: "Data Entry, Formulas, Reports",
            toggleBtn: "BN"
        }
    };

    let currentLang = localStorage.getItem('lang') || 'bn';
    setLanguage(currentLang);

    langToggleBtn.addEventListener('click', function() {
        currentLang = currentLang === 'bn' ? 'en' : 'bn';
        localStorage.setItem('lang', currentLang);
        setLanguage(currentLang);
    });

    function setLanguage(lang) {
        document.querySelector('.lang-name').textContent = translations[lang].name;
        document.querySelector('.lang-subtitle').textContent = translations[lang].subtitle;
        document.querySelector('.lang-about-title').textContent = translations[lang].aboutTitle;
        document.querySelector('.lang-about-desc').textContent = translations[lang].aboutDesc;
        document.querySelector('.lang-wa').textContent = translations[lang].waText;
        document.querySelector('.lang-fb').textContent = translations[lang].fbText;
        document.querySelector('.lang-skills-title').textContent = translations[lang].skillsTitle;
        document.querySelector('.lang-word-desc').textContent = translations[lang].wordDesc;
        document.querySelector('.lang-excel-desc').textContent = translations[lang].excelDesc;
        langText.textContent = translations[lang].toggleBtn;
    }
});
