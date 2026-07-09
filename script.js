const langBtn = document.getElementById('lang-btn');
const langTexts = document.querySelectorAll('.lang-text');
let currentLang = 'bn'; // ডিফল্ট ভাষা বাংলা

// ১. বাংলা-ইংলিশ ভাষা পরিবর্তন করার সিস্টেম
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

// ২. প্রোডাক্টের নাম ও দামসহ হোয়াটসঅ্যাপে অর্ডার মেসেজ পাঠানোর সিস্টেম
const orderButtons = document.querySelectorAll('.order-btn');

orderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // ক্লিক করা প্রোডাক্ট কার্ড থেকে তথ্য নেওয়া
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        // তোর লাইভ ডোমেইনের ছবির লিংক তৈরি করা
        const productImageSrc = productCard.querySelector('img').getAttribute('src');
        const liveImageLink = `https://mihadx.pro.bd/${productImageSrc}`;

        // 📝 এখানে তোর নিজের হোয়াটসঅ্যাপ নাম্বারটি দেশের কোডসহ বসিয়ে দে (যেমন: 88017XXXXXXXX)
        const whatsappNumber = "8801XXXXXXXXX"; 

        // কাস্টমারের জন্য সুন্দর একটি মেসেজ ফরম্যাট
        const message = `হ্যালো মিহাদ, আমি আপনার ওয়েবসাইট থেকে এই প্রোডাক্টটি অর্ডার করতে চাই:\n\n` +
                        `📦 প্রোডাক্ট: ${productName}\n` +
                        `💰 দাম: ${productPrice}\n` +
                        `🖼️ প্রোডাক্টের ছবি: ${liveImageLink}\n\n` +
                        `দয়া করে অর্ডারটি কনফার্ম করার প্রসেসটি জানান।`;

        // মেসেজটিকে হোয়াটসঅ্যাপ লিংকে রূপান্তর করা
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

        // নতুন ট্যাবে হোয়াটসঅ্যাপ ওপেন করা
        window.open(whatsappUrl, '_blank');
    });
});
