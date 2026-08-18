/* =============================================================
   GYMORA — Premium subscription (prototype checkout)
   Gates "My plan" and the workout tracker behind a paid
   subscription: weekly / monthly ($10) / yearly, plus a
   one-time 3-day free trial. Payment is simulated — real
   checkout via a licensed Jordanian processor arrives with
   the backend.
   Relies on globals: state, t, I18N, currentUser, updateUser,
   toast, reRenderSection, fmtPrice, CURRENCIES, fmtDate.
   ============================================================= */

const PM_I18N = {
  en: {
    pmTitle: "GYMORA Premium",
    pmSub: "Unlock your personal plan and the workout tracker.",
    pmFeat1: "Personal workout plan — built for men and women differently",
    pmFeat2: "Meals, calories, water and supplements matched to your goal",
    pmFeat3: "Workout tracker — log every set, see your progress",
    pmFeat4: "Weekly gym schedule with smart reminders",
    pmWeekly: "Weekly", pmMonthly: "Monthly", pmYearly: "Yearly",
    pmPerWeek: "/ week", pmPerMonth: "/ month", pmPerYear: "/ year",
    pmPopular: "Most popular", pmBestValue: "Save 50%",
    pmChoose: "Choose",
    pmTrialBtn: "Start 3-day free trial 🎁",
    pmTrialNote: "No card needed. One trial per account.",
    pmTrialStarted: "Your 3-day free trial has started 🎉",
    pmTrialDone: "Your free trial has ended — pick a plan to keep your plan & workouts.",
    pmExpired: "Your subscription has ended — renew to keep your plan & workouts.",
    pmConfirmTitle: "Confirm subscription",
    pmActivate: "Activate (demo)",
    pmDemoNote: "Prototype: payment is simulated for now. Real checkout (card, CliQ, e-wallets) arrives with the backend.",
    pmActive: "Premium active 🎉",
    pmStatusTrial: "Free trial", pmDaysLeft: "days left", pmDayLeft: "day left",
    pmRenew: "Renew",
    pmSeePlanTrial: "Start free trial & see my plan 🎁",
    pmTab: "Subscription",
    pmCurrentPlan: "Current plan", pmStarted: "Started", pmActiveUntil: "Active until",
    pmTimeLeft: "Time left", pmChangePlan: "Change plan", pmCurrent: "Current",
    pmTrialPick: "You're on the free trial — pick a plan to keep your plan & workouts after it ends.",
    pmIncluded: "What's included",
    pmCancel: "Cancel subscription",
    pmCancelConfirm: "Cancel your subscription? You'll keep access until it expires, and it won't renew.",
    pmCancelKeep: "Keep subscription",
    pmCancelYes: "Yes, cancel",
    pmCanceled: "Your subscription has been canceled.",
    pmCancelNote: "Access continues until the end of your current period.",
    pmPayMethod: "Payment method",
    pmPayCard: "Credit / Debit card",
    pmPayCardSub: "Visa · Mastercard",
    pmPayPaypal: "PayPal",
    pmPayCliq: "CliQ",
    pmPayCliqSub: "Instant bank transfer",
    pmCardNum: "Card number", pmCardName: "Name on card",
    pmCardExp: "MM / YY", pmCardCvc: "CVC",
    pmPayNow: "Pay",
    pmPaypalNote: "You'll be redirected to PayPal to complete payment securely.",
    pmCliqAlias: "CliQ alias or mobile number",
    pmCliqNote: "Approve the payment request in your bank app to activate.",
    pmSecure: "Secured payment — your details are encrypted.",
    pmPayErr: "Please check your payment details.",
    pmProcessing: "Processing payment…",
    pmTotal: "Total",
    payTab: "Payment methods",
    payTitle: "Payment methods",
    paySub: "Add or remove the cards and wallets you pay with.",
    payAdd: "Add payment method",
    payNone: "No payment methods yet. Add one to subscribe or start your free trial.",
    paySave: "Save payment method",
    paySaved: "Payment method added ✅",
    payRemoved: "Payment method removed.",
    payRemove: "Remove",
    payDefault: "Default",
    payMakeDefault: "Make default",
    payExpires: "Expires",
    payTrialNeed: "Add a payment method to start your free trial.",
    payCardName: "Cardholder name",
  },
  ar: {
    pmTitle: "GYMORA بريميوم",
    pmSub: "افتح خطتك الشخصية ومتتبّع التمارين.",
    pmFeat1: "خطة تمارين شخصية — مبنية بشكل مختلف للرجال والنساء",
    pmFeat2: "وجبات وسعرات وماء ومكملات حسب هدفك",
    pmFeat3: "متتبّع التمارين — سجّل كل مجموعة وتابع تقدمك",
    pmFeat4: "جدول أسبوعي للنادي مع تذكيرات ذكية",
    pmWeekly: "أسبوعي", pmMonthly: "شهري", pmYearly: "سنوي",
    pmPerWeek: "/ أسبوع", pmPerMonth: "/ شهر", pmPerYear: "/ سنة",
    pmPopular: "الأكثر شيوعاً", pmBestValue: "وفّر 50%",
    pmChoose: "اختر",
    pmTrialBtn: "ابدأ تجربة مجانية 3 أيام 🎁",
    pmTrialNote: "لا حاجة لبطاقة. تجربة واحدة لكل حساب.",
    pmTrialStarted: "بدأت تجربتك المجانية لـ 3 أيام 🎉",
    pmTrialDone: "انتهت تجربتك المجانية — اختر خطة للاحتفاظ بخطتك وتمارينك.",
    pmExpired: "انتهى اشتراكك — جدّد للاحتفاظ بخطتك وتمارينك.",
    pmConfirmTitle: "تأكيد الاشتراك",
    pmActivate: "تفعيل (تجريبي)",
    pmDemoNote: "نموذج أولي: الدفع محاكى حالياً. الدفع الحقيقي (بطاقة، كليك، محافظ إلكترونية) يأتي مع الخادم.",
    pmActive: "بريميوم مفعّل 🎉",
    pmStatusTrial: "تجربة مجانية", pmDaysLeft: "أيام متبقية", pmDayLeft: "يوم متبقٍ",
    pmRenew: "تجديد",
    pmSeePlanTrial: "ابدأ التجربة المجانية واعرض خطتي 🎁",
    pmTab: "الاشتراك",
    pmCurrentPlan: "الخطة الحالية", pmStarted: "بدأ في", pmActiveUntil: "فعال حتى",
    pmTimeLeft: "الوقت المتبقي", pmChangePlan: "تغيير الخطة", pmCurrent: "الحالية",
    pmTrialPick: "أنت في التجربة المجانية — اختر خطة للاحتفاظ بخطتك وتمارينك بعد انتهائها.",
    pmIncluded: "ماذا يشمل الاشتراك",
    pmCancel: "إلغاء الاشتراك",
    pmCancelConfirm: "هل تريد إلغاء اشتراكك؟ ستحتفظ بالوصول حتى انتهاء المدة، ولن يتجدد.",
    pmCancelKeep: "الاحتفاظ بالاشتراك",
    pmCancelYes: "نعم، إلغاء",
    pmCanceled: "تم إلغاء اشتراكك.",
    pmCancelNote: "يستمر الوصول حتى نهاية الفترة الحالية.",
    pmPayMethod: "طريقة الدفع",
    pmPayCard: "بطاقة ائتمان / خصم",
    pmPayCardSub: "فيزا · ماستركارد",
    pmPayPaypal: "باي بال",
    pmPayCliq: "كليك (CliQ)",
    pmPayCliqSub: "تحويل بنكي فوري",
    pmCardNum: "رقم البطاقة", pmCardName: "الاسم على البطاقة",
    pmCardExp: "شهر / سنة", pmCardCvc: "CVC",
    pmPayNow: "ادفع",
    pmPaypalNote: "سيتم تحويلك إلى باي بال لإتمام الدفع بأمان.",
    pmCliqAlias: "اسم مستعار كليك أو رقم الجوال",
    pmCliqNote: "وافق على طلب الدفع في تطبيق بنكك للتفعيل.",
    pmSecure: "دفع آمن — بياناتك مشفّرة.",
    pmPayErr: "يرجى التحقق من بيانات الدفع.",
    pmProcessing: "جاري معالجة الدفع…",
    pmTotal: "الإجمالي",
    payTab: "طرق الدفع",
    payTitle: "طرق الدفع",
    paySub: "أضِف أو احذف البطاقات والمحافظ التي تدفع بها.",
    payAdd: "إضافة طريقة دفع",
    payNone: "لا توجد طرق دفع بعد. أضِف واحدة للاشتراك أو لبدء تجربتك المجانية.",
    paySave: "حفظ طريقة الدفع",
    paySaved: "تمت إضافة طريقة الدفع ✅",
    payRemoved: "تم حذف طريقة الدفع.",
    payRemove: "حذف",
    payDefault: "افتراضية",
    payMakeDefault: "اجعلها افتراضية",
    payExpires: "تنتهي",
    payTrialNeed: "أضِف طريقة دفع لبدء تجربتك المجانية.",
    payCardName: "اسم حامل البطاقة",
  },
};
Object.assign(I18N.en, PM_I18N.en);
Object.assign(I18N.ar, PM_I18N.ar);

