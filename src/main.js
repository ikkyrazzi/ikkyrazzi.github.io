import "./style.css";

console.log("🚀 main.js connected and running...");

// Data from original portfolio
const PROFILE = {
  name: "Muhammad Rizky Herdiansyah",
  whatsapp: "62895411940827",
  projects: [
    {
      id: "p1",
      title: "Internal Request System (PNL & SPH)",
      year: "2025",
      type: "Web App",
      desc: "Sistem internal untuk request & tracking dokumen, validasi data, serta integrasi API.",
      fullDesc:
        "Sistem Manajemen Permintaan Internal (Internal Request System) dirancang untuk menyederhanakan proses pengadaan dan pelacakan dokumen PNL & SPH dalam skala perusahaan. Sistem ini mencakup alur persetujuan bertingkat, validasi data otomatis, dan dashboard pelacakan real-time untuk meningkatkan efisiensi operasional hingga 40%.",
      stack: ["Laravel", "REST API", "SQL", "Tailwind"],
      image: "/assets/foto-RIzvvtI3.PNG", // Placeholder using existing image
      links: [
        { label: "Lihat Demo", url: "#", icon: "external" },
        { label: "Source Code", url: "#", icon: "github" },
      ],
    },
    {
      id: "p2",
      title: "Admin Panel + Reseller Management",
      year: "2024",
      type: "Web App",
      desc: "Admin panel untuk kelola data reseller, serial code, dan laporan dasar.",
      fullDesc:
        "Platform manajemen reseller yang tangguh yang memungkinkan admin untuk melacak inventaris serial code, memantau penjualan reseller secara real-time, dan menghasilkan laporan keuangan bulanan otomatis. Dibangun dengan fokus pada kemudahan penggunaan dan keamanan akses data.",
      stack: ["Laravel", "MySQL", "Blade", "Tailwind"],
      image: "/assets/foto-RIzvvtI3.PNG",
      links: [{ label: "Source Code", url: "#", icon: "github" }],
    },
    {
      id: "p3",
      title: "API Service (Logging & Validation)",
      year: "2024",
      type: "API",
      desc: "REST API dengan struktur endpoint konsisten, logging, dan validasi.",
      fullDesc:
        "Layanan backend khusus yang menangani validasi data kompleks dan logging aktivitas sistem untuk aplikasi mikroservis. Menggunakan standar keamanan JWT dan dokumentasi API yang lengkap menggunakan Postman.",
      stack: ["Node.js", "REST", "Postman", "SQL"],
      image: "/assets/foto-RIzvvtI3.PNG",
      links: [],
    },
    {
      id: "p4",
      title: "IT Ticketing + Knowledge Base (SOP)",
      year: "2025",
      type: "Web App",
      desc: "Sistem ticketing untuk support internal + knowledge base SOP agar troubleshooting lebih cepat & terdokumentasi.",
      fullDesc:
        "Solusi IT Support terpadu yang menggabungkan sistem pelaporan kendala (ticketing) dengan repositori SOP (Standard Operating Procedure). Membantu teknisi menyelesaikan masalah 30% lebih cepat berkat dokumentasi yang terorganisir dengan baik.",
      stack: ["Laravel", "MySQL", "Blade", "Tailwind"],
      image: "/assets/foto-RIzvvtI3.PNG",
      links: [{ label: "Lihat Demo", url: "#", icon: "external" }],
    },
    {
      id: "p5",
      title: "ITTEK Panic Button System",
      year: "2024",
      type: "IoT & Web App",
      desc: "Sistem monitoring real-time terintegrasi IoT untuk manajemen situasi darurat.",
      fullDesc: `
        <p>Sistem ini dirancang untuk mendeteksi dan mengelola situasi darurat secara cepat dan efisien dengan mengintegrasikan hardware ESP32 dan dashboard pusat.</p>
        <div class="mt-4 space-y-4">
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white mb-2">Fitur Utama:</h4>
            <ul class="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Real-Time Monitoring:</strong> Pemantauan status Gate secara langsung tanpa refresh.</li>
              <li><strong>IoT Integration:</strong> Integrasi aman dengan ESP32 melalui API terenkripsi.</li>
              <li><strong>PWA Ready:</strong> Dapat diinstal sebagai aplikasi di smartphone.</li>
              <li><strong>Secure Hardening:</strong> Implementasi Rate Limiting & Throttling API.</li>
            </ul>
          </div>
        </div>
      `,
      stack: ["Laravel", "IoT", "PWA", "MySQL"],
      image: "/assets/foto-RIzvvtI3.PNG", // Placeholder
      links: [{ label: "Lihat Dashboard", url: "#", icon: "external" }],
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
  console.log(`🎨 Rendering projects for filter: ${filter}`);
  const grid = document.getElementById("projects-grid");
  if (!grid) {
    console.error("❌ Error: 'projects-grid' element not found!");
    return;
  }

  try {
    const filteredProjects =
      filter === "Semua"
        ? PROFILE.projects
        : PROFILE.projects.filter((p) => p.type === filter);

    console.log(`📦 Found ${filteredProjects.length} projects to render.`);

    grid.innerHTML = filteredProjects
      .map(
        (p) => `
        <div 
          data-id="${p.id}"
          class="project-card group relative bg-white dark:bg-navy-800 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-cloud-200/50 dark:hover:shadow-none transition-all duration-500 animate-fade-in cursor-pointer"
        >
            <div class="aspect-video bg-cloud-100 dark:bg-cloud-900/20 relative group-hover:scale-105 transition-transform duration-700 flex items-center justify-center overflow-hidden pointer-events-none">
                <div class="absolute inset-0 bg-gradient-to-br from-cloud-400/10 to-transparent"></div>
                <div class="text-4xl font-black text-cloud-600/20 dark:text-cloud-400/10 italic select-none">
                    ${p.title ? p.title.split(" ")[0] : "Project"}
                </div>
            </div>
            <div class="p-8 pointer-events-none">
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

    console.log("✅ Projects rendered successfully.");
  } catch (err) {
    console.error("❌ Error during renderProjects:", err);
  }
}

// Event Delegation for Project Modal
document.addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (card) {
    const id = card.getAttribute("data-id");
    console.log(`🖱️ Project card clicked: ${id}`);
    openProjectModal(id);
  }
});

// Project Modal Logic
window.openProjectModal = function (id) {
  const project = PROFILE.projects.find((p) => p.id === id);
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const backdrop = document.getElementById("modal-backdrop");
  const content = document.getElementById("modal-content");

  // Fill content
  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-desc").innerHTML = project.fullDesc;
  document.getElementById("modal-year").textContent = project.year;
  document.getElementById("modal-image").src = project.image || "foto.PNG";
  document.getElementById("modal-image").alt = project.title;

  // Tags
  document.getElementById("modal-tags").innerHTML = `
    <span class="px-4 py-1.5 bg-cloud-100 dark:bg-cloud-900/40 text-cloud-700 dark:text-cloud-300 text-xs font-bold rounded-full uppercase tracking-wider border border-cloud-200/50 dark:border-cloud-800/50">${project.type}</span>
  `;

  // Stack
  document.getElementById("modal-stack").innerHTML = project.stack
    .map(
      (s) => `
    <span class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-lg uppercase tracking-wider">${s}</span>
  `,
    )
    .join("");

  // Links
  document.getElementById("modal-links").innerHTML = project.links
    .map(
      (l) => `
    <a href="${l.url}" target="_blank" class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-cloud-50 dark:hover:bg-cloud-900/20 border border-slate-100 dark:border-slate-800 transition-all group">
      <span class="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-cloud-600 transition-colors">${l.label}</span>
      <svg class="w-5 h-5 text-slate-400 group-hover:text-cloud-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        ${l.icon === "github" ? '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>'}
      </svg>
    </a>
  `,
    )
    .join("");

  // Show
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  backdrop.classList.add("modal-backdrop-animate");
  content.classList.add("modal-content-animate");
  document.body.classList.add("overflow-hidden");
};

window.closeProjectModal = function () {
  const modal = document.getElementById("project-modal");
  const backdrop = document.getElementById("modal-backdrop");
  const content = document.getElementById("modal-content");

  backdrop.classList.remove("modal-backdrop-animate");
  content.classList.remove("modal-content-animate");

  // Wait for animation
  setTimeout(() => {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }, 300);
};

// Close on backdrop click
document.addEventListener("click", (e) => {
  const modal = document.getElementById("project-modal");
  if (e.target === document.getElementById("modal-backdrop")) {
    closeProjectModal();
  }
});

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProjectModal();
});

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
