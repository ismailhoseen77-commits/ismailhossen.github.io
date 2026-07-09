const phoneNumber = "8801576502490";
const defaultProfile = {
  name: "Ismail Hossen Nihad",
  phone: "01576502490",
  address: "চট্টগ্রাম, বাংলাদেশ",
};

const I18N = {
  bn: {
    welcomeSubtitle: "আপনার নাম, মোবাইল নম্বর আর ঠিকানা দিন।",
    nameLabel: "নাম",
    mobileLabel: "মোবাইল নম্বর",
    addressLabel: "ঠিকানা",
    phName: "আপনার নাম লিখুন",
    phPhone: "01XXXXXXXXX",
    phAddress: "আপনার ঠিকানা লিখুন",
    continueBtn: "Continue",

    navHome: "হোম",
    navAbout: "আমার সম্পর্কে",
    navSkills: "দক্ষতা",
    navWork: "কাজ",
    navShop: "শপ",
    navOrder: "অর্ডার",
    navContact: "কন্টাক্ট",

    eyebrow: "ডিজিটাল সার্ভিস ও ই-কমার্স",
    heroHello: "আমি",
    heroDesc: "আমি Excel, Word, Data Entry এবং অনলাইন সার্ভিস দিই। দ্রুত কাজ, পরিষ্কার ডেলিভারি, আর প্রফেশনাল উপস্থাপনাই আমার লক্ষ্য।",
    metaLocation: "ঠিকানা",
    metaPhone: "ফোন",
    metaEmail: "ইমেইল",
    ctaOrder: "অর্ডার করুন",
    ctaContact: "যোগাযোগ",
    profileCardLabel: "প্রোফাইল",
    statusOpen: "Available",
    statServices: "সার্ভিস",
    statSamples: "নমুনা",
    statSupport: "সাপোর্ট",

    aboutEyebrow: "আমার সম্পর্কে",
    aboutTitle: "কে আমি এবং কী করি",
    aboutDesc1: "আমি ডকুমেন্ট কাজ, Excel Sheet, Word ফাইল, Data Entry এবং ছোটখাটো ডিজিটাল সার্ভিস নিয়ে কাজ করি।",
    aboutDesc2: "আমার লক্ষ্য হলো ক্লায়েন্টকে পরিষ্কার, নির্ভুল এবং সময়মতো কাজ দেওয়া। পাশাপাশি আমি ই-কমার্স শপেও প্রোডাক্ট আপডেট রাখি।",
    aboutChip1: "দ্রুত কাজ",
    aboutChip2: "পরিষ্কার ডেলিভারি",
    aboutChip3: "WhatsApp Order",
    aboutChip4: "Mobile Friendly",

    skillsEyebrow: "দক্ষতা",
    skillsTitle: "আমি যেসব কাজে পারদর্শী",
    skill1Title: "Excel Sheet",
    skill1Desc: "ডাটা সাজানো, টেবিল, ফর্মুলা, রিপোর্ট এবং সুন্দর শিট তৈরি।",
    skill2Title: "Word Processor",
    skill2Desc: "পেশাদার ডকুমেন্ট, লেটার, টাইপিং এবং ফরম্যাটিং।",
    skill3Title: "Data Entry",
    skill3Desc: "দ্রুত ও নির্ভুল ডাটা এন্ট্রি, কপি-পেস্ট, সাজানো ডাটা।",

    workEyebrow: "কাজের নমুনা",
    workTitle: "আমার কিছু কাজের প্রমাণ",
    work1Title: "Salary Sheet",
    work2Title: "Wage Sheet",
    work3Title: "Electricity Bill",

    shopEyebrow: "শপ",
    shopTitle: "আমার ই-কমার্স প্রোডাক্ট",
    product1Title: "Money Era Premium T-Shirt",
    product1Desc: "Premium cotton, clean design, comfortable fit.",
    product2Title: "Shirt",
    product3Title: "Pant",
    comingSoon: "Coming Soon",
    comingDesc: "নতুন প্রোডাক্ট খুব শীঘ্রই আসছে।",

    orderEyebrow: "অর্ডার",
    orderTitle: "সার্ভিস অর্ডার করুন",
    service1Title: "Excel Service",
    service1Desc: "Sheet, formula, report, data organization.",
    service2Title: "Word Service",
    service2Desc: "Typing, formatting, document work.",
    service3Title: "Data Entry Service",
    service3Desc: "Fast and accurate data entry support.",
    orderBtn: "অর্ডার করুন",

    contactEyebrow: "যোগাযোগ",
    contactTitle: "আমার সাথে যোগাযোগ করুন",
    contactCardTitle: "কন্টাক্ট তথ্য",
    quickOrderTitle: "দ্রুত অর্ডার",
    quickExcel: "Excel",
    quickWord: "Word",
    quickDataEntry: "Data Entry",
    quickTshirt: "T-Shirt",

    footerText: "সব অধিকার সংরক্ষিত।",

    serviceLabelExcel: "Excel Service",
    serviceLabelWord: "Word Service",
    serviceLabelData: "Data Entry Service",
    productLabelShirt: "Money Era Premium T-Shirt",
    genericWhatsApp: "আসসালামু আলাইকুম, আমি আপনার সাথে যোগাযোগ করতে চাই।"
  },
  en: {
    welcomeSubtitle: "Enter your name, mobile number and address.",
    nameLabel: "Name",
    mobileLabel: "Mobile Number",
    addressLabel: "Address",
    phName: "Type your name",
    phPhone: "01XXXXXXXXX",
    phAddress: "Type your address",
    continueBtn: "Continue",

    navHome: "Home",
    navAbout: "About",
    navSkills: "Skills",
    navWork: "Work",
    navShop: "Shop",
    navOrder: "Order",
    navContact: "Contact",

    eyebrow: "Digital Services & E-commerce",
    heroHello: "I am",
    heroDesc: "I provide Excel, Word, Data Entry and online services. Fast work, clean delivery and professional presentation are my goals.",
    metaLocation: "Address",
    metaPhone: "Phone",
    metaEmail: "Email",
    ctaOrder: "Order Now",
    ctaContact: "Contact",
    profileCardLabel: "Profile",
    statusOpen: "Available",
    statServices: "Services",
    statSamples: "Samples",
    statSupport: "Support",

    aboutEyebrow: "About",
    aboutTitle: "Who I am and what I do",
    aboutDesc1: "I work on document tasks, Excel sheets, Word files, data entry and small digital services.",
    aboutDesc2: "My goal is to deliver clean, accurate and on-time work. I also keep product updates in my e-commerce shop.",
    aboutChip1: "Fast Work",
    aboutChip2: "Clean Delivery",
    aboutChip3: "WhatsApp Order",
    aboutChip4: "Mobile Friendly",

    skillsEyebrow: "Skills",
    skillsTitle: "What I am good at",
    skill1Title: "Excel Sheet",
    skill1Desc: "Data arrangement, tables, formulas, reports and neat sheets.",
    skill2Title: "Word Processor",
    skill2Desc: "Professional documents, letters, typing and formatting.",
    skill3Title: "Data Entry",
    skill3Desc: "Fast and accurate data entry, copy-paste and organized data.",

    workEyebrow: "Work Samples",
    workTitle: "Proof of my work",
    work1Title: "Salary Sheet",
    work2Title: "Wage Sheet",
    work3Title: "Electricity Bill",

    shopEyebrow: "Shop",
    shopTitle: "My e-commerce products",
    product1Title: "Money Era Premium T-Shirt",
    product1Desc: "Premium cotton, clean design, comfortable fit.",
    product2Title: "Shirt",
    product3Title: "Pant",
    comingSoon: "Coming Soon",
    comingDesc: "New products are coming very soon.",

    orderEyebrow: "Order",
    orderTitle: "Order a service",
    service1Title: "Excel Service",
    service1Desc: "Sheet, formula, report, data organization.",
    service2Title: "Word Service",
    service2Desc: "Typing, formatting, document work.",
    service3Title: "Data Entry Service",
    service3Desc: "Fast and accurate data entry support.",
    orderBtn: "Order Now",

    contactEyebrow: "Contact",
    contactTitle: "Get in touch with me",
    contactCardTitle: "Contact info",
    quickOrderTitle: "Quick Order",
    quickExcel: "Excel",
    quickWord: "Word",
    quickDataEntry: "Data Entry",
    quickTshirt: "T-Shirt",

    footerText: "All rights reserved.",

    serviceLabelExcel: "Excel Service",
    serviceLabelWord: "Word Service",
    serviceLabelData: "Data Entry Service",
    productLabelShirt: "Money Era Premium T-Shirt",
    genericWhatsApp: "Hello, I want to contact you."
  }
};

let currentLang = localStorage.getItem("siteLang") || "bn";
let currentTheme = localStorage.getItem("siteTheme") || "dark";

const $ = (sel) => document.querySelector(sel);
const profile = JSON.parse(localStorage.getItem("visitorProfile") || "null") || defaultProfile;

function applyTheme(theme) {
  currentTheme = theme;
  document.body.dataset.theme = theme;
  localStorage.setItem("siteTheme", theme);
  $("#themeToggle").textContent = theme === "dark" ? "🌙" : "☀️";
}

function translatePage(lang) {
  currentLang = lang;
  localStorage.setItem("siteLang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (I18N[lang][key]) el.textContent = I18N[lang][key];
  });

  document.querySelectorAll("[data-placeholder]").forEach((el) => {
    const key = el.dataset.placeholder;
    if (I18N[lang][key]) el.placeholder = I18N[lang][key];
  });

  $("#langToggle").textContent = lang === "bn" ? "EN" : "BN";

  const heroName = profile.name || defaultProfile.name;
  $("#userNameInline").textContent = heroName;
  $("#profileNameCard").textContent = heroName;
  $("#userAddress").textContent = profile.address || defaultProfile.address;
  $("#contactAddress").textContent = profile.address || defaultProfile.address;
  $("#userPhone").textContent = profile.phone || defaultProfile.phone;
  $("#year").textContent = new Date().getFullYear();

  const hello = I18N[lang].heroHello;
  $("#heroHelloSpan")?.remove();

  const title = lang === "bn" ? `${hello} ${heroName}` : `I am ${heroName}`;
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    heroTitle.innerHTML = `<span>${hello}</span> <span id="userNameInline">${heroName}</span>`;
  }

  activeNavByScroll();
}

