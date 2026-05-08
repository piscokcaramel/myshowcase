/* ============================================================
   script.js — Piskok Caramel Link Page
   ============================================================ */

/* ────────────────────────────────────────────────────────────
   ✏️  CONFIG — Ubah semua isi di sini sesuai kebutuhan toko
   ──────────────────────────────────────────────────────────── */
const CONFIG = {
  // Nama & info toko
  storeName:   "@piscokcarameltweentytree",
  storeHandle: "@piscokcarameltweentytree",

  // Gambar
  logoSrc:       "img/ikon-piscok.png",
  backgroundSrc: "img/bg-web.jpg",

  // Link tombol
  links: {
    website:    "https://piscokcarameltweentytree.netlify.app/website/piscok",          // ✏️ Contoh: "https://piscokcaramel.com"
    shopeeFood: "#",          // ✏️ Contoh: "https://shopee.co.id/..."
    gojek:      "#",          // ✏️ Contoh: "https://gofood.co.id/..."
  },

  // Ikon per tombol — ganti path sesuai file di folder img/
  icons: {
    website:    "img/ikon-piscok.png",
    shopeeFood: "img/ikon-shoppe.png",
    gojek:      "img/ikon-gojek.png",
  }
};

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initRipple();
});

/* ============================================================
   APPLY CONFIG
   ============================================================ */
function applyConfig() {
  // Nama toko & handle
  setTextContent("storeName",   CONFIG.storeName);
  setTextContent("storeHandle", CONFIG.storeHandle);

  // Background
  if (CONFIG.backgroundSrc) {
    document.getElementById("bgLayer").style.backgroundImage =
      `url('${CONFIG.backgroundSrc}')`;
  }

  // Logo
  if (CONFIG.logoSrc) {
    const logoWrap = document.getElementById("logoImg");
    logoWrap.innerHTML = `<img src="${CONFIG.logoSrc}" alt="Logo ${CONFIG.storeName}" />`;
  }

  // Link tombol
  setHref("btnWebsite", CONFIG.links.website);
  setHref("btnShopee",  CONFIG.links.shopeeFood);
  setHref("btnGojek",   CONFIG.links.gojek);

  // Ikon per tombol
  setIcon("btnWebsite", CONFIG.icons.website,    "Website Icon");
  setIcon("btnShopee",  CONFIG.icons.shopeeFood,  "ShopeeFood Icon");
  setIcon("btnGojek",   CONFIG.icons.gojek,       "Gojek Icon");
}

/* ============================================================
   RIPPLE EFFECT
   ============================================================ */
function initRipple() {
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width:  ${size}px;
        height: ${size}px;
        top:    ${y}px;
        left:   ${x}px;
        border-radius: 50%;
        background: rgba(255,255,255,0.25);
        transform: scale(0);
        animation: rippleAnim 0.5s ease-out forwards;
        pointer-events: none;
        z-index: 0;
      `;

      this.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });

  if (!document.getElementById("rippleStyle")) {
    const style = document.createElement("style");
    style.id = "rippleStyle";
    style.textContent = `
      @keyframes rippleAnim {
        to { transform: scale(2.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ============================================================
   HELPERS
   ============================================================ */
function setTextContent(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

function setHref(id, url) {
  const el = document.getElementById(id);
  if (el && url) {
    el.href = url;
    if (url !== "#") el.target = "_blank";
  }
}

/**
 * Ganti ikon di dalam tombol berdasarkan id tombol.
 */
function setIcon(btnId, iconSrc, altText) {
  const btn = document.getElementById(btnId);
  if (!btn || !iconSrc) return;
  const iconWrap = btn.querySelector(".btn-icon");
  if (iconWrap) {
    iconWrap.innerHTML = `<img src="${iconSrc}" alt="${altText}" />`;
  }
}
