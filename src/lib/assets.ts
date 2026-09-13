// Central place for the handful of illustration/photo assets reused across
// pages, so we're not redefining the same long URLs in a dozen files.
const BASE = 'https://storage.googleapis.com/dala-prod-public-storage';

export const LOGO_URL = `${BASE}/attachments/78945f35-5d84-451e-a6ab-d03eb2edbe61/1779824627581_ChatGPT_Image_May_26__2026__08_43_18_PM.png`;

// The "igeri-mascot-pro" and "nigerian-support-mascot" assets from the
// original template turned out not to depict the Igeri character at all
// (a landscape photo and a stock photo of a human call-center agent,
// respectively) — mascot.png / mascot-face.png below are cropped locally
// from the one image that actually shows Igeri (LOGO_URL), with the
// wordmark removed, so a real mascot shows up everywhere one is used.
export const MASCOT_PRO = '/mascot.png';
export const SUPPORT_MASCOT = '/mascot-face.png';

export const HERO_KIDS = `${BASE}/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/joyful-nigerian-kids-hero-png-0fde037d-1779836834434.webp`;
export const SAFETY_CENTER_IMG = `${BASE}/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/children-safety-center-png-39acc2ea-1779836835745.webp`;
export const CURRICULUM_IMG = `${BASE}/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/nigerian-curriculum-visual-png-e7b28579-1779836835641.webp`;
export const SCHOOL_IMG = `${BASE}/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/modern-nigerian-school-png-b5b11cb2-1779836835736.webp`;
export const PARENTS_GUIDE_IMG = `${BASE}/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/nigerian-parents-guide-png-0c1f7abf-1779836835572.webp`;
export const SAFETY_HERO_IMG = `${BASE}/generated-images/51ea7ae6-efde-48bd-af24-5a0b35cb5bfb/digital-safety-shield-png-953902ca-1779836834991.webp`;
