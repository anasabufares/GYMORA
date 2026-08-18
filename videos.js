/* =============================================================
   GYMORA — exercise form-guide videos
   Every exercise in the plan, workout tracker and rank gets a
   ▶ button that opens a how-to video (YouTube embed) in a
   modal. Video IDs were hand-verified; the modal always offers
   a "Watch on YouTube" fallback link in case an embed is
   blocked or the app is offline.
   Relies on globals: t, I18N, esc.
   ============================================================= */

const VID_I18N = {
  en: {
    vidGuide: "Form guide", vidWatchYT: "Watch on YouTube",
    vidLockTitle: "Premium video 🔒",
    vidLockBody: "Free members get a few sample form-guide videos. Subscribe to unlock the full video library for every exercise.",
    vidLockCta: "See subscription plans ⭐",
    vidFreeNote: "Free preview",
    vidUnlock: "Subscribe to unlock",
  },
  ar: {
    vidGuide: "شرح الأداء الصحيح", vidWatchYT: "شاهد على يوتيوب",
    vidLockTitle: "فيديو بريميوم 🔒",
    vidLockBody: "يحصل الأعضاء المجانيون على عدد محدود من فيديوهات الشرح. اشترك لفتح مكتبة الفيديو الكاملة لكل تمرين.",
    vidLockCta: "اعرض خطط الاشتراك ⭐",
    vidFreeNote: "معاينة مجانية",
    vidUnlock: "اشترك لفتح الفيديو",
  },
};
Object.assign(I18N.en, VID_I18N.en);
Object.assign(I18N.ar, VID_I18N.ar);

/* ---------- free vs premium gating ----------
   Free members can watch a small set of sample form-guide videos.
   Every other exercise video is a Premium feature. Playback is gated
   centrally in the delegated click handler below, so it covers the
   ▶ buttons everywhere (plan, workout tracker, rank, exercise library). */
/* Exactly 5 free exercises (some list variant spellings of the same lift).
   Everything else is a Premium video. */
const FREE_EXERCISE_VIDEOS = new Set([
  "bench press",
  "squats", "squat",
  "deadlift",
  "shoulder press", "overhead press", "dumbbell shoulder press",
  "pull-ups / lat pulldown", "lat pulldown",
]);
function exIsFreeVideo(en) {
  return FREE_EXERCISE_VIDEOS.has(String(en || "").toLowerCase().trim());
}
/* true when this exercise's video may be played by the current user */
function videoUnlocked(en) {
  const premium = typeof premiumActive === "function" && typeof currentUser === "function"
    && premiumActive(currentUser());
  return premium || exIsFreeVideo(en);
}

/* ---------- self-hosted (in-app) videos ----------
   A file listed in EXVIDS_LOCAL (see exvideos-local.js) plays as a
   real in-app <video>, no YouTube. Takes priority over EXVIDS. */
function resolveVideoUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const base = window.GYMORA_VIDEO_BASE || "";
  return base ? base.replace(/\/?$/, "/") + path.replace(/^\//, "") : path;
}
function exLocalVid(en) {
  const map = window.EXVIDS_LOCAL || {};
  return resolveVideoUrl(map[String(en || "").toLowerCase().trim()]);
}

/* exercise (english name, lowercase) -> verified YouTube video id.
   3D anatomy-animation style (Muscle & Motion, DEMIC and similar):
   animated model performing the lift with the working muscles
   highlighted. */
const EXVIDS = {
  "bench press": "IqvIZ89KYc4",
  "incline dumbbell press": "9IrOq4WapSQ",
  "shoulder press": "NUuBEo1Hxg8",
  "lateral raises": "WtP691z7Wz8",
  "triceps pushdown": "6C_wQremOp0",
  "deadlift": "o5FvhPAZ_yw",
  "pull-ups / lat pulldown": "YB-Zv6zfQ_A",
  "barbell row": "oM5d6Z4UyL0",
  "face pulls": "-KYuVuQVbgs",
  "biceps curls": "62VfgUaC9-4",
  "squats": "H5VYU6t_w9o",
  "romanian deadlift": "Rg27bvMeTKA",
  "leg press": "QDnCR1eOOPw",
  "leg curls": "w2NxVFKlVj8",
  "calf raises": "lJ_VgvuLlS4",
  "walking lunges": "mi4feuUCU-I",
  "leg extension": "hnLIZ5LK0y8",
  "biceps + triceps superset": "3v4Zc7iujIk",
  "plank": "U7pOJ9M02pg",
  "incline press": "9IrOq4WapSQ",
  "lat pulldown": "lvtheBn9BHA",
  "hanging leg raises": "Wm_3j_9K0vc",
  "incline treadmill walk": "HwXYMPGjlUg",
  "hiit intervals": "HiItpMgzFXQ",
  "cycling": "CTLsy0dzL_8",
  "crunches": "5FENL93dVTw",
  "hip thrusts": "-fwJUbfvrhg",
  "bulgarian split squats": "ibWJx95xo7M",
  "cable kickbacks": "T_8GMhvYRIs",
  "hamstring curls": "4YgxpH2eVec",
  "goblet squats": "qNJdlbTBTLY",
  "seated cable row": "M0sBtlDSii8",
  "dumbbell shoulder press": "NUuBEo1Hxg8",
  "chest press machine": "eG2jAPixOD4",
  "squat": "H5VYU6t_w9o",
  "hip thrust": "-fwJUbfvrhg",
  "overhead press": "NUuBEo1Hxg8",
  "barbell curl": "62VfgUaC9-4",
  "dumbbell bench (per hand)": "Gf65Yy0-wGI",
};

