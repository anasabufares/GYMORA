/* =============================================================
   GYMORA — class booking
   A "Book" button on every class in a gym's schedule. Bookings
   are saved to the member's profile (so they sync to the cloud
   and follow them across devices) and listed in a "My Classes"
   menu section where they can be cancelled.
   Relies on globals: state, t, I18N, currentUser, updateUser,
   toast, esc, reRenderSection, renderDetail, requireAuth,
   GYMS, CLASS_SCHEDULE, fmtDate.
   ============================================================= */

const CLS_I18N = {
  en: {
    clsTab: "My classes",
    clsBook: "Book", clsBooked: "Booked ✓", clsCancel: "Cancel",
    clsBookedMsg: "Class booked 🎉 — see it in My classes",
    clsCancelMsg: "Booking cancelled",
    clsNone: "No classes booked yet. Open a gym's schedule and tap Book.",
    clsSub: "Your upcoming classes. Show this at reception to check in.",
    clsAt: "at", clsFindClasses: "Browse gyms with classes",
    clsSignIn: "Sign in to book classes.",
  },
  ar: {
    clsTab: "حصصي",
    clsBook: "احجز", clsBooked: "محجوز ✓", clsCancel: "إلغاء",
    clsBookedMsg: "تم حجز الحصة 🎉 — تجدها في حصصي",
    clsCancelMsg: "أُلغي الحجز",
    clsNone: "لا حصص محجوزة بعد. افتح جدول نادٍ واضغط احجز.",
    clsSub: "حصصك القادمة. أظهرها في الاستقبال لتسجيل الدخول.",
    clsAt: "في", clsFindClasses: "تصفّح الأندية التي تقدّم حصصاً",
    clsSignIn: "سجّل الدخول لحجز الحصص.",
  },
};
Object.assign(I18N.en, CLS_I18N.en);
Object.assign(I18N.ar, CLS_I18N.ar);

/* stable id for a class slot at a gym */
function classId(gymId, dayEn, time, nameEn) { return [gymId, dayEn, time, nameEn].join("|"); }
function getBookings(u) { return (u && Array.isArray(u.bookings)) ? u.bookings : []; }
function isBooked(gymId, dayEn, time, nameEn) {
  const u = currentUser(); if (!u) return false;
  const id = classId(gymId, dayEn, time, nameEn);
  return getBookings(u).some(b => b.id === id);
}

/* the ▸ book/booked button that sits next to a class in a gym schedule */
function classBookBtn(gym, day, item) {
  const booked = isBooked(gym.id, day.en, item.time, item.name.en);
  return `<button class="cls-book ${booked ? "on" : ""}"
    data-book="${esc(gym.id)}" data-bday="${esc(day.en)}" data-btime="${esc(item.time)}" data-bname="${esc(item.name.en)}">
    ${booked ? t("clsBooked") : "＋ " + t("clsBook")}</button>`;
}

function toggleBooking(gymId, dayEn, time, nameEn) {
  if (typeof requireAuth === "function" && !requireAuth()) return;
  const u = currentUser(); if (!u) { toast(t("clsSignIn")); return; }
  const gym = (typeof GYMS !== "undefined") ? GYMS.find(g => g.id === gymId) : null;
  const dayObj = (typeof CLASS_SCHEDULE !== "undefined") ? CLASS_SCHEDULE.find(d => d.day.en === dayEn) : null;
  const itemObj = dayObj ? dayObj.items.find(i => i.time === time && i.name.en === nameEn) : null;
  const id = classId(gymId, dayEn, time, nameEn);
  const list = getBookings(u).slice();
  const at = list.findIndex(b => b.id === id);
  if (at >= 0) {
    list.splice(at, 1);
    updateUser({ bookings: list });
    toast(t("clsCancelMsg"));
  } else {
    list.push({
      id, gymId,
      gymName: gym ? gym.name : { en: gymId, ar: gymId },
      day: dayObj ? dayObj.day : { en: dayEn, ar: dayEn },
      time,
      name: itemObj ? itemObj.name : { en: nameEn, ar: nameEn },
      bookedAt: Date.now(),
    });
    updateUser({ bookings: list });
    toast(t("clsBookedMsg"));
  }
}

/* ---------- "My classes" account section ---------- */
const CLS_DAY_ORDER = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
function secClasses(u) {
  const list = getBookings(u).slice().sort((a, b) =>
    (CLS_DAY_ORDER.indexOf(a.day.en) - CLS_DAY_ORDER.indexOf(b.day.en)) || a.time.localeCompare(b.time));
  const rows = list.length ? list.map(b => `
    <div class="cls-row">
      <div class="cls-when"><div class="cls-day">${b.day[state.lang]}</div><div class="cls-time">${esc(b.time)}</div></div>
      <div class="cls-info">
        <div class="cls-name">${esc(b.name[state.lang] || b.name.en)}</div>
        <div class="cls-gym">${esc(b.gymName[state.lang] || b.gymName.en)}</div>
      </div>
      <button class="btn ghost sm" data-cancelbook="${esc(b.id)}">${t("clsCancel")}</button>
    </div>`).join("") : `<div class="note">${t("clsNone")}</div>`;
  return `
  <h3>🗓️ ${t("clsTab")}</h3>
  <div class="h-sub">${t("clsSub")}</div>
  ${rows}`;
}

/* ---------- event routing ---------- */
/* Book buttons live in the gym DETAIL view (app.js body click). */
function handleClassBook(e) {
  const b = e.target.closest("[data-book]");
  if (!b) return false;
  e.stopPropagation();
  toggleBooking(b.dataset.book, b.dataset.bday, b.dataset.btime, b.dataset.bname);
  if (state.view === "detail" && state.currentGym && typeof renderDetail === "function") renderDetail(state.currentGym);
  return true;
}
/* Cancel buttons live inside the account drawer / My-classes section. */
function handleClassClick(e) {
  const c = e.target.closest("[data-cancelbook]");
  if (!c) return false;
  const id = c.dataset.cancelbook;
  const u = currentUser(); if (!u) return true;
  updateUser({ bookings: getBookings(u).filter(b => b.id !== id) });
  toast(t("clsCancelMsg"));
  reRenderSection();
  return true;
}
