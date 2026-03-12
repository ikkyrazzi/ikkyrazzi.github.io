const GEMINI_API_KEY = "AIzaSyBk03hp3bCLaIjvD6UfpenLekPtH2HcZmE";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Chatbot Context (distilled from main.js)
const BOT_CONTEXT = `
You are the AI Assistant for Muhammad Rizky Herdiansyah's portfolio.
Information about Rizky:
- Name: Muhammad Rizky Herdiansyah
- WhatsApp: 62895411940827
- Role: IT Developer & IT Support

Experience:
1. PT Indonesia Telekomunikasi Teknologi (Nov 2024 - Sekarang): IT Developer & IT Support. Laravel web development, REST API, CRUD, troubleshooting, Network setup (LAN/WAN, VPN).
2. EBK Tech (Aug 2025 - Oct 2025): Web3 Developer. Next.js, Jupiter API, TradingView integration.
3. PT Terra Sigma Solusi (Jan 2024 - Sep 2024): Technical Support. Server monitoring, SQL Server.

Projects:
1. Panic Button System (2026): IoT & Web App. ESP32 integration, Real-time monitoring, PWA.
2. Portal iWifi (2026): Web App & Networking. MikroTik API, Xendit Payment Gateway (QRIS).
3. OmniChannel Customer Engagement Platform (2026): Helpdesk & CRM. WhatsApp/Telegram integration (Wawp), Real-time Chat.
4. Sistem Absensi Teknisi Berbasis Geofencing (2025): Management System. GPS location verification, Laravel 11.

Guidelines:
- Answer ONLY based on this information.
- Be concise, friendly, and professional.
- Use Indonesian language primarily, as the portfolio is for an Indonesian developer.
- If a user asks about hiring, price, or deep technical consultation, ALWAYS direct them to WhatsApp: https://wa.me/62895411940827
- If you don't know the answer based on the context, politely say you don't know and suggest contacting Rizky via WhatsApp.
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
