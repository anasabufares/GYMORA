/* =============================================================
   GYMORA — compliance helpers
   - BUSINESS: legal business details shown in Legal & the footer.
   - Storage consent banner (the app uses no cookies or trackers, only
     the browser's local storage — essential vs. preference storage).
   - Keyboard activation for clickable non-button elements.
   - "Download my data" export.
   Relies on globals: state, t, I18N, esc, currentUser, toast.
   ============================================================= */

/* ⚠️ Fill these in with your real registered details before launch. */
const BUSINESS = {
  legalName: "GYMORA (legal entity name — to be added)",
  regNo: "Commercial registration no. — to be added",
  address: { en: "Amman, Jordan (full registered address — to be added)", ar: "عمّان، الأردن (العنوان المسجّل الكامل — يُضاف لاحقاً)" },
  email: "support@gymora.app",
  phone: "— to be added",
};

const CMP_I18N = {
  en: {
    ckTitle: "Your privacy choices",
    ckBody: "GYMORA uses no advertising or tracking cookies. We store a few things in your browser: essential data to keep you signed in and the app working, and optional preferences (theme, currency, favourites) to remember your settings.",
    ckAccept: "Accept all", ckEssential: "Essential only", ckMore: "Cookie policy",
    ckSaved: "Your privacy choice was saved.",
    ckManage: "Privacy choices",
    bizTitle: "Business details",
    bizName: "Company", bizReg: "Registration", bizAddr: "Address", bizEmail: "Email", bizPhone: "Phone",
    dlData: "Download my data", dlDataSub: "Get a copy of everything GYMORA stores about you (JSON file).",
    dlDone: "Your data file was downloaded.",
    noHiddenFees: "This is the full price you pay — no extra fees are added at checkout.",
    guardianConsent: "I'm under 18 and my parent or legal guardian has read and agrees to the Terms and Privacy Policy on my behalf.",
    guardianRequired: "Members under 18 need a parent or guardian's consent to create an account.",
    marketingOptIn: "Send me offers and news by email (optional — you can unsubscribe any time).",
    delPwLabel: "Enter your password to confirm", delFailed: "Could not delete your account — try again.",
    delDone: "Your account and data were deleted.",
  },
  ar: {
    ckTitle: "خياراتك للخصوصية",
    ckBody: "لا تستخدم GYMORA ملفات تعريف ارتباط للإعلانات أو التتبّع. نخزّن بعض الأشياء في متصفحك: بيانات أساسية لإبقائك مسجّلاً ولعمل التطبيق، وتفضيلات اختيارية (المظهر، العملة، المفضلة) لتذكّر إعداداتك.",
    ckAccept: "قبول الكل", ckEssential: "الأساسية فقط", ckMore: "سياسة ملفات الارتباط",
    ckSaved: "تم حفظ خيارك.",
    ckManage: "خيارات الخصوصية",
    bizTitle: "بيانات الشركة",
    bizName: "الشركة", bizReg: "السجل التجاري", bizAddr: "العنوان", bizEmail: "البريد", bizPhone: "الهاتف",
    dlData: "تنزيل بياناتي", dlDataSub: "احصل على نسخة من كل ما تخزّنه GYMORA عنك (ملف JSON).",
    dlDone: "تم تنزيل ملف بياناتك.",
    noHiddenFees: "هذا هو السعر الكامل الذي تدفعه — لا تُضاف أي رسوم إضافية عند الدفع.",
    guardianConsent: "عمري أقل من 18 وقد قرأ وليّ أمري الشروط وسياسة الخصوصية ويوافق عليها نيابةً عني.",
    guardianRequired: "يحتاج الأعضاء دون 18 عاماً إلى موافقة وليّ الأمر لإنشاء حساب.",
    marketingOptIn: "أرسلوا لي العروض والأخبار عبر البريد (اختياري — يمكنك إلغاء الاشتراك في أي وقت).",
    delPwLabel: "أدخل كلمة المرور للتأكيد", delFailed: "تعذّر حذف حسابك — حاول مرة أخرى.",
    delDone: "تم حذف حسابك وبياناتك.",
  },
};
Object.assign(I18N.en, CMP_I18N.en);
Object.assign(I18N.ar, CMP_I18N.ar);

