import "./style.css";

// Data from original portfolio
const PROFILE = {
  name: "Muhammad Rizky Herdiansyah",
  whatsapp: "62895411940827",
  projects: [
    {
      title: "Internal Request System (PNL & SPH)",
      year: "2025",
      type: "Web App",
      desc: "Sistem internal untuk request & tracking dokumen, validasi data, serta integrasi API.",
      stack: ["Laravel", "REST API", "SQL", "Tailwind"],
    },
    {
      title: "Admin Panel + Reseller Management",
      year: "2024",
      type: "Web App",
      desc: "Admin panel untuk kelola data reseller, serial code, dan laporan dasar.",
      stack: ["Laravel", "MySQL", "Blade", "Tailwind"],
    },
    {
      title: "API Service (Logging & Validation)",
      year: "2024",
      type: "API",
      desc: "REST API dengan struktur endpoint konsisten, logging, dan validasi.",
      stack: ["Node.js", "REST", "Postman", "SQL"],
    },
    {
      title: "IT Ticketing + Knowledge Base (SOP)",
      year: "2025",
      type: "Web App",
      desc: "Sistem ticketing untuk support internal + knowledge base SOP agar troubleshooting lebih cepat & terdokumentasi.",
      stack: ["Laravel", "MySQL", "Blade", "Tailwind"],
    },
  ],
  experience: [
    {
      company: "PT Indonesia Telekomunikasi Teknologi",
      role: "IT Developer & IT Support",
      period: "Nov 2024 — Sekarang",
      highlights: [
        "Mengembangkan sistem Laravel berbasis Web",
        "Integrasi REST API, validasi data, dan modul CRUD",
        "IT Support: troubleshooting end-user, dokumentasi SOP",
        "Jaringan: setup & monitoring LAN/WAN, VPN, firewall dasar",
      ],
    },
    {
      company: "EBK Tech",
      role: "Web3 Developer (Next.js)",
      period: "Agu 2025 — Okt 2025",
      highlights: [
        "Pengembangan website Web3 berbasis Next.js",
        "Optimasi performa, SEO, dan frontend modern",
        "Integrasi Jupiter API, TradingView, dan fitur blockchain",
      ],
    },
    {
      company: "PT Terra Sigma Solusi",
      role: "Technical Support",
      period: "Jan 2024 — Sep 2024",
      highlights: [
        "Monitoring & troubleshooting server (resource, service, uptime)",
        "Troubleshooting jaringan dan koneksi internet",
        "Pengelolaan data stok menggunakan SQL Server",
      ],
    },
  ],
};

// Theme Logic
const themeBtn = document.getElementById("theme-toggle");
const lightIcon = document.getElementById("theme-icon-light");
const darkIcon = document.getElementById("theme-icon-dark");

function updateTheme() {
  const isDark =
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  console.log("Updating theme, isDark:", isDark);

  if (isDark) {
    document.documentElement.classList.add("dark");
    lightIcon.classList.remove("hidden");
    darkIcon.classList.add("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    lightIcon.classList.add("hidden");
    darkIcon.classList.remove("hidden");
  }
}

themeBtn.addEventListener("click", () => {
  const willBeDark = !document.documentElement.classList.contains("dark");
  localStorage.theme = willBeDark ? "dark" : "light";
  console.log("Toggle clicked, willBeDark:", willBeDark);
  updateTheme();
});

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

function openMobileMenu() {
  console.log("Opening mobile menu...");
  mobileMenu.classList.remove("opacity-0", "pointer-events-none");
  mobileMenu.classList.add("opacity-100", "pointer-events-auto");
  document.body.classList.add("overflow-hidden");
}

function closeMobileMenu() {
  console.log("Closing mobile menu...");
  mobileMenu.classList.add("opacity-0", "pointer-events-none");
  mobileMenu.classList.remove("opacity-100", "pointer-events-auto");
  document.body.classList.remove("overflow-hidden");
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", openMobileMenu);
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", closeMobileMenu);
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Render Projects
function renderProjects(filter = "Semua") {
  const grid = document.getElementById("projects-grid");
  const filteredProjects =
    filter === "Semua"
      ? PROFILE.projects
      : PROFILE.projects.filter((p) => p.type === filter);

  grid.innerHTML = filteredProjects
    .map(
      (p) => `
        <div class="group relative bg-white dark:bg-navy-800 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-cloud-200/50 dark:hover:shadow-none transition-all duration-500 animate-fade-in">
            <div class="aspect-video bg-cloud-100 dark:bg-cloud-900/20 relative group-hover:scale-105 transition-transform duration-700 flex items-center justify-center overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-cloud-400/10 to-transparent"></div>
                <div class="text-4xl font-black text-cloud-600/20 dark:text-cloud-400/10 italic select-none">
                    ${p.title.split(" ")[0]}
                </div>
            </div>
            <div class="p-8">
                <div class="flex gap-2 mb-4">
                    <span class="px-3 py-1 bg-cloud-50 dark:bg-cloud-900/30 text-cloud-600 text-[10px] font-bold rounded-full uppercase tracking-wider">${p.type}</span>
                    <span class="px-3 py-1 bg-slate-50 dark:bg-slate-900/30 text-slate-500 text-[10px] font-bold rounded-full">${p.year}</span>
                </div>
                <h3 class="text-xl font-bold mb-3 group-hover:text-cloud-600 transition-colors">${p.title}</h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">${p.desc}</p>
                <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    ${p.stack.map((s) => `<span>${s}</span>`).join('<span class="w-1 h-1 rounded-full bg-slate-300"></span>')}
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}

// Filter Logic
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active UI
    filterButtons.forEach((b) => {
      b.classList.remove("bg-white", "dark:bg-navy-900", "shadow-sm");
      b.classList.add("text-slate-500");
    });
    btn.classList.add("bg-white", "dark:bg-navy-900", "shadow-sm");
    btn.classList.remove("text-slate-500");

    // Filter projects
    renderProjects(btn.getAttribute("data-filter"));
  });
});

// Render Experience
function renderExperience() {
  const list = document.getElementById("experience-list");
  list.innerHTML = PROFILE.experience
    .map(
      (exp, i) => `
        <div class="relative pl-8 before:absolute before:left-0 before:top-4 before:bottom-0 before:w-px before:bg-slate-200 dark:before:bg-slate-800 last:before:hidden text-left">
            <div class="absolute left-[-4px] top-1 w-2 h-2 rounded-full ${i === 0 ? "bg-cloud-600 shadow-[0_0_10px_rgba(14,165,233,0.5)]" : "bg-slate-300 dark:bg-slate-700"}"></div>
            <div class="glass-card p-6 rounded-3xl ${i !== 0 ? "opacity-80 hover:opacity-100 transition-opacity" : ""}">
                <span class="text-xs font-bold ${i === 0 ? "text-cloud-600" : "text-slate-400"} uppercase tracking-wider">${exp.period}</span>
                <h3 class="text-xl font-bold mt-1 text-slate-900 dark:text-white">${exp.role}</h3>
                <p class="text-slate-500 font-medium mb-4">${exp.company}</p>
                <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    ${exp.highlights.map((h) => `<li class="flex items-start gap-2"><span class="text-cloud-600 mt-1">•</span> ${h}</li>`).join("")}
                </ul>
            </div>
        </div>
    `,
    )
    .join("");
}

// WhatsApp Link
const waLink = document.getElementById("whatsapp-link");
waLink.href = `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent("Halo Rizky, saya tertarik untuk berdiskusi tentang proyek.")}`;

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  updateTheme();
  renderProjects();
  renderExperience();
});
