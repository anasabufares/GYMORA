/* =============================================================
   GYMORA — AI calorie tracker (photo → nutrients + daily food log)
   -------------------------------------------------------------
   DEMO NOW, REAL-AI-READY.
   By default this works fully offline: it estimates a meal from a
   built-in food library so you can double-click index.html and
   demo it with no key and no cost.

   To switch on REAL photo AI later, set (before this script runs):
       window.GYMORA_CONFIG = { aiEndpoint: "/.netlify/functions/analyze-food" };
   analyzeFood() will then POST the photo to that endpoint and use
   the AI's answer, falling back to demo mode if anything fails.
   A ready-to-deploy endpoint stub is in netlify/functions/analyze-food.js
   (see AI-SETUP.md).

   Relies on globals from app.js / auth.js / plan.js:
   state, t, I18N, currentUser, updateUser, reRenderSection, toast,
   esc, calcPlan.
   ============================================================= */

/* ---------- text (both languages) ---------- */
const NUT_I18N = {
  en: {
    calorieTracker: "Calorie tracker",
    ctSub: "Snap a photo of your meal — get calories and macros, and log your day.",
    ctPhotoCta: "📷 Take or choose a food photo",
    ctPhotoHint: "Point at your plate. We'll estimate the food and its nutrients.",
    ctAnalyzing: "Analyzing your photo…",
    ctConfidence: "match",
    ctAiNote: "Analyzed by AI ✨",
    ctNotRight: "Not this? Pick the correct food:",
    ctPortion: "Portion",
    ctAddDay: "Add to today",
    ctDiscard: "Discard",
    ctToday: "Today",
    ctTotals: "Total today",
    ctRemaining: "left",
    ctOver: "over",
    ctNoTarget: "Build your plan (My plan) to see daily targets.",
    ctEmptyDay: "No food logged yet today. Scan a meal to get started.",
    ctHistory: "Recent days",
    ctAdded: "Added to today 🍽️",
    ctRemoved: "Removed",
    ctTry: "Try it",
    ctAmount: "Amount",
    ctSearchPh: "Search foods — chicken, water, sushi…",
    ctByPhoto: "📷 Add by photo (auto-guesses the food)",
    ctNoMatch: "No match. Try another word, or add by photo.",
    ctPickTitle: "What did you eat?",
    ctDemoNote: "Search any food (millions online), scan a barcode, or snap a photo. Photo recognition uses AI — set ANTHROPIC_API_KEY in Netlify to turn it on (see AI-SETUP); until then, use search or barcode.",
    ctOnline: "More results online",
    ctSearching: "Searching millions of foods…",
    ctScanBarcode: "Scan barcode",
    ctBarcodePrompt: "Enter the barcode number",
    ctLooking: "Looking up product…",
    ctNotFound: "Product not found. Try the name instead.",
    ctPer100: "per 100 g",
    ctOffCredit: "Online food data from Open Food Facts",
    ctCamDenied: "Camera unavailable — enter the barcode number instead.",
    ctFailedTitle: "Couldn't identify this photo",
    ctFailedBody: "Photo AI isn't available right now. Search the food by name or scan its barcode below.",
    ctTryAgain: "Try another photo",
    npTitle: "Add this product",
    npSub: "This barcode isn't in the database yet. Add it once — we'll remember it next time you scan.",
    npName: "Product name",
    npKcal: "Calories per 100 g",
    npSave: "Save & log",
    ctSaved: "Saved — we'll remember this barcode ✅",
    ctPayErrName: "Enter at least a name and calories.",
    npBarcode: "Barcode",
  },
  ar: {
    calorieTracker: "حاسبة السعرات",
    ctSub: "صوّر وجبتك — احصل على السعرات والعناصر الغذائية وسجّل يومك.",
    ctPhotoCta: "📷 التقط أو اختر صورة طعام",
    ctPhotoHint: "وجّه الكاميرا نحو طبقك، وسنقدّر الطعام وعناصره الغذائية.",
    ctAnalyzing: "نحلّل صورتك…",
    ctConfidence: "تطابق",
    ctAiNote: "تحليل بالذكاء الاصطناعي ✨",
    ctNotRight: "ليس هذا؟ اختر الطعام الصحيح:",
    ctPortion: "الحصة",
    ctAddDay: "أضف لليوم",
    ctDiscard: "تجاهل",
    ctToday: "اليوم",
    ctTotals: "إجمالي اليوم",
    ctRemaining: "متبقٍ",
    ctOver: "زائد",
    ctNoTarget: "أنشئ خطتك (خطتي) لعرض الأهداف اليومية.",
    ctEmptyDay: "لم تُسجّل أي طعام اليوم بعد. صوّر وجبة لتبدأ.",
    ctHistory: "الأيام الأخيرة",
    ctAdded: "أُضيفت لليوم 🍽️",
    ctRemoved: "حُذفت",
    ctTry: "جرّبها",
    ctAmount: "الكمية",
    ctSearchPh: "ابحث عن طعام — دجاج، ماء، سوشي…",
    ctByPhoto: "📷 أضف بصورة (تخمين تلقائي للطعام)",
    ctNoMatch: "لا نتائج. جرّب كلمة أخرى أو أضف بصورة.",
    ctPickTitle: "ماذا أكلت؟",
    ctDemoNote: "ابحث عن أي طعام (ملايين عبر الإنترنت)، أو امسح باركود، أو التقط صورة. التعرف بالصورة يعمل بالذكاء الاصطناعي — فعّل ANTHROPIC_API_KEY في Netlify لتشغيله (راجع AI-SETUP)؛ حتى ذلك استخدم البحث أو الباركود.",
    ctOnline: "نتائج إضافية عبر الإنترنت",
    ctSearching: "نبحث في ملايين الأطعمة…",
    ctScanBarcode: "مسح الباركود",
    ctBarcodePrompt: "أدخل رقم الباركود",
    ctLooking: "جاري البحث عن المنتج…",
    ctNotFound: "لم يُعثر على المنتج. جرّب البحث بالاسم.",
    ctPer100: "لكل 100 غ",
    ctOffCredit: "بيانات الأطعمة عبر الإنترنت من Open Food Facts",
    ctCamDenied: "الكاميرا غير متاحة — أدخل رقم الباركود يدوياً.",
    ctFailedTitle: "تعذّر التعرف على الصورة",
    ctFailedBody: "تحليل الصور بالذكاء الاصطناعي غير متاح حالياً. ابحث عن الطعام بالاسم أو امسح الباركود بالأسفل.",
    ctTryAgain: "جرّب صورة أخرى",
    npTitle: "أضِف هذا المنتج",
    npSub: "هذا الباركود غير موجود في قاعدة البيانات بعد. أضِفه مرة واحدة وسنتذكّره في المسح القادم.",
    npName: "اسم المنتج",
    npKcal: "السعرات لكل 100 غ",
    npSave: "احفظ وسجّل",
    ctSaved: "تم الحفظ — سنتذكّر هذا الباركود ✅",
    ctPayErrName: "أدخل الاسم والسعرات على الأقل.",
    npBarcode: "الباركود",
  },
};
Object.assign(I18N.en, NUT_I18N.en);
Object.assign(I18N.ar, NUT_I18N.ar);

/* ---------- built-in food library (per 1 serving) ----------
   Values are realistic estimates for a typical serving. Mix of
   Middle-Eastern staples and common gym foods. ------------------ */
