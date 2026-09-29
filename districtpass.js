/* =============================================================
   GYMORA — District Gym Pass
   The core GYMORA idea: pay once for a district and try every gym
   in it. Buying a district's pass gives one 1-day trial per gym in
   that district (one-time use per gym) — e.g. Abdoun has 5 gyms →
   a 5-day pass, one day at each. Pass holders also unlock a better
   offer when they subscribe to the gym they liked.
   Payment is simulated for now (like the rest of the prototype),
   ready to connect to the real processor later.
   Relies on globals: GYMS, state, t, I18N, esc, currentUser,
   updateUser, toast, reRenderSection, fmtPrice, CURRENCIES,
   fmtDate, openGym (app.js), switchSection, openFeature.
   ============================================================= */

const GP_PER_GYM_JOD = 5;      // pass price per gym in the district
const GP_VALID_DAYS = 30;      // days to use all the trial days
const GP_HOLDER_DISCOUNT = 0.15; // better offer: % off plans at pass gyms

const GP_I18N = {
  en: {
    gpTab: "District Gym Pass",
    gpTitle: "District Gym Pass",
    gpSub: "Pay once for a district and try every gym in it — one free day at each. Then get a members' discount at the gym you love.",
    gpPickArea: "Choose a district",
    gpPickGyms: "Choose the gyms to try",
    gpPickGymsSub: "Tap the gyms you want — pay only for those, one trial day each.",
    gpSelected: "Selected", gpTotal: "Total", gpFrom: "from", gpDay: "day",
    gpGyms: "gyms", gpDays: "day pass", gpDaysN: "{n}-day pass",
    gpBuy: "Get the pass", gpPrice: "Pass price", gpValid: "Valid for",
    gpValidDays: "{n} days from purchase",
    gpHowTitle: "How it works",
    gpHow1: "Pick a district and choose the gyms you want to try.",
    gpHow2: "Pay for those gyms only — one trial day at each, one time each.",
    gpHow3: "Show your pass at reception. After trying, subscribe to your favourite with a pass-holder discount.",
    gpActive: "Your active pass", gpArea: "District",
    gpUsed: "used", gpLeft: "left", gpExpires: "Expires",
    gpUseHere: "Use 1-day pass", gpUsedOn: "Used", gpExpired: "Pass expired",
    gpConfirmTitle: "Confirm pass purchase",
    gpPassBought: "Pass activated 🎟️ — enjoy your trials!",
    gpDayRedeemed: "Day pass activated ✅ Show this at the gym's reception today.",
    gpAllUsed: "You've tried every gym in this district 🎉 Pick your favourite below.",
    gpNoActive: "You don't have a pass yet. Choose a district to start.",
    gpHolderOffer: "🎟️ Pass holder offer",
    gpHolderOff: "{n}% off any plan at this gym — because you hold the {area} pass.",
    gpChangeArea: "Buy a different district",
    gpDemoNote: "Prototype: payment is simulated. Real checkout arrives with the backend.",
    gpOpenGym: "Open gym",
    gpViewPass: "View my District Pass",
  },
  ar: {
    gpTab: "باقة نوادي المنطقة",
    gpTitle: "باقة نوادي المنطقة",
    gpSub: "ادفع مرة واحدة للمنطقة وجرّب كل نواديها — يوم مجاني في كل نادٍ. ثم احصل على خصم للأعضاء في النادي الذي أعجبك.",
    gpPickArea: "اختر منطقة",
    gpPickGyms: "اختر النوادي التي تريد تجربتها",
    gpPickGymsSub: "اختر النوادي التي تريدها — تدفع لها فقط، يوم تجربة لكل نادٍ.",
    gpSelected: "المختارة", gpTotal: "الإجمالي", gpFrom: "من", gpDay: "يوم",
    gpGyms: "نوادٍ", gpDays: "يوم تجربة", gpDaysN: "باقة {n} أيام",
    gpBuy: "احصل على الباقة", gpPrice: "سعر الباقة", gpValid: "صالحة لمدة",
    gpValidDays: "{n} يوماً من الشراء",
    gpHowTitle: "كيف تعمل",
    gpHow1: "اختر منطقة ثم اختر النوادي التي تريد تجربتها.",
    gpHow2: "ادفع لتلك النوادي فقط — يوم تجربة لكل نادٍ، مرة واحدة لكل نادٍ.",
    gpHow3: "أظهر الباقة في الاستقبال. بعد التجربة، اشترك في ناديك المفضل بخصم حامل الباقة.",
    gpActive: "باقتك الفعّالة", gpArea: "المنطقة",
    gpUsed: "مستخدمة", gpLeft: "متبقية", gpExpires: "تنتهي",
    gpUseHere: "استخدم يوم تجربة", gpUsedOn: "استُخدمت", gpExpired: "انتهت الباقة",
    gpConfirmTitle: "تأكيد شراء الباقة",
    gpPassBought: "تم تفعيل الباقة 🎟️ — استمتع بتجاربك!",
    gpDayRedeemed: "تم تفعيل يوم التجربة ✅ أظهر هذا في استقبال النادي اليوم.",
    gpAllUsed: "لقد جرّبت كل نوادي هذه المنطقة 🎉 اختر المفضل لديك بالأسفل.",
    gpNoActive: "لا تملك باقة بعد. اختر منطقة للبدء.",
    gpHolderOffer: "🎟️ عرض حامل الباقة",
    gpHolderOff: "خصم {n}% على أي اشتراك في هذا النادي — لأنك تملك باقة {area}.",
    gpChangeArea: "اشترِ منطقة أخرى",
    gpDemoNote: "نموذج أولي: الدفع محاكى. الدفع الحقيقي يأتي مع الخادم.",
    gpOpenGym: "افتح النادي",
    gpViewPass: "عرض باقة منطقتي",
  },
};
Object.assign(I18N.en, GP_I18N.en);
Object.assign(I18N.ar, GP_I18N.ar);

/* ---------- data helpers ---------- */
function gpAreas() {
  const map = {};
  (typeof GYMS !== "undefined" ? GYMS : []).forEach(g => {
    const k = g.area && g.area.en;
    if (!k) return;
    if (!map[k]) map[k] = { key: k, area: g.area, gyms: [] };
    map[k].gyms.push(g);
  });
  return Object.values(map).sort((a, b) => b.gyms.length - a.gyms.length);
}
function gpAreaByKey(key) { return gpAreas().find(a => a.key === key) || null; }
function gpGymById(id) { return (typeof GYMS !== "undefined" ? GYMS : []).find(g => g.id === id) || null; }
/* Each gym's 1-day pass price. Gyms don't carry an explicit day price,
   so derive a fair one from the monthly plan (≈ a day of a month), with
   a small floor. */
function gpDayPrice(g) {
  if (!g) return GP_PER_GYM_JOD;
  if (typeof g.dayPassJOD === "number") return g.dayPassJOD;
  const monthly = typeof monthlyJOD === "function" ? monthlyJOD(g)
    : (g.plans && g.plans.length ? Math.min.apply(null, g.plans.filter(p => p.months === 1).map(p => p.priceJOD).concat(g.plans.map(p => p.priceJOD))) : 45);
  return Math.max(3, Math.round(monthly / 12));
}
/* Total for a set of chosen gym ids. */
function gpTotal(ids) { return (ids || []).reduce((sum, id) => sum + gpDayPrice(gpGymById(id)), 0); }

/* ---------- pass state (stored on the user) ---------- */
function gpActivePass(u) {
  const p = u && u.gymPass;
  if (!p) return null;
  if (p.expiresAt && p.expiresAt < Date.now()) return null; // lapsed
  return p;
}
function gpHoldsPassFor(u, areaKey) {
  const p = gpActivePass(u);
  return !!(p && p.area === areaKey);
}
/* Better-offer discount for a gym, if the user holds that district's
   pass. Used by the gym detail screen (app.js). */
function gpDiscountFor(gym, u) {
  if (!gym || !gym.area) return 0;
  return gpHoldsPassFor(u || (typeof currentUser === "function" && currentUser()), gym.area.en) ? GP_HOLDER_DISCOUNT : 0;
}

function gpBuy(areaKey, gymIds) {
  const a = gpAreaByKey(areaKey); if (!a) return;
  const ids = (gymIds || []).filter(id => a.gyms.some(g => g.id === id));
  if (!ids.length) return;
  const now = Date.now();
  updateUser({ gymPass: {
    area: a.key, areaName: a.area,
    gymIds: ids,                        // only the gyms the user chose
    used: {},                           // gymId -> timestamp
    boughtAt: now, expiresAt: now + GP_VALID_DAYS * 86400000,
    pricePaid: gpTotal(ids),
  } });
  toast(t("gpPassBought"));
}
function gpRedeem(gymId) {
  const u = currentUser(); const p = gpActivePass(u);
  if (!p || !p.gymIds.includes(gymId) || p.used[gymId]) return;
  const used = Object.assign({}, p.used, { [gymId]: Date.now() });
  updateUser({ gymPass: Object.assign({}, p, { used }) });
  toast(t("gpDayRedeemed"));
}

/* ---------- rendering ---------- */
let gpSelArea = null;      // district chosen (now picking gyms)
let gpChosen = {};         // gymId -> true, the gyms the user wants to try
let gpBrowsing = false;    // force the browse screen even while holding a pass

function resetGymPass() { gpSelArea = null; gpChosen = {}; gpBrowsing = false; }
function gpChosenIds() { return Object.keys(gpChosen).filter(id => gpChosen[id]); }

function gpFill(str, map) { return String(str).replace(/\{(\w+)\}/g, (_, k) => map[k] != null ? map[k] : ""); }

function secGymPass(u) {
  const pass = gpActivePass(u);
  if (gpSelArea) return gpSelectHTML(u);
  if (pass && !gpBrowsing) return gpActiveHTML(u, pass);
  return gpBrowseHTML(u);
}

function gpBrowseHTML(u) {
  const areas = gpAreas();
  const cards = areas.map(a => {
    const n = a.gyms.length;
    const from = Math.min.apply(null, a.gyms.map(gpDayPrice));
    return `
    <button class="gp-area" data-gparea="${esc(a.key)}">
      <div class="gp-area-top"><b>${a.area[state.lang]}</b><span class="gp-area-n">${n} ${t("gpGyms")}</span></div>
      <div class="gp-area-sub">${t("gpFrom")} <b>${fmtPrice(from)}</b> / ${t("gpDay")}</div>
    </button>`;
  }).join("");
  return `
  <h3>🎟️ ${t("gpTitle")}</h3>
  <div class="h-sub">${t("gpSub")}</div>
  <div class="section">
    <h4>ℹ️ ${t("gpHowTitle")}</h4>
    <div class="pm-feats">
      <div class="pm-feat">1️⃣ <span>${t("gpHow1")}</span></div>
      <div class="pm-feat">2️⃣ <span>${t("gpHow2")}</span></div>
      <div class="pm-feat">3️⃣ <span>${t("gpHow3")}</span></div>
    </div>
  </div>
  <h4 style="margin:16px 0 8px">📍 ${t("gpPickArea")}</h4>
  <div class="gp-areas">${cards}</div>
  <div class="note">💳 ${t("gpDemoNote")}</div>`;
}

/* pick which gyms in the chosen district to include, pay by the sum of
   their day-pass prices */
function gpSelectHTML(u) {
  const a = gpAreaByKey(gpSelArea); if (!a) return gpBrowseHTML(u);
  const chosen = gpChosenIds();
  const total = gpTotal(chosen);
  const rows = a.gyms.map(g => {
    const on = !!gpChosen[g.id];
    return `
    <button class="gp-pick ${on ? "on" : ""}" data-gppick="${esc(g.id)}">
      <span class="gp-check">${on ? "✅" : "⬜"}</span>
      <span class="gp-pick-main"><b>${g.name[state.lang]}</b><small>${g.area[state.lang]}</small></span>
      <span class="gp-pick-price">${fmtPrice(gpDayPrice(g))}<small>/${t("gpDay")}</small></span>
    </button>`;
  }).join("");
  return `
  <button class="linkbtn" id="gpBack" style="display:inline-block;margin:0 0 12px">‹ ${t("gpPickArea")}</button>
  <h3>${t("gpPickGyms")}</h3>
  <div class="h-sub">📍 ${a.area[state.lang]} · ${t("gpPickGymsSub")}</div>
  <div class="gp-picks">${rows}</div>
  <div class="section" style="position:sticky;bottom:0">
    <div class="kv"><span>${t("gpSelected")}</span><span><b>${chosen.length}</b> ${t("gpGyms")} · ${chosen.length} ${t("gpDays")}</span></div>
    <div class="kv"><span><b>${t("gpTotal")}</b></span><span><b>${fmtPrice(total)}</b></span></div>
    <div class="note" style="margin:6px 0 8px">✅ ${t("noHiddenFees")}</div>
    <button class="btn block" id="gpPay"${chosen.length ? "" : " disabled"}>🔒 ${t("gpBuy")}${chosen.length ? " — " + fmtPrice(total) : ""}</button>
  </div>
  <div class="note">💳 ${t("gpDemoNote")}</div>`;
}

