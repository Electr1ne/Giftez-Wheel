const GIFTEZ_CONFIG = {
  BOT_API_URL: "https://bot-1795292735-3673-electr1ne.bothost.tech",
  CHANNEL_USERNAME: "gift_e_z",
  ADMIN_IDS: [963968579],
  CACHE_KEY: "giftezup_winter_cache_v5",
  IMAGES: {
    // Кейсы
    daily: "./daily.png",
    starter: "./starter.png",
    morozniy: "./morozniy.png",
    sever: "./sever.png",
    newyear: "./newyear.png",
    // Подарки
    rose: "./rose.png",
    bear: "./bear.png",
    gift: "./gift.png",
    heart: "./heart.png",
    bottle: "./bottle.png",
    cake: "./cake.png",
    rocket: "./rocket.png",
    ring: "./ring.png",
    nothing: "./nothing.png"
  }
};

const GIFTS_CATALOG = {
  bear:   { id: "bear",   name: "Мишка",   stars: 15,  icon: "bear.png" },
  heart:  { id: "heart",  name: "Сердце",  stars: 15,  icon: "heart.png" },
  rose:   { id: "rose",   name: "Роза",    stars: 25,  icon: "rose.png" },
  gift:   { id: "gift",   name: "Коробка", stars: 25,  icon: "gift.png" },
  bottle: { id: "bottle", name: "Напиток", stars: 35,  icon: "bottle.png" },
  cake:   { id: "cake",   name: "Торт",    stars: 40,  icon: "cake.png" },
  rocket: { id: "rocket", name: "Ракета",  stars: 50,  icon: "rocket.png" },
  ring:   { id: "ring",   name: "Кольцо",  stars: 100, icon: "ring.png" }
};

const FALLBACK_SVG = {
  bear: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 64 64" fill="none"><circle cx="18" cy="18" r="8" fill="#0284c7"/><circle cx="46" cy="18" r="8" fill="#0284c7"/><circle cx="32" cy="34" r="18" fill="#38bdf8"/><ellipse cx="32" cy="38" rx="8" ry="6" fill="#e0f2fe"/><circle cx="26" cy="30" r="2.2" fill="#0f172a"/><circle cx="38" cy="30" r="2.2" fill="#0f172a"/><circle cx="32" cy="36" r="2.5" fill="#0f172a"/></svg>`)}`,
  rose: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 64 64" fill="none"><path d="M32 34V56" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round"/><path d="M20 22C20 14 26 10 32 10C38 10 44 14 44 22C44 30 38 35 32 35C26 35 20 30 20 22Z" fill="#f43f5e"/><circle cx="32" cy="21" r="4" fill="#ffe4e6"/></svg>`)}`,
  heart: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 64 64" fill="none"><path d="M32 52C32 52 12 38 12 23C12 16 17 11 23 11C27 11 30 13 32 16C34 13 37 11 41 11C47 11 52 16 52 23C52 38 32 52 32 52Z" fill="#ec4899"/></svg>`)}`,
  gift: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 64 64" fill="none"><rect x="12" y="26" width="40" height="28" rx="6" fill="#6366f1"/><rect x="10" y="18" width="44" height="10" rx="4" fill="#818cf8"/><rect x="29" y="18" width="6" height="36" fill="#fbbf24"/></svg>`)}`,
  bottle: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 64 64" fill="none"><rect x="24" y="22" width="16" height="32" rx="6" fill="#38bdf8"/><rect x="28" y="10" width="8" height="12" rx="2" fill="#fbbf24"/></svg>`)}`,
  cake: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 64 64" fill="none"><rect x="14" y="30" width="36" height="22" rx="6" fill="#818cf8"/><rect x="30" y="16" width="4" height="14" fill="#fbbf24"/></svg>`)}`,
  rocket: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 64 64" fill="none"><path d="M32 10C40 18 44 30 42 42H22C20 30 24 18 32 10Z" fill="#38bdf8"/><circle cx="32" cy="28" r="5" fill="#e0f2fe"/><path d="M26 42L32 54L38 42H26Z" fill="#fbbf24"/></svg>`)}`,
  ring: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="36" r="15" stroke="#fbbf24" stroke-width="5"/><polygon points="32,10 24,19 32,24 40,19" fill="#7dd3fc"/></svg>`)}`,
  nothing: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>`)}`
};

