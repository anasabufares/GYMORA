/* =============================================================
   GYMORA — Terms of Service, Privacy Policy & Payment Terms
   A plain-language, accurate account of what data GYMORA collects,
   why, who it is shared with, and the rules for subscriptions and
   payments. Shown in the account menu (Legal) and linked from the
   sign-up screen, where acceptance is required to create an account.
   Relies on globals: state, t, I18N, esc, currentUser, updateUser.
   ============================================================= */

const POLICY_VERSION = "2026-08-18"; // bump when the wording changes
const POLICY_CONTACT = "support@gymora.app";

const POLICY_I18N = {
  en: {
    legalTab: "Legal & Policies",
    polUpdated: "Last updated",
    polVersion: "Version",
    polIntro: "This page explains, in plain language, what GYMORA collects from you, how we use it, and the rules for subscriptions and payments. If anything here is unclear, contact us at " + POLICY_CONTACT + ".",
    polTerms: "Terms of Service",
    polPrivacy: "Privacy Policy",
    polPayments: "Payment & Subscription Terms",
    polAcceptShort: "I have read and agree to the {link}.",
    polAcceptLink: "Terms of Service & Privacy Policy",
    polAcceptedOn: "You accepted our Terms & Privacy Policy on",
    polMustAccept: "Please accept the Terms of Service and Privacy Policy to create an account.",
    polView: "Read the full policy",
  },
  ar: {
    legalTab: "القوانين والسياسات",
    polUpdated: "آخر تحديث",
    polVersion: "الإصدار",
    polIntro: "توضّح هذه الصفحة، بلغة بسيطة، ما الذي تجمعه GYMORA منك وكيف نستخدمه وقواعد الاشتراكات والدفع. لأي استفسار تواصل معنا على " + POLICY_CONTACT + ".",
    polTerms: "شروط الخدمة",
    polPrivacy: "سياسة الخصوصية",
    polPayments: "شروط الدفع والاشتراك",
    polAcceptShort: "لقد قرأت {link} وأوافق عليها.",
    polAcceptLink: "شروط الخدمة وسياسة الخصوصية",
    polAcceptedOn: "لقد وافقت على الشروط وسياسة الخصوصية بتاريخ",
    polMustAccept: "يرجى الموافقة على شروط الخدمة وسياسة الخصوصية لإنشاء حساب.",
    polView: "اقرأ السياسة كاملة",
  },
};
Object.assign(I18N.en, POLICY_I18N.en);
Object.assign(I18N.ar, POLICY_I18N.ar);

/* Each section: heading + list of paragraphs. Written to match what the
   app actually does — see comments in premium.js, cloud.js, api.mjs and
   netlify/functions/analyze-food.js. */
