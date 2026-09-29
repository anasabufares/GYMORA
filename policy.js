/* =============================================================
   GYMORA — Terms of Service, Privacy Policy & Payment Terms
   A plain-language, accurate account of what data GYMORA collects,
   why, who it is shared with, and the rules for subscriptions and
   payments. Shown in the account menu (Legal) and linked from the
   sign-up screen, where acceptance is required to create an account.
   Relies on globals: state, t, I18N, esc, currentUser, updateUser.
   ============================================================= */

const POLICY_VERSION = "2026-09-29"; // bump when the wording changes
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
      "**Food search & barcodes:** the food name you search for or the barcode you scan is sent to an online food database to look up nutrition. No account details are sent with it.",
      "**Food photos:** if you use the food scanner, the photo you take is sent to a trusted third-party AI service that identifies the food and estimates its nutrition. The photo is used only to answer that request and is not used to train AI models. We don't keep the raw photo after it's analysed.",
      "**Payment information:** when you save a payment method we store only safe, masked details — the card type/brand, the last 4 digits and the expiry date, or a wallet identifier (your CliQ alias or that you chose PayPal). GYMORA never stores your full card number or CVC. Real charges are handled by a licensed payment processor, not by GYMORA.",
      "**Technical data:** a device identifier and a login token stored in your browser, plus basic security logs (such as IP address and device/browser type) kept by our hosting provider to protect the service. See the Cookie & Storage Policy below.",
    ]],
    ["🔒 Privacy Policy — how we use & share it", [
      "**How we use it.** To create and run your plan, track your progress, manage your subscription, provide support, keep the service secure, prevent fraud, and meet legal obligations.",
      "**We do not sell your data.** Ever.",
      "**Who we share it with — only these:** trusted hosting and database service providers to store your data; a third-party AI service to analyse food photos you submit; a licensed payment processor to take payments; and — only if you join a gym — that gym and your assigned coach, so they can support you. We may also disclose data if the law requires it.",
      "**Retention.** We keep your data while your account is active. When you delete your account we remove your personal data, except the minimum we must keep for legal, accounting or fraud-prevention reasons.",
      "**Your rights.** You can view and edit most of your data in the app. You can **download a copy of your data** and **permanently delete your account and data** yourself under Account → Danger zone. You can also ask us to correct or delete data, or withdraw consent (for example to marketing emails — every such email has an unsubscribe link), by contacting " + POLICY_CONTACT + ".",
      "**Security.** We protect your data with encryption in transit, hashed passwords, and encrypted storage of sensitive records. No system is 100% secure, but we work to keep yours safe.",
      "**Children.** GYMORA is for ages 12 and up. Anyone under 18 must confirm at sign-up that a parent or legal guardian consents on their behalf, and we record that consent. We collect only what the service needs from minors, don't send them marketing unless opted in, and a parent or guardian can ask us to delete a minor's account at " + POLICY_CONTACT + ".",
      "**International transfers.** Some providers above process data outside Jordan; we only use providers that protect your data appropriately.",
    ]],
    ["💳 Payment & Subscription Terms", [
      "**Plans & prices.** GYMORA Premium is offered as weekly, monthly and yearly plans. Prices are shown in your selected currency before you pay, converted from our base price.",
      "**Accepted methods.** Credit and debit cards (Visa, Mastercard), PayPal, and CliQ instant bank transfer.",
      "**Card rules.** Cards must be valid and not expired, from a supported network, and pass a standard card-number check. You must be authorised to use the payment method you enter.",
      "**Free trial.** The 3-day free trial is limited to one per account and requires a saved payment method to start. The trial simply ends after 3 days — you are **never charged automatically** when it ends. To keep Premium, you choose a plan yourself.",
      "**No automatic renewal.** Plans do not renew automatically. When your paid period ends, Premium stops until you choose to renew. If we ever offer automatic renewal, it will be a separate option you must switch on yourself. You can cancel at any time and keep access until the end of the period you already paid for.",
      "**Refunds.** Except where the law requires otherwise, payments for a started period are non-refundable. You can cancel any time to avoid future charges.",
      "**Price changes.** If we change prices we'll tell you in advance; changes apply to your next renewal, never retroactively.",
      "**Failed payments.** If a payment fails, the purchase is not completed and you are not charged; you can try again with another payment method.",
    ]],
    ["↩️ Refund Policy", [
      "**Premium subscriptions.** You can cancel any time and keep access until the end of the period you paid for. If you ask within **14 days** of paying and haven't used Premium features beyond looking around, we'll refund you in full. After that, a started period isn't refundable except where the law requires it.",
      "**District Gym Pass.** Full refund within **14 days** of purchase if you haven't used any gym day yet. Once a day has been used, the remaining unused days can't be refunded, except where the law requires it. Days expire 30 days after purchase.",
      "**Supplements shop.** Unopened products in their original packaging can be returned within **14 days** of delivery. Opened products can't be returned for hygiene and safety reasons unless they are faulty or not as described.",
      "**Mistakes on our side.** Duplicate charges, charges for something you didn't receive, or technical errors are always refunded in full.",
      "**How to ask.** Open a ticket in the app (Help & tickets) or email " + POLICY_CONTACT + " with your account email and what the refund is for. Approved refunds go back to the original payment method, normally within 14 business days (your bank may take longer to show it).",
      "**Gym memberships.** When you buy a membership directly with a gym, that gym's own refund terms also apply — we'll show them before you pay.",
    ]],
    ["🍪 Cookie & Storage Policy", [
      "**No tracking cookies.** GYMORA does not use advertising, analytics or tracking cookies, and no third-party trackers run in the app.",
      "**What we store in your browser (local storage).** *Essential* — needed for the app to work: your sign-in token, your account data on this device, your cart, your language and your privacy choice. *Preferences* — only with your consent: theme, accent colour, currency, favourite gyms and filter layout.",
      "**Your choice.** On your first visit we ask whether to keep preferences. *Essential only* keeps the app working and forgets preferences when you close it; *Accept all* remembers them. Both buttons are equal — nothing is chosen for you. You can change your choice any time via \"Privacy choices\" on this page.",
      "**Third-party content.** Exercise videos come from an external video platform in privacy-enhanced mode. It only loads — and may then store data in your browser — when you press ▶ on a video. Food search and barcode lookups contact an online food database without placing cookies.",
      "**Clearing data.** You can clear everything from your browser settings, or delete your account under Account → Danger zone.",
    ]],
    ["📜 Credits & licenses", [
      "**Food data:** Open Food Facts (openfoodfacts.org), available under the Open Database License (ODbL); individual contents under the Database Contents License; product images under CC BY-SA.",
      "**Exercise images & instructions:** free-exercise-db, released into the public domain (Unlicense).",
      "**Font:** Barlow Condensed © The Barlow Project Authors, SIL Open Font License 1.1 (fonts/OFL.txt).",
      "**Barcode scanning:** html5-qrcode, Apache License 2.0 (vendor/html5-qrcode.LICENSE.txt).",
      "**Everything else** — GYMORA's name, logo, icons, text and design — belongs to GYMORA. Full list: THIRD_PARTY_NOTICES.md.",
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
      "**البحث عن الطعام والباركود:** يُرسَل اسم الطعام الذي تبحث عنه أو الباركود الذي تمسحه إلى قاعدة بيانات أطعمة عبر الإنترنت لجلب القيم الغذائية، دون أي بيانات لحسابك.",
      "**صور الطعام:** عند استخدام ماسح الطعام، تُرسَل الصورة إلى خدمة ذكاء اصطناعي موثوقة من طرف ثالث للتعرّف على الطعام وتقدير قيمته الغذائية. تُستخدم الصورة لهذا الطلب فقط ولا تُستخدم لتدريب النماذج، ولا نحتفظ بالصورة بعد تحليلها.",
      "**معلومات الدفع:** عند حفظ طريقة دفع نخزّن بيانات مقنّعة وآمنة فقط — نوع البطاقة وآخر 4 أرقام وتاريخ الانتهاء، أو معرّف محفظة (اسم كليك المستعار أو اختيارك PayPal). لا تخزّن GYMORA رقم بطاقتك الكامل أو الـ CVC أبداً، وتتم عمليات الدفع الفعلية عبر مزوّد دفع مرخّص.",
      "**بيانات تقنية:** معرّف جهاز ورمز تسجيل دخول يُحفظ في متصفحك، وسجلّات أمان أساسية (مثل عنوان IP ونوع الجهاز/المتصفح) يحتفظ بها مزوّد الاستضافة لحماية الخدمة.",
    ]],
    ["🔒 سياسة الخصوصية — كيف نستخدمها ونشاركها", [
      "**الاستخدام.** لإنشاء خطتك وتشغيلها، وتتبّع تقدّمك، وإدارة اشتراكك، وتقديم الدعم، وحماية الخدمة، ومنع الاحتيال، والوفاء بالالتزامات القانونية.",
      "**لا نبيع بياناتك.** إطلاقاً.",
      "**مع من نشاركها — هؤلاء فقط:** مزوّدو خدمات استضافة وقواعد بيانات موثوقون لتخزين بياناتك؛ وخدمة ذكاء اصطناعي من طرف ثالث لتحليل صور الطعام؛ ومزوّد دفع مرخّص لتحصيل المدفوعات؛ وعند انضمامك لنادٍ فقط: ذلك النادي ومدرّبك المخصّص. وقد نُفصح عند طلب القانون.",
      "**الاحتفاظ.** نحتفظ ببياناتك ما دام حسابك نشطاً، وعند حذفه نزيل بياناتك الشخصية عدا الحد الأدنى المطلوب لأسباب قانونية أو محاسبية أو لمنع الاحتيال.",
      "**حقوقك.** يمكنك عرض وتعديل معظم بياناتك داخل التطبيق، و**تنزيل نسخة من بياناتك** و**حذف حسابك وبياناتك نهائياً** بنفسك من الحساب ← منطقة الخطر. ويمكنك أيضاً طلب تصحيح بياناتك أو حذفها أو سحب موافقتك (مثل رسائل التسويق — كل رسالة تتضمن رابط إلغاء اشتراك) عبر مراسلتنا على " + POLICY_CONTACT + ".",
      "**الأمان.** نحمي بياناتك بالتشفير أثناء النقل، وكلمات مرور مُشفّرة، وتخزين مُشفّر للسجلات الحساسة. لا يوجد نظام آمن 100% لكننا نعمل على حماية بياناتك.",
      "**الأطفال.** التطبيق لمن هم 12 عاماً فأكثر. يجب على من هم دون 18 تأكيد موافقة وليّ الأمر عند التسجيل، ونقوم بتسجيل هذه الموافقة. نجمع من القاصرين فقط ما تحتاجه الخدمة، ولا نرسل لهم تسويقاً إلا بموافقة، ويمكن لوليّ الأمر طلب حذف حساب القاصر عبر " + POLICY_CONTACT + ".",
      "**النقل الدولي.** يعالج بعض المزوّدين أعلاه البيانات خارج الأردن، ونستخدم فقط مزوّدين يحمون بياناتك بشكل مناسب.",
    ]],
    ["💳 شروط الدفع والاشتراك", [
      "**الخطط والأسعار.** تتوفّر GYMORA بريميوم بخطط أسبوعية وشهرية وسنوية، وتُعرض الأسعار بعملتك المختارة قبل الدفع.",
      "**الطرق المقبولة.** بطاقات ائتمان وخصم (فيزا، ماستركارد)، وPayPal، وتحويل كليك (CliQ) الفوري.",
      "**قواعد البطاقة.** يجب أن تكون البطاقة صالحة وغير منتهية، من شبكة مدعومة، وتجتاز فحص رقم البطاقة القياسي، وأن تكون مخوّلاً باستخدامها.",
      "**التجربة المجانية.** التجربة المجانية 3 أيام، واحدة لكل حساب، وتتطلّب طريقة دفع محفوظة للبدء. تنتهي التجربة ببساطة بعد 3 أيام — **ولا يتم خصم أي مبلغ منك تلقائياً**. للاستمرار في بريميوم تختار خطة بنفسك.",
      "**لا تجديد تلقائي.** لا تتجدّد الخطط تلقائياً. عند انتهاء فترتك المدفوعة يتوقف بريميوم حتى تختار التجديد. إن قدّمنا التجديد التلقائي مستقبلاً فسيكون خياراً منفصلاً تفعّله بنفسك. يمكنك الإلغاء في أي وقت مع بقاء الوصول حتى نهاية الفترة المدفوعة.",
      "**الاسترداد.** ما لم يفرض القانون خلاف ذلك، مدفوعات الفترة التي بدأت غير قابلة للاسترداد، ويمكنك الإلغاء في أي وقت لتفادي أي رسوم مستقبلية.",
      "**تغيير الأسعار.** إن غيّرنا الأسعار سنُعلمك مسبقاً، وتُطبَّق على تجديدك التالي وليس بأثر رجعي.",
      "**تعذّر الدفع.** إن فشلت عملية الدفع فلا تكتمل عملية الشراء ولا يُخصم منك شيء؛ ويمكنك المحاولة مجدداً بطريقة دفع أخرى.",
    ]],
    ["↩️ سياسة الاسترداد", [
      "**اشتراكات بريميوم.** يمكنك الإلغاء في أي وقت مع بقاء الوصول حتى نهاية الفترة المدفوعة. إن طلبت خلال **14 يوماً** من الدفع ولم تستخدم ميزات بريميوم فعلياً، نعيد لك المبلغ كاملاً. بعد ذلك لا تُسترد الفترة التي بدأت إلا حيث يفرض القانون.",
      "**باقة نوادي المنطقة.** استرداد كامل خلال **14 يوماً** من الشراء إن لم تستخدم أي يوم في أي نادٍ. بعد استخدام يوم لا تُسترد الأيام المتبقية إلا حيث يفرض القانون. تنتهي الأيام بعد 30 يوماً من الشراء.",
      "**متجر المكملات.** يمكن إرجاع المنتجات غير المفتوحة في عبوتها الأصلية خلال **14 يوماً** من الاستلام. لا تُرجع المنتجات المفتوحة لأسباب صحية وأمان إلا إن كانت معيبة أو غير مطابقة للوصف.",
      "**أخطاؤنا.** تُسترد كاملاً دائماً: الخصم المكرر، أو الدفع لشيء لم تستلمه، أو الأخطاء التقنية.",
      "**كيف تطلب.** افتح طلب دعم في التطبيق (المساعدة والطلبات) أو راسلنا على " + POLICY_CONTACT + " مع بريد حسابك وسبب الاسترداد. تعود المبالغ المعتمدة لطريقة الدفع الأصلية عادةً خلال 14 يوم عمل (وقد يتأخر ظهورها لدى بنكك).",
      "**عضويات النوادي.** عند شراء عضوية مباشرة من نادٍ تنطبق أيضاً شروط الاسترداد الخاصة به — وسنعرضها قبل الدفع.",
    ]],
    ["🍪 سياسة ملفات الارتباط والتخزين", [
      "**لا ملفات تتبّع.** لا تستخدم GYMORA ملفات ارتباط للإعلانات أو التحليلات أو التتبّع، ولا تعمل أي أدوات تتبّع خارجية في التطبيق.",
      "**ما نخزّنه في متصفحك (التخزين المحلي).** *أساسي* — لازم لعمل التطبيق: رمز تسجيل الدخول، بيانات حسابك على هذا الجهاز، سلة المشتريات، لغتك وخيارك للخصوصية. *تفضيلات* — بموافقتك فقط: المظهر، اللون، العملة، النوادي المفضلة وتخطيط الفلاتر.",
      "**خيارك.** في زيارتك الأولى نسألك إن كنت تريد حفظ التفضيلات. *الأساسية فقط* تُبقي التطبيق يعمل وتنسى التفضيلات؛ *قبول الكل* يتذكّرها. الزرّان متساويان — لا شيء يُختار نيابةً عنك. يمكنك تغيير خيارك في أي وقت عبر \"خيارات الخصوصية\" في هذه الصفحة.",
      "**محتوى خارجي.** فيديوهات التمارين من منصة فيديو خارجية بوضع الخصوصية المحسّن، ولا تُحمَّل — وقد تخزّن بيانات في متصفحك — إلا عند ضغطك ▶ على فيديو. البحث عن الطعام والباركود يتصل بقاعدة بيانات أطعمة دون وضع ملفات ارتباط.",
      "**مسح البيانات.** يمكنك مسح كل شيء من إعدادات المتصفح، أو حذف حسابك من الحساب ← منطقة الخطر.",
    ]],
    ["📜 الشكر والتراخيص", [
      "**بيانات الأطعمة:** Open Food Facts ‏(openfoodfacts.org) بموجب رخصة قاعدة البيانات المفتوحة (ODbL)؛ والمحتويات بموجب رخصة محتويات قاعدة البيانات؛ وصور المنتجات بموجب CC BY-SA.",
      "**صور وشروحات التمارين:** free-exercise-db، ضمن الملكية العامة (Unlicense).",
      "**الخط:** Barlow Condensed © The Barlow Project Authors، رخصة SIL للخطوط المفتوحة 1.1.",
      "**مسح الباركود:** html5-qrcode، رخصة Apache 2.0.",
      "**كل ما عدا ذلك** — اسم GYMORA وشعارها وأيقوناتها ونصوصها وتصميمها — مملوك لـ GYMORA.",
    ]],
  ],
};

/* very small inline markdown: **bold** only */
function polMd(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>"); }

function policyBodyHTML(prefix) {
  const secs = POLICY_SECTIONS[state.lang] || POLICY_SECTIONS.en;
  const pre = prefix || "pol";
  const index = `<nav class="pol-index" aria-label="${esc(t("legalTab"))}">${secs.map(([title], i) =>
    `<a href="#${pre}-${i}" data-poljump="${pre}-${i}">${esc(title)}</a>`).join("")}</nav>`;
  return index + secs.map(([title, paras], i) => `
    <div class="section pol-sec" id="${pre}-${i}">
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
  <button class="btn ghost" data-consent-manage="1" style="margin:4px 0 8px">🍪 ${t("ckManage")}</button>
  ${policyBodyHTML("pol")}
  ${typeof businessHTML === "function" ? businessHTML() : ""}`;
}
/* in-page section links (smooth scroll inside the drawer/modal) */
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-poljump]");
  if (!a) return;
  e.preventDefault();
  const el = document.getElementById(a.dataset.poljump);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
});

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
    <div class="pol-scroll">${policyBodyHTML("polm")}${typeof businessHTML === "function" ? businessHTML() : ""}</div>
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