const DEFAULT_CASES_LIST = [
  {
    id: "daily",
    page: "case-daily.html",
    name: "Ежедневный",
    price: 0,
    is_daily: true,
    badge: "24Ч",
    icon: "daily.png",
    fallbackKey: "gift",
    items: [
      { label: "Ничего", type: "nothing", gift: "nothing", icon: "nothing.png" },
      { label: "1–3 ★", type: "stars", gift: "stars", icon: "star" },
      { label: "4–10 ★", type: "stars", gift: "stars", icon: "star" },
      { label: "Мишка (15 ★)", type: "gift", gift: "bear", icon: "bear.png" },
      { label: "Роза (25 ★)", type: "gift", gift: "rose", icon: "rose.png" }
    ]
  },
  {
    id: "starter",
    page: "case-starter.html",
    name: "Стартовый",
    price: 5,
    is_daily: false,
    badge: "ЗИМА",
    icon: "starter.png",
    fallbackKey: "bear",
    items: [
      { label: "1–2 ★", type: "stars", gift: "stars", icon: "star" },
      { label: "3–6 ★", type: "stars", gift: "stars", icon: "star" },
      { label: "Мишка (15 ★)", type: "gift", gift: "bear", icon: "bear.png" },
      { label: "Роза (25 ★)", type: "gift", gift: "rose", icon: "rose.png" }
    ]
  },
  {
    id: "morozniy",
    page: "case-morozniy.html",
    name: "Морозный",
    price: 12,
    is_daily: false,
    badge: "ТОП",
    icon: "morozniy.png",
    fallbackKey: "rose",
    items: [
      { label: "2–5 ★", type: "stars", gift: "stars", icon: "star" },
      { label: "6–12 ★", type: "stars", gift: "stars", icon: "star" },
      { label: "Сердце (15 ★)", type: "gift", gift: "heart", icon: "heart.png" },
      { label: "Коробка (25 ★)", type: "gift", gift: "gift", icon: "gift.png" },
      { label: "Напиток (35 ★)", type: "gift", gift: "bottle", icon: "bottle.png" }
    ]
  },
  {
    id: "sever",
    page: "case-sever.html",
    name: "Северный",
    price: 25,
    is_daily: false,
    badge: "NEW",
    icon: "sever.png",
    fallbackKey: "rocket",
    items: [
      { label: "5–12 ★", type: "stars", gift: "stars", icon: "star" },
      { label: "13–22 ★", type: "stars", gift: "stars", icon: "star" },
      { label: "Торт (40 ★)", type: "gift", gift: "cake", icon: "cake.png" },
      { label: "Ракета (50 ★)", type: "gift", gift: "rocket", icon: "rocket.png" },
      { label: "Кольцо (100 ★)", type: "gift", gift: "ring", icon: "ring.png" }
    ]
  },
  {
    id: "newyear",
    page: "case-newyear.html",
    name: "Новогодний",
    price: 50,
    is_daily: false,
    badge: "VIP",
    icon: "newyear.png",
    fallbackKey: "ring",
    items: [
      { label: "10–24 ★", type: "stars", gift: "stars", icon: "star" },
      { label: "25–45 ★", type: "stars", gift: "stars", icon: "star" },
      { label: "Торт (40 ★)", type: "gift", gift: "cake", icon: "cake.png" },
      { label: "Ракета (50 ★)", type: "gift", gift: "rocket", icon: "rocket.png" },
      { label: "Кольцо (100 ★)", type: "gift", gift: "ring", icon: "ring.png" }
    ]
  }
];

const tg = window.Telegram?.WebApp;
if (tg) {
  try {
    tg.ready();
    tg.expand();
  } catch (_) {}
}

// Предзагрузка основных страниц для мгновенного переключения вкладок
function prefetchAppPages() {
  const pages = ["index.html", "requests.html", "profile.html", "upgrader.html", "case-daily.html"];
  pages.forEach((href) => {
    if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  });
}

function getCurrentTgUserId() {
  const uid = tg?.initDataUnsafe?.user?.id;
  return uid ? Number(uid) : 0;
}

function checkIsAdmin(stateObj = null) {
  const uid = getCurrentTgUserId();
  if (uid && GIFTEZ_CONFIG.ADMIN_IDS.includes(uid)) {
    return true;
  }
  return Boolean(stateObj && stateObj.is_admin);
}