/* ---------- storage consent ---------- */
const CONSENT_KEY = "gym_consent";
/* Preference keys that are only kept with consent ("Accept all"). */
const PREF_KEYS = ["fj_theme", "fj_accent", "fj_cur", "fj_favs", "fj_filtersOpen"];

function consentGet() { try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || "null"); } catch (e) { return null; } }
function consentAllows(kind) {
  if (kind === "essential") return true;
  const c = consentGet();
  return !!(c && c[kind]);
}
function consentSet(prefs) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: 1, prefs: !!prefs, at: Date.now() })); } catch (e) {}
  if (!prefs) PREF_KEYS.forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
  else if (typeof persist === "function") persist();
}

function consentBannerHTML() {
  return `
  <div class="ck-banner" role="dialog" aria-live="polite" aria-labelledby="ckTitle">
    <div class="ck-text"><b id="ckTitle">🍪 ${t("ckTitle")}</b><p>${t("ckBody")}</p></div>
    <div class="ck-actions">
      <button class="btn ghost" id="ckEssential">${t("ckEssential")}</button>
      <button class="btn ghost" id="ckAccept">${t("ckAccept")}</button>
      <a href="#" class="ck-more" data-openpolicy="1">${t("ckMore")}</a>
    </div>
  </div>`;
}
function showConsentBanner(force) {
  if (!force && consentGet()) return;
  let el = document.getElementById("ckWrap");
  if (!el) { el = document.createElement("div"); el.id = "ckWrap"; document.body.appendChild(el); }
  el.innerHTML = consentBannerHTML();
  // equal-weight choices — both buttons are the same size; nothing pre-selected
  el.querySelector("#ckAccept").onclick = () => { consentSet(true); el.innerHTML = ""; toast(t("ckSaved")); };
  el.querySelector("#ckEssential").onclick = () => { consentSet(false); el.innerHTML = ""; toast(t("ckSaved")); };
}
document.addEventListener("DOMContentLoaded", () => setTimeout(() => showConsentBanner(false), 400));
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-consent-manage]")) { e.preventDefault(); showConsentBanner(true); }
});

/* ---------- keyboard access for clickable non-buttons ----------
   Anything marked role="button" (e.g. gym cards) activates with Enter
   or Space, like a real button. */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const el = e.target;
  if (!el || !el.getAttribute || el.getAttribute("role") !== "button") return;
  if (el.tagName === "BUTTON" || el.tagName === "A") return;
  e.preventDefault();
  el.click();
});

/* ---------- business details block ---------- */
function businessHTML() {
  const L = state.lang;
  return `
  <div class="section">
    <h4>🏢 ${t("bizTitle")}</h4>
    <div class="kv"><span>${t("bizName")}</span><span>${esc(BUSINESS.legalName)}</span></div>
    <div class="kv"><span>${t("bizReg")}</span><span>${esc(BUSINESS.regNo)}</span></div>
    <div class="kv"><span>${t("bizAddr")}</span><span>${esc(BUSINESS.address[L] || BUSINESS.address.en)}</span></div>
    <div class="kv"><span>${t("bizEmail")}</span><span><a href="mailto:${esc(BUSINESS.email)}">${esc(BUSINESS.email)}</a></span></div>
    <div class="kv"><span>${t("bizPhone")}</span><span>${esc(BUSINESS.phone)}</span></div>
  </div>`;
}

/* ---------- data export ---------- */
function downloadMyData() {
  const u = typeof currentUser === "function" ? currentUser() : null;
  if (!u) return;
  const copy = JSON.parse(JSON.stringify(u));
  delete copy.pw; delete copy.twoFASecret; delete copy.recovery; // never export secrets
  const payload = { exportedAt: new Date().toISOString(), app: "GYMORA", account: copy };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "gymora-my-data.json";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast(t("dlDone"));
}
document.addEventListener("click", (e) => {
  if (e.target.closest("#dlMyData")) { e.preventDefault(); downloadMyData(); }
});

/* Show the guardian-consent checkbox only while the entered age is under 18. */
document.addEventListener("input", (e) => {
  if (!e.target || e.target.id !== "inAge") return;
  const row = document.getElementById("guardianRow");
  if (!row) return;
  const age = parseInt(e.target.value, 10);
  const minor = age >= 1 && age < 18;
  row.style.display = minor ? "flex" : "none";
  if (!minor) { const cb = document.getElementById("agreeGuardian"); if (cb) cb.checked = false; }
});
