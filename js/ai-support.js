const GEMINI_API_KEY = "AQ.Ab8RN6IdTrsS_L_NevxxLeOjtcDpo4Ba9VI9ZUQFO0wRzYrLGQ";

window.toggleAiWidget = function() {
    const widget = document.getElementById('ai-widget');
    widget.classList.toggle('hidden');
};

window.askAi = async function() {
    const inputField = document.getElementById('ai-input');
    const msgContainer = document.getElementById('ai-messages');
    const userQuery = inputField.value.trim();

    if (!userQuery) return;

    msgContainer.innerHTML += `<div class="bg-indigo-600 text-white p-2 rounded-lg text-right my-1">${userQuery}</div>`;
    inputField.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;

    const promptContext = `You are the AI Assistant for Mihadx BD Store. 
    Information:
    - We offer Free Fire Diamond and eFootball Coin Top-ups.
    - Payment: bKash (01309735129) Send Money only. Nagad is currently closed.
    - Computer Work Services available: MS Word, MS Excel, PowerPoint, Data Entry.
    - Admin WhatsApp: 01576502490.
    Answer clearly in Bengali in short sentences. User Question: ${userQuery}`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptContext }] }]
            })
        });

        const data = await response.json();
        const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি। প্রয়োজনে হোয়াটসঅ্যাপে যোগাযোগ করুন।";

        msgContainer.innerHTML += `<div class="bg-gray-200 text-gray-800 p-2 rounded-lg my-1">${aiReply}</div>`;
        msgContainer.scrollTop = msgContainer.scrollHeight;
    } catch (error) {
        msgContainer.innerHTML += `<div class="bg-red-100 text-red-700 p-2 rounded-lg my-1">এআই কানেকশনে সমস্যা হয়েছে।</div>`;
    }
};