function apiUrl(path) {
  const base = (GIFTEZ_CONFIG.BOT_API_URL || "").replace(/\/+$/, "");
  return `${base}${path}`;
}

function getImageSrc(key) {
  if (!key) return FALLBACK_SVG.bear;
  if (key.endsWith(".png")) return `./${key}`;
  return GIFTEZ_CONFIG.IMAGES[key] || FALLBACK_SVG[key] || FALLBACK_SVG.bear;
}

function getFallbackSrc(key) {
  const clean = String(key || "bear").replace(".png", "");
  return FALLBACK_SVG[clean] || FALLBACK_SVG.bear;
}

function navigateToPage(targetFile) {
  const cleanTarget = String(targetFile || "index.html").replace(/^\/+/, "");
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  if (currentFile === cleanTarget) return;
  window.location.href = cleanTarget;
}

// Звук
let volumePct = Number(localStorage.getItem("giftez_vol_pct") ?? 62);
let lastNonZeroVolume = volumePct > 0 ? volumePct : 62;
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTick() {
  if (volumePct <= 0) return;
  try {
    const c = getAudioCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    const peak = (volumePct / 100) * 0.22;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(520, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(170, c.currentTime + 0.032);
    gain.gain.setValueAtTime(Math.max(0.0005, peak), c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.032);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + 0.034);
  } catch (_) {}
}

function playWin() {
  if (volumePct <= 0) return;
  try {
    const c = getAudioCtx();
    const peak = (volumePct / 100) * 0.34;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "sine";
      const t = c.currentTime + i * 0.09;
      osc.frequency.setValueAtTime(f, t);
      gain.gain.setValueAtTime(Math.max(0.0005, peak), t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(t);
      osc.stop(t + 0.29);
    });
  } catch (_) {}
}

function toggleGlobalMute() {
  if (volumePct > 0) {
    lastNonZeroVolume = volumePct;
    volumePct = 0;
  } else {
    volumePct = lastNonZeroVolume || 62;
  }
  localStorage.setItem("giftez_vol_pct", String(volumePct));
  syncMuteButtonUI();
  if (volumePct > 0) playTick();
}

function syncMuteButtonUI() {
  const btn = document.getElementById("globalMuteBtn");
  if (!btn) return;
  const muted = volumePct <= 0;
  btn.classList.toggle("muted", muted);
  btn.innerHTML = muted
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
}

function startSnowfall() {
  if (document.getElementById("snowCanvas")) return;
  const c = document.createElement("canvas");
  c.id = "snowCanvas";
  c.className = "snow-canvas";
  document.body.prepend(c);

  const g = c.getContext("2d");
  let w = (c.width = window.innerWidth);
  let h = (c.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
  });

  const flakes = Array.from({ length: 24 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 1 + Math.random() * 2,
    vy: 0.35 + Math.random() * 0.65,
    vx: -0.22 + Math.random() * 0.44,
    a: 0.25 + Math.random() * 0.42
  }));

  function loop() {
    g.clearRect(0, 0, w, h);
    for (const f of flakes) {
      f.y += f.vy;
      f.x += f.vx;
      if (f.y > h) {
        f.y = -4;
        f.x = Math.random() * w;
      }
      if (f.x > w) f.x = 0;
      if (f.x < 0) f.x = w;

      g.beginPath();
      g.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      g.fillStyle = `rgba(224, 242, 254, ${f.a})`;
      g.fill();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

let toastTimer = null;
function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2700);
}