const POLICY_SECTIONS = {
  en: [
    ["📄 Terms of Service", [
      "**Who we are.** GYMORA is a fitness app that gives you a personalised workout and nutrition plan, an exercise library, progress tracking, and (for gyms) member management. GYMORA is operated from Jordan.",
      "**Eligibility.** You must be at least 12 years old to use GYMORA. If you are under 18, you confirm that a parent or guardian agrees to these terms on your behalf.",
      "**Your account.** You are responsible for keeping your password safe and for everything that happens under your account. Tell us immediately if you think someone else has access.",
      "**Not medical advice.** GYMORA gives general fitness and nutrition guidance only. It is not medical advice and is not a substitute for a doctor, dietitian, or other qualified professional. Talk to a doctor before starting any new exercise or diet, especially if you have a health condition, are pregnant, or are injured. You use the plans at your own risk.",
      "**Acceptable use.** Don't misuse the app: no illegal activity, no trying to break or overload our systems, no copying or reselling our content, and no uploading content you don't have the right to share.",
      "**Content you upload.** You keep ownership of what you add (photos, logs, notes). You give us permission to store and process it only to run the service for you.",
      "**Changes & termination.** We may update the app and these terms over time; we'll update the 'Last updated' date and, for important changes, notify you in the app. You can stop using GYMORA and delete your account at any time. We may suspend accounts that break these terms.",
      "**Governing law.** These terms are governed by the laws of the Hashemite Kingdom of Jordan.",
    ]],
    ["🔒 Privacy Policy — what we collect", [
      "**Account details:** your name, email, password (stored in a hashed form, never in plain text), age, and — for coaches, staff and gym owners — your phone number and gym.",
      "**Health & fitness data:** your gender, height, weight, goal weight and fitness goal, plus anything you log — workouts and sets, meals and calories, water, supplements, body-composition (InBody) scans, progress, points and class bookings. This is the core data that lets us build your plan.",
      "**Food photos:** if you use the food scanner, the photo you take is sent to our AI provider, Anthropic (the makers of Claude), which identifies the food and estimates its nutrition. The photo is used only to answer that request and is not used to train AI models. We don't keep the raw photo after it's analysed.",
      "**Payment information:** when you save a payment method we store only safe, masked details — the card type/brand, the last 4 digits and the expiry date, or a wallet identifier (your CliQ alias or that you chose PayPal). GYMORA never stores your full card number or CVC. Real charges are handled by a licensed payment processor, not by GYMORA.",
      "**Technical data:** a device identifier and a login token stored in your browser, plus basic security logs (such as IP address and device/browser type) kept by our hosting provider to protect the service.",
    ]],
    ["🔒 Privacy Policy — how we use & share it", [
      "**How we use it.** To create and run your plan, track your progress, manage your subscription, provide support, keep the service secure, prevent fraud, and meet legal obligations.",
      "**We do not sell your data.** Ever.",
      "**Who we share it with — only these:** our hosting provider (Netlify) and database provider (MongoDB) to store your data; Anthropic to analyse food photos you submit; a licensed payment processor to take payments; and — only if you join a gym — that gym and your assigned coach, so they can support you. We may also disclose data if the law requires it.",
      "**Retention.** We keep your data while your account is active. When you delete your account we remove your personal data, except the minimum we must keep for legal, accounting or fraud-prevention reasons.",
      "**Your rights.** You can view and edit most of your data in the app. You can ask us to correct it, export it, or delete it, and you can withdraw consent, by contacting " + POLICY_CONTACT + ".",
      "**Security.** We protect your data with encryption in transit, hashed passwords, and encrypted storage of sensitive records. No system is 100% secure, but we work to keep yours safe.",
      "**Children.** GYMORA is for ages 12 and up, and under-18s need a parent or guardian's consent.",
      "**International transfers.** Some providers above process data outside Jordan; we only use providers that protect your data appropriately.",
    ]],
    ["💳 Payment & Subscription Terms", [
      "**Plans & prices.** GYMORA Premium is offered as weekly, monthly and yearly plans. Prices are shown in your selected currency before you pay, converted from our base price.",
      "**Accepted methods.** Credit and debit cards (Visa, Mastercard), PayPal, and CliQ instant bank transfer.",
      "**Card rules.** Cards must be valid and not expired, from a supported network, and pass a standard card-number check. You must be authorised to use the payment method you enter.",
      "**Free trial.** The 3-day free trial is limited to one per account and requires a saved payment method to start. Unless you cancel before the trial ends, your subscription continues on your selected plan and your payment method may be charged for the following period.",
      "**Auto-renewal.** Paid plans renew automatically at the end of each period until you cancel. Canceling stops the next renewal; you keep Premium access until the end of the period you already paid for.",
      "**Refunds.** Except where the law requires otherwise, payments for a started period are non-refundable. You can cancel any time to avoid future charges.",
      "**Price changes.** If we change prices we'll tell you in advance; changes apply to your next renewal, never retroactively.",
      "**Failed payments.** If a renewal payment fails, we may retry it or pause your Premium access until payment succeeds.",
    ]],
  ],
  ar: [
    ["📄 شروط الخدمة", [
      "**من نحن.** GYMORA تطبيق لياقة يقدّم لك خطة تمارين وتغذية شخصية، ومكتبة تمارين، وتتبّعاً للتقدّم، وإدارة أعضاء للنوادي. تُدار GYMORA من الأردن.",
      "**الأهلية.** يجب أن يكون عمرك 12 عاماً على الأقل. إذا كنت دون 18، فأنت تؤكّد موافقة وليّ أمرك على هذه الشروط نيابةً عنك.",
      "**حسابك.** أنت مسؤول عن حماية كلمة مرورك وعن كل ما يجري ضمن حسابك. أبلغنا فوراً إذا اشتبهت بوصول شخص آخر إليه.",
      "**ليست نصيحة طبية.** يقدّم التطبيق إرشادات لياقة وتغذية عامة فقط، وليست بديلاً عن الطبيب أو أخصائي التغذية. استشر طبيباً قبل بدء أي برنامج رياضي أو حِمية، خصوصاً عند وجود حالة صحية أو حمل أو إصابة. تستخدم الخطط على مسؤوليتك.",
      "**الاستخدام المقبول.** لا تُسئ استخدام التطبيق: لا نشاط غير قانوني، ولا محاولة لاختراق أنظمتنا أو إثقالها، ولا نسخ أو إعادة بيع محتوانا، ولا رفع محتوى لا تملك حق مشاركته.",
      "**المحتوى الذي ترفعه.** تبقى ملكية ما تضيفه لك، وتمنحنا إذناً بتخزينه ومعالجته فقط لتشغيل الخدمة.",
      "**التغييرات والإنهاء.** قد نحدّث التطبيق وهذه الشروط؛ سنحدّث تاريخ 'آخر تحديث' ونعلمك بالتغييرات المهمة داخل التطبيق. يمكنك التوقف وحذف حسابك في أي وقت، وقد نوقف الحسابات المخالفة.",
      "**القانون الحاكم.** تخضع هذه الشروط لقوانين المملكة الأردنية الهاشمية.",
    ]],
    ["🔒 سياسة الخصوصية — ما الذي نجمعه", [
      "**بيانات الحساب:** اسمك، بريدك، كلمة المرور (تُخزّن مُشفّرة وليست نصاً صريحاً)، عمرك — وللمدربين والموظفين وأصحاب النوادي: رقم هاتفك والنادي.",
      "**بيانات الصحة واللياقة:** جنسك، طولك، وزنك، وزنك المستهدف وهدفك، وكل ما تسجّله من تمارين ووجبات وسعرات وماء ومكملات وفحوصات تكوين الجسم (InBody) وتقدّم ونقاط وحجوزات حصص. هذه البيانات أساس بناء خطتك.",
      "**صور الطعام:** عند استخدام ماسح الطعام، تُرسَل الصورة إلى مزوّد الذكاء الاصطناعي Anthropic (صانعو Claude) للتعرّف على الطعام وتقدير قيمته الغذائية. تُستخدم الصورة لهذا الطلب فقط ولا تُستخدم لتدريب النماذج، ولا نحتفظ بالصورة بعد تحليلها.",
      "**معلومات الدفع:** عند حفظ طريقة دفع نخزّن بيانات مقنّعة وآمنة فقط — نوع البطاقة وآخر 4 أرقام وتاريخ الانتهاء، أو معرّف محفظة (اسم كليك المستعار أو اختيارك PayPal). لا تخزّن GYMORA رقم بطاقتك الكامل أو الـ CVC أبداً، وتتم عمليات الدفع الفعلية عبر مزوّد دفع مرخّص.",
      "**بيانات تقنية:** معرّف جهاز ورمز تسجيل دخول يُحفظ في متصفحك، وسجلّات أمان أساسية (مثل عنوان IP ونوع الجهاز/المتصفح) يحتفظ بها مزوّد الاستضافة لحماية الخدمة.",
    ]],
    ["🔒 سياسة الخصوصية — كيف نستخدمها ونشاركها", [
      "**الاستخدام.** لإنشاء خطتك وتشغيلها، وتتبّع تقدّمك، وإدارة اشتراكك، وتقديم الدعم، وحماية الخدمة، ومنع الاحتيال، والوفاء بالالتزامات القانونية.",
      "**لا نبيع بياناتك.** إطلاقاً.",
      "**مع من نشاركها — هؤلاء فقط:** مزوّد الاستضافة (Netlify) وقاعدة البيانات (MongoDB) لتخزين بياناتك؛ وAnthropic لتحليل صور الطعام؛ ومزوّد دفع مرخّص لتحصيل المدفوعات؛ وعند انضمامك لنادٍ فقط: ذلك النادي ومدرّبك المخصّص. وقد نُفصح عند طلب القانون.",
      "**الاحتفاظ.** نحتفظ ببياناتك ما دام حسابك نشطاً، وعند حذفه نزيل بياناتك الشخصية عدا الحد الأدنى المطلوب لأسباب قانونية أو محاسبية أو لمنع الاحتيال.",
      "**حقوقك.** يمكنك عرض وتعديل معظم بياناتك داخل التطبيق، وطلب تصحيحها أو تصديرها أو حذفها وسحب موافقتك عبر مراسلتنا على " + POLICY_CONTACT + ".",
      "**الأمان.** نحمي بياناتك بالتشفير أثناء النقل، وكلمات مرور مُشفّرة، وتخزين مُشفّر للسجلات الحساسة. لا يوجد نظام آمن 100% لكننا نعمل على حماية بياناتك.",
      "**الأطفال.** التطبيق لمن هم 12 عاماً فأكثر، ويحتاج من هم دون 18 موافقة وليّ الأمر.",
      "**النقل الدولي.** يعالج بعض المزوّدين أعلاه البيانات خارج الأردن، ونستخدم فقط مزوّدين يحمون بياناتك بشكل مناسب.",
    ]],
    ["💳 شروط الدفع والاشتراك", [
      "**الخطط والأسعار.** تتوفّر GYMORA بريميوم بخطط أسبوعية وشهرية وسنوية، وتُعرض الأسعار بعملتك المختارة قبل الدفع.",
      "**الطرق المقبولة.** بطاقات ائتمان وخصم (فيزا، ماستركارد)، وPayPal، وتحويل كليك (CliQ) الفوري.",
      "**قواعد البطاقة.** يجب أن تكون البطاقة صالحة وغير منتهية، من شبكة مدعومة، وتجتاز فحص رقم البطاقة القياسي، وأن تكون مخوّلاً باستخدامها.",
      "**التجربة المجانية.** التجربة المجانية 3 أيام، واحدة لكل حساب، وتتطلّب طريقة دفع محفوظة للبدء. ما لم تُلغِ قبل انتهائها، يستمر اشتراكك على خطتك المختارة وقد تُحصَّل طريقة دفعك للفترة التالية.",
      "**التجديد التلقائي.** تتجدّد الخطط المدفوعة تلقائياً نهاية كل فترة حتى تُلغي. الإلغاء يوقف التجديد القادم وتبقى ميزات بريميوم حتى نهاية الفترة المدفوعة.",
      "**الاسترداد.** ما لم يفرض القانون خلاف ذلك، مدفوعات الفترة التي بدأت غير قابلة للاسترداد، ويمكنك الإلغاء في أي وقت لتفادي أي رسوم مستقبلية.",
      "**تغيير الأسعار.** إن غيّرنا الأسعار سنُعلمك مسبقاً، وتُطبَّق على تجديدك التالي وليس بأثر رجعي.",
      "**تعذّر الدفع.** إن فشل دفع التجديد فقد نعيد المحاولة أو نوقف وصول بريميوم مؤقتاً حتى ينجح الدفع.",
    ]],
  ],
};

