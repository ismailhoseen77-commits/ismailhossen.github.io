document.addEventListener("DOMContentLoaded", function() {

    // ✅ এখানে তোমার হোয়াটসঅ্যাপ নাম্বারটি সেট করা আছে
    const MY_WHATSAPP_NUMBER = "8801576502490"; 

    const welcomePage = document.getElementById('welcome-page');
    const mainSite = document.getElementById('main-site');
    const continueBtn = document.getElementById('continue-btn');
    const infoForm = document.getElementById('info-form');

    function activateMainWebsite() {
        welcomePage.style.display = 'none';
        mainSite.style.display = 'block';
        showRequestedSection('home');
    }

    continueBtn.addEventListener('click', activateMainWebsite);
    infoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        activateMainWebsite();
    });

    const navButtons = document.querySelectorAll('.nav-btn');
    const allSections = document.querySelectorAll('.page-section');
    const logoButton = document.getElementById('logo-home');

    function showRequestedSection(sectionId) {
        allSections.forEach(sec => sec.style.display = 'none');
        const activeSec = document.getElementById(sectionId);
        if (activeSec) activeSec.style.display = 'block';
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === sectionId) btn.classList.add('active');
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-target');
            showRequestedSection(targetPage);
        });
    });

    logoButton.addEventListener('click', () => showRequestedSection('home'));

    // ✅ সব প্রোডাক্ট অর্ডারের জন্য হোয়াটসঅ্যাপ লজিক
    const orderButtons = document.querySelectorAll('.buy-now');
    orderButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedItem = this.getAttribute('data-item');
            const customMsg = `হ্যালো মিহাদ ভাই, আমি আপনার ওয়েবসাইট থেকে "${selectedItem}" প্রোডাক্টটি অর্ডার করতে চাচ্ছি।`;
            window.open(`https://wa.me/${MY_WHATSAPP_NUMBER}?text=${encodeURIComponent(customMsg)}`, '_blank');
        });
    });

    // ✅ মেইন অর্ডার বাটনের জন্য লজিক
    const mainWhatsappBtn = document.getElementById('main-whatsapp-btn');
    if (mainWhatsappBtn) {
        mainWhatsappBtn.addEventListener('click', function() {
            const customMsg = "হ্যালো মিহাদ ভাই, আমি আপনার ওয়েবসাইট ব্রাউজ করে সরাসরি অর্ডারের জন্য যোগাযোগ করছি।";
            window.open(`https://wa.me/${MY_WHATSAPP_NUMBER}?text=${encodeURIComponent(customMsg)}`, '_blank');
        });
    }
});
                