function escapeHtml(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanUsername(v) {
  return String(v || "").trim().replace(/^@+/, "").replace(/[^a-zA-Z0-9_]/g, "");
}

function saveCache(state) {
  try {
    sessionStorage.setItem(GIFTEZ_CONFIG.CACHE_KEY, JSON.stringify(state));
  } catch (_) {}
}

function loadCache() {
  try {
    const raw = sessionStorage.getItem(GIFTEZ_CONFIG.CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// Клиентский расчёт разложения суммы вывода (100->85, 50->43, 25->21, 15->13)
function decomposeWithdrawClient(cost) {
  const n = Math.floor(Number(cost || 0));
  if (n < 15) return null;
  let best = null;
  for (let c100 = Math.floor(n / 100); c100 >= 0; c100--) {
    const r100 = n - c100 * 100;
    for (let c50 = Math.floor(r100 / 50); c50 >= 0; c50--) {
      const r50 = r100 - c50 * 50;
      for (let c25 = Math.floor(r50 / 25); c25 >= 0; c25--) {
        const r25 = r50 - c25 * 25;
        if (r25 % 15 === 0) {
          const c15 = r25 / 15;
          const totalItems = c100 + c50 + c25 + c15;
          if (!best || totalItems < best.totalItems) {
            const payout = c100 * 85 + c50 * 43 + c25 * 21 + c15 * 13;
            const parts = [];
            if (c100) parts.push(`${c100}× Кольцо (100→85 ★)`);
            if (c50) parts.push(`${c50}× Ракета (50→43 ★)`);
            if (c25) parts.push(`${c25}× Роза (25→21 ★)`);
            if (c15) parts.push(`${c15}× Мишка (15→13 ★)`);
            best = { cost: n, payout, totalItems, breakdown: parts.join(", ") };
          }
        }
      }
    }
  }
  return best;
}

function getNearestWithdrawSuggestionsClient(rawAmount) {
  const target = Math.max(15, Math.floor(Number(rawAmount || 15)));
  const found = [];
  for (let x = 15; x <= target + 60; x += 5) {
    const dec = decomposeWithdrawClient(x);
    if (dec) found.push(dec);
  }
  found.sort((a, b) => Math.abs(a.cost - target) - Math.abs(b.cost - target) || a.cost - b.cost);
  return found.slice(0, 4);
}

function renderSystemLockScreen(mode) {
  if (checkIsAdmin()) return;

  const isUpd = mode === "update";
  document.body.className = "locked-body";
  document.body.innerHTML = `
    <div class="lock-screen fade-in">
      <div class="lock-clock">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1">
          <circle cx="12" cy="12" r="9"></circle>
          <polyline points="12 7 12 12 15.5 14"></polyline>
        </svg>
      </div>
      <h1 style="font-size:21px;font-weight:900;">${isUpd ? "Идёт обновление" : "Идут технические работы"}</h1>
      <p style="font-size:13.5px;color:var(--muted);line-height:1.45;">
        ${isUpd ? "Обновляем GiftezUp и готовим зимние новинки. Скоро вернёмся!" : "Исправляем и улучшаем работу сервиса. Скоро вернёмся!"}
      </p>
    </div>
  `;
}

function mountHeader(state, onRefresh) {
  const host = document.getElementById("headerMount");
  if (!host) return;

  const u = tg?.initDataUnsafe?.user;
  const subLabel = u?.username ? `@${u.username}` : "Новогодний сезон";

  host.innerHTML = `
    <div class="top-bar fade-in">
      <a class="brand-box" href="index.html" id="brandHomeLink">
        <div class="brand-mark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
          </svg>
        </div>
        <div class="brand-text">
          <div class="title">GiftezUp</div>
          <div class="sub">${escapeHtml(subLabel)}</div>
        </div>
      </a>

      <div class="top-right">
        <div class="stars-pill">
          <span>★</span>
          <span id="hdrStarsCount">${Number(state.stars_balance || 0)}</span>
        </div>
        <button type="button" class="btn-topup-sm" id="btnOpenWallet">Кошелёк</button>
        <button type="button" class="volume-mute-btn" id="globalMuteBtn" title="Звук"></button>
      </div>
    </div>
  `;

  document.getElementById("brandHomeLink").onclick = (e) => {
    e.preventDefault();
    navigateToPage("index.html");
  };

  syncMuteButtonUI();
  document.getElementById("globalMuteBtn").onclick = toggleGlobalMute;

  // Модалка Кошелька (Пополнение / Вывод как на референсе, в ледяном новогоднем стиле)
  let modal = document.getElementById("walletBackdrop");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "walletBackdrop";
    modal.className = "backdrop";
    modal.innerHTML = `
      <div class="wallet-sheet" onclick="event.stopPropagation()">
        <div class="card-head">
          <h2 style="font-size:19px;font-weight:900;">Кошелёк</h2>
          <button type="button" class="btn-mini-refresh" id="closeWalletBtn">✕</button>
        </div>

        <div class="wallet-tabs">
          <button type="button" class="wallet-tab-btn active" id="wTabDeposit">Пополнение</button>
          <button type="button" class="wallet-tab-btn" id="wTabWithdraw">Вывод</button>
        </div>

        <div class="wallet-balance-card">
          <div class="row-sub">Баланс вашего кошелька</div>
          <div class="wallet-balance-val">
            <span id="wTotalBal">0</span>
            <span style="color:#fde047;">★</span>
          </div>
          <div class="row-sub" id="wWagerNote" style="margin-top:4px;">Доступно к выводу: 0 ★</div>
        </div>

        <!-- ВКЛАДКА ПОПОЛНЕНИЕ -->
        <div id="wDepositPane" style="display:flex;flex-direction:column;gap:10px;">
          <div class="row-sub">Введите сумму пополнения (от 1 ★)</div>
          <input type="number" class="field-input" id="topupStarsInput" min="1" max="10000" value="50" placeholder="Сумма" />

          <div class="chips-row-3">
            <button type="button" class="btn-soft" data-star-chip="10">10 ★</button>
            <button type="button" class="btn-soft" data-star-chip="25">25 ★</button>
            <button type="button" class="btn-soft" data-star-chip="50">50 ★</button>
          </div>

          <div class="row-sub">Пакеты пополнения</div>
          <div class="packs-grid-4">
            <button type="button" class="pack-btn" data-star-chip="50">50 ★</button>
            <button type="button" class="pack-btn" data-star-chip="100">100 ★</button>
            <button type="button" class="pack-btn" data-star-chip="250">250 ★</button>
            <button type="button" class="pack-btn" data-star-chip="500">500 ★</button>
          </div>

          <div class="note-box">
            Пополненные звёзды нельзя сразу вывести — сначала их нужно отыграть в кейсах или апгрейдере.
          </div>

          <button type="button" class="btn-main" id="confirmTopupBtn">Пополнить через Stars</button>
        </div>

        <!-- ВКЛАДКА ВЫВОД -->
        <div id="wWithdrawPane" style="display:none;flex-direction:column;gap:10px;">
          <div class="row-sub">Курс вывода (пакеты подарков в звёздах)</div>
          <div class="rate-pills-4">
            <div class="rate-pill" data-wd-preset="15"><span>15 ★</span><span>→ 13 ★</span></div>
            <div class="rate-pill" data-wd-preset="25"><span>25 ★</span><span>→ 21 ★</span></div>
            <div class="rate-pill" data-wd-preset="50"><span>50 ★</span><span>→ 43 ★</span></div>
            <div class="rate-pill" data-wd-preset="100"><span>100 ★</span><span>→ 85 ★</span></div>
          </div>

          <input type="number" class="field-input" id="wdAmountInput" min="15" step="5" value="15" placeholder="Сумма к выводу (напр. 15, 25, 40, 50)" />
          <div class="note-box" id="wdPreviewBox">К получению: <b>13 ★</b> (1× Мишка)</div>
          <div id="wdSuggestionsRow" style="display:none;flex-wrap:wrap;gap:6px;"></div>

          <button type="button" class="btn-main" id="confirmWithdrawBtn">Создать заявку на вывод</button>
        </div>
      </div>
    `;
    modal.onclick = () => modal.classList.remove("open");
    document.body.appendChild(modal);
  }

  function syncWalletModalValues() {
    const total = Number(state.stars_balance || 0);
    const wag = Number(state.wager_left || 0);
    const avail = Math.max(0, total - wag);
    document.getElementById("wTotalBal").textContent = String(total);
    document.getElementById("wWagerNote").textContent = wag > 0
      ? `Доступно к выводу: ${avail} ★ (нужно отыграть ещё ${wag} ★)`
      : `Доступно к выводу: ${avail} ★`;
  }

  function updateWithdrawPreview() {
    const raw = Math.floor(Number(document.getElementById("wdAmountInput").value || 0));
    const box = document.getElementById("wdPreviewBox");
    const sugRow = document.getElementById("wdSuggestionsRow");
    const btn = document.getElementById("confirmWithdrawBtn");

    const dec = decomposeWithdrawClient(raw);
    if (dec) {
      box.innerHTML = `Спишется: <b>${dec.cost} ★</b> → К получению: <b>${dec.payout} ★</b><br/><span style="font-size:11px;">Пакеты: ${escapeHtml(dec.breakdown)}</span>`;
      sugRow.style.display = "none";
      btn.disabled = false;
      return;
    }

    const sugs = getNearestWithdrawSuggestionsClient(raw);
    box.innerHTML = `Сумма <b>${raw} ★</b> не делится ровно на пакеты 15 / 25 / 50 / 100 ★. Выбери ближайшую ровную сумму:`;
    sugRow.style.display = "flex";
    sugRow.innerHTML = sugs
      .map(
        (s) => `<button type="button" class="btn-ice-sm" data-pick-sug="${s.cost}" style="height:32px;min-height:32px;font-size:11.5px;">${s.cost} ★ → ${s.payout} ★</button>`
      )
      .join("");
    sugRow.querySelectorAll("[data-pick-sug]").forEach((b) => {
      b.onclick = () => {
        document.getElementById("wdAmountInput").value = b.getAttribute("data-pick-sug");
        updateWithdrawPreview();
      };
    });
    btn.disabled = true;
  }

  document.getElementById("btnOpenWallet").onclick = () => {
    syncWalletModalValues();
    updateWithdrawPreview();
    modal.classList.add("open");
  };
  document.getElementById("closeWalletBtn").onclick = () => modal.classList.remove("open");

  document.getElementById("wTabDeposit").onclick = () => {
    document.getElementById("wTabDeposit").classList.add("active");
    document.getElementById("wTabWithdraw").classList.remove("active");
    document.getElementById("wDepositPane").style.display = "flex";
    document.getElementById("wWithdrawPane").style.display = "none";
  };

  document.getElementById("wTabWithdraw").onclick = () => {
    document.getElementById("wTabWithdraw").classList.add("active");
    document.getElementById("wTabDeposit").classList.remove("active");
    document.getElementById("wDepositPane").style.display = "none";
    document.getElementById("wWithdrawPane").style.display = "flex";
    syncWalletModalValues();
    updateWithdrawPreview();
  };

  modal.querySelectorAll("[data-star-chip]").forEach((b) => {
    b.onclick = () => {
      document.getElementById("topupStarsInput").value = b.getAttribute("data-star-chip");
    };
  });

  modal.querySelectorAll("[data-wd-preset]").forEach((p) => {
    p.onclick = () => {
      document.getElementById("wdAmountInput").value = p.getAttribute("data-wd-preset");
      updateWithdrawPreview();
    };
  });

  document.getElementById("wdAmountInput").oninput = updateWithdrawPreview;

  document.getElementById("confirmTopupBtn").onclick = async () => {
    const stars = Math.floor(Number(document.getElementById("topupStarsInput").value || 0));
    if (stars < 1) {
      toast("Минимум 1 ★");
      return;
    }
    if (!tg?.initData || !tg?.openInvoice) {
      toast("Оплата Stars доступна внутри Telegram");
      return;
    }
    const payBtn = document.getElementById("confirmTopupBtn");
    payBtn.disabled = true;
    try {
      const r = await fetch(apiUrl("/api/create_topup_invoice"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData: tg.initData, stars })
      });
      const d = await r.json();
      payBtn.disabled = false;
      if (!d.ok || !d.invoice_link) {
        toast(d.message || "Не удалось создать счёт");
        return;
      }
      tg.openInvoice(d.invoice_link, async (status) => {
        if (status === "paid") {
          modal.classList.remove("open");
          toast(`Баланс пополнен на ${stars} ★!`);
          if (onRefresh) await onRefresh();
        } else {
          toast("Оплата отменена");
        }
      });
    } catch (_) {
      payBtn.disabled = false;
      toast("Ошибка сети");
    }
  };

  document.getElementById("confirmWithdrawBtn").onclick = async () => {
    const amount = Math.floor(Number(document.getElementById("wdAmountInput").value || 0));
    const uname = cleanUsername(tg?.initDataUnsafe?.user?.username || "");
    if (!uname) {
      toast("Укажи @username в профиле Telegram для вывода");
      return;
    }
    if (!tg?.initData) {
      toast("Открой в Telegram");
      return;
    }
    const wdBtn = document.getElementById("confirmWithdrawBtn");
    wdBtn.disabled = true;
    try {
      const r = await fetch(apiUrl("/api/withdraw_stars"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData: tg.initData, amount, username: uname })
      });
      const d = await r.json();
      wdBtn.disabled = false;
      if (!d.ok) {
        toast(d.message || "Ошибка вывода");
        return;
      }
      state.stars_balance = d.stars_balance;
      state.wager_left = d.wager_left;
      state.withdrawable_stars = d.withdrawable_stars;
      saveCache(state);
      updateStarsDisplay(state.stars_balance);
      syncWalletModalValues();
      playWin();
      modal.classList.remove("open");
      toast(`Заявка на ${d.payout_stars} ★ отправлена!`);
      if (onRefresh) await onRefresh();
    } catch (_) {
      wdBtn.disabled = false;
      toast("Ошибка сети");
    }
  };
}