const FOODS = [
  { key: "chicken_rice", emoji: "🍗", name: { en: "Grilled chicken & rice", ar: "دجاج مشوي مع رز" }, serving: { en: "1 plate", ar: "طبق" }, kcal: 650, p: 55, c: 70, f: 15 },
  { key: "shawarma", emoji: "🌯", name: { en: "Chicken shawarma", ar: "شاورما دجاج" }, serving: { en: "1 sandwich", ar: "سندويشة" }, kcal: 480, p: 30, c: 40, f: 22 },
  { key: "falafel", emoji: "🧆", name: { en: "Falafel wrap", ar: "عرَبية فلافل" }, serving: { en: "1 wrap", ar: "لفة" }, kcal: 520, p: 16, c: 60, f: 24 },
  { key: "hummus", emoji: "🥣", name: { en: "Hummus with pita", ar: "حمّص مع خبز" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 380, p: 12, c: 45, f: 18 },
  { key: "mansaf", emoji: "🍚", name: { en: "Mansaf", ar: "منسف" }, serving: { en: "1 plate", ar: "طبق" }, kcal: 850, p: 45, c: 80, f: 40 },
  { key: "maqluba", emoji: "🍛", name: { en: "Maqluba", ar: "مقلوبة" }, serving: { en: "1 plate", ar: "طبق" }, kcal: 600, p: 25, c: 75, f: 22 },
  { key: "eggs", emoji: "🍳", name: { en: "Eggs", ar: "بيض" }, serving: { en: "3 eggs", ar: "3 بيضات" }, kcal: 215, p: 18, c: 2, f: 15 },
  { key: "oats", emoji: "🥣", name: { en: "Oatmeal bowl", ar: "شوفان" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 300, p: 10, c: 50, f: 6 },
  { key: "banana", emoji: "🍌", name: { en: "Banana", ar: "موز" }, serving: { en: "1 banana", ar: "موزة" }, kcal: 105, p: 1, c: 27, f: 0 },
  { key: "apple", emoji: "🍎", name: { en: "Apple", ar: "تفاح" }, serving: { en: "1 apple", ar: "تفاحة" }, kcal: 95, p: 0, c: 25, f: 0 },
  { key: "protein_shake", emoji: "🥤", name: { en: "Protein shake", ar: "بروتين شيك" }, serving: { en: "1 scoop", ar: "مغرفة" }, kcal: 160, p: 30, c: 6, f: 3 },
  { key: "greek_yogurt", emoji: "🥛", name: { en: "Greek yogurt", ar: "زبادي يوناني" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 150, p: 15, c: 10, f: 5 },
  { key: "salad", emoji: "🥗", name: { en: "Fattoush / green salad", ar: "فتوش / سلطة خضراء" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 120, p: 3, c: 12, f: 7 },
  { key: "salmon", emoji: "🐟", name: { en: "Salmon fillet", ar: "شريحة سلمون" }, serving: { en: "1 fillet", ar: "شريحة" }, kcal: 350, p: 34, c: 0, f: 23 },
  { key: "beef_steak", emoji: "🥩", name: { en: "Lean beef steak", ar: "ستيك لحم" }, serving: { en: "1 steak", ar: "قطعة" }, kcal: 400, p: 50, c: 0, f: 22 },
  { key: "pasta", emoji: "🍝", name: { en: "Pasta", ar: "معكرونة" }, serving: { en: "1 plate", ar: "طبق" }, kcal: 600, p: 20, c: 90, f: 16 },
  { key: "pizza", emoji: "🍕", name: { en: "Pizza", ar: "بيتزا" }, serving: { en: "2 slices", ar: "قطعتان" }, kcal: 570, p: 24, c: 64, f: 22 },
  { key: "burger", emoji: "🍔", name: { en: "Beef burger", ar: "برجر لحم" }, serving: { en: "1 burger", ar: "برجر" }, kcal: 550, p: 28, c: 42, f: 30 },
  { key: "nuts", emoji: "🥜", name: { en: "Handful of almonds", ar: "حفنة لوز" }, serving: { en: "30 g", ar: "30 غ" }, kcal: 180, p: 6, c: 6, f: 16 },
  { key: "rice", emoji: "🍚", name: { en: "Rice", ar: "رز" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 340, p: 6, c: 74, f: 1 },
  { key: "pita", emoji: "🫓", name: { en: "Pita bread", ar: "خبز عربي" }, serving: { en: "1 loaf", ar: "رغيف" }, kcal: 165, p: 6, c: 33, f: 1 },
  { key: "avocado", emoji: "🥑", name: { en: "Avocado", ar: "أفوكادو" }, serving: { en: "½ avocado", ar: "نصف حبة" }, kcal: 160, p: 2, c: 9, f: 15 },
  { key: "tuna", emoji: "🐟", name: { en: "Tuna", ar: "تونة" }, serving: { en: "1 can", ar: "علبة" }, kcal: 180, p: 40, c: 0, f: 2 },
  { key: "potato", emoji: "🥔", name: { en: "Baked potato", ar: "بطاطا مشوية" }, serving: { en: "1 potato", ar: "حبة" }, kcal: 160, p: 4, c: 37, f: 0 },
  { key: "kunafa", emoji: "🍮", name: { en: "Kunafa", ar: "كنافة" }, serving: { en: "1 piece", ar: "قطعة" }, kcal: 430, p: 8, c: 55, f: 20 },
  { key: "dates", emoji: "🌴", name: { en: "Dates", ar: "تمر" }, serving: { en: "3 dates", ar: "3 حبات" }, kcal: 200, p: 1, c: 54, f: 0 },
  { key: "latte", emoji: "☕", name: { en: "Latte", ar: "لاتيه" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 120, p: 6, c: 12, f: 5 },
  // ---- drinks ----
  { key: "water", emoji: "💧", name: { en: "Water", ar: "ماء" }, serving: { en: "1 glass", ar: "كوب" }, kcal: 0, p: 0, c: 0, f: 0 },
  { key: "coffee", emoji: "☕", name: { en: "Black coffee", ar: "قهوة سادة" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 5, p: 0, c: 1, f: 0 },
  { key: "tea", emoji: "🍵", name: { en: "Tea", ar: "شاي" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 2, p: 0, c: 0, f: 0 },
  { key: "soda", emoji: "🥤", name: { en: "Soft drink", ar: "مشروب غازي" }, serving: { en: "1 can", ar: "علبة" }, kcal: 140, p: 0, c: 39, f: 0 },
  { key: "juice", emoji: "🧃", name: { en: "Orange juice", ar: "عصير برتقال" }, serving: { en: "1 glass", ar: "كوب" }, kcal: 110, p: 2, c: 26, f: 0 },
  { key: "milk", emoji: "🥛", name: { en: "Milk", ar: "حليب" }, serving: { en: "1 glass", ar: "كوب" }, kcal: 120, p: 8, c: 12, f: 5 },
  { key: "whey", emoji: "🥤", name: { en: "Whey protein", ar: "واي بروتين" }, serving: { en: "1 scoop", ar: "مغرفة" }, kcal: 120, p: 25, c: 3, f: 2 },
  // ---- proteins ----
  { key: "chicken_breast", emoji: "🍗", name: { en: "Grilled chicken breast", ar: "صدر دجاج مشوي" }, serving: { en: "1 breast", ar: "صدر" }, kcal: 220, p: 40, c: 0, f: 5 },
  { key: "egg_boiled", emoji: "🥚", name: { en: "Boiled egg", ar: "بيضة مسلوقة" }, serving: { en: "1 egg", ar: "بيضة" }, kcal: 70, p: 6, c: 1, f: 5 },
  { key: "sushi", emoji: "🍣", name: { en: "Sushi", ar: "سوشي" }, serving: { en: "6 pieces", ar: "6 قطع" }, kcal: 350, p: 12, c: 60, f: 6 },
  { key: "shrimp", emoji: "🦐", name: { en: "Shrimp", ar: "روبيان" }, serving: { en: "100 g", ar: "100 غ" }, kcal: 100, p: 20, c: 1, f: 1 },
  { key: "turkey", emoji: "🦃", name: { en: "Turkey slices", ar: "شرائح حبش" }, serving: { en: "100 g", ar: "100 غ" }, kcal: 130, p: 22, c: 2, f: 4 },
  { key: "tofu", emoji: "🧈", name: { en: "Tofu", ar: "توفو" }, serving: { en: "100 g", ar: "100 غ" }, kcal: 145, p: 16, c: 3, f: 9 },
  { key: "lentils", emoji: "🍲", name: { en: "Lentils", ar: "عدس" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 230, p: 18, c: 40, f: 1 },
  { key: "chickpeas", emoji: "🫘", name: { en: "Chickpeas", ar: "حمّص حب" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 270, p: 15, c: 45, f: 4 },
  // ---- carbs ----
  { key: "noodles", emoji: "🍜", name: { en: "Noodles", ar: "نودلز" }, serving: { en: "1 plate", ar: "طبق" }, kcal: 380, p: 10, c: 55, f: 12 },
  { key: "bread", emoji: "🍞", name: { en: "Bread", ar: "خبز توست" }, serving: { en: "2 slices", ar: "شريحتان" }, kcal: 160, p: 6, c: 30, f: 2 },
  { key: "fries", emoji: "🍟", name: { en: "French fries", ar: "بطاطا مقلية" }, serving: { en: "medium", ar: "وسط" }, kcal: 365, p: 4, c: 48, f: 17 },
  { key: "cereal", emoji: "🥣", name: { en: "Cereal & milk", ar: "حبوب مع حليب" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 250, p: 8, c: 45, f: 5 },
  // ---- meals / fast food ----
  { key: "kebab", emoji: "🍢", name: { en: "Kebab", ar: "كباب" }, serving: { en: "1 skewer", ar: "سيخ" }, kcal: 300, p: 25, c: 5, f: 20 },
  { key: "mixed_grill", emoji: "🥩", name: { en: "Mixed grill", ar: "مشاوي مشكّلة" }, serving: { en: "1 plate", ar: "طبق" }, kcal: 700, p: 55, c: 10, f: 45 },
  { key: "fried_chicken", emoji: "🍗", name: { en: "Fried chicken", ar: "دجاج مقلي" }, serving: { en: "2 pieces", ar: "قطعتان" }, kcal: 480, p: 35, c: 16, f: 30 },
  { key: "sandwich", emoji: "🥪", name: { en: "Chicken sandwich", ar: "ساندويش دجاج" }, serving: { en: "1", ar: "واحد" }, kcal: 350, p: 25, c: 35, f: 12 },
  { key: "chicken_salad", emoji: "🥗", name: { en: "Chicken salad", ar: "سلطة دجاج" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 320, p: 30, c: 15, f: 15 },
  { key: "wrap", emoji: "🌯", name: { en: "Grilled wrap", ar: "راب مشوي" }, serving: { en: "1", ar: "واحد" }, kcal: 400, p: 28, c: 40, f: 14 },
  // ---- snacks / fruit ----
  { key: "orange", emoji: "🍊", name: { en: "Orange", ar: "برتقالة" }, serving: { en: "1", ar: "واحدة" }, kcal: 62, p: 1, c: 15, f: 0 },
  { key: "grapes", emoji: "🍇", name: { en: "Grapes", ar: "عنب" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 104, p: 1, c: 27, f: 0 },
  { key: "protein_bar", emoji: "🍫", name: { en: "Protein bar", ar: "لوح بروتين" }, serving: { en: "1 bar", ar: "لوح" }, kcal: 220, p: 20, c: 24, f: 7 },
  { key: "chips", emoji: "🥔", name: { en: "Potato chips", ar: "شيبس" }, serving: { en: "small bag", ar: "كيس صغير" }, kcal: 150, p: 2, c: 15, f: 10 },
  { key: "chocolate", emoji: "🍫", name: { en: "Chocolate", ar: "شوكولاتة" }, serving: { en: "1 bar", ar: "لوح" }, kcal: 230, p: 3, c: 26, f: 13 },
  { key: "ice_cream", emoji: "🍨", name: { en: "Ice cream", ar: "آيس كريم" }, serving: { en: "1 scoop", ar: "كرة" }, kcal: 140, p: 2, c: 17, f: 7 },
  { key: "cheese", emoji: "🧀", name: { en: "Cheese", ar: "جبنة" }, serving: { en: "1 slice", ar: "شريحة" }, kcal: 110, p: 7, c: 1, f: 9 },
  { key: "labneh", emoji: "🥛", name: { en: "Labneh", ar: "لبنة" }, serving: { en: "1 serving", ar: "حصة" }, kcal: 120, p: 6, c: 5, f: 9 },
  { key: "peanut_butter", emoji: "🥜", name: { en: "Peanut butter", ar: "زبدة فول سوداني" }, serving: { en: "2 tbsp", ar: "ملعقتان" }, kcal: 190, p: 8, c: 6, f: 16 },
  { key: "baklava", emoji: "🍮", name: { en: "Baklava", ar: "بقلاوة" }, serving: { en: "1 piece", ar: "قطعة" }, kcal: 245, p: 4, c: 28, f: 14 },
  // ============ expanded library ============
  // ---- fruits ----
  { key: "strawberries", emoji: "🍓", name: { en: "Strawberries", ar: "فراولة" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 50, p: 1, c: 12, f: 0 },
  { key: "watermelon", emoji: "🍉", name: { en: "Watermelon", ar: "بطيخ" }, serving: { en: "1 slice", ar: "شريحة" }, kcal: 85, p: 2, c: 21, f: 0 },
  { key: "mango", emoji: "🥭", name: { en: "Mango", ar: "مانجو" }, serving: { en: "1 mango", ar: "حبة" }, kcal: 200, p: 3, c: 50, f: 1 },
  { key: "pineapple", emoji: "🍍", name: { en: "Pineapple", ar: "أناناس" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 82, p: 1, c: 22, f: 0 },
  { key: "peach", emoji: "🍑", name: { en: "Peach", ar: "خوخ" }, serving: { en: "1 peach", ar: "حبة" }, kcal: 60, p: 1, c: 15, f: 0 },
  { key: "pear", emoji: "🍐", name: { en: "Pear", ar: "إجاص" }, serving: { en: "1 pear", ar: "حبة" }, kcal: 100, p: 1, c: 27, f: 0 },
  { key: "kiwi", emoji: "🥝", name: { en: "Kiwi", ar: "كيوي" }, serving: { en: "1 kiwi", ar: "حبة" }, kcal: 42, p: 1, c: 10, f: 0 },
  { key: "cherries", emoji: "🍒", name: { en: "Cherries", ar: "كرز" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 97, p: 2, c: 25, f: 0 },
  { key: "blueberries", emoji: "🫐", name: { en: "Blueberries", ar: "توت أزرق" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 84, p: 1, c: 21, f: 0 },
  { key: "pomegranate", emoji: "🍎", name: { en: "Pomegranate", ar: "رمان" }, serving: { en: "1 fruit", ar: "حبة" }, kcal: 234, p: 5, c: 53, f: 3 },
  { key: "fig", emoji: "🍈", name: { en: "Figs", ar: "تين" }, serving: { en: "2 figs", ar: "حبتان" }, kcal: 74, p: 1, c: 19, f: 0 },
  { key: "lemon", emoji: "🍋", name: { en: "Lemon", ar: "ليمون" }, serving: { en: "1 lemon", ar: "حبة" }, kcal: 17, p: 1, c: 5, f: 0 },
  // ---- vegetables ----
  { key: "cucumber", emoji: "🥒", name: { en: "Cucumber", ar: "خيار" }, serving: { en: "1 cucumber", ar: "حبة" }, kcal: 30, p: 1, c: 7, f: 0 },
  { key: "tomato", emoji: "🍅", name: { en: "Tomato", ar: "بندورة" }, serving: { en: "1 tomato", ar: "حبة" }, kcal: 22, p: 1, c: 5, f: 0 },
  { key: "carrot", emoji: "🥕", name: { en: "Carrot", ar: "جزر" }, serving: { en: "1 carrot", ar: "حبة" }, kcal: 25, p: 1, c: 6, f: 0 },
  { key: "broccoli", emoji: "🥦", name: { en: "Broccoli", ar: "بروكلي" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 55, p: 4, c: 11, f: 1 },
  { key: "corn", emoji: "🌽", name: { en: "Corn", ar: "ذرة" }, serving: { en: "1 cob", ar: "كوز" }, kcal: 125, p: 5, c: 27, f: 2 },
  { key: "sweet_potato", emoji: "🍠", name: { en: "Sweet potato", ar: "بطاطا حلوة" }, serving: { en: "1 potato", ar: "حبة" }, kcal: 112, p: 2, c: 26, f: 0 },
  { key: "spinach", emoji: "🥬", name: { en: "Spinach", ar: "سبانخ" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 23, p: 3, c: 4, f: 0 },
  { key: "mushroom", emoji: "🍄", name: { en: "Mushrooms", ar: "فطر" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 22, p: 3, c: 3, f: 0 },
  { key: "eggplant", emoji: "🍆", name: { en: "Eggplant", ar: "باذنجان" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 35, p: 1, c: 9, f: 0 },
  { key: "bell_pepper", emoji: "🫑", name: { en: "Bell pepper", ar: "فلفل حلو" }, serving: { en: "1 pepper", ar: "حبة" }, kcal: 30, p: 1, c: 7, f: 0 },
  { key: "olives", emoji: "🫒", name: { en: "Olives", ar: "زيتون" }, serving: { en: "10 olives", ar: "10 حبات" }, kcal: 60, p: 0, c: 3, f: 6 },
  // ---- proteins / meat / seafood ----
  { key: "ground_beef", emoji: "🥩", name: { en: "Ground beef", ar: "لحم مفروم" }, serving: { en: "100 g", ar: "100 غ" }, kcal: 250, p: 26, c: 0, f: 17 },
  { key: "lamb", emoji: "🍖", name: { en: "Lamb", ar: "لحم غنم" }, serving: { en: "100 g", ar: "100 غ" }, kcal: 294, p: 25, c: 0, f: 21 },
  { key: "chicken_thigh", emoji: "🍗", name: { en: "Chicken thigh", ar: "فخذ دجاج" }, serving: { en: "1 thigh", ar: "فخذة" }, kcal: 210, p: 26, c: 0, f: 11 },
  { key: "chicken_nuggets", emoji: "🍗", name: { en: "Chicken nuggets", ar: "ناجتس دجاج" }, serving: { en: "6 pieces", ar: "6 قطع" }, kcal: 280, p: 15, c: 16, f: 18 },
  { key: "bacon", emoji: "🥓", name: { en: "Bacon", ar: "بيكن" }, serving: { en: "2 strips", ar: "شريحتان" }, kcal: 90, p: 6, c: 0, f: 7 },
  { key: "sausage", emoji: "🌭", name: { en: "Sausage", ar: "سجق" }, serving: { en: "1 sausage", ar: "قطعة" }, kcal: 180, p: 9, c: 2, f: 15 },
  { key: "cod", emoji: "🐟", name: { en: "White fish", ar: "سمك أبيض" }, serving: { en: "1 fillet", ar: "شريحة" }, kcal: 180, p: 39, c: 0, f: 2 },
  { key: "sardines", emoji: "🐟", name: { en: "Sardines", ar: "سردين" }, serving: { en: "1 can", ar: "علبة" }, kcal: 190, p: 23, c: 0, f: 11 },
  { key: "crab", emoji: "🦀", name: { en: "Crab", ar: "سلطعون" }, serving: { en: "100 g", ar: "100 غ" }, kcal: 97, p: 19, c: 0, f: 2 },
  { key: "beans", emoji: "🫘", name: { en: "Beans (fasolia)", ar: "فاصولياء" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 245, p: 15, c: 45, f: 1 },
  { key: "foul", emoji: "🫘", name: { en: "Foul medames", ar: "فول مدمس" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 300, p: 18, c: 40, f: 8 },
  { key: "edamame", emoji: "🫛", name: { en: "Edamame", ar: "إدامامي" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 190, p: 17, c: 15, f: 8 },
  // ---- dairy / eggs ----
  { key: "cottage_cheese", emoji: "🧀", name: { en: "Cottage cheese", ar: "جبنة قريش" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 180, p: 24, c: 8, f: 5 },
  { key: "feta", emoji: "🧀", name: { en: "Feta cheese", ar: "جبنة فيتا" }, serving: { en: "50 g", ar: "50 غ" }, kcal: 132, p: 7, c: 2, f: 11 },
  { key: "mozzarella", emoji: "🧀", name: { en: "Mozzarella", ar: "موزاريلا" }, serving: { en: "50 g", ar: "50 غ" }, kcal: 150, p: 11, c: 1, f: 11 },
  { key: "butter", emoji: "🧈", name: { en: "Butter", ar: "زبدة" }, serving: { en: "1 tbsp", ar: "ملعقة" }, kcal: 100, p: 0, c: 0, f: 11 },
  { key: "yogurt_plain", emoji: "🥛", name: { en: "Plain yogurt", ar: "لبن" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 150, p: 8, c: 12, f: 8 },
  { key: "omelette", emoji: "🍳", name: { en: "Omelette", ar: "عجة" }, serving: { en: "2 eggs", ar: "بيضتان" }, kcal: 220, p: 14, c: 2, f: 17 },
  // ---- grains / carbs ----
  { key: "brown_rice", emoji: "🍚", name: { en: "Brown rice", ar: "رز بني" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 320, p: 7, c: 68, f: 3 },
  { key: "quinoa", emoji: "🍚", name: { en: "Quinoa", ar: "كينوا" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 222, p: 8, c: 39, f: 4 },
  { key: "bulgur", emoji: "🍚", name: { en: "Bulgur", ar: "برغل" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 150, p: 6, c: 34, f: 0 },
  { key: "couscous", emoji: "🍚", name: { en: "Couscous", ar: "كسكس" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 176, p: 6, c: 36, f: 0 },
  { key: "croissant", emoji: "🥐", name: { en: "Croissant", ar: "كرواسون" }, serving: { en: "1", ar: "واحد" }, kcal: 270, p: 5, c: 31, f: 14 },
  { key: "bagel", emoji: "🥯", name: { en: "Bagel", ar: "خبز بيغل" }, serving: { en: "1 bagel", ar: "حبة" }, kcal: 250, p: 10, c: 48, f: 2 },
  { key: "pancakes", emoji: "🥞", name: { en: "Pancakes", ar: "بان كيك" }, serving: { en: "3 pancakes", ar: "3 قطع" }, kcal: 350, p: 8, c: 55, f: 10 },
  { key: "waffle", emoji: "🧇", name: { en: "Waffle", ar: "وافل" }, serving: { en: "1 waffle", ar: "قطعة" }, kcal: 220, p: 5, c: 25, f: 11 },
  { key: "tortilla", emoji: "🫓", name: { en: "Tortilla wrap", ar: "خبز تورتيا" }, serving: { en: "1 tortilla", ar: "رغيف" }, kcal: 140, p: 4, c: 24, f: 4 },
  { key: "manakish", emoji: "🫓", name: { en: "Manakish zaatar", ar: "منقوشة زعتر" }, serving: { en: "1 piece", ar: "قطعة" }, kcal: 300, p: 8, c: 40, f: 12 },
  // ---- Middle-Eastern / meals ----
  { key: "tabbouleh", emoji: "🥗", name: { en: "Tabbouleh", ar: "تبولة" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 150, p: 3, c: 20, f: 7 },
  { key: "warak_enab", emoji: "🍃", name: { en: "Stuffed vine leaves", ar: "ورق عنب" }, serving: { en: "6 pieces", ar: "6 قطع" }, kcal: 250, p: 5, c: 35, f: 10 },
  { key: "molokhia", emoji: "🍲", name: { en: "Molokhia", ar: "ملوخية" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 300, p: 20, c: 20, f: 15 },
  { key: "kabsa", emoji: "🍛", name: { en: "Kabsa", ar: "كبسة" }, serving: { en: "1 plate", ar: "طبق" }, kcal: 650, p: 35, c: 75, f: 22 },
  { key: "koshari", emoji: "🍲", name: { en: "Koshari", ar: "كشري" }, serving: { en: "1 plate", ar: "طبق" }, kcal: 550, p: 16, c: 95, f: 12 },
  { key: "shakshuka", emoji: "🍳", name: { en: "Shakshuka", ar: "شكشوكة" }, serving: { en: "1 pan", ar: "مقلاة" }, kcal: 320, p: 18, c: 16, f: 20 },
  { key: "fatteh", emoji: "🍲", name: { en: "Fatteh", ar: "فتة" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 450, p: 18, c: 45, f: 22 },
  { key: "kibbeh", emoji: "🧆", name: { en: "Kibbeh", ar: "كبة" }, serving: { en: "2 pieces", ar: "قطعتان" }, kcal: 300, p: 12, c: 22, f: 18 },
  { key: "sambousek", emoji: "🥟", name: { en: "Sambousek", ar: "سمبوسك" }, serving: { en: "2 pieces", ar: "قطعتان" }, kcal: 260, p: 8, c: 26, f: 14 },
  { key: "musakhan", emoji: "🍗", name: { en: "Musakhan", ar: "مسخّن" }, serving: { en: "1 roll", ar: "لفة" }, kcal: 450, p: 25, c: 40, f: 22 },
  { key: "grape_leaves", emoji: "🥬", name: { en: "Stuffed cabbage", ar: "ملفوف محشي" }, serving: { en: "1 plate", ar: "طبق" }, kcal: 350, p: 12, c: 40, f: 15 },
  // ---- fast food ----
  { key: "hotdog", emoji: "🌭", name: { en: "Hot dog", ar: "هوت دوغ" }, serving: { en: "1", ar: "واحد" }, kcal: 290, p: 10, c: 24, f: 17 },
  { key: "taco", emoji: "🌮", name: { en: "Taco", ar: "تاكو" }, serving: { en: "1 taco", ar: "واحد" }, kcal: 210, p: 9, c: 20, f: 10 },
  { key: "burrito", emoji: "🌯", name: { en: "Burrito", ar: "بوريتو" }, serving: { en: "1", ar: "واحد" }, kcal: 550, p: 22, c: 65, f: 22 },
  { key: "onion_rings", emoji: "🧅", name: { en: "Onion rings", ar: "حلقات بصل" }, serving: { en: "medium", ar: "وسط" }, kcal: 410, p: 5, c: 45, f: 24 },
  { key: "cheeseburger", emoji: "🍔", name: { en: "Cheeseburger", ar: "تشيز برجر" }, serving: { en: "1", ar: "واحد" }, kcal: 630, p: 32, c: 44, f: 36 },
  { key: "donut", emoji: "🍩", name: { en: "Donut", ar: "دونات" }, serving: { en: "1", ar: "واحدة" }, kcal: 260, p: 3, c: 31, f: 14 },
  { key: "popcorn", emoji: "🍿", name: { en: "Popcorn", ar: "فشار" }, serving: { en: "1 bowl", ar: "صحن" }, kcal: 120, p: 3, c: 24, f: 2 },
  { key: "pretzel", emoji: "🥨", name: { en: "Pretzel", ar: "بريتزل" }, serving: { en: "1", ar: "واحد" }, kcal: 380, p: 10, c: 80, f: 3 },
  // ---- desserts / snacks ----
  { key: "cake", emoji: "🍰", name: { en: "Cake slice", ar: "قطعة كيك" }, serving: { en: "1 slice", ar: "قطعة" }, kcal: 350, p: 5, c: 50, f: 15 },
  { key: "cookie", emoji: "🍪", name: { en: "Cookie", ar: "كوكيز" }, serving: { en: "1 cookie", ar: "واحدة" }, kcal: 160, p: 2, c: 22, f: 8 },
  { key: "muffin", emoji: "🧁", name: { en: "Muffin", ar: "مافن" }, serving: { en: "1", ar: "واحد" }, kcal: 380, p: 6, c: 55, f: 15 },
  { key: "brownie", emoji: "🍫", name: { en: "Brownie", ar: "براوني" }, serving: { en: "1 piece", ar: "قطعة" }, kcal: 250, p: 3, c: 33, f: 12 },
  { key: "pudding", emoji: "🍮", name: { en: "Pudding / mahalabia", ar: "مهلبية" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 180, p: 5, c: 30, f: 5 },
  { key: "honey", emoji: "🍯", name: { en: "Honey", ar: "عسل" }, serving: { en: "1 tbsp", ar: "ملعقة" }, kcal: 64, p: 0, c: 17, f: 0 },
  { key: "jam", emoji: "🍓", name: { en: "Jam", ar: "مربى" }, serving: { en: "1 tbsp", ar: "ملعقة" }, kcal: 56, p: 0, c: 14, f: 0 },
  { key: "granola", emoji: "🥣", name: { en: "Granola", ar: "جرانولا" }, serving: { en: "½ cup", ar: "نصف كوب" }, kcal: 230, p: 5, c: 32, f: 9 },
  { key: "trail_mix", emoji: "🥜", name: { en: "Trail mix", ar: "مكسرات مشكّلة" }, serving: { en: "30 g", ar: "30 غ" }, kcal: 170, p: 5, c: 14, f: 11 },
  { key: "walnuts", emoji: "🌰", name: { en: "Walnuts", ar: "جوز" }, serving: { en: "30 g", ar: "30 غ" }, kcal: 196, p: 5, c: 4, f: 20 },
  { key: "cashews", emoji: "🥜", name: { en: "Cashews", ar: "كاجو" }, serving: { en: "30 g", ar: "30 غ" }, kcal: 165, p: 5, c: 9, f: 13 },
  { key: "pistachios", emoji: "🥜", name: { en: "Pistachios", ar: "فستق" }, serving: { en: "30 g", ar: "30 غ" }, kcal: 160, p: 6, c: 8, f: 13 },
  { key: "raisins", emoji: "🍇", name: { en: "Raisins", ar: "زبيب" }, serving: { en: "30 g", ar: "30 غ" }, kcal: 90, p: 1, c: 24, f: 0 },
  // ---- drinks ----
  { key: "smoothie", emoji: "🥤", name: { en: "Fruit smoothie", ar: "سموذي" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 200, p: 4, c: 40, f: 3 },
  { key: "energy_drink", emoji: "🥫", name: { en: "Energy drink", ar: "مشروب طاقة" }, serving: { en: "1 can", ar: "علبة" }, kcal: 160, p: 0, c: 40, f: 0 },
  { key: "cappuccino", emoji: "☕", name: { en: "Cappuccino", ar: "كابتشينو" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 90, p: 5, c: 9, f: 4 },
  { key: "arabic_coffee", emoji: "☕", name: { en: "Arabic coffee", ar: "قهوة عربية" }, serving: { en: "1 cup", ar: "فنجان" }, kcal: 10, p: 0, c: 1, f: 0 },
  { key: "hot_chocolate", emoji: "☕", name: { en: "Hot chocolate", ar: "شوكولاتة ساخنة" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 190, p: 8, c: 27, f: 6 },
  { key: "milkshake", emoji: "🥤", name: { en: "Milkshake", ar: "ميلك شيك" }, serving: { en: "1 cup", ar: "كوب" }, kcal: 350, p: 9, c: 55, f: 10 },
  { key: "ayran", emoji: "🥛", name: { en: "Ayran / laban", ar: "عيران" }, serving: { en: "1 glass", ar: "كوب" }, kcal: 90, p: 5, c: 8, f: 4 },
  { key: "lemonade", emoji: "🍋", name: { en: "Lemonade", ar: "ليموناضة" }, serving: { en: "1 glass", ar: "كوب" }, kcal: 120, p: 0, c: 32, f: 0 },
  // ---- condiments / extras ----
  { key: "olive_oil", emoji: "🫒", name: { en: "Olive oil", ar: "زيت زيتون" }, serving: { en: "1 tbsp", ar: "ملعقة" }, kcal: 120, p: 0, c: 0, f: 14 },
  { key: "ketchup", emoji: "🍅", name: { en: "Ketchup", ar: "كاتشب" }, serving: { en: "1 tbsp", ar: "ملعقة" }, kcal: 20, p: 0, c: 5, f: 0 },
  { key: "mayo", emoji: "🥚", name: { en: "Mayonnaise", ar: "مايونيز" }, serving: { en: "1 tbsp", ar: "ملعقة" }, kcal: 90, p: 0, c: 0, f: 10 },
  { key: "tahini", emoji: "🥣", name: { en: "Tahini", ar: "طحينة" }, serving: { en: "1 tbsp", ar: "ملعقة" }, kcal: 89, p: 3, c: 3, f: 8 },
  { key: "sugar", emoji: "🍬", name: { en: "Sugar", ar: "سكر" }, serving: { en: "1 tsp", ar: "ملعقة صغيرة" }, kcal: 16, p: 0, c: 4, f: 0 },
];

/* ---------- amounts & units ----------
   Each food's nutrition is for 1 serving; FOOD_BASE says how much that
   serving weighs (g) or measures (ml), so users can log real amounts in
   g / kg / lb / ml / L. Unlisted foods default to 250 g. */
const UNITS = { g: 1, kg: 1000, lb: 453.59, ml: 1, L: 1000 };
const FOOD_BASE = {
  water: [250, "ml"], coffee: [240, "ml"], tea: [240, "ml"], soda: [330, "ml"],
  juice: [250, "ml"], milk: [250, "ml"], latte: [300, "ml"], protein_shake: [300, "ml"],
  whey: [30, "g"], chicken_rice: [400, "g"], shawarma: [250, "g"], falafel: [300, "g"],
  hummus: [250, "g"], mansaf: [450, "g"], maqluba: [400, "g"], eggs: [165, "g"],
  oats: [240, "g"], banana: [118, "g"], apple: [180, "g"], greek_yogurt: [170, "g"],
  salad: [150, "g"], salmon: [180, "g"], beef_steak: [220, "g"], pasta: [350, "g"],
  pizza: [220, "g"], burger: [250, "g"], nuts: [30, "g"], rice: [200, "g"],
  pita: [90, "g"], avocado: [100, "g"], tuna: [120, "g"], potato: [170, "g"],
  kunafa: [150, "g"], dates: [72, "g"], chicken_breast: [170, "g"], egg_boiled: [50, "g"],
  sushi: [180, "g"], shrimp: [100, "g"], turkey: [100, "g"], tofu: [100, "g"],
  lentils: [250, "g"], chickpeas: [160, "g"], noodles: [300, "g"], bread: [60, "g"],
  fries: [115, "g"], cereal: [240, "g"], kebab: [120, "g"], mixed_grill: [350, "g"],
  fried_chicken: [200, "g"], sandwich: [220, "g"], chicken_salad: [250, "g"], wrap: [250, "g"],
  orange: [130, "g"], grapes: [150, "g"], protein_bar: [60, "g"], chips: [30, "g"],
  chocolate: [45, "g"], ice_cream: [65, "g"], cheese: [25, "g"], labneh: [60, "g"],
  peanut_butter: [32, "g"], baklava: [60, "g"],
  // ---- expanded library serving weights ----
  strawberries: [150, "g"], watermelon: [280, "g"], mango: [200, "g"], pineapple: [165, "g"],
  peach: [150, "g"], pear: [180, "g"], kiwi: [75, "g"], cherries: [150, "g"],
  blueberries: [150, "g"], pomegranate: [280, "g"], fig: [100, "g"], lemon: [60, "g"],
  cucumber: [200, "g"], tomato: [120, "g"], carrot: [60, "g"], broccoli: [90, "g"],
  corn: [150, "g"], sweet_potato: [130, "g"], spinach: [30, "g"], mushroom: [70, "g"],
  eggplant: [80, "g"], bell_pepper: [120, "g"], olives: [40, "g"],
  ground_beef: [100, "g"], lamb: [100, "g"], chicken_thigh: [110, "g"], chicken_nuggets: [96, "g"],
  bacon: [16, "g"], sausage: [75, "g"], cod: [180, "g"], sardines: [90, "g"], crab: [100, "g"],
  beans: [180, "g"], foul: [250, "g"], edamame: [155, "g"],
  cottage_cheese: [225, "g"], feta: [50, "g"], mozzarella: [50, "g"], butter: [14, "g"],
  yogurt_plain: [245, "g"], omelette: [120, "g"],
  brown_rice: [200, "g"], quinoa: [185, "g"], bulgur: [140, "g"], couscous: [160, "g"],
  croissant: [60, "g"], bagel: [95, "g"], pancakes: [225, "g"], waffle: [75, "g"],
  tortilla: [50, "g"], manakish: [120, "g"],
  tabbouleh: [150, "g"], warak_enab: [180, "g"], molokhia: [350, "g"], kabsa: [450, "g"],
  koshari: [400, "g"], shakshuka: [300, "g"], fatteh: [350, "g"], kibbeh: [120, "g"],
  sambousek: [90, "g"], musakhan: [250, "g"], grape_leaves: [300, "g"],
  hotdog: [100, "g"], taco: [100, "g"], burrito: [330, "g"], onion_rings: [110, "g"],
  cheeseburger: [280, "g"], donut: [60, "g"], popcorn: [30, "g"], pretzel: [95, "g"],
  cake: [110, "g"], cookie: [35, "g"], muffin: [113, "g"], brownie: [60, "g"],
  pudding: [200, "g"], honey: [21, "g"], jam: [20, "g"], granola: [60, "g"],
  trail_mix: [30, "g"], walnuts: [30, "g"], cashews: [30, "g"], pistachios: [30, "g"], raisins: [30, "g"],
  smoothie: [250, "ml"], energy_drink: [250, "ml"], cappuccino: [180, "ml"], arabic_coffee: [60, "ml"],
  hot_chocolate: [250, "ml"], milkshake: [300, "ml"], ayran: [250, "ml"], lemonade: [250, "ml"],
  olive_oil: [14, "g"], ketchup: [15, "g"], mayo: [14, "g"], tahini: [15, "g"], sugar: [4, "g"],
};
/* Online (Open Food Facts) foods are registered at runtime: their
   per-serving base weight lives in OFF_BASE and the food objects in
   offFoods, so search/pick/scale all work the same as built-ins. */
let offFoods = [];         // OFF-derived foods seen this session
const OFF_BASE = {};       // key -> [amount, unit]
function foodBase(key) { return FOOD_BASE[key] || OFF_BASE[key] || [250, "g"]; }
function allFoods() { return offFoods.length ? FOODS.concat(offFoods) : FOODS; }
function findFood(key) { return allFoods().find(x => x.key === key) || null; }
const fmtAmt = (n) => Number(n.toFixed(2));

/* ---------- Open Food Facts (free, no API key) ---------- */
const OFF_ORIGIN = "https://world.openfoodfacts.org";
/* Map one OFF product to our food shape (nutrition is per 100 g). */
function offToFood(p) {
  if (!p || !p.nutriments) return null;
  const n = p.nutriments;
  let kcal = n["energy-kcal_100g"];
  if (kcal == null && n["energy_100g"] != null) kcal = n["energy_100g"] / 4.184; // kJ → kcal
  kcal = Math.round(kcal || 0);
  if (!kcal) return null; // skip products with no usable energy value
  const nm = [p.product_name, p.brands ? p.brands.split(",")[0] : ""].filter(Boolean).join(" · ").slice(0, 64) || "Food";
  const key = "off_" + (p.code || nm);
  const food = {
    key, emoji: "🍽️", off: true,
    name: { en: nm, ar: nm },
    serving: { en: t("ctPer100"), ar: t("ctPer100") },
    kcal, p: Math.round(n.proteins_100g || 0), c: Math.round(n.carbohydrates_100g || 0), f: Math.round(n.fat_100g || 0),
  };
  OFF_BASE[key] = [100, "g"];
  if (!offFoods.some(x => x.key === key)) offFoods.push(food);
  return food;
}
async function offSearch(query) {
  const q = String(query || "").trim();
  if (q.length < 3) return [];
  const url = OFF_ORIGIN + "/cgi/search.pl?search_terms=" + encodeURIComponent(q) +
    "&search_simple=1&action=process&json=1&page_size=20&fields=code,product_name,brands,nutriments";
  const r = await fetch(url, { headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error("off");
  const data = await r.json();
  return (data.products || []).map(offToFood).filter(Boolean);
}
async function offByBarcode(code) {
  const c = String(code || "").replace(/\D/g, "");
  if (!c) return null;
  const cached = barcodeCacheGet(c);     // user-added / previously-scanned products
  if (cached) { OFF_BASE[cached.key] = [cached.base || 100, cached.baseUnit || "g"]; if (!offFoods.some(x => x.key === cached.key)) offFoods.push(cached); return cached; }
  try {
    const r = await fetch(OFF_ORIGIN + "/api/v0/product/" + c + ".json", { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const data = await r.json();
    return data.status === 1 ? offToFood(data.product) : null;
  } catch (e) { return null; }
}

/* ---------- local barcode memory ----------
   Any barcode the user adds by hand (because it isn't in Open Food
   Facts) is remembered here, so scanning it again auto-fills. Shared
   across the account on this device. */
const BARCODE_STORE = "gym_barcodes";
function barcodeCacheAll() { try { return JSON.parse(localStorage.getItem(BARCODE_STORE) || "{}") || {}; } catch (e) { return {}; } }
function barcodeCacheGet(code) { const f = barcodeCacheAll()[String(code)]; return f || null; }
function barcodeCacheSet(code, food) {
  const all = barcodeCacheAll(); all[String(code)] = food;
  try { localStorage.setItem(BARCODE_STORE, JSON.stringify(all)); } catch (e) {}
}

/* ---------- transient scan state (not persisted) ---------- */
let nScan = { status: "idle", previewURL: null, base: null, amount: 0, unit: "g", baseAmt: 250, baseUnit: "g" };
let nQuery = "";
function resetNutrition() { nScan = { status: "idle", previewURL: null, base: null, amount: 0, unit: "g", baseAmt: 250, baseUnit: "g" }; nQuery = ""; nOffResults = []; nOffStatus = "idle"; nNewBarcode = null; }
function setScanFood(base, previewURL) {
  const [amt, unit] = foodBase(base.key);
  nScan = { status: "result", previewURL: previewURL || null, base, amount: amt, unit, baseAmt: amt, baseUnit: unit };
}
function scanMult() {
  const want = (nScan.amount || 0) * UNITS[nScan.unit];
  const base = nScan.baseAmt * UNITS[nScan.baseUnit];
  return base > 0 ? want / base : 0;
}

/* ---------- helpers ---------- */
function todayKey(d = new Date()) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function foodTargets(u) {
  if (u && u.intake && typeof calcPlan === "function") {
    const p = calcPlan(u);
    return { cals: p.cals, protein: p.protein, carbs: p.carbs, fat: p.fat };
  }
  return null;
}
function toBase(food) {
  return { key: food.key, emoji: food.emoji, name: food.name, serving: food.serving, kcal: food.kcal, p: food.p, c: food.c, f: food.f, confidence: null, source: "corrected" };
}
function scaled(base, portion) {
  return { kcal: Math.round(base.kcal * portion), p: Math.round(base.p * portion), c: Math.round(base.c * portion), f: Math.round(base.f * portion) };
}
function foodOptions(sel) {
  return allFoods().map(f => `<option value="${f.key}"${f.key === sel ? " selected" : ""}>${f.emoji} ${f.name[state.lang]}</option>`).join("");
}
let nOffResults = [];   // Open Food Facts matches for the current query
let nOffStatus = "idle"; // idle | loading | done | error
function foodCardHTML(f) {
  return `<button class="ct-food${f.off ? " off" : ""}" data-food-pick="${esc(f.key)}">
       <span class="fr-emo">${f.emoji}</span>
       <span class="ct-food-n">${esc(f.name[state.lang])}${f.off ? ` <small class="ct-off-tag">${t("ctPer100")}</small>` : ""}</span>
       <small>${f.kcal} ${t("kcal")}</small>
     </button>`;
}
function foodResultsHTML() {
  const q = nQuery.trim().toLowerCase();
  const qa = nQuery.trim();
  const list = FOODS.filter(f => !q || f.name.en.toLowerCase().includes(q) || (f.name.ar || "").includes(qa));
  const localHTML = list.length ? list.map(foodCardHTML).join("") : "";
  let onlineHTML = "";
  if (q.length >= 3) {
    if (nOffStatus === "loading") onlineHTML = `<div class="note ct-off-head">🌐 ${t("ctSearching")}</div>`;
    else if (nOffStatus === "done" && nOffResults.length) {
      onlineHTML = `<div class="note ct-off-head">🌐 ${t("ctOnline")}</div>` + nOffResults.map(foodCardHTML).join("");
    }
  }
  if (!localHTML && !onlineHTML) {
    return nOffStatus === "loading" ? `<div class="note ct-off-head">🌐 ${t("ctSearching")}</div>` : `<div class="note">${t("ctNoMatch")}</div>`;
  }
  return localHTML + onlineHTML;
}

/* ---------- the "brain": real-AI-ready analyzer ---------- */
function fileToBase64(file) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(",")[1]); r.onerror = rej; r.readAsDataURL(file); });
}
function normalizeAI(d) {
  let it = d;
  if (Array.isArray(d.items) && d.items.length) {
    const sum = (k) => d.items.reduce((a, x) => a + (+x[k] || 0), 0);
    it = { name: d.items.map(x => x.name).filter(Boolean).join(", "), kcal: sum("kcal"), protein: sum("protein"), carbs: sum("carbs"), fat: sum("fat"), confidence: d.confidence };
  }
  if (it == null || it.kcal == null) return null;
  const nm = esc(it.name || "Meal");
  let conf = null;
  if (it.confidence != null) conf = it.confidence <= 1 ? Math.round(it.confidence * 100) : Math.round(it.confidence);
  return {
    key: null, emoji: "🍽️", name: { en: nm, ar: nm },
    serving: { en: it.serving || "AI estimate", ar: it.serving || "تقدير الذكاء الاصطناعي" },
    kcal: Math.round(it.kcal), p: Math.round(it.protein || 0), c: Math.round(it.carbs || 0), f: Math.round(it.fat || 0),
    confidence: conf, source: "ai",
  };
}
/* Returns a real AI result, or null when photo AI is unavailable.
   We deliberately do NOT fabricate a random "match" — a wrong guess
   (e.g. calling an energy drink "foul medames") is worse than telling
   the user to search or scan the barcode instead. */
async function analyzeFood(file) {
  const cfg = window.GYMORA_CONFIG || {};
  if (cfg.aiEndpoint) {
    try {
      const b64 = await fileToBase64(file);
      const r = await fetch(cfg.aiEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image_base64: b64, mime: file.type }) });
      if (r.ok) { const nb = normalizeAI(await r.json()); if (nb) return nb; }
    } catch (e) { /* AI unavailable — return null below */ }
  }
  return null;
}

/* ---------- rendering ---------- */
function calRing(total, target) {
  const r = 34, C = 2 * Math.PI * r;
  const pct = target ? Math.min(1, total / target) : 0;
  const off = C * (1 - pct);
  const over = target && total > target;
  const col = over ? "#ef4444" : "var(--accent)";
  const sub = target ? `<tspan x="44" dy="15" class="ct-ringsub">/ ${target}</tspan>` : "";
  return `<svg class="ct-ring" viewBox="0 0 88 88" width="88" height="88">
    <circle cx="44" cy="44" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="9"/>
    <circle cx="44" cy="44" r="${r}" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round"
      stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 44 44)"/>
    <text x="44" y="40" text-anchor="middle" class="ct-ringnum">${total}${sub}</text>
  </svg>`;
}
function macroBar(label, color, val, target) {
  const pct = target ? Math.min(100, Math.round((val / target) * 100)) : 0;
  return `<div class="mb">
    <div class="mb-top"><span>${label}</span><span>${val}${target ? ` / ${target}` : ""} g</span></div>
    <div class="mb-track"><span style="width:${pct}%;background:${color}"></span></div>
  </div>`;
}
function summaryHTML(tot, tg) {
  let cap;
  if (tg) {
    const rem = tg.cals - tot.kcal;
    cap = rem >= 0 ? `${rem} ${t("kcal")} ${t("ctRemaining")}` : `<span style="color:#ef4444">${-rem} ${t("kcal")} ${t("ctOver")}</span>`;
  } else cap = t("ctNoTarget");
  return `<div class="ct-summary">
    <div class="ct-ringwrap">${calRing(tot.kcal, tg ? tg.cals : null)}<div class="ct-ringcap">${cap}</div></div>
    <div class="ct-macros">
      ${macroBar(t("protein"), "#16a34a", tot.p, tg ? tg.protein : null)}
      ${macroBar(t("carbs"), "#f59e0b", tot.c, tg ? tg.carbs : null)}
      ${macroBar(t("fat"), "#8b5cf6", tot.f, tg ? tg.fat : null)}
    </div>
  </div>`;
}
function scannerHTML() {
  if (nScan.status === "analyzing") {
    return nScan.previewURL
      ? `<div class="section ct-scan">
      <div class="ct-preview"><img src="${nScan.previewURL}" alt="">
        <div class="ct-analyzing"><span class="ct-spin"></span>${t("ctAnalyzing")}</div></div>
    </div>`
      : `<div class="section ct-scan">
      <div class="ct-analyzing" style="position:static;justify-content:center;padding:24px"><span class="ct-spin"></span>${t("ctLooking")}</div>
    </div>`;
  }
  if (nScan.status === "result" && nScan.base) {
    const b = nScan.base, s = scaled(b, scanMult());
    const tag = b.source === "ai"
      ? `<span class="ct-conf ai">${t("ctAiNote")}</span>`
      : (b.confidence != null ? `<span class="ct-conf">${b.confidence}% ${t("ctConfidence")}</span>` : "");
    return `<div class="section ct-scan">
      <div class="ct-result">
        ${nScan.previewURL ? `<div class="ct-preview sm"><img src="${nScan.previewURL}" alt=""></div>` : ""}
        <div class="ct-rbody">
          <div class="ct-detected"><span class="fr-emo">${b.emoji}</span> <b>${b.name[state.lang]}</b> ${tag}</div>
          <div class="ct-serving">${b.serving[state.lang]}</div>
          <div class="ct-kcal"><span id="ctKcalVal">${s.kcal}</span> ${t("kcal")}</div>
          <div class="ct-macmini" id="ctMacMini">${t("protein")} ${s.p}g · ${t("carbs")} ${s.c}g · ${t("fat")} ${s.f}g</div>
          <div class="ct-portion">
            <span class="ct-plabel">${t("ctAmount")}</span>
            <input id="ctAmount" class="control ct-amt" type="number" min="0" step="any" value="${fmtAmt(nScan.amount)}">
            <select class="control" data-food="unit">${Object.keys(UNITS).map(u => `<option value="${u}"${nScan.unit === u ? " selected" : ""}>${u}</option>`).join("")}</select>
            <small class="ct-basehint">${b.serving[state.lang]} ≈ ${nScan.baseAmt} ${nScan.baseUnit}</small>
          </div>
          <div class="ct-correct"><label>${t("ctNotRight")}</label><select data-food="pick">${foodOptions(b.key)}</select></div>
          <div class="ct-actions">
            <button class="btn" id="foodAdd">${t("ctAddDay")}</button>
            <button class="btn ghost" id="foodDiscard">${t("ctDiscard")}</button>
          </div>
        </div>
      </div>
    </div>`;
  }
  if (nScan.status === "newproduct") {
    return `<div class="section ct-scan">
      <div class="ct-detected">🆕 <b>${t("npTitle")}</b></div>
      <div class="note" style="margin:4px 0 10px">${t("npSub")}</div>
      ${nNewBarcode ? `<div class="kv"><span>${t("npBarcode")}</span><span><b>${esc(nNewBarcode)}</b></span></div>` : ""}
      <div class="pm-pay-form" style="margin-top:10px">
        <input class="ob-input" id="npName" placeholder="${t("npName")}">
        <input class="ob-input" id="npKcal" inputmode="numeric" placeholder="${t("npKcal")}">
        <div class="pm-pay-row" style="grid-template-columns:1fr 1fr 1fr">
          <input class="ob-input" id="npP" inputmode="numeric" placeholder="${t("protein")} (g)">
          <input class="ob-input" id="npC" inputmode="numeric" placeholder="${t("carbs")} (g)">
          <input class="ob-input" id="npF" inputmode="numeric" placeholder="${t("fat")} (g)">
        </div>
      </div>
      <div class="form-err" id="npErr" style="position:static;display:none;margin:8px 0 0"></div>
      <button class="btn block" id="npSave" style="margin-top:12px">${t("npSave")}</button>
      <button class="btn ghost block" id="npCancel" style="margin-top:8px">${t("ctDiscard")}</button>
    </div>`;
  }
  if (nScan.status === "failed") {
    return `<div class="section ct-scan">
      ${nScan.previewURL ? `<div class="ct-preview sm"><img src="${nScan.previewURL}" alt=""></div>` : ""}
      <div class="ct-detected">⚠️ <b>${t("ctFailedTitle")}</b></div>
      <div class="note" style="margin:4px 0 10px">${t("ctFailedBody")}</div>
      <input id="ctSearch" class="ct-searchbox" data-food="search" type="text" placeholder="${esc(t("ctSearchPh"))}" value="${esc(nQuery)}">
      <button class="ct-photobtn" id="ctBarcode" type="button" style="margin:8px 0 0">📷 ${t("ctScanBarcode")}</button>
      <div id="ctFoodResults" class="ct-foods">${foodResultsHTML()}</div>
      <label class="ct-photobtn" for="foodPhotoInput">🔁 ${t("ctTryAgain")}</label>
      <input id="foodPhotoInput" type="file" accept="image/*" capture="environment" data-food="photo" hidden>
    </div>`;
  }
  // idle: pick-what-you-ate first, photo optional
  return `<div class="section ct-scan">
    <h4>🍽️ ${t("ctPickTitle")}</h4>
    <input id="ctSearch" class="ct-searchbox" data-food="search" type="text" placeholder="${esc(t("ctSearchPh"))}" value="${esc(nQuery)}">
    <button class="ct-photobtn" id="ctBarcode" type="button" style="margin:8px 0 0">📷 ${t("ctScanBarcode")}</button>
    <div id="ctFoodResults" class="ct-foods">${foodResultsHTML()}</div>
    <label class="ct-photobtn" for="foodPhotoInput">${t("ctByPhoto")}</label>
    <input id="foodPhotoInput" type="file" accept="image/*" capture="environment" data-food="photo" hidden>
    <div class="note" style="text-align:center;opacity:.75">🌐 ${t("ctOffCredit")}</div>
  </div>`;
}
function todayListHTML(today, tot) {
  if (!today.length) return `<div class="section"><h4>🗓️ ${t("ctToday")}</h4><div class="note">${t("ctEmptyDay")}</div></div>`;
  return `<div class="section"><h4>🗓️ ${t("ctToday")}</h4>
    ${today.map(x => `<div class="food-row">
      <div class="fr-l"><span class="fr-emo">${x.emoji}</span>
        <div><div class="fr-name">${x.name[state.lang]}${x.amountLabel ? ` <small>${x.amountLabel}</small>` : (x.portion !== 1 ? ` <small>×${x.portion}</small>` : "")}</div>
          <div class="fr-mac">${t("protein")} ${x.p} · ${t("carbs")} ${x.c} · ${t("fat")} ${x.f} g</div></div></div>
      <div class="fr-r"><b>${x.kcal}</b> <small>${t("kcal")}</small>
        <button class="auth-link fr-del" data-delfood="${x.id}" aria-label="remove">✕</button></div>
    </div>`).join("")}
    <div class="food-row total"><div class="fr-l"><b>${t("ctTotals")}</b></div>
      <div class="fr-r"><b>${tot.kcal}</b> <small>${t("kcal")}</small></div></div>
  </div>`;
}
function histDate(k) {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(state.lang === "ar" ? "ar-JO" : "en-US", { weekday: "short", day: "numeric", month: "short" });
}
function historyHTML(log) {
  const tk = todayKey();
  const days = Object.keys(log).filter(k => k !== tk && log[k] && log[k].length).sort().reverse().slice(0, 7);
  if (!days.length) return "";
  return `<div class="section"><h4>📆 ${t("ctHistory")}</h4>
    ${days.map(k => { const kc = log[k].reduce((a, x) => a + x.kcal, 0); return `<div class="kv"><span>${histDate(k)}</span><span><b>${kc}</b> ${t("kcal")} · ${log[k].length}</span></div>`; }).join("")}
  </div>`;
}
function secNutrition(u) {
  const tg = foodTargets(u);
  const log = u.food || {};
  const today = log[todayKey()] || [];
  const tot = today.reduce((a, x) => ({ kcal: a.kcal + x.kcal, p: a.p + x.p, c: a.c + x.c, f: a.f + x.f }), { kcal: 0, p: 0, c: 0, f: 0 });
  return `
  <h3>📷 ${t("calorieTracker")}</h3>
  <div class="h-sub">${t("ctSub")}</div>
  ${summaryHTML(tot, tg)}
  ${scannerHTML()}
  ${todayListHTML(today, tot)}
  ${historyHTML(log)}
  <div class="note">${t("ctDemoNote") || ""}</div>`;
}

/* ---------- actions ---------- */
function foodAdd() {
  const u = currentUser(); if (!u || !nScan.base) return;
  const mult = scanMult();
  if (mult <= 0) return;
  const b = nScan.base, s = scaled(b, mult);
  const log = { ...(u.food || {}) }, k = todayKey();
  const list = (log[k] || []).slice();
  list.push({ id: "f" + Date.now() + Math.floor(Math.random() * 1000), emoji: b.emoji, name: b.name,
    portion: fmtAmt(mult), amountLabel: `${fmtAmt(nScan.amount)} ${nScan.unit}`,
    kcal: s.kcal, p: s.p, c: s.c, f: s.f, source: b.source, ts: Date.now() });
  log[k] = list; updateUser({ food: log });
  resetNutrition(); reRenderSection(); toast(t("ctAdded"));
}
function foodRemove(id) {
  const u = currentUser(); if (!u) return;
  const log = { ...(u.food || {}) }, k = todayKey();
  log[k] = (log[k] || []).filter(x => x.id !== id);
  updateUser({ food: log }); reRenderSection(); toast(t("ctRemoved"));
}

/* ---------- hooks called by auth.js ---------- */
function handleFoodClick(e) {
  const hit = (s) => e.target.closest(s);
  const pick = hit("[data-food-pick]");
  if (pick) {
    const food = findFood(pick.dataset.foodPick);
    if (food) { setScanFood(toBase(food)); reRenderSection(); }
    return true;
  }
  if (hit("#ctBarcode")) { startBarcodeScan(); return true; }
  if (hit("#npSave")) { saveNewProduct(); return true; }
  if (hit("#npCancel")) { nNewBarcode = null; resetNutrition(); reRenderSection(); return true; }
  if (hit("#foodAdd")) { foodAdd(); return true; }
  if (hit("#foodDiscard")) { resetNutrition(); reRenderSection(); return true; }
  const df = hit("[data-delfood]"); if (df) { foodRemove(df.dataset.delfood); return true; }
  return false;
}
function handleFoodChange(e) {
  const el = e.target;
  if (el.dataset.food === "photo") {
    const file = el.files && el.files[0];
    if (!file) return true;
    const reader = new FileReader();
    reader.onload = () => {
      nScan = { status: "analyzing", previewURL: reader.result, base: null, amount: 0, unit: "g", baseAmt: 250, baseUnit: "g" };
      reRenderSection();
      analyzeFood(file)
        .then(base => {
          if (base) { setScanFood(base, reader.result); }
          else { nScan = { status: "failed", previewURL: reader.result, base: null, amount: 0, unit: "g", baseAmt: 250, baseUnit: "g" }; }
          reRenderSection();
        })
        .catch(() => { nScan = { status: "failed", previewURL: reader.result, base: null, amount: 0, unit: "g", baseAmt: 250, baseUnit: "g" }; reRenderSection(); });
    };
    reader.readAsDataURL(file);
    return true;
  }
  if (el.dataset.food === "pick") {
    const food = findFood(el.value);
    if (food) { setScanFood(toBase(food), nScan.previewURL); reRenderSection(); }
    return true;
  }
  if (el.dataset.food === "unit") {
    // keep the same physical quantity, expressed in the new unit
    const canonical = (nScan.amount || 0) * UNITS[nScan.unit];
    nScan.unit = el.value;
    nScan.amount = fmtAmt(canonical / UNITS[nScan.unit]);
    reRenderSection();
    return true;
  }
  return false;
}

/* ---------- live food search (input event, focus-preserving) ----------
   Attached to both hosts that can render the tracker: the account
   drawer (#authModal) and the home-screen page (#featureView). */
document.addEventListener("DOMContentLoaded", () => {
  ["authModal", "featureView"].forEach(id => {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.addEventListener("input", (e) => {
    if (e.target && e.target.id === "ctSearch") {
      nQuery = e.target.value;
      const box = document.getElementById("ctFoodResults");
      if (box) box.innerHTML = foodResultsHTML();
      queueOffSearch(nQuery);
    }
    if (e.target && e.target.id === "ctAmount" && nScan.base) {
      nScan.amount = parseFloat(e.target.value) || 0;
      const s = scaled(nScan.base, scanMult());
      const kcalEl = document.getElementById("ctKcalVal");
      const macEl = document.getElementById("ctMacMini");
      if (kcalEl) kcalEl.textContent = s.kcal;
      if (macEl) macEl.textContent = `${t("protein")} ${s.p}g · ${t("carbs")} ${s.c}g · ${t("fat")} ${s.f}g`;
    }
  });
  });
});

/* only the results box is refreshed so the search input keeps focus */
function refreshFoodResults() {
  const box = document.getElementById("ctFoodResults");
  if (box) box.innerHTML = foodResultsHTML();
}

/* ---------- debounced Open Food Facts search ---------- */
let offTimer = null, offSeq = 0;
function queueOffSearch(query) {
  const q = String(query || "").trim();
  clearTimeout(offTimer);
  if (q.length < 3) { nOffStatus = "idle"; nOffResults = []; return; }
  nOffStatus = "loading"; refreshFoodResults();
  const seq = ++offSeq;
  offTimer = setTimeout(async () => {
    try {
      const res = await offSearch(q);
      if (seq !== offSeq) return;         // a newer query superseded this one
      nOffResults = res; nOffStatus = "done";
    } catch (e) {
      if (seq !== offSeq) return;
      nOffResults = []; nOffStatus = "error";
    }
    refreshFoodResults();
  }, 450);
}

/* ---------- barcode scanning ---------- */
let nNewBarcode = null; // barcode being added by hand (not found online)
async function lookupBarcode(code) {
  const c = String(code || "").replace(/\D/g, "");
  nScan = { status: "analyzing", previewURL: null, base: null, amount: 0, unit: "g", baseAmt: 100, baseUnit: "g" };
  reRenderSection();
  let food = null;
  try { food = await offByBarcode(c); } catch (e) { food = null; }
  if (food) { setScanFood(toBase(food)); reRenderSection(); }
  else {
    // not in the database — let the user add it once; we'll remember it
    nNewBarcode = c;
    nScan = { status: "newproduct", previewURL: null, base: null, amount: 0, unit: "g", baseAmt: 100, baseUnit: "g" };
    reRenderSection();
  }
}
/* Save a user-entered product for its barcode, then log it. */
function saveNewProduct() {
  const nm = (document.getElementById("npName")?.value || "").trim();
  const kcal = parseFloat(document.getElementById("npKcal")?.value || "");
  if (!nm || !(kcal >= 0)) { const e = document.getElementById("npErr"); if (e) { e.textContent = t("ctPayErrName"); e.style.display = "block"; } return; }
  const p = parseFloat(document.getElementById("npP")?.value || "") || 0;
  const c = parseFloat(document.getElementById("npC")?.value || "") || 0;
  const f = parseFloat(document.getElementById("npF")?.value || "") || 0;
  const key = "off_" + (nNewBarcode || Date.now());
  const food = { key, emoji: "🍽️", off: true, base: 100, baseUnit: "g",
    name: { en: nm, ar: nm }, serving: { en: t("ctPer100"), ar: t("ctPer100") },
    kcal: Math.round(kcal), p: Math.round(p), c: Math.round(c), f: Math.round(f) };
  OFF_BASE[key] = [100, "g"];
  if (!offFoods.some(x => x.key === key)) offFoods.push(food);
  if (nNewBarcode) barcodeCacheSet(nNewBarcode, food); // remembered for next scan
  nNewBarcode = null;
  setScanFood(toBase(food));
  reRenderSection();
  toast(t("ctSaved"));
}
function barcodeManual() {
  const code = window.prompt(t("ctBarcodePrompt"));
  if (code && String(code).replace(/\D/g, "")) lookupBarcode(code);
}
/* Real camera scanner via html5-qrcode (works on iOS Safari, Android,
   desktop). Falls back to manual entry only if the library or camera
   is unavailable. */
async function startBarcodeScan() {
  const H5 = window.Html5Qrcode;
  if (!H5 || !(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    return barcodeManual();
  }
  const back = document.createElement("div");
  back.id = "bcBack"; back.className = "vid-back open";
  back.innerHTML = `<div class="vid-modal bc-modal">
      <button class="auth-x" id="bcX">✕</button>
      <div class="vid-title">📷 ${t("ctScanBarcode")}</div>
      <div id="bcReader" class="bc-frame"></div>
      <button class="btn ghost block" id="bcManual" style="margin-top:10px">⌨️ ${t("ctBarcodePrompt")}</button>
    </div>`;
  document.body.appendChild(back);

  const fmts = window.Html5QrcodeSupportedFormats;
  const formats = fmts ? [
    fmts.EAN_13, fmts.EAN_8, fmts.UPC_A, fmts.UPC_E, fmts.UPC_EAN_EXTENSION,
    fmts.CODE_128, fmts.CODE_39, fmts.CODE_93, fmts.ITF, fmts.QR_CODE,
  ].filter(v => v !== undefined) : undefined;

  const scanner = new H5("bcReader", formats ? { formatsToSupport: formats, verbose: false } : { verbose: false });
  let done = false;
  const stop = () => {
    try {
      if (scanner.isScanning) scanner.stop().then(() => scanner.clear()).catch(() => {});
      else scanner.clear();
    } catch (e) {}
    back.remove();
  };
  back.addEventListener("click", (e) => {
    if (e.target.id === "bcBack" || e.target.closest("#bcX")) { done = true; stop(); }
    if (e.target.closest("#bcManual")) { done = true; stop(); barcodeManual(); }
  });

  const onHit = (text) => {
    if (done) return;
    done = true;
    if (navigator.vibrate) { try { navigator.vibrate(60); } catch (e) {} }
    stop(); lookupBarcode(text);
  };
  try {
    await scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: (w, h) => { const m = Math.min(w, h); return { width: Math.round(m * 0.8), height: Math.round(m * 0.55) }; } },
      onHit,
      () => {} // per-frame "not found" — ignored
    );
  } catch (e) {
    if (!done) { stop(); toast(t("ctCamDenied")); barcodeManual(); }
  }
}
