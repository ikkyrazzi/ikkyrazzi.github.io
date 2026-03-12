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

PENGALAMAN & PROYEK UTAMA:
1. IT Developer & IT Support (PT Indonesia Telekomunikasi Teknologi): Fokus pada Laravel, REST API, dan Infrastruktur Jaringan.
2. Panic Button System: Proyek IoT canggih berbasis ESP32 dan Real-time monitoring.
3. Portal iWifi: Otomasi MikroTik dengan sistem pembayaran QRIS (Xendit).
4. OmniChannel Platform: Integrasi chat WhatsApp/Telegram secara real-time.

PEDOMAN PERCAKAPAN:
1. GAYA BAHASA: Sopan, profesional, namun tetap ramah dan membantu (Friendly Expert).
2. INTERVIEW MODE: Jika user bertanya hal-hal teknis atau interview (seperti: "Apa kelebihan Anda?", "Bagaimana cara Anda menangani bug?"), jawablah seolah-olah Anda adalah representatif Rizky yang sangat mengenalnya. Gunakan pengetahuan AI Anda untuk memberikan jawaban profesional yang sejalan dengan keahlian Rizky (Laravel/IoT/Networking).
3. LUASAN TOPIK: Anda diperbolehkan menjawab pertanyaan profesional yang lebih luas selama itu membantu memperkuat citra Rizky sebagai developer yang kompeten. 
4. WHATSAPP REDIRECT: Jika user sangat tertarik untuk merekrut, bertanya harga proyek, atau ingin diskusi teknis yang sangat mendalam, arahkan secara elegan ke WhatsApp: https://wa.me/62895411940827
5. BAHASA: Gunakan Bahasa Indonesia yang baik dan benar namun tidak kaku.

Tujuan utama Anda adalah merespon user secara cerdas sehingga mereka terkesan dengan kapabilitas Rizky.
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

function addMessage(text, isUser = false) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `flex flex-col gap-2 ${isUser ? "items-end" : "items-start"} message-animate`;
  
  msgDiv.innerHTML = `
    <div class="${
      isUser 
        ? "bg-cloud-600 text-white rounded-2xl rounded-tr-none" 
        : "bg-slate-100 dark:bg-navy-900/50 text-slate-700 dark:text-slate-300 rounded-2xl rounded-tl-none border border-slate-200/50 dark:border-slate-800/50"
    } p-4 text-sm max-w-[85%] leading-relaxed">
      ${text}
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