function mountBottomNav(activeKey, state) {
  let wrap = document.getElementById("bottomNavWrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = "bottomNavWrap";
    wrap.className = "bottom-nav-wrap";
    document.body.appendChild(wrap);
  }

  const isAdmin = checkIsAdmin(state);

  const tabs = [
    { key: "home", href: "index.html", label: "Главная" },
    { key: "requests", href: "requests.html", label: "Выводы", badge: (state.my_requests || []).filter((x) => x.status !== "done").length },
    { key: "profile", href: "profile.html", label: "Профиль" }
  ];
  if (isAdmin) {
    tabs.push({ key: "admin", href: "admin.html", label: "Админ" });
  }

  const activeIdx = Math.max(0, tabs.findIndex((t) => t.key === activeKey));

  wrap.innerHTML = `
    <div class="bottom-nav" style="--tabs-count:${tabs.length};--active-idx:${activeIdx};">
      <div class="nav-indicator"></div>
      ${tabs
        .map(
          (t) => `
            <a class="nav-tab ${t.key === activeKey ? "active" : ""}" href="${t.href}">
              <span>${escapeHtml(t.label)}</span>
              ${typeof t.badge === "number" && t.badge > 0 ? `<span class="nav-tab-badge">${t.badge}</span>` : ""}
            </a>
          `
        )
        .join("")}
    </div>
  `;
}

