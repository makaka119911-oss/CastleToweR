// Параллакс фоновых слоёв hero
const layers = document.querySelectorAll(".hero-parallax");
window.addEventListener("scroll", () => {
  const offset = window.scrollY || window.pageYOffset;
  layers.forEach((layer) => {
    const speed =
      layer.classList.contains("hero-parallax--back")
        ? 0.15
        : layer.classList.contains("hero-parallax--mid")
        ? 0.3
        : 0.5;
    layer.style.transform = `translate3d(0, ${offset * speed * -0.4}px, 0)`;
  });
});

// Скролл к галерее
document
  .querySelector(".js-scroll-to-gallery")
  ?.addEventListener("click", () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  });

// Анимация появления блоков при скролле
const animated = document.querySelectorAll(
  ".section, .format-card, .about-card, .review-card, .how-item"
);
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.16 }
);
animated.forEach((el) => {
  el.setAttribute("data-anim", "fade-up");
  io.observe(el);
});

// Лайтбокс для галереи
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const src = item.getAttribute("data-full");
    if (!src || !lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add("open");
  });
});

lightboxClose?.addEventListener("click", () => {
  lightbox.classList.remove("open");
});

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("open");
});

// Демонстрационный QR на hero
function makeHeroDemoQr() {
  const heroQrEl = document.getElementById("heroQr");
  if (!heroQrEl || !window.QRCode) return;

  new QRCode(heroQrEl, {
    text: "CASTLE-EVENINGS-DEMO",
    width: 110,
    height: 110,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}
makeHeroDemoQr();

// Telegram конфиг
const TELEGRAM_BOT_TOKEN =
  "8402206062:AAEJim1GkriKqY_o1mOo0YWSWQDdw5Qy2h0";
const TELEGRAM_CHAT_ID = "-1002313355102";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
// В продакшене токен нужно хранить на сервере. [web:50][web:100]

// Генерация ID (без персональных данных)
function generateRegistrationId() {
  const ts = Date.now().toString(36);
  const rnd = Math.floor(Math.random() * 1e6)
    .toString(36)
    .padStart(4, "0");
  return `CSTL-${ts}-${rnd}`.toUpperCase();
}

// QR с техническим ID
function createQrInContainer(containerId, registrationId) {
  const el = document.getElementById(containerId);
  if (!el || !window.QRCode) return;
  el.innerHTML = "";
  new QRCode(el, {
    text: registrationId,
    width: 220,
    height: 220,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M,
  });
}

// Отправка в Telegram
async function sendToTelegram(text) {
  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text,
    parse_mode: "HTML",
  };

  const res = await fetch(TELEGRAM_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Telegram API error");
  return res.json();
}

// Форма регистрации
const form = document.getElementById("registrationForm");
const formStatus = document.getElementById("formStatus");
const overlay = document.getElementById("confirmOverlay");
const overlayOk = document.getElementById("overlayOk");
const overlayClose = document.querySelector(".overlay-close");

function openOverlay() {
  if (!overlay) return;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
}

function closeOverlay() {
  if (!overlay) return;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
}

overlayOk?.addEventListener("click", closeOverlay);
overlayClose?.addEventListener("click", closeOverlay);
overlay?.addEventListener("click", (e) => {
  if (e.target === overlay) closeOverlay();
});

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form || !formStatus) return;

  formStatus.textContent = "";
  formStatus.style.color = "";

  const fd = new FormData(form);
  const firstName = (fd.get("firstName") || "").toString().trim();
  const lastName = (fd.get("lastName") || "").toString().trim();
  const phone = (fd.get("phone") || "").toString().trim();
  const email = (fd.get("email") || "").toString().trim();
  const comment = (fd.get("comment") || "").toString();
  const consent = fd.get("consent");

  if (!firstName || !lastName || !phone || !email || !consent) {
    formStatus.textContent =
      "Пожалуйста, заполните обязательные поля и поставьте галочку согласия.";
    formStatus.style.color = "var(--danger)";
    return;
  }

  const registrationId = generateRegistrationId();

  createQrInContainer("qrContainer", registrationId);
  createQrInContainer("overlayQr", registrationId);

  const telegramText =
    `<b>Новая заявка в замок</b>\n` +
    `ID: <code>${registrationId}</code>\n\n` +
    `<b>Имя:</b> ${firstName}\n` +
    `<b>Фамилия:</b> ${lastName}\n` +
    `<b>Телефон:</b> ${phone}\n` +
    `<b>E‑mail:</b> ${email}\n` +
    (comment ? `<b>Пожелания:</b> ${comment}\n` : "") +
    `\n<i>QR‑код содержит только ID заявки. Сопоставление с данными — у организаторов.</i>`;

  try {
    formStatus.textContent = "Отправляем вашу заявку…";
    formStatus.style.color = "var(--text-muted)";

    await sendToTelegram(telegramText);

    formStatus.textContent =
      "Заявка отправлена. Ваш уникальный QR‑код создан ниже и во всплывающем окне. Сохраните его.";
    formStatus.style.color = "var(--accent)";

    openOverlay();
    form.reset();
  } catch (err) {
    console.error(err);
    formStatus.textContent =
      "Не удалось отправить заявку. Попробуйте позже или напишите нам напрямую в Telegram.";
    formStatus.style.color = "var(--danger)";
  }
});

// Золотые частицы от кнопки hero
const particleButton = document.querySelector("[data-particle-button]");
let particleCanvas;
let particleCtx;
let particles = [];
let particleAnimationFrame;

function createParticleCanvas() {
  if (particleCanvas) return;
  particleCanvas = document.createElement("canvas");
  particleCanvas.className = "particle-layer";
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
  particleCtx = particleCanvas.getContext("2d");
  document.body.appendChild(particleCanvas);

  window.addEventListener("resize", () => {
    if (!particleCanvas) return;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  });
}

function spawnParticlesAt(x, y, color) {
  createParticleCanvas();
  const count = 40;

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const speed = 2 + Math.random() * 3;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      life: 1,
      radius: 2 + Math.random() * 3,
      color,
    });
  }

  if (!particleAnimationFrame) {
    animateParticles();
  }
}

function animateParticles() {
  if (!particleCtx || particles.length === 0) {
    particleAnimationFrame = null;
    return;
  }

  particleAnimationFrame = requestAnimationFrame(animateParticles);
  particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

  particles = particles.filter((p) => p.life > 0);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.04;
    p.life -= 0.02;

    particleCtx.globalAlpha = Math.max(p.life, 0);
    particleCtx.fillStyle = p.color;
    particleCtx.beginPath();
    particleCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    particleCtx.fill();
  });

  particleCtx.globalAlpha = 1;
}

particleButton?.addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  spawnParticlesAt(x, y, "#f3d79a");
});


