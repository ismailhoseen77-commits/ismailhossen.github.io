document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('ai-toggle-btn');
    const chatBox = document.getElementById('ai-chat-box');
    const closeBtn = document.getElementById('ai-close');
    const sendBtn = document.getElementById('ai-send');
    const inputField = document.getElementById('ai-input');
    const messagesArea = document.getElementById('ai-messages');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => chatBox.classList.toggle('hidden'));
        closeBtn.addEventListener('click', () => chatBox.classList.add('hidden'));
        
        sendBtn.addEventListener('click', () => {
            let text = inputField.value.trim();
            if(!text) return;
            messagesArea.innerHTML += `<div class="user-msg"><b>You:</b> ${text}</div>`;
            inputField.value = '';
            setTimeout(() => {
                messagesArea.innerHTML += `<div class="ai-msg"><b>AI:</b> বিকাশ পেমেন্ট করতে সমস্যা হলে আমাদের WhatsApp (01576502490) এ যোগাযোগ করুন।</div>`;
                messagesArea.scrollTop = messagesArea.scrollHeight;
            }, 1000);
        });
    }
});