function updateStarsDisplay(val) {
  const el = document.getElementById("hdrStarsCount");
  if (el) el.textContent = String(Number(val || 0));
}

function initGiftezPage(activeKey, { requireAdmin = false, onStateReady = null } = {}) {
  startSnowfall();
  prefetchAppPages();

  const cached = loadCache();
  const state = cached || {
    ok: true,
    is_subscribed: false,
    is_admin: checkIsAdmin(),
    system_modes: { maintenance: false, update: false },
    stars_balance: 0,
    wager_left: 0,
    withdrawable_stars: 0,
    total_spins: 0,
    next_spin_at: 0,
    my_requests: [],
    cases: DEFAULT_CASES_LIST,
    upgrade_targets: Object.values(GIFTS_CATALOG)
  };

  if (checkIsAdmin(state)) {
    state.is_admin = true;
  }

  if (!Array.isArray(state.cases) || !state.cases.length) {
    state.cases = DEFAULT_CASES_LIST;
  }

  const modes = state.system_modes || { maintenance: false, update: false };
  if (!checkIsAdmin(state) && (modes.update || modes.maintenance)) {
    renderSystemLockScreen(modes.update ? "update" : "maintenance");
    return null;
  }

  const syncFromServer = async () => {
    if (!tg?.initData) return state;
    try {
      const r = await fetch(apiUrl("/api/state"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData: tg.initData })
      });
      const d = await r.json();
      if (d && d.ok) {
        Object.assign(state, d);
        if (checkIsAdmin(state)) {
          state.is_admin = true;
        }
        saveCache(state);

        const m = state.system_modes || { maintenance: false, update: false };
        if (!checkIsAdmin(state) && (m.update || m.maintenance)) {
          renderSystemLockScreen(m.update ? "update" : "maintenance");
          return state;
        }
        if (requireAdmin && !checkIsAdmin(state)) {
          navigateToPage("index.html");
          return state;
        }

        updateStarsDisplay(state.stars_balance);
        mountBottomNav(activeKey, state);
        if (onStateReady) onStateReady(state);
      }
    } catch (_) {}
    return state;
  };

  mountHeader(state, syncFromServer);
  mountBottomNav(activeKey, state);
  syncFromServer();

  return {
    state,
    syncFromServer,
    isTelegram: Boolean(tg && tg.initData)
  };
}