/* prices are set in USD ($10/month headline) and converted to the
   selected currency through the app's JOD-based rates */
const PREMIUM_PLANS = {
  weekly:  { usd: 3,  days: 7 },
  monthly: { usd: 10, days: 30 },
  yearly:  { usd: 60, days: 365 },
};
const pmJOD = (usd) => usd / CURRENCIES.USD.rate;
const pmPrice = (key) => fmtPrice(pmJOD(PREMIUM_PLANS[key].usd));
const pmLabel = (key) => ({ weekly: t("pmWeekly"), monthly: t("pmMonthly"), yearly: t("pmYearly"), trial: t("pmStatusTrial") }[key]);
const pmPer = (key) => ({ weekly: t("pmPerWeek"), monthly: t("pmPerMonth"), yearly: t("pmPerYear") }[key]);

let pmSelected = null; // plan key on the confirm step
let pmConfirmCancel = false; // showing the cancel-confirmation step
let pmPayMethod = "card"; // selected payment method: card | paypal | cliq
let pmPaying = false; // true while the simulated charge is processing

/* ---------- state ---------- */
function premiumActive(u) { return !!(u && u.sub && u.sub.until > Date.now()); }
function pmDaysLeft(u) { return Math.max(1, Math.ceil((u.sub.until - Date.now()) / 86400000)); }

