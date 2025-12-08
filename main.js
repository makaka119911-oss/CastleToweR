// Параллакс слоёв hero
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

// Анимация при скролле
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

// Лайтбокс
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
// Для продакшена токен нужно прятать на сервере. [web:50][web:100]

// Генерация ID (без персональных данных)
function generateRegistrationId() {
  const ts = Date.now().toString(36);
  const rnd = Math.floor(Math.random() * 1e6)
    .toString(36)
    .padStart(4, "0");
  return `CSTL-${ts}-${rnd}`.toUpperCase();
}

// QR с техническим ID (без имени/почты)
function createQrInContainer(containerId, registrationId) {
  const el = document.getElementById(containerId);
  if (!el || !window.QRCode) return;
  el.innerHTML = "";
  new QRCode(el, {
    text: registrationId, // только ID
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

  // Уникальный ID, который шьётся в QR (без ФИО и e‑mail)
  const registrationId = generateRegistrationId();

  // QR на странице и в оверлее
  createQrInContainer("qrContainer", registrationId);
  createQrInContainer("overlayQr", registrationId);

  // Сообщение для организаторов (здесь уже есть ФИО и контакты)
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