/* very small inline markdown: **bold** only */
function polMd(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }

function policyBodyHTML() {
  const secs = POLICY_SECTIONS[state.lang] || POLICY_SECTIONS.en;
  return secs.map(([title, paras]) => `
    <div class="section pol-sec">
      <h4>${title}</h4>
      ${paras.map(p => `<p class="pol-p">${polMd(p)}</p>`).join("")}
    </div>`).join("");
}

/* account section */
function secPolicy(u) {
  const acc = u && u.acceptedTerms;
  return `
  <h3>📑 ${t("legalTab")}</h3>
  <div class="h-sub">${t("polUpdated")}: ${POLICY_VERSION} · ${t("polVersion")} ${POLICY_VERSION}</div>
  <p class="pol-p" style="margin-top:8px">${polMd(t("polIntro"))}</p>
  ${acc ? `<div class="note">✅ ${t("polAcceptedOn")} ${typeof fmtDate === "function" ? fmtDate(acc.at) : new Date(acc.at).toLocaleDateString()}</div>` : ""}
  ${policyBodyHTML()}`;
}

/* full-screen modal used from the sign-up screen */
function openPolicy() {
  let el = document.getElementById("polBack");
  if (!el) {
    el = document.createElement("div");
    el.id = "polBack";
    el.className = "vid-back";
    document.body.appendChild(el);
    el.addEventListener("click", (e) => { if (e.target.id === "polBack" || e.target.closest("#polX")) closePolicy(); });
  }
  el.innerHTML = `
  <div class="vid-modal pol-modal">
    <button class="auth-x" id="polX">✕</button>
    <h3 style="padding-inline-end:40px">📑 ${t("legalTab")}</h3>
    <div class="h-sub">${t("polUpdated")}: ${POLICY_VERSION}</div>
    <p class="pol-p" style="margin-top:8px">${polMd(t("polIntro"))}</p>
    <div class="pol-scroll">${policyBodyHTML()}</div>
  </div>`;
  el.classList.add("open");
}
function closePolicy() {
  const el = document.getElementById("polBack");
  if (el) { el.classList.remove("open"); el.innerHTML = ""; }
}
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-openpolicy]")) { e.preventDefault(); openPolicy(); }
});
document.addEventListener("keydown", (e) => {
  const el = document.getElementById("polBack");
  if (e.key === "Escape" && el && el.classList.contains("open")) closePolicy();
});