function premiumStartTrial() {
  const now = Date.now();
  updateUser({ sub: { plan: "trial", since: now, until: now + 3 * 86400000 }, trialUsed: true });
  toast(t("pmTrialStarted"));
}
function premiumSubscribe(key) {
  const p = PREMIUM_PLANS[key]; if (!p) return;
  const now = Date.now();
  updateUser({ sub: { plan: key, since: now, until: now + p.days * 86400000 } });
  toast(t("pmActive"));
}
/* Cancel = stop auto-renew. Access continues until the current period
   ends (sub.until), then premiumActive() returns false on its own. */
function premiumCancel() {
  const u = currentUser();
  if (!u || !u.sub) return;
  updateUser({ sub: Object.assign({}, u.sub, { canceled: true }) });
  toast(t("pmCanceled"));
}

/* ---------- gate: wraps the plan / workouts sections ---------- */
function gatePremium(u, renderFn) {
  if (premiumActive(u)) return pmStatusChip(u) + renderFn(u);
  return paywallHTML(u);
}
function pmStatusChip(u) {
  const d = pmDaysLeft(u);
  return `<div class="pm-chip">⭐ ${t("pmTitle")} · ${pmLabel(u.sub.plan)} · ${d} ${d === 1 ? t("pmDayLeft") : t("pmDaysLeft")}</div>`;
}

