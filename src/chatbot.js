const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Chatbot Context (distilled from main.js)
const BOT_CONTEXT = `
Anda adalah "Rizky's Assistant", seorang representatif karir digital yang cerdas dan profesional untuk Muhammad Rizky Herdiansyah.

PROFIL RIZKY:
- Nama: Muhammad Rizky Herdiansyah
- WhatsApp: 62895411940827
- Keahlian Utama: Laravel, IoT (ESP32), Networking (MikroTik), Tailwind CSS, Next.js.
- Kepribadian: Disiplin, solutif, dan antusias dengan teknologi baru.

PEDOMAN PERCAKAPAN & FORMATTING (SANGAT PENTING):
1. GAYA BAHASA: Sopan, profesional, namun tetap ramah dan membantu (Friendly Expert).
2. FORMATTING: Jangan mengirim pesan dalam blok teks yang panjang. Gunakan:
   - Bullet points (*) untuk merinci daftar fitur, pengalaman, atau kelebihan.
   - Baris baru (paragraf) untuk memisahkan ide.
   - Bold (**) untuk kata kunci penting.
3. INTERVIEW MODE: Jawab secara mendalam namun terstruktur jika ditanya soal teknis atau kelebihan diri.
4. WHATSAPP REDIRECT: Arahkan ke WhatsApp (https://wa.me/62895411940827) untuk diskusi serius, harga, atau rekrutmen.
5. TUJUAN: Menunjukkan bahwa Rizky adalah developer yang detail-oriented dan profesional.
`;

const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const closeChat = document.getElementById("close-chat");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

let chatHistory = [];

function toggleChat() {
  const isOpen = !chatWindow.classList.contains("opacity-0");
  if (isOpen) {
    chatWindow.classList.add("opacity-0", "invisible", "translate-y-10");
    chatWindow.classList.remove("opacity-100", "visible", "translate-y-0");
  } else {
    chatWindow.classList.remove("opacity-0", "invisible", "translate-y-10");
    chatWindow.classList.add("opacity-100", "visible", "translate-y-0");
    chatInput.focus();
  }
}

function formatMessage(text) {
  // Convert basic markdown to HTML
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
    .replace(/^\s*[\-\*]\s+(.*)/gm, '<li class="ml-4 list-disc">$1</li>') // List items
    .replace(/\n/g, "<br>"); // Line breaks

  // Wrap lists in <ul>
  if (formatted.includes("<li")) {
    // Basic detection to wrap nearby <li> tags
    formatted = formatted.replace(/(<li.*<\/li>)/g, '<ul class="space-y-1 my-2">$1</ul>');
  }

  return formatted;
}

function addMessage(text, isUser = false) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `flex flex-col gap-2 ${isUser ? "items-end" : "items-start"} message-animate`;

  const content = isUser ? text : formatMessage(text);
  
  msgDiv.innerHTML = `
    <div class="${
      isUser 
        ? "bg-cloud-600 text-white rounded-2xl rounded-tr-none" 
        : "bg-slate-100 dark:bg-navy-900/50 text-slate-700 dark:text-slate-300 rounded-2xl rounded-tl-none border border-slate-200/50 dark:border-slate-800/50"
    } p-4 text-sm max-w-[85%] leading-relaxed">
      ${content}
    </div>
  `;
  
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function getAIResponse(userMessage) {
  // Add loading indicator
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "flex gap-1 items-center p-4 bg-slate-100 dark:bg-navy-900/50 rounded-2xl rounded-tl-none self-start message-animate";
  loadingDiv.id = "chat-loading";
  loadingDiv.innerHTML = `
    <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
    <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
    <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
  `;
  chatMessages.appendChild(loadingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: BOT_CONTEXT }]
        },
        contents: [
          ...chatHistory,
          { role: "user", parts: [{ text: userMessage }] }
        ]
      })
    });

    const data = await response.json();
    loadingDiv.remove();

    if (data.candidates && data.candidates[0].content.parts[0].text) {
      const aiText = data.candidates[0].content.parts[0].text;
      addMessage(aiText);
      
      // Update history
      chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
      chatHistory.push({ role: "model", parts: [{ text: aiText }] });
      
      // Keep history short
      if (chatHistory.length > 10) chatHistory = chatHistory.slice(-10);
      
    } else {
      throw new Error("Invalid response from API");
    }
  } catch (error) {
    console.error("Chatbot Error:", error);
    loadingDiv.remove();
    addMessage("Maaf, sepertinya ada gangguan koneksi. Bisa coba lagi atau hubungi Rizky di WhatsApp?");
  }
}

// Event Listeners
if (chatToggle) chatToggle.addEventListener("click", toggleChat);
if (closeChat) closeChat.addEventListener("click", toggleChat);

if (chatForm) {
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    chatInput.value = "";
    addMessage(message, true);
    await getAIResponse(message);
  });
}