function gpActiveHTML(u, pass) {
  const a = gpAreaByKey(pass.area) || { area: pass.areaName, gyms: (GYMS || []).filter(g => pass.gymIds.includes(g.id)) };
  const usedCount = Object.keys(pass.used || {}).length;
  const total = pass.gymIds.length;
  const left = total - usedCount;
  const rows = a.gyms.map(g => {
    const used = pass.used && pass.used[g.id];
    return `
    <div class="gp-gym">
      <div class="gp-gym-main">
        <b>${g.name[state.lang]}</b>
        <div class="note" style="margin:2px 0 0">${g.area[state.lang]}${used ? ` · ${t("gpUsedOn")} ${fmtDate(used)}` : ""}</div>
      </div>
      ${used
        ? `<span class="gp-done">✅ ${t("gpUsedOn")}</span>`
        : `<button class="btn sm" data-gpuse="${esc(g.id)}">${t("gpUseHere")}</button>`}
    </div>
    <div class="gp-gym-foot"><button class="linkbtn" data-gpopen="${esc(g.id)}">${t("gpOpenGym")} ›</button></div>`;
  }).join("");
  return `
  <h3>🎟️ ${t("gpActive")}</h3>
  <div class="h-sub">${t("gpArea")}: ${a.area[state.lang]}</div>
  <div class="section">
    <div class="stat-row">
      <div class="stat"><div class="n">${left}</div><div class="l">${t("gpLeft")}</div></div>
      <div class="stat"><div class="n">${usedCount}</div><div class="l">${t("gpUsed")}</div></div>
      <div class="stat"><div class="n">${total}</div><div class="l">${t("gpGyms")}</div></div>
    </div>
    <div class="kv"><span>${t("gpExpires")}</span><span>${fmtDate(pass.expiresAt)}</span></div>
    ${left === 0 ? `<div class="note" style="margin-top:8px">🎉 ${t("gpAllUsed")}</div>` : ""}
  </div>
  <div class="section">${rows}</div>
  <div class="note" style="margin-top:6px">${gpFill(t("gpHolderOff"), { n: Math.round(GP_HOLDER_DISCOUNT * 100), area: a.area[state.lang] })}</div>
  <button class="btn ghost block" id="gpChange" style="margin-top:12px">${t("gpChangeArea")}</button>`;
}

/* ---------- events (routed from onAuthClick) ---------- */
function handleGymPassClick(e) {
  const hit = (s) => e.target.closest(s);
  const area = hit("[data-gparea]");
  if (area) { gpSelArea = area.dataset.gparea; gpChosen = {}; reRenderSection(); return true; }
  const pick = hit("[data-gppick]");
  if (pick) { const id = pick.dataset.gppick; gpChosen[id] = !gpChosen[id]; reRenderSection(); return true; }
  if (hit("#gpBack") || hit("#gpCancel")) { gpSelArea = null; gpChosen = {}; reRenderSection(); return true; }
  if (hit("#gpPay")) { gpBuy(gpSelArea, gpChosenIds()); gpSelArea = null; gpChosen = {}; gpBrowsing = false; reRenderSection(); return true; }
  if (hit("#gpChange")) { gpBrowsing = true; gpSelArea = null; gpChosen = {}; reRenderSection(); return true; }
  const use = hit("[data-gpuse]");
  if (use) { gpRedeem(use.dataset.gpuse); reRenderSection(); return true; }
  const open = hit("[data-gpopen]");
  if (open && typeof openGym === "function") {
    const id = open.dataset.gpopen;
    if (typeof closeAuth === "function") closeAuth();
    openGym(id);
    return true;
  }
  return false;
}