/* ---------- paywall ---------- */
function paywallHTML(u) {
  if (pmSelected) return pmConfirmHTML(u);
  const expiredMsg = u.sub && u.sub.until <= Date.now()
    ? `<div class="form-err show" style="position:static;margin-bottom:10px">${u.sub.plan === "trial" ? t("pmTrialDone") : t("pmExpired")}</div>` : "";
  const cards = [
    ["weekly", "", ""],
    ["monthly", "popular", t("pmPopular")],
    ["yearly", "best", t("pmBestValue")],
  ].map(([key, cls, badge]) => `
    <button class="pm-card ${cls}" data-pmplan="${key}">
      ${badge ? `<span class="pm-badge">${badge}</span>` : ""}
      <div class="pm-name">${pmLabel(key)}</div>
      <div class="pm-price">${pmPrice(key)}</div>
      <div class="pm-per">${pmPer(key)}</div>
      <div class="btn sm pm-go">${t("pmChoose")}</div>
    </button>`).join("");
  return `
  <div class="pm-lock">🔒</div>
  <h3 style="text-align:center">⭐ ${t("pmTitle")}</h3>
  <div class="h-sub" style="text-align:center">${t("pmSub")}</div>
  ${expiredMsg}
  <div class="pm-feats">
    ${[t("pmFeat1"), t("pmFeat2"), t("pmFeat3"), t("pmFeat4")].map(f => `<div class="pm-feat">✅ <span>${f}</span></div>`).join("")}
  </div>
  <div class="pm-cards">${cards}</div>
  ${!u.trialUsed ? `
    <button class="btn ghost block" id="pmTrial" style="margin-top:12px">${t("pmTrialBtn")}</button>
    <div class="note" style="text-align:center">${t("pmTrialNote")}</div>` : ""}
  <div class="note">💳 ${t("pmDemoNote")}</div>`;
}
function pmConfirmHTML(u) {
  const key = pmSelected;
  const methods = [
    ["card", "💳", t("pmPayCard"), t("pmPayCardSub")],
    ["paypal", "🅿️", t("pmPayPaypal"), "PayPal · Visa · Mastercard"],
    ["cliq", "🏦", t("pmPayCliq"), t("pmPayCliqSub")],
  ].map(([m, icon, name, sub]) => `
    <button type="button" class="pm-pay ${pmPayMethod === m ? "on" : ""}" data-pmpay="${m}">
      <span class="pm-pay-ic">${icon}</span>
      <span class="pm-pay-txt"><b>${name}</b><small>${sub}</small></span>
      <span class="pm-pay-dot"></span>
    </button>`).join("");

  const cardFields = `
    <div class="pm-pay-form">
      <input class="ob-input" id="pmCardNum" inputmode="numeric" autocomplete="cc-number" maxlength="23" placeholder="${t("pmCardNum")} — 1234 5678 9012 3456">
      <input class="ob-input" id="pmCardName" autocomplete="cc-name" placeholder="${t("pmCardName")}">
      <div class="pm-pay-row">
        <input class="ob-input" id="pmCardExp" inputmode="numeric" autocomplete="cc-exp" maxlength="7" placeholder="${t("pmCardExp")}">
        <input class="ob-input" id="pmCardCvc" inputmode="numeric" autocomplete="cc-csc" maxlength="4" placeholder="${t("pmCardCvc")}">
      </div>
    </div>`;
  const paypalFields = `<div class="pm-pay-form"><div class="note" style="margin:0">🅿️ ${t("pmPaypalNote")}</div></div>`;
  const cliqFields = `
    <div class="pm-pay-form">
      <input class="ob-input" id="pmCliqAlias" placeholder="${t("pmCliqAlias")}">
      <div class="note" style="margin:6px 0 0">🏦 ${t("pmCliqNote")}</div>
    </div>`;
  const fields = pmPayMethod === "card" ? cardFields : pmPayMethod === "paypal" ? paypalFields : cliqFields;

  return `
  <h3>${t("pmConfirmTitle")}</h3>
  <div class="h-sub">⭐ ${t("pmTitle")}</div>
  <div class="section">
    <div class="kv"><span>${pmLabel(key)}</span><span>${pmPrice(key)} ${pmPer(key)}</span></div>
    <div class="kv"><span><b>${t("pmTotal")}</b></span><span><b>${pmPrice(key)}</b></span></div>
  </div>
  <h4 style="margin:16px 0 8px">${t("pmPayMethod")}</h4>
  <div class="pm-pays">${methods}</div>
  ${fields}
  <div class="form-err" id="pmPayErr" style="position:static;display:none;margin:8px 0 0"></div>
  <button class="btn block" id="pmPayNow" style="margin-top:14px"${pmPaying ? " disabled" : ""}>${pmPaying ? "⏳ " + t("pmProcessing") : "🔒 " + t("pmPayNow") + " " + pmPrice(key)}</button>
  <button class="btn ghost block" id="pmCancel" style="margin-top:8px"${pmPaying ? " disabled" : ""}>${t("cancel")}</button>
  <div class="note" style="text-align:center">🔒 ${t("pmSecure")}</div>
  <div class="note">💳 ${t("pmDemoNote")}</div>`;
}

/* ---------- "Subscription" tab in the account menu ---------- */
function secPremiumTab(u) {
  if (!premiumActive(u)) return paywallHTML(u); // pricing + trial (and confirm step)
  if (pmSelected) return pmConfirmHTML(u);
  if (pmConfirmCancel) return pmCancelHTML(u);
  const s = u.sub, d = pmDaysLeft(u);
  const total = Math.max(1, Math.ceil((s.until - s.since) / 86400000));
  const pct = Math.max(3, Math.min(100, Math.round((d / total) * 100)));
  const isTrial = s.plan === "trial";
  const priceLine = isTrial ? t("pmStatusTrial") : `${pmLabel(s.plan)} · ${pmPrice(s.plan)} ${pmPer(s.plan)}`;
  const cards = ["weekly", "monthly", "yearly"].map(key => {
    const cur = s.plan === key;
    return `
    <button class="pm-card ${cur ? "popular" : ""}" ${cur ? "" : `data-pmplan="${key}"`}>
      ${cur ? `<span class="pm-badge">${t("pmCurrent")}</span>` : key === "yearly" ? `<span class="pm-badge" style="background:#f59e0b">${t("pmBestValue")}</span>` : ""}
      <div class="pm-name">${pmLabel(key)}</div>
      <div class="pm-price">${pmPrice(key)}</div>
      <div class="pm-per">${pmPer(key)}</div>
      ${cur ? "" : `<div class="btn sm pm-go">${t("pmChoose")}</div>`}
    </button>`;
  }).join("");
  return `
  <h3>⭐ ${t("pmTitle")} <span class="pill on">${t("enabled")}</span></h3>
  <div class="h-sub">${t("pmActive")}</div>
  ${isTrial ? `<div class="note" style="margin-bottom:10px">🎁 ${t("pmTrialPick")}</div>` : ""}
  <div class="section">
    <div class="kv"><span>${t("pmCurrentPlan")}</span><span><b>${priceLine}</b></span></div>
    <div class="kv"><span>${t("pmStarted")}</span><span>${fmtDate(s.since)}</span></div>
    <div class="kv"><span>${t("pmActiveUntil")}</span><span>${fmtDate(s.until)}</span></div>
    <div class="kv"><span>${t("pmTimeLeft")}</span><span><b>${d}</b> ${d === 1 ? t("pmDayLeft") : t("pmDaysLeft")}</span></div>
    <div class="occ-bar" style="margin-top:8px"><span style="width:${pct}%;background:var(--accent)"></span></div>
  </div>
  <div class="section">
    <h4>✅ ${t("pmIncluded")}</h4>
    <div class="pm-feats">
      ${[t("pmFeat1"), t("pmFeat2"), t("pmFeat3"), t("pmFeat4")].map(f => `<div class="pm-feat">✅ <span>${f}</span></div>`).join("")}
    </div>
  </div>
  <div class="section">
    <h4>🔄 ${t("pmChangePlan")}</h4>
    <div class="pm-cards">${cards}</div>
  </div>
  <div class="note">💳 ${t("pmDemoNote")}</div>
  ${s.canceled
    ? `<div class="note" style="text-align:center;margin-top:10px">🚫 ${t("pmCanceled")} ${t("pmCancelNote")}</div>`
    : `<button class="btn ghost block" id="pmCancelSub" style="margin-top:14px;color:#ef4444">${t("pmCancel")}</button>`}`;
}

/* cancel-confirmation step */
function pmCancelHTML(u) {
  return `
  <h3>${t("pmCancel")}</h3>
  <div class="note" style="margin:10px 0 16px">${t("pmCancelConfirm")}</div>
  <button class="btn block" id="pmCancelKeep">${t("pmCancelKeep")}</button>
  <button class="btn ghost block" id="pmCancelYes" style="margin-top:8px;color:#ef4444">${t("pmCancelYes")}</button>`;
}

/* ---------- events (routed from onAuthClick) ---------- */
function handlePremiumClick(e) {
  const hit = (s) => e.target.closest(s);
  if (handlePayMethodClick(e)) return true;
  const card = hit("[data-pmplan]");
  if (card) { pmSelected = card.dataset.pmplan; reRenderSection(); return true; }
  if (hit("#pmTrial")) {
    // a payment method is required before the free trial can start
    if (!hasPayMethod(currentUser())) {
      toast(t("payTrialNeed"));
      if (typeof switchSection === "function") { payAdding = true; payAddMethod = "card"; switchSection("paymethods"); }
      return true;
    }
    premiumStartTrial(); reRenderSection(); return true;
  }
  const pay = hit("[data-pmpay]");
  if (pay) { pmPayMethod = pay.dataset.pmpay; reRenderSection(); return true; }
  if (hit("#pmPayNow")) { pmProcessPayment(); return true; }
  if (hit("#pmCancel")) { pmSelected = null; pmPaying = false; reRenderSection(); return true; }
  if (hit("#pmCancelSub")) { pmConfirmCancel = true; reRenderSection(); return true; }
  if (hit("#pmCancelKeep")) { pmConfirmCancel = false; reRenderSection(); return true; }
  if (hit("#pmCancelYes")) { premiumCancel(); pmConfirmCancel = false; reRenderSection(); return true; }
  return false;
}

/* Validate the entered details for the selected method, then run the
   (simulated) charge and activate the subscription. Wiring a real
   processor means replacing the setTimeout block with a cloud call. */
function pmValidatePayment() {
  if (pmPayMethod === "card") {
    const num = (document.getElementById("pmCardNum")?.value || "").replace(/\s+/g, "");
    const name = (document.getElementById("pmCardName")?.value || "").trim();
    const exp = (document.getElementById("pmCardExp")?.value || "").trim();
    const cvc = (document.getElementById("pmCardCvc")?.value || "").trim();
    return pmValidCard(num, name, exp, cvc);
  }
  if (pmPayMethod === "cliq") {
    const alias = (document.getElementById("pmCliqAlias")?.value || "").trim();
    return alias.length >= 3;
  }
  return true; // paypal: redirect handled by the processor
}
function pmProcessPayment() {
  if (pmPaying) return;
  if (!pmValidatePayment()) {
    const err = document.getElementById("pmPayErr");
    if (err) { err.textContent = t("pmPayErr"); err.style.display = "block"; }
    return;
  }
  pmPaying = true;
  reRenderSection();
  // Simulated processor round-trip. Replace with a real charge call
  // (e.g. GymoraCloud.pay(...)) and activate only on a success response.
  setTimeout(() => {
    premiumSubscribe(pmSelected);
    pmSelected = null; pmPaying = false; pmPayMethod = "card";
    reRenderSection();
  }, 1400);
}
function resetPremium() { pmSelected = null; pmConfirmCancel = false; pmPaying = false; pmPayMethod = "card"; }

/* Open the account drawer straight onto the Subscription tab.
   Used by upsell prompts elsewhere (e.g. the locked video paywall). */
function pmOpenSubscription() {
  pmSelected = null; pmConfirmCancel = false; pmPaying = false; pmPayMethod = "card";
  if (typeof openAuth === "function") openAuth("account");
  if (typeof switchSection === "function") switchSection("premium");
}

/* ================= saved payment methods (wallet) ================= */
let payAdding = false;       // showing the "add method" form
let payAddMethod = "card";   // method type in the add form

