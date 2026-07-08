:root {
    --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
    --glass-bg: rgba(255, 255, 255, 0.06);
    --glass-border: rgba(255, 255, 255, 0.1);
    --text-color: #f1f5f9;
    --primary-btn: #4f46e5;
    --primary-hover: #6366f1;
    --blur: blur(16px);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: var(--bg-gradient); background-attachment: fixed; color: var(--text-color); min-height: 100vh; }

/* 🚪 WELCOME OVERLAY */
.welcome-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #090d16; z-index: 9999; display: flex; justify-content: center; align-items: center; transition: all 0.5s ease; }
.welcome-content { text-align: center; padding: 20px; }
.enter-btn { background: var(--primary-btn); color: white; border: none; padding: 12px 24px; border-radius: 50px; cursor: pointer; font-weight: bold; margin-top: 20px; }
.welcome-overlay.fade-out { opacity: 0; visibility: hidden; }

/* 🌐 APP STYLE SCROLLABLE NAVBAR */
.navbar { position: fixed; top: 0; left: 0; width: 100%; background: rgba(15, 23, 42, 0.85); backdrop-filter: var(--blur); border-bottom: 1px solid var(--glass-border); padding: 12px 16px; z-index: 1000; display: flex; flex-direction: column; gap: 10px; }
.nav-logo { font-size: 20px; font-weight: 700; color: #fff; text-decoration: none; text-align: center; }
.nav-links { display: flex; gap: 6px; overflow-x: auto; width: 100%; padding-bottom: 4px; scrollbar-width: none; }
.nav-links::-webkit-scrollbar { display: none; } /* হাইড স্ক্রোলবার */
.nav-links a { color: #94a3b8; text-decoration: none; font-size: 13px; font-weight: 600; padding: 6px 12px; border-radius: 8px; cursor: pointer; white-space: nowrap; }
.nav-links a:hover, .nav-links a.active { background: var(--primary-btn); color: #fff; }

.container { max-width: 650px; margin: 130px auto 40px auto; padding: 0 16px; }
.page { display: none; }
.page.active { display: block; animation: slideUp 0.4s ease; }

/* 🎯 গোল ছবি ফিক্স */
.img-wrapper img { width: 150px; height: 150px; border-radius: 50% !important; object-fit: cover; border: 4px solid rgba(255, 255, 255, 0.2); box-shadow: 0 8px 24px rgba(0,0,0,0.3); margin-bottom: 15px; }
.hero-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 20px; padding: 30px 16px; text-align: center; }
.text-left { text-align: left; }
.inner-card { background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; margin-top: 10px; }

/* CARDS GRID */
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 15px; }
.card { background: rgba(255, 255, 255, 0.04); border: 1px solid var(--glass-border); padding: 20px 12px; border-radius: 16px; text-align: center; }
.font-2 { font-size: 24px; margin-bottom: 8px; color: var(--primary-btn); }
.text-word { color: #2b579a; } .text-excel { color: #217346; }

/* CONTACT ICONS */
.contact-grid { display: flex; justify-content: center; gap: 15px; margin-top: 20px; }
.c-box { width: 45px; height: 45px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-size: 20px; text-decoration: none; }
.wa { background: #25D366; } .fb { background: #1877f2; } .mail { background: #ea4335; }

/* FORM & BUTTONS */
.glass-form { background: rgba(255, 255, 255, 0.02); border: 1px solid var(--glass-border); padding: 20px; border-radius: 16px; }
.form-group input, .form-group textarea { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid var(--glass-border); background: rgba(15,23,42,0.6); color: white; margin-bottom: 12px; outline: none; }
.btn { padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; border: none; }
.btn-primary { background: var(--primary-btn); color: #fff; }
.w-100 { width: 100%; }

.lang-btn { position: fixed; bottom: 20px; right: 20px; width: 45px; height: 45px; border-radius: 50%; background: var(--primary-btn); color: white; border: none; font-weight: bold; cursor: pointer; z-index: 1001; }

@keyframes slideUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      
