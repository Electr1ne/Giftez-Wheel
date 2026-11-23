function initDedicatedCasePage(caseId) {
  const session = initGiftezPage("home", {
    onStateReady(fresh) {
      appState = fresh;
      resolveCase();
      renderStaticCaseInfo();
      if (!isSpinning) renderControls();
    }
  });
  if (!session) return;

  let appState = session.state;
  let caseCfg = null;
  let isSpinning = false;
  let pendingDropId = null;
  let currentRerollPrice = 3;
  let fastSpin = localStorage.getItem("giftez_fast_spin") === "1";

  const sprites = {};
  ["bear", "rose", "heart", "gift", "bottle", "cake", "rocket", "ring", "nothing"].forEach((k) => {
    const im = new Image();
    im.onerror = () => {
      if (im.src !== getFallbackSrc(k)) im.src = getFallbackSrc(k);
    };
    im.src = getImageSrc(k);
    sprites[k] = im;
  });

  function resolveCase() {
    const list = (appState && Array.isArray(appState.cases) && appState.cases.length)
      ? appState.cases
      : DEFAULT_CASES_LIST;
    caseCfg = list.find((c) => c.id === caseId) || DEFAULT_CASES_LIST.find((c) => c.id === caseId) || list[0];
    if (caseCfg && typeof caseCfg.reroll_price === "number") {
      currentRerollPrice = caseCfg.reroll_price;
    } else if (caseCfg && !caseCfg.is_daily) {
      currentRerollPrice = Math.max(1, Math.floor(Number(caseCfg.price || 5) * 0.6));
    }
  }

  resolveCase();

  const isThinIceMode = () => Boolean(caseCfg && caseCfg.special_mode === "thin_ice");

  const canvas = document.getElementById("rouletteCanvas");
  const ctx = canvas.getContext("2d");
  const ITEM_W = 114;
  const ITEM_H = 140;
  const GAP = 10;
  const STEP = ITEM_W + GAP;
  const TOTAL_SLOTS = 82;
  const WIN_SLOT = 68;

  let wheelSlots = [];
  let scrollX = 2 * STEP;
  let lastTickSlot = -1;
  let winGlowAlpha = 0;

  function buildSlots(winObj = null) {
    const pool = (caseCfg && caseCfg.items && caseCfg.items.length)
      ? caseCfg.items
      : [{ label: "Мишка (15 ★)", type: "gift", gift: "bear", icon: "bear.png" }];

    wheelSlots = [];
    for (let i = 0; i < TOTAL_SLOTS; i++) {
      if (i === WIN_SLOT && winObj) {
        wheelSlots.push(winObj);
      } else {
        const sample = pool[i % pool.length];
        wheelSlots.push({
          label: sample.label,
          type: sample.type || "gift",
          gift: sample.gift || "bear",
          icon: sample.icon || "bear.png"
        });
      }
    }
  }

  function resizeWheel() {
    if (isThinIceMode()) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawWheel();
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawWheel() {
    if (isThinIceMode()) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    for (let i = 0; i < wheelSlots.length; i++) {
      const ix = cx + (i * STEP - scrollX);
      if (ix < -ITEM_W || ix > w + ITEM_W) continue;

      const dist = Math.abs(ix - cx);
      const focus = Math.max(0, 1 - dist / 145);
      const scale = 0.92 + focus * 0.08 + (i === WIN_SLOT ? winGlowAlpha * 0.04 : 0);
      const cw = ITEM_W * scale;
      const ch = ITEM_H * scale;
      const x = ix - cw / 2;
      const y = cy - ch / 2;

      const slot = wheelSlots[i];
      const isNothing = slot.type === "nothing" || slot.gift === "nothing";
      const isStars = slot.type === "stars" || slot.icon === "star";

      ctx.save();
      if (i === WIN_SLOT && winGlowAlpha > 0) {
        ctx.shadowColor = isStars ? "rgba(251, 191, 36, 0.7)" : "rgba(56, 189, 248, 0.75)";
        ctx.shadowBlur = 22 * winGlowAlpha;
      }
      roundRect(x, y, cw, ch, 16 * scale);

      if (isStars) {
        ctx.fillStyle = "rgba(251, 191, 36, 0.16)";
        ctx.strokeStyle = "rgba(251, 191, 36, 0.56)";
      } else if (!isNothing) {
        ctx.fillStyle = "rgba(56, 189, 248, 0.17)";
        ctx.strokeStyle = "rgba(125, 211, 252, 0.58)";
      } else {
        ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      }
      ctx.fill();
      ctx.lineWidth = focus > 0.7 ? 1.8 : 1;
      ctx.stroke();

      if (isStars) {
        ctx.textAlign = "center";
        ctx.font = `900 ${Math.round(26 * scale)}px -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.fillStyle = "#fde047";
        ctx.fillText("★", ix, y + 54 * scale);
      } else {
        const cleanKey = String(slot.gift || slot.icon || "bear").replace(".png", "");
        const sp = sprites[cleanKey] || sprites.bear;
        const sz = 54 * scale;
        if (sp && sp.complete && sp.naturalWidth > 0) {
          ctx.drawImage(sp, ix - sz / 2, y + 17 * scale, sz, sz);
        }
      }

      ctx.textAlign = "center";
      ctx.font = `700 ${Math.round(11.5 * scale)}px -apple-system, BlinkMacSystemFont, sans-serif`;
      ctx.fillStyle = isStars ? "#fef08a" : (isNothing ? "#94a3b8" : "#e0f2fe");
      ctx.fillText(slot.label || "Приз", ix, y + ch - 18 * scale);

      ctx.restore();
    }
  }

  function spinCurve(t) {
    const split = 0.20;
    const pIn = 2.1;
    const pOut = 5.0;
    const w1 = split / pIn;
    const w2 = (1 - split) / pOut;
    const sum = w1 + w2;
    if (t <= split) return (w1 / sum) * Math.pow(t / split, pIn);
    return 1 - (w2 / sum) * Math.pow((1 - t) / (1 - split), pOut);
  }

  function spawnIceShards(colorHex) {
    const layer = document.getElementById("iceShardsLayer");
    if (!layer) return;
    layer.innerHTML = "";
    for (let i = 0; i < 16; i++) {
      const s = document.createElement("span");
      s.className = "ice-shard-particle";
      const angle = (Math.PI * 2 * i) / 16 + (Math.random() - 0.5) * 0.3;
      const dist = 55 + Math.random() * 65;
      s.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      s.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
      s.style.setProperty("--rot", `${Math.round(Math.random() * 360)}deg`);
      s.style.background = colorHex;
      layer.appendChild(s);
    }
  }

  function animateThinIceBreak(drop) {
    return new Promise((resolve) => {
      const box = document.getElementById("iceSlabBox");
      const label = document.getElementById("iceSlabResultText");
      box.className = "ice-slab-box shaking";
      label.textContent = "ПРОВЕРКА ПРОЧНОСТИ...";

      const tickInterval = setInterval(() => {
        playTick();
        if (tg?.HapticFeedback) tg.HapticFeedback.selectionChanged();
      }, 190);

      setTimeout(() => {
        box.classList.add("cracking-stage-1");
      }, 650);

      setTimeout(() => {
        box.classList.add("cracking-stage-2");
      }, 1350);

      setTimeout(() => {
        clearInterval(tickInterval);
        box.classList.remove("shaking");
        if (drop.drop_type === "nothing") {
          box.classList.add("broken-empty");
          spawnIceShards("#f43f5e");
          label.textContent = "ЛЁД ТРЕСНУЛ — ПУСТО";
        } else if (Number(drop.stars_amount) >= Number(caseCfg.price || 50) * 2) {
          box.classList.add("broken-jackpot");
          spawnIceShards("#fbbf24");
          label.textContent = `ПРОРЫВ: ${drop.label}!`;
        } else {
          box.classList.add("broken-small");
          spawnIceShards("#38bdf8");
          label.textContent = `НА КРАЮ: +${drop.stars_amount} ★`;
        }
        setTimeout(resolve, 750);
      }, 2200);
    });
  }

  function animateWheel(winObj) {
    return new Promise((resolve) => {
      winGlowAlpha = 0;
      buildSlots(winObj);
      const start = 2 * STEP;
      const target = WIN_SLOT * STEP + (Math.random() - 0.5) * 32;
      const duration = fastSpin ? 1900 : 6200;
      const settleDuration = fastSpin ? 180 : 420;
      const t0 = performance.now();
      lastTickSlot = Math.round(start / STEP);

      function step(now) {
        const p = Math.min((now - t0) / duration, 1);
        scrollX = start + (target - start) * spinCurve(p);

        const curSlot = Math.round(scrollX / STEP);
        if (curSlot !== lastTickSlot) {
          lastTickSlot = curSlot;
          playTick();
          if (tg?.HapticFeedback && p > 0.08 && p < 0.96) {
            tg.HapticFeedback.selectionChanged();
          }
        }
        drawWheel();

        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          const s0 = scrollX;
          const s1 = WIN_SLOT * STEP;
          const st0 = performance.now();
          function settle(tNow) {
            const sp = Math.min((tNow - st0) / settleDuration, 1);
            const easeOut = 1 - Math.pow(1 - sp, 3);
            scrollX = s0 + (s1 - s0) * easeOut;
            winGlowAlpha = easeOut;
            drawWheel();
            if (sp < 1) requestAnimationFrame(settle);
            else resolve();
          }
          requestAnimationFrame(settle);
        }
      }
      requestAnimationFrame(step);
    });
  }

  function formatTimer(sec) {
    const s = Math.max(0, Math.floor(sec));
    const hh = String(Math.floor(s / 3600)).padStart(2, "0");
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }

  function renderStaticCaseInfo() {
    if (!caseCfg) return;
    document.title = `GiftezUp — ${caseCfg.name}`;
    document.getElementById("caseTitle").textContent = caseCfg.name;

    const stdStage = document.getElementById("standardWheelStage");
    const iceStage = document.getElementById("thinIceStage");
    if (isThinIceMode()) {
      stdStage.style.display = "none";
      iceStage.style.display = "flex";
    } else {
      stdStage.style.display = "block";
      iceStage.style.display = "none";
    }

    const limitInfo = (caseCfg.availability === "limited" && typeof caseCfg.max_opens === "number")
      ? ` · Осталось: ${typeof caseCfg.remaining === "number" ? caseCfg.remaining : caseCfg.max_opens} из ${caseCfg.max_opens}`
      : "";

    if (caseCfg.is_daily) {
      document.getElementById("caseSub").textContent = "Бесплатно раз в 24 часа · Награда зачисляется в ★";
    } else if (caseCfg.reroll_allowed === false) {
      document.getElementById("caseSub").textContent = `Стоимость: ${Number(caseCfg.price)} ★ · Без перекрута${limitInfo}`;
    } else {
      document.getElementById("caseSub").textContent = `Стоимость: ${Number(caseCfg.price)} ★ · Перекрут за ${currentRerollPrice} ★${limitInfo}`;
    }

    const badgeEl = document.getElementById("caseTopRerollBadge");
    if (badgeEl && !caseCfg.is_daily) {
      badgeEl.textContent = caseCfg.reroll_allowed === false
        ? "БЕЗ ПЕРЕКРУТА"
        : `ПЕРЕКРУТ ${currentRerollPrice} ★`;
    }

    const lootBox = document.getElementById("caseLootGrid");
    if (lootBox) {
      lootBox.innerHTML = (caseCfg.items || [])
        .map((item) => {
          const isStars = item.type === "stars" || item.icon === "star";
          const isNothing = item.type === "nothing" || item.gift === "nothing";
          const imgKey = isNothing ? "nothing" : (item.gift || item.icon || "bear");
          return `
            <div class="inv-tile">
              <div class="inv-tile-art">
                ${
                  isStars
                    ? `<span style="font-size:22px;font-weight:900;color:#fde047;">★</span>`
                    : `<img src="${getImageSrc(imgKey)}" onerror="this.src=getFallbackSrc('${escapeHtml(imgKey)}')" alt="" />`
                }
              </div>
              <div class="inv-tile-title">${escapeHtml(item.label)}</div>
            </div>
          `;
        })
        .join("");
    }
  }

  function renderControls() {
    const area = document.getElementById("caseControlsArea");
    if (!area || !caseCfg) return;

    if (pendingDropId && !caseCfg.is_daily && caseCfg.reroll_allowed !== false) {
      area.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:8px;">
          <button type="button" class="btn-main" id="btnAcceptDrop" ${isSpinning ? "disabled" : ""}>Забрать звёзды на баланс</button>
          <button type="button" class="btn-main gold-btn" id="btnRerollDrop" ${isSpinning ? "disabled" : ""}>Не понравилось — перекрутить за ${currentRerollPrice} ★</button>
        </div>
      `;
      document.getElementById("btnAcceptDrop").onclick = acceptDrop;
      document.getElementById("btnRerollDrop").onclick = rerollDrop;
      return;
    }

    let mainLabel = caseCfg.is_daily ? "Крутить бесплатно" : `Открыть за ${Number(caseCfg.price)} ★`;
    let mainDisabled = isSpinning;

    if (caseCfg.is_sold_out) {
      mainDisabled = true;
      mainLabel = "Кейс раскуплен";
    } else if (caseCfg.is_daily) {
      const now = Math.floor(Date.now() / 1000);
      const readyAt = Number(appState.next_spin_at || 0);
      if (readyAt > now) {
        mainDisabled = true;
        mainLabel = `Доступно через ${formatTimer(readyAt - now)}`;
      }
    }

    if (isThinIceMode()) {
      area.innerHTML = `
        <button type="button" class="btn-main" id="btnOpenCase" ${mainDisabled ? "disabled" : ""}>
          ${isSpinning ? "Ступаем на лёд..." : mainLabel}
        </button>
      `;
      document.getElementById("btnOpenCase").onclick = openCase;
      return;
    }

    area.innerHTML = `
      <div class="spin-row">
        <button type="button" class="btn-main" id="btnOpenCase" ${mainDisabled ? "disabled" : ""}>
          ${isSpinning ? (fastSpin ? "Быстрый крут..." : "Крутим...") : mainLabel}
        </button>
        <button type="button" class="btn-fast-toggle ${fastSpin ? "active" : ""}" id="btnFastToggle" title="Быстрый прокрут">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </button>
      </div>
    `;

    document.getElementById("btnOpenCase").onclick = openCase;
    document.getElementById("btnFastToggle").onclick = () => {
      if (isSpinning) return;
      fastSpin = !fastSpin;
      localStorage.setItem("giftez_fast_spin", fastSpin ? "1" : "0");
      renderControls();
      toast(fastSpin ? "Быстрый прокрут: ВКЛ" : "Быстрый прокрут: ВЫКЛ");
    };
  }

  function showDropModal(drop) {
    let modal = document.getElementById("caseResultModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "caseResultModal";
      modal.className = "backdrop";
      modal.innerHTML = `
        <div class="modal-box" onclick="event.stopPropagation()">
          <div class="modal-img" id="resModalImg"></div>
          <h3 id="resModalTitle">Результат</h3>
          <p id="resModalDesc">...</p>
          <button type="button" class="btn-main" id="resModalOk">Отлично</button>
        </div>
      `;
      modal.onclick = () => modal.classList.remove("open");
      document.body.appendChild(modal);
    }

    const isNothing = drop.drop_type === "nothing";
    const isStars = drop.drop_type === "stars";
    const imgKey = isStars ? "bear" : (drop.gift_id || drop.icon || "nothing");

    document.getElementById("resModalImg").innerHTML = isStars
      ? `<span style="font-size:32px;font-weight:900;color:#fde047;">★</span>`
      : `<img src="${getImageSrc(imgKey)}" onerror="this.src=getFallbackSrc('${escapeHtml(imgKey)}')" alt="" />`;

    document.getElementById("resModalTitle").textContent = isNothing ? "Ничего не выпало" : `Выпало: ${drop.label}`;
    document.getElementById("resModalDesc").textContent = isNothing
      ? "В этот раз пустой слот. Попробуй снова!"
      : `На ваш баланс зачислено +${Number(drop.stars_amount || 0)} ★.`;

    document.getElementById("resModalOk").onclick = () => modal.classList.remove("open");
    modal.classList.add("open");
  }

  async function openCase() {
    if (isSpinning || !caseCfg) return;
    if (!tg?.initData) {
      toast("Открой мини-приложение в Telegram");
      return;
    }

    isSpinning = true;
    renderControls();

    const endpoint = caseCfg.is_daily ? "/api/spin_daily" : "/api/open_paid_case";
    const body = caseCfg.is_daily
      ? { initData: tg.initData }
      : { initData: tg.initData, case_id: caseCfg.id };

    try {
      const r = await fetch(apiUrl(endpoint), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const d = await r.json();

      if (!d.ok) {
        isSpinning = false;
        if (d.error === "not_subscribed") appState.is_subscribed = false;
        if (d.next_spin_at) appState.next_spin_at = d.next_spin_at;
        saveCache(appState);
        renderControls();
        toast(d.message || "Открытие недоступно");
        return;
      }

      if (typeof d.reroll_price === "number") currentRerollPrice = d.reroll_price;
      if (typeof d.remaining === "number") {
        caseCfg.remaining = d.remaining;
        if (d.remaining <= 0) caseCfg.is_sold_out = true;
      }
      appState.stars_balance = d.stars_balance;
      if (typeof d.wager_left === "number") appState.wager_left = d.wager_left;
      if (typeof d.withdrawable_stars === "number") appState.withdrawable_stars = d.withdrawable_stars;
      if (d.next_spin_at) appState.next_spin_at = d.next_spin_at;
      updateStarsDisplay(appState.stars_balance);
      saveCache(appState);

      const drop = d.drop;
      if (isThinIceMode()) {
        await animateThinIceBreak(drop);
      } else {
        await animateWheel({
          label: drop.label,
          type: drop.drop_type,
          gift: drop.gift_id || "nothing",
          icon: drop.icon || "nothing.png"
        });
      }

      isSpinning = false;
      renderStaticCaseInfo();

      if (caseCfg.is_daily || !d.can_reroll || !d.drop_id) {
        if (drop.drop_type !== "nothing") playWin();
        renderControls();
        showDropModal(drop);
        session.syncFromServer();
      } else {
        pendingDropId = d.drop_id;
        if (drop.drop_type !== "nothing") playWin();
        renderControls();
        toast(`Выпало: ${drop.label}. Забери ★ или перекрути за ${currentRerollPrice} ★!`);
      }
    } catch (_) {
      isSpinning = false;
      renderControls();
      toast("Ошибка связи с сервером");
    }
  }

  async function rerollDrop() {
    if (isSpinning || !pendingDropId) return;
    isSpinning = true;
    renderControls();

    try {
      const r = await fetch(apiUrl("/api/reroll_case_drop"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData: tg.initData, drop_id: pendingDropId })
      });
      const d = await r.json();
      if (!d.ok) {
        isSpinning = false;
        renderControls();
        toast(d.message || "Не удалось перекрутить");
        return;
      }

      if (typeof d.reroll_price === "number") currentRerollPrice = d.reroll_price;
      appState.stars_balance = d.stars_balance;
      if (typeof d.wager_left === "number") appState.wager_left = d.wager_left;
      if (typeof d.withdrawable_stars === "number") appState.withdrawable_stars = d.withdrawable_stars;
      updateStarsDisplay(appState.stars_balance);
      saveCache(appState);

      const drop = d.drop;
      await animateWheel({
        label: drop.label,
        type: drop.drop_type,
        gift: drop.gift_id || "nothing",
        icon: drop.icon || "nothing.png"
      });

      isSpinning = false;
      playWin();
      renderControls();
      toast(`Перекрут: ${drop.label}`);
    } catch (_) {
      isSpinning = false;
      renderControls();
      toast("Ошибка сети");
    }
  }

  async function acceptDrop() {
    if (isSpinning || !pendingDropId) return;
    const dropId = pendingDropId;
    pendingDropId = null;
    renderControls();

    try {
      const r = await fetch(apiUrl("/api/accept_case_drop"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData: tg.initData, drop_id: dropId })
      });
      const d = await r.json();
      if (d.ok) {
        appState.stars_balance = d.stars_balance;
        if (typeof d.wager_left === "number") appState.wager_left = d.wager_left;
        if (typeof d.withdrawable_stars === "number") appState.withdrawable_stars = d.withdrawable_stars;
        updateStarsDisplay(appState.stars_balance);
        saveCache(appState);
        playWin();
        toast("Звёзды зачислены на баланс!");
      }
    } catch (_) {
      toast("Ошибка сети");
    }
  }

  buildSlots();
  renderStaticCaseInfo();
  renderControls();
  window.addEventListener("resize", resizeWheel);
  resizeWheel();

  setInterval(() => {
    if (caseCfg && caseCfg.is_daily && !isSpinning) {
      renderControls();
    }
  }, 1000);
}