function pmMethods(u) { return (u && Array.isArray(u.payMethods)) ? u.payMethods : []; }
function hasPayMethod(u) { return pmMethods(u).length > 0; }
function cardBrand(num) {
  const n = String(num || "").replace(/\D/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  return "Card";
}
/* Supported networks for real charges (Amex not accepted by our gateway). */
const PM_SUPPORTED_BRANDS = ["Visa", "Mastercard"];
/* Luhn checksum — rejects mistyped / obviously-fake card numbers. */
function luhnOk(num) {
  const n = String(num || "").replace(/\D/g, "");
  if (n.length < 13 || n.length > 19) return false;
  let sum = 0, alt = false;
  for (let i = n.length - 1; i >= 0; i--) {
    let d = +n[i];
    if (alt) { d *= 2; if (d > 9) d -= 9; }
    sum += d; alt = !alt;
  }
  return sum % 10 === 0;
}
/* expiry "MM/YY" (spaces/slash flexible) must be a real month, not past. */
function expiryOk(exp) {
  const m = String(exp || "").replace(/\s/g, "").match(/^(\d{2})\/?(\d{2})$/);
  if (!m) return false;
  const mm = +m[1], yy = 2000 + +m[2];
  if (mm < 1 || mm > 12) return false;
  const end = new Date(yy, mm, 1);           // first day of the month AFTER expiry
  return end > new Date();
}
/* Full card check used by both the checkout and the wallet. */
function pmValidCard(num, name, exp, cvc) {
  const n = String(num || "").replace(/\s+/g, "");
  if (!luhnOk(n)) return false;
  if (PM_SUPPORTED_BRANDS.indexOf(cardBrand(n)) === -1) return false;
  if (!name || String(name).trim().length < 2) return false;
  if (!expiryOk(exp)) return false;
  if (!/^\d{3,4}$/.test(String(cvc || "").trim())) return false;
  return true;
}
function pmAddSavedMethod(rec) {
  const u = currentUser(); if (!u) return;
  const list = pmMethods(u).slice();
  rec.id = "pm_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  if (!list.length) rec.default = true; // first one becomes default
  list.push(rec);
  updateUser({ payMethods: list });
  toast(t("paySaved"));
}
function pmRemoveSavedMethod(id) {
  const u = currentUser(); if (!u) return;
  let list = pmMethods(u).filter(m => m.id !== id);
  if (list.length && !list.some(m => m.default)) list[0].default = true;
  updateUser({ payMethods: list });
  toast(t("payRemoved"));
}
function pmSetDefaultMethod(id) {
  const u = currentUser(); if (!u) return;
  const list = pmMethods(u).map(m => ({ ...m, default: m.id === id }));
  updateUser({ payMethods: list });
}
function payMethodLabel(m) {
  if (m.type === "paypal") return "🅿️ PayPal";
  if (m.type === "cliq") return "🏦 CliQ · " + esc(m.alias || "");
  return `💳 ${esc(m.brand || "Card")} •••• ${esc(m.last4 || "")}`;
}

/* ---------- "Payment methods" account section ---------- */
function secPayMethods(u) {
  if (payAdding) return payAddHTML(u);
  const list = pmMethods(u);
  const rows = list.map(m => `
    <div class="pay-row">
      <div class="pay-row-main">
        <div class="pay-row-lbl">${payMethodLabel(m)} ${m.default ? `<span class="pill on">${t("payDefault")}</span>` : ""}</div>
        ${m.exp ? `<div class="note" style="margin:2px 0 0">${t("payExpires")} ${esc(m.exp)}</div>` : ""}
      </div>
      <div class="pay-row-act">
        ${m.default ? "" : `<button class="linkbtn" data-paydefault="${m.id}">${t("payMakeDefault")}</button>`}
        <button class="linkbtn" style="color:#ef4444" data-payremove="${m.id}">${t("payRemove")}</button>
      </div>
    </div>`).join("");
  return `
  <h3>💳 ${t("payTitle")}</h3>
  <div class="h-sub">${t("paySub")}</div>
  ${list.length ? `<div class="pay-list">${rows}</div>` : `<div class="note" style="margin:14px 0">${t("payNone")}</div>`}
  <button class="btn block" id="payAdd" style="margin-top:14px">➕ ${t("payAdd")}</button>
  <div class="note">🔒 ${t("pmSecure")}</div>`;
}

function payAddHTML(u) {
  const methods = [
    ["card", "💳", t("pmPayCard"), t("pmPayCardSub")],
    ["paypal", "🅿️", t("pmPayPaypal"), "PayPal"],
    ["cliq", "🏦", t("pmPayCliq"), t("pmPayCliqSub")],
  ].map(([m, icon, name, sub]) => `
    <button type="button" class="pm-pay ${payAddMethod === m ? "on" : ""}" data-payam="${m}">
      <span class="pm-pay-ic">${icon}</span>
      <span class="pm-pay-txt"><b>${name}</b><small>${sub}</small></span>
      <span class="pm-pay-dot"></span>
    </button>`).join("");
  const fields = payAddMethod === "card"
    ? `<div class="pm-pay-form">
        <input class="ob-input" id="payCardNum" inputmode="numeric" maxlength="23" placeholder="${t("pmCardNum")}">
        <input class="ob-input" id="payCardName" placeholder="${t("payCardName")}">
        <div class="pm-pay-row">
          <input class="ob-input" id="payCardExp" inputmode="numeric" maxlength="7" placeholder="${t("pmCardExp")}">
          <input class="ob-input" id="payCardCvc" inputmode="numeric" maxlength="4" placeholder="${t("pmCardCvc")}">
        </div>
      </div>`
    : payAddMethod === "paypal"
      ? `<div class="pm-pay-form"><div class="note" style="margin:0">🅿️ ${t("pmPaypalNote")}</div></div>`
      : `<div class="pm-pay-form"><input class="ob-input" id="payCliqAlias" placeholder="${t("pmCliqAlias")}"></div>`;
  return `
  <button class="linkbtn" id="payBack" style="display:inline-block;margin:0 0 12px">‹ ${t("payTitle")}</button>
  <h3>➕ ${t("payAdd")}</h3>
  <div class="pm-pays" style="margin-top:8px">${methods}</div>
  ${fields}
  <div class="form-err" id="payErr" style="position:static;display:none;margin:8px 0 0"></div>
  <button class="btn block" id="paySave" style="margin-top:14px">${t("paySave")}</button>
  <button class="btn ghost block" id="payCancelAdd" style="margin-top:8px">${t("cancel")}</button>
  <div class="note">🔒 ${t("pmSecure")}</div>`;
}

/* Build a saved-method record from the add form (storing only safe,
   masked data — never the full card number or CVC). */
function paySaveFromForm() {
  if (payAddMethod === "card") {
    const num = (document.getElementById("payCardNum")?.value || "").replace(/\s+/g, "");
    const name = (document.getElementById("payCardName")?.value || "").trim();
    const exp = (document.getElementById("payCardExp")?.value || "").trim();
    const cvc = (document.getElementById("payCardCvc")?.value || "").trim();
    if (!pmValidCard(num, name, exp, cvc)) return false;
    pmAddSavedMethod({ type: "card", brand: cardBrand(num), last4: num.slice(-4), exp: exp.replace(/\s/g, ""), name });
    return true;
  }
  if (payAddMethod === "cliq") {
    const alias = (document.getElementById("payCliqAlias")?.value || "").trim();
    if (alias.length < 3) return false;
    pmAddSavedMethod({ type: "cliq", alias });
    return true;
  }
  pmAddSavedMethod({ type: "paypal" }); // paypal: token would come from the redirect
  return true;
}

/* ---------- payment-method events (routed from handlePremiumClick) ---------- */
function handlePayMethodClick(e) {
  const hit = (s) => e.target.closest(s);
  if (hit("#payAdd")) { payAdding = true; payAddMethod = "card"; reRenderSection(); return true; }
  if (hit("#payBack") || hit("#payCancelAdd")) { payAdding = false; reRenderSection(); return true; }
  const am = hit("[data-payam]");
  if (am) { payAddMethod = am.dataset.payam; reRenderSection(); return true; }
  if (hit("#paySave")) {
    if (!paySaveFromForm()) { const el = document.getElementById("payErr"); if (el) { el.textContent = t("pmPayErr"); el.style.display = "block"; } return true; }
    payAdding = false; reRenderSection(); return true;
  }
  const rm = hit("[data-payremove]");
  if (rm) { pmRemoveSavedMethod(rm.dataset.payremove); reRenderSection(); return true; }
  const df = hit("[data-paydefault]");
  if (df) { pmSetDefaultMethod(df.dataset.paydefault); reRenderSection(); return true; }
  return false;
}
function resetPayMethods() { payAdding = false; payAddMethod = "card"; }

/* Light input masking for the card fields (spaces every 4 digits,
   MM/YY expiry). Delegated so it survives re-renders. */
document.addEventListener("input", (e) => {
  const el = e.target;
  if (!el || !el.id) return;
  if (el.id === "pmCardNum" || el.id === "payCardNum") {
    el.value = el.value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
  } else if (el.id === "pmCardExp" || el.id === "payCardExp") {
    let v = el.value.replace(/\D/g, "").slice(0, 4);
    el.value = v.length >= 3 ? v.slice(0, 2) + " / " + v.slice(2) : v;
  } else if (el.id === "pmCardCvc" || el.id === "payCardCvc") {
    el.value = el.value.replace(/\D/g, "");
  }
});
