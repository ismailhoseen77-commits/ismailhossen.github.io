// ==============================
// MIHADX.PRO.BD - script.js
// ==============================

// Elements
const welcomeScreen = document.getElementById("welcomeScreen");
const app = document.getElementById("app");
const continueBtn = document.getElementById("continueBtn");

// Continue Button
if (continueBtn) {
  continueBtn.addEventListener("click", function () {

    const name = document.getElementById("welcomeName").value.trim();
    const phone = document.getElementById("welcomePhone").value.trim();
    const address = document.getElementById("welcomeAddress").value.trim();

    if (name === "" || phone === "" || address === "") {
      alert("সব তথ্য পূরণ করুন");
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("address", address);

    showWebsite();
  });
}

// Show Website
function showWebsite() {

  if (welcomeScreen)
    welcomeScreen.style.display = "none";

  if (app)
    app.classList.remove("app-hidden");

  document.getElementById("userNameInline").innerHTML =
    localStorage.getItem("name");

  document.getElementById("profileNameCard").innerHTML =
    localStorage.getItem("name");

  document.getElementById("userPhone").innerHTML =
    localStorage.getItem("phone");

  document.getElementById("userAddress").innerHTML =
    localStorage.getItem("address");

  document.getElementById("contactAddress").innerHTML =
    localStorage.getItem("address");

}

// Auto Login

window.onload = function () {

  if (
    localStorage.getItem("name") &&
    localStorage.getItem("phone") &&
    localStorage.getItem("address")
  ) {

    showWebsite();

  }

  document.getElementById("year").innerHTML =
    new Date().getFullYear();

};

// Theme

const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {

themeBtn.onclick = function () {

if(document.body.dataset.theme=="dark"){

document.body.dataset.theme="light";

themeBtn.innerHTML="☀️";

}else{

document.body.dataset.theme="dark";

themeBtn.innerHTML="🌙";

}

}

}

// Language

const langBtn=document.getElementById("langToggle");

if(langBtn){

langBtn.onclick=function(){

if(langBtn.innerHTML=="EN"){

langBtn.innerHTML="BN";

}else{

langBtn.innerHTML="EN";

}

}

}

// WhatsApp

function whatsapp(message){

window.open(

"https://wa.me/8801576502490?text="+
encodeURIComponent(message),

"_blank"

);

}

// Product Order

document.querySelectorAll("[data-product]").forEach(btn=>{

btn.onclick=function(){

let p=this.dataset.product;

whatsapp("আমি "+p+" অর্ডার করতে চাই।");

}

});

// Service Order

document.querySelectorAll("[data-service]").forEach(btn=>{

btn.onclick=function(){

let s=this.dataset.service;

whatsapp("আমি "+s+" সার্ভিস নিতে চাই।");

}

});

// Mobile Menu

const menuBtn=document.getElementById("menuToggle");

const nav=document.getElementById("navMenu");

if(menuBtn){

menuBtn.onclick=function(){

nav.classList.toggle("show");

}

}

// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});

document.getElementById("continueBtn").onclick = function () {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("app").classList.remove("app-hidden");
};
