// ডকুমেন্ট রেডি হওয়ার পর রান হবে
document.addEventListener("DOMContentLoaded", function() {

    // এলিমেন্ট রেফারেন্স নেওয়া
    const welcomePage = document.getElementById('welcome-page');
    const mainSite = document.getElementById('main-site');
    const continueBtn = document.getElementById('continue-btn');
    const infoForm = document.getElementById('info-form');

    // ১. স্বাগতম উইন্ডো বন্ধ করে হোমপেজ ওপেন করার রিয়েল মেকানিজম
    function activateMainWebsite() {
        // স্বাগতম পেজ একদম বন্ধ
        welcomePage.style.display = 'none';
        // মেইন সাইট একদম চালু
        mainSite.style.display = 'block';
        // ডিফল্টভাবে হোম সেকশন ওপেন নিশ্চিত করা
        showRequestedSection('home');
    }

    // বাটনে ক্লিক করলে কাজ করবে
    continueBtn.addEventListener('click', activateMainWebsite);

    // ফর্ম সাবমিট করলেও কাজ করবে
    infoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        activateMainWebsite();
    });


    // ২. ট্যাব ভিত্তিক পেইজ চেঞ্জ লজিক (কোনো স্ক্রলিং বা ওভারল্যাপ হবে না)
    const navButtons = document.querySelectorAll('.nav-btn');
    const allSections = document.querySelectorAll('.page-section');
    const logoButton = document.getElementById('logo-home');

    function showRequestedSection(sectionId) {
        // সব সেকশন সম্পূর্ণ অদৃশ্য করে দেওয়া
        allSections.forEach(sec => {
            sec.style.display = 'none';
        });

        // শুধুমাত্র ক্লিক করা নির্দিষ্ট সেকশনটি অন করা
        const activeSec = document.getElementById(sectionId);
        if (activeSec) {
            activeSec.style.display = 'block';
        }

        // নেভিগেশন বারের একটিভ বর্ডার কালার রিমুভ ও অ্যাড করা
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === sectionId) {
                btn.classList.add('active');
            }
        });
    }

    // প্রতিটা বাটনের ক্লিকের ইভেন্ট লিসেনার
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-target');
            showRequestedSection(targetPage);
        });
    });

    // লোগোতে চাপ দিলে ডাইরেক্ট হোমপেজে ব্যাক করবে
    logoButton.addEventListener('click', function() {
        showRequestedSection('home');
    });


    // ৩. কাস্টম অটোমেটেড হোয়াটসঅ্যাপ মেসেজ
    const orderButtons = document.querySelectorAll('.buy-now');
    orderButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedItem = this.getAttribute('data-item');
            const targetPhone = "8801XXXXXXXXX"; // এখানে তোর রিয়েল নাম্বার দিবি ভাই
            const customMsg = `হ্যালো মিহাদ ভাই, আমি আপনার ওয়েবসাইট ব্রাউজ করে "${selectedItem}" প্রোডাক্টটি অর্ডার করতে চাচ্ছি। দয়া করে প্রসেসটি জানাবেন।`;
            
            window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(customMsg)}`, '_blank');
        });
    });

});
