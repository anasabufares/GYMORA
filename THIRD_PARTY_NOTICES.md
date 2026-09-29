# GYMORA — third-party components, services & licenses

This is the audit of every third-party SDK, service and asset the app uses,
what data (if any) it receives, and the license it is used under. Keep it
up to date whenever a dependency is added or removed.

_Last audited: 2026-09-29_

## Client-side (runs in the user's browser)

| Component | Where | Data it receives | Cookies / storage | License |
|---|---|---|---|---|
| **html5-qrcode** 2.3.8 (vendored, `vendor/html5-qrcode.min.js`) | Barcode scanner | Camera frames, processed **locally on the device** — nothing is sent anywhere | None | Apache-2.0 — see `vendor/html5-qrcode.LICENSE.txt` |
| **Barlow Condensed** font (bundled, `fonts/`) | Headings | None (served from our own site) | None | SIL Open Font License 1.1 — see `fonts/OFL.txt` |
| **YouTube (privacy-enhanced embeds, `youtube-nocookie.com`)** | Exercise form-guide videos | The video request (IP address, browser) — **only when the user taps ▶** | YouTube may store data in the browser once a video plays | YouTube Terms of Service (embedding) |
| **Open Food Facts** API (`world.openfoodfacts.org`) | Food search & barcode lookup | The search text or barcode typed/scanned — no account data | None | Database: ODbL 1.0 · contents: DbCL 1.0 · images: CC BY-SA — attribution shown in the app |
| **free-exercise-db** images & data (`raw.githubusercontent.com/yuhonas/free-exercise-db`) | Exercise library | The image request (IP address, browser) | None | Unlicense (public domain) |

No analytics, advertising, tracking pixels or third-party cookies are used.

## Server-side (our backend — users never talk to these directly)

| Service | Purpose | Data it receives |
|---|---|---|
| Hosting provider | Serves the site and API | Standard request logs (IP, browser) |
| Database provider | Stores accounts and app data | Account and fitness data |
| Email delivery provider | Sends verification emails | Recipient email address + the email body |
| AI vision provider | Food-photo recognition (only if the user uses photo scan) | The food photo, for that request only |
| Payment processor (when connected) | Takes payments | Payment details — never stored by GYMORA |

## Own assets

Logo, icons (`logo*.png`, `icon-*.png`) and UI emoji usage are GYMORA's own
or system emoji fonts. Exercise videos under `videos/` (if present) must be
owned or licensed by GYMORA before publishing.
