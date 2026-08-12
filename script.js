document.addEventListener('DOMContentLoaded', function() {
    // --- Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

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

    // --- Language Toggle (BN / EN) ---
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');

    const translations = {
        bn: {
            title: "ইসমাইল হোসেন",
            name: "ইসমাইল হোসেন",
            subtitle: "নিহাদ",
            aboutTitle: "আমার সম্পর্কে",
            aboutP1: "আমি ইসমাইল হোসেন নিহাদ। আমি একজন আগ্রহী শিক্ষার্থী এবং বর্তমানে Computer Operation, Web Development ও Freelancing-এর দক্ষতা অর্জন করছি।",
            aboutP2: "আমি MS Word, MS Excel, Internet Browsing এবং বেসিক ওয়েব ডিজাইনের কাজ শিখছি। নতুন প্রযুক্তি শেখা, সমস্যা সমাধান করা এবং নিজের দক্ষতা উন্নত করার প্রতি আমার আগ্রহ রয়েছে।",
            aboutP3: "আমার লক্ষ্য হলো একজন দক্ষ ফ্রিল্যান্সার হিসেবে নিজেকে গড়ে তোলা এবং ক্লায়েন্টদের জন্য মানসম্মত ডিজিটাল সেবা প্রদান করা।",
            waText: "WhatsApp এ যোগাযোগ করুন",
            fbText: "Facebook এ দেখুন",
            mailText: "ইমেইল করুন",
            productsTitle: "আমাদের পণ্য",
            shirt: "শার্ট",
            pants: "প্যান্ট",
            shoes: "জুতা",
            tshirt: "টি-শার্ট",
            coming: "শীঘ্রই আসছে",
            skillsTitle: "আমার দক্ষতা ও কাজ",
            wordDesc: "ডকুমেন্ট, ফরম্যাটিং, CV তৈরি",
            wordLvl: "দক্ষতা ৯০%",
            excelDesc: "ডাটা এন্ট্রি, ফর্মুলা, রিপোর্ট",
            excelLvl: "দক্ষতা ৮৫%",
            dataDesc: "নির্ভুল টাইপিং, কপি-পেস্ট",
            dataLvl: "দক্ষতা ৯৫%",
            compTitle: "কম্পিউটার",
            compDesc: "ফাইল, ইন্টারনেট, সফটওয়্যার",
            compLvl: "দক্ষতা ৯০%",
            toggleBtn: "EN"
        },
        en: {
            title: "Ismail Hossen",
            name: "Ismail Hossen",
            subtitle: "Nihad",
            aboutTitle: "About Me",
            aboutP1: "I am Ismail Hossen Nihad. I am an enthusiastic student currently acquiring skills in Computer Operation, Web Development, and Freelancing.",
            aboutP2: "I am learning MS Word, MS Excel, Internet Browsing, and basic web design. I have a keen interest in learning new technologies, problem-solving, and improving my skills.",
            aboutP3: "My goal is to build myself as a skilled freelancer and provide quality digital services to clients.",
            waText: "Contact on WhatsApp",
            fbText: "View on Facebook",
            mailText: "Send Email",
            productsTitle: "Our Products",
            shirt: "Shirt",
            pants: "Pants",
            shoes: "Shoes",
            tshirt: "T-Shirt",
            coming: "Coming Soon",
            skillsTitle: "My Skills & Work",
            wordDesc: "Documents, Formatting, CV",
            wordLvl: "Skill 90%",
            excelDesc: "Data Entry, Formulas, Reports",
            excelLvl: "Skill 85%",
            dataDesc: "Accurate Typing, Copy-Paste",
            dataLvl: "Skill 95%",
            compTitle: "Computer",
            compDesc: "Files, Internet, Software",
            compLvl: "Skill 90%",
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
        document.querySelector('.lang-title').textContent = translations[lang].title;
        document.querySelector('.lang-name').textContent = translations[lang].name;
        document.querySelector('.lang-subtitle').textContent = translations[lang].subtitle;
        document.querySelector('.lang-about-title').textContent = translations[lang].aboutTitle;
        document.querySelector('.lang-about-p1').textContent = translations[lang].aboutP1;
        document.querySelector('.lang-about-p2').textContent = translations[lang].aboutP2;
        document.querySelector('.lang-about-p3').textContent = translations[lang].aboutP3;
        document.querySelector('.lang-wa').textContent = translations[lang].waText;
        document.querySelector('.lang-fb').textContent = translations[lang].fbText;
        document.querySelector('.lang-mail').textContent = translations[lang].mailText;
        document.querySelector('.lang-products-title').textContent = translations[lang].productsTitle;
        document.querySelector('.lang-shirt').textContent = translations[lang].shirt;
        document.querySelector('.lang-pants').textContent = translations[lang].pants;
        document.querySelector('.lang-shoes').textContent = translations[lang].shoes;
        document.querySelector('.lang-tshirt').textContent = translations[lang].tshirt;
        
        document.querySelectorAll('.lang-coming').forEach(el => el.textContent = translations[lang].coming);
        
        document.querySelector('.lang-skills-title').textContent = translations[lang].skillsTitle;
        document.querySelector('.lang-word-desc').textContent = translations[lang].wordDesc;
        document.querySelector('.lang-word-lvl').textContent = translations[lang].wordLvl;
        document.querySelector('.lang-excel-desc').textContent = translations[lang].excelDesc;
        document.querySelector('.lang-excel-lvl').textContent = translations[lang].excelLvl;
        document.querySelector('.lang-data-desc').textContent = translations[lang].dataDesc;
        document.querySelector('.lang-data-lvl').textContent = translations[lang].dataLvl;
        document.querySelector('.lang-comp-title').textContent = translations[lang].compTitle;
        document.querySelector('.lang-comp-desc').textContent = translations[lang].compDesc;
        document.querySelector('.lang-comp-lvl').textContent = translations[lang].compLvl;
        
        langText.textContent = translations[lang].toggleBtn;
    }
});
    