function saveAndEnter() {
  const name = $("#welcomeName").value.trim();
  const phone = $("#welcomePhone").value.trim();
  const address = $("#welcomeAddress").value.trim();

  const safeProfile = {
    name: name || defaultProfile.name,
    phone: phone || defaultProfile.phone,
    address: address || defaultProfile.address,
  };

  localStorage.setItem("visitorProfile", JSON.stringify(safeProfile));
  localStorage.setItem("welcomeDone", "1");

  location.reload();
}

function whatsappMessage(text) {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener");
}

function openOrderByButton(btn) {
  const lang = currentLang;
  const p = profile.name || defaultProfile.name;

  let text = I18N[lang].genericWhatsApp;

  if (btn.dataset.service === "excel") {
    text = lang === "bn"
      ? `আসসালামু আলাইকুম ${p}, আমি ${I18N[lang].serviceLabelExcel} অর্ডার করতে চাই।`
      : `Hello ${p}, I want to order ${I18N[lang].serviceLabelExcel}.`;
  } else if (btn.dataset.service === "word") {
    text = lang === "bn"
      ? `আসসালামু আলাইকুম ${p}, আমি ${I18N[lang].serviceLabelWord} অর্ডার করতে চাই।`
      : `Hello ${p}, I want to order ${I18N[lang].serviceLabelWord}.`;
  } else if (btn.dataset.service === "dataentry") {
    text = lang === "bn"
      ? `আসসালামু আলাইকুম ${p}, আমি ${I18N[lang].serviceLabelData} অর্ডার করতে চাই।`
      : `Hello ${p}, I want to order ${I18N[lang].serviceLabelData}.`;
  } else if (btn.dataset.product === "shirt") {
    text = lang === "bn"
      ? `আসসালামু আলাইকুম ${p}, আমি ${I18N[lang].productLabelShirt} অর্ডার করতে চাই।`
      : `Hello ${p}, I want to order ${I18N[lang].productLabelShirt}.`;
  }

  whatsappMessage(text);
}

function activeNavByScroll() {
  const sections = ["home", "about", "skills", "work", "shop", "order", "contact"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const links = [...document.querySelectorAll(".nav-menu a")];

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px", threshold: 0.1 });

  sections.forEach(sec => io.observe(sec));
}

document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();

  applyTheme(currentTheme);
  translatePage(currentLang);

  const welcomeDone = localStorage.getItem("welcomeDone") === "1";
  if (welcomeDone) {
    $("#welcomeScreen").classList.add("hidden");
    $("#app").classList.remove("app-hidden");
  } else {
    $("#welcomeScreen").classList.remove("hidden");
    $("#app").classList.add("app-hidden");
  }

  if (welcomeDone) {
    translatePage(currentLang);
  }

  $("#welcomeName").value = profile.name || "";
  $("#welcomePhone").value = profile.phone || "";
  $("#welcomeAddress").value = profile.address || "";

  $("#continueBtn").addEventListener("click", saveAndEnter);

  $("#themeToggle").addEventListener("click", () => {
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });

  $("#langToggle").addEventListener("click", () => {
    translatePage(currentLang === "bn" ? "en" : "bn");
  });

  $("#menuToggle").addEventListener("click", () => {
    $("#navMenu").classList.toggle("open");
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      $("#navMenu").classList.remove("open");
    });
  });

  document.querySelectorAll("[data-service], [data-product]").forEach((btn) => {
    btn.addEventListener("click", () => openOrderByButton(btn));
  });

  $("#floatingWhatsapp").addEventListener("click", () => {
    whatsappMessage(I18N[currentLang].genericWhatsApp);
  });

  activeNavByScroll();
});
