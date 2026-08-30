export const APK_DOWNLOAD_URL = "/apk/PassVerse.apk";
export const DOWNLOAD_PAGE_URL = "/download";

/**
 * Where every "install / download the app" CTA should point.
 * PassVerse ships as a direct APK (not on Google Play yet), so send users to
 * the install guide — NOT a Play Store listing. Change this in one place if
 * the app is later published to Play.
 */
export const APP_INSTALL_URL = DOWNLOAD_PAGE_URL;

/** Support & community */
export const SUPPORT_EMAIL = "support@passverse.com.ng";
export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/CUAh29GLrOXHvUnp2vgc85";
// TODO: replace with a dedicated 1:1 support line if you get one. Until then,
// "support" points at the real community group instead of a dead wa.me number.
export const SUPPORT_WHATSAPP_URL = WHATSAPP_GROUP_URL;

/**
 * ── Canonical brand facts ─────────────────────────────────────────────────
 * Single source of truth. Every page should read these instead of hardcoding,
 * so numbers can never drift out of sync again.
 */
export const QUESTION_COUNT = 26675;
export const QUESTION_COUNT_DISPLAY = "26,675";
// NOTE: aligned to the hero's headline figure. Confirm your real active-user
// number and change it here once — it flows everywhere from this constant.
export const STUDENT_COUNT_DISPLAY = "10,000+";
export const ARCHIVE_RANGE = "2001–2025";
export const EXAM_LIST = "JAMB, WAEC, NECO, GCE and Post-UTME";
