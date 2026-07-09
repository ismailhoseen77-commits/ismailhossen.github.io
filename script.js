// ১. পপ-আপ ফর্ম ডেটা ও ক্লোজিং সিস্টেম
const welcomeModal = document.getElementById('welcome-modal');
const skipBtn = document.getElementById('skip-btn');
const userInfoForm = document.getElementById('user-info-form');

skipBtn.addEventListener('click', () => {
    welcomeModal.style.display = 'none';
});

userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value;
    const address = document.getElementById('user-address').value;
    const phone = document.getElementById('user-phone').value;
    
    console.log("Customer Information Captured:", { name, address, phone });
    welcomeModal.style.display = 'none';
});


// ২. 🎞️ অলিম্পিক স্মুথনেস সহ ডানপাশ থেকে বামপাশে পেজ স্লাইড করার লজিক
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.slide-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const currentActiveSection = document.querySelector('.slide-section.active');

        if (targetSection !== currentActiveSection) {
            if (currentActiveSection) {
                currentActiveSection.style.left = '-100%';
                currentActiveSection.style.opacity = '0';
                setTimeout(() => {
                    currentActiveSection.classList.remove('active');
                    currentActiveSection.style.display = 'none';
                }, 700);
            }

            targetSection.style.display = 'block';
            targetSection.style.left = '100%';
            targetSection.style.opacity = '0';
            
            setTimeout(() => {
                targetSection.classList.add('active');
                targetSection.style.left = '0';
                targetSection.style.opacity = '1';
            }, 50);
        }
    });
});


// ৩. মেগা ল্যাঙ্গুয়েজ ট্রান্সলেটর সুইচ (বাংলা <-> ইংলিশ)
const langBtn = document.getElementById('lang-btn');
const langTexts = document.querySelectorAll('.lang-text');
let currentLang = 'bn';

langBtn.addEventListener('click', () => {
    if (currentLang === 'bn') {
        langTexts.forEach(text => {
            text.textContent = text.getAttribute('data-en');
        });
        langBtn.textContent = 'বাংলা';
        currentLang = 'en';
    } else {
        langTexts.forEach(text => {
            text.textContent = text.getAttribute('data-bn');
        });
        langBtn.textContent = 'English';
        currentLang = 'bn';
    }
});


// ৪. অটোমেটেড হোয়াটসঅ্যাপ ইন্টেলিজেন্ট অর্ডার জেনারেটর
const orderButtons = document.querySelectorAll('.order-btn');
orderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent.split(' ')[0]; // শুধুমাত্র অফার প্রাইজ নেবে
        
        const productImageSrc = productCard.querySelector('img').getAttribute('src');
        const liveImageLink = `https://mihadx.pro.bd/${productImageSrc}`;

        // 📝 এখানে তোর নিজের হোয়াটসঅ্যাপ নাম্বারটি দেশের কোডসহ টাইপ করবি
        const whatsappNumber = "8801XXXXXXXXX"; 

        const message = `হ্যালো ইসমাইল মিহাদ, আমি আপনার ওয়েবসাইট ভিজিট করে এই প্রোডাক্টটি সরাসরি অর্ডার করতে চাচ্ছি:\n\n` +
                        `📦 প্রোডাক্টের নাম: ${productName}\n` +
                        `💰 অফার মূল্য: ${productPrice}\n` +
                        `🖼️ প্রোডাক্টের ছবি: ${liveImageLink}\n\n` +
                        `অনুগ্রহ করে অর্ডারটি দ্রুত কনফার্ম করার প্রসেসটি আমাকে জানান। ধন্যবাদ!`;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});