function exVidId(en) { return EXVIDS[String(en || "").toLowerCase().trim()] || null; }

/* small round ▶ button placed next to an exercise name.
   Prefers a self-hosted in-app video, falls back to the YouTube guide. */
function exVidBtn(en, label) {
  const local = exLocalVid(en);
  const attr = local
    ? `data-localvideo="${esc(local)}"`
    : (exVidId(en) ? `data-video="${exVidId(en)}"` : null);
  if (!attr) return "";
  const locked = !videoUnlocked(en);
  return `<button class="vid-btn${locked ? " locked" : ""}" ${attr} data-exn="${esc(en)}" data-vtitle="${esc(label || en)}" title="${locked ? t("vidLockTitle") : t("vidGuide")}" aria-label="${locked ? t("vidLockTitle") : t("vidGuide")}">${locked ? "🔒" : "▶"}</button>`;
}

/* ---------- modal player ---------- */
function vidContainer() {
  let el = document.getElementById("vidBack");
  if (!el) {
    el = document.createElement("div");
    el.id = "vidBack";
    el.className = "vid-back";
    document.body.appendChild(el);
    el.addEventListener("click", (e) => { if (e.target.id === "vidBack" || e.target.closest("#vidX")) closeVideo(); });
  }
  return el;
}
function openVideo(id, title) {
  const el = vidContainer();
  el.innerHTML = `
  <div class="vid-modal">
    <button class="auth-x" id="vidX">✕</button>
    <div class="vid-title">🎬 ${esc(title)} — ${t("vidGuide")}</div>
    <div class="vid-frame">
      <iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0"
        title="${esc(title)}" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
    <a class="btn ghost block" style="margin-top:12px;text-align:center" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">▶ ${t("vidWatchYT")}</a>
  </div>`;
  el.classList.add("open");
}
/* native in-app player for a self-hosted video file (no YouTube) */
function openLocalVideo(src, title) {
  const el = vidContainer();
  el.innerHTML = `
  <div class="vid-modal">
    <button class="auth-x" id="vidX">✕</button>
    <div class="vid-title">🎬 ${esc(title)} — ${t("vidGuide")}</div>
    <div class="vid-frame">
      <video src="${esc(src)}" controls autoplay loop playsinline muted
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000"></video>
    </div>
  </div>`;
  el.classList.add("open");
  const v = el.querySelector("video");
  if (v) v.play().catch(() => {});
}
function closeVideo() {
  const el = document.getElementById("vidBack");
  if (el) { el.classList.remove("open"); el.innerHTML = ""; } // clearing the media stops playback
}

/* paywall shown when a free member taps a Premium video */
function openVideoPaywall(title) {
  const el = vidContainer();
  el.innerHTML = `
  <div class="vid-modal vid-lock-modal">
    <button class="auth-x" id="vidX">✕</button>
    <div class="pm-lock">🔒</div>
    <div class="vid-title" style="text-align:center">${t("vidLockTitle")}</div>
    ${title ? `<div class="h-sub" style="text-align:center">${esc(title)}</div>` : ""}
    <div class="note" style="text-align:center;margin:10px 0 16px">${t("vidLockBody")}</div>
    <button class="btn block" id="vidSubscribe">${t("vidLockCta")}</button>
  </div>`;
  el.classList.add("open");
}

/* delegated: [data-localvideo] plays in-app; [data-video] uses YouTube.
   Both are gated — free members can only play sample exercises. */
document.addEventListener("click", (e) => {
  if (e.target.closest("#vidSubscribe")) {
    e.preventDefault();
    closeVideo();
    if (typeof pmOpenSubscription === "function") pmOpenSubscription();
    return;
  }
  const media = e.target.closest("[data-localvideo],[data-video]");
  if (!media) return;
  const exn = media.dataset.exn || media.dataset.vtitle || "";
  if (!videoUnlocked(exn)) { e.preventDefault(); openVideoPaywall(media.dataset.vtitle || ""); return; }
  const lv = e.target.closest("[data-localvideo]");
  if (lv) { e.preventDefault(); openLocalVideo(lv.dataset.localvideo, lv.dataset.vtitle || ""); return; }
  const b = e.target.closest("[data-video]");
  if (b) { e.preventDefault(); openVideo(b.dataset.video, b.dataset.vtitle || ""); }
});
document.addEventListener("keydown", (e) => {
  const el = document.getElementById("vidBack");
  if (e.key === "Escape" && el && el.classList.contains("open")) closeVideo();
});
