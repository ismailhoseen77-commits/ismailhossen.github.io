const langBtn = document.getElementById('lang-btn');
const langTexts = document.querySelectorAll('.lang-text');
let currentLang = 'bn'; // ডিফল্ট ভাষা বাংলা

// ১. ভাষা পরিবর্তন করার লজিক (গেঞ্জিসহ নতুন সব মেনু সাপোর্ট করবে)
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

// ২. ড্রপ শোল্ডার ও অন্য সব প্রোডাক্টের নাম ও ছবির লিংকসহ হোয়াটসঅ্যাপ অর্ডার সিস্টেম
const orderButtons = document.querySelectorAll('.order-btn');

orderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        const productImageSrc = productCard.querySelector('img').getAttribute('src');
        const liveImageLink = `https://mihadx.pro.bd/${productImageSrc}`;

        // 📝 এখানে তোর নিজের ১X ডিজিটের আসল হোয়াটসঅ্যাপ নাম্বারটি বসিয়ে নিবি (যেমন: 8801700000000)
        const whatsappNumber = "8801XXXXXXXXX"; 

        const message = `হ্যালো মিহাদ, আমি আপনার ওয়েবসাইট থেকে এই প্রোডাক্টটি অর্ডার করতে চাই:\n\n` +
                        `📦 প্রোডাক্ট: ${productName}\n` +
                        `💰 দাম: ${productPrice}\n` +
                        `🖼️ প্রোডাক্টের ছবি: ${liveImageLink}\n\n` +
                        `দয়া করে অর্ডারটি কনফার্ম করার প্রসেসটি জানান।`;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});
