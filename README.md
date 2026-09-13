# IGERI AI

**IGERI AI** is a child-safe, curriculum-aligned AI learning companion for Nigerian children aged 5–17. It pairs an age-gated chat companion ("Igeri") with a parent dashboard, built on the Nigerian NERDC curriculum, with English and Pidgin language support and a Nigerian cultural identity throughout.

> Built with React, TypeScript, Tailwind CSS, Firebase (Auth + Firestore), and a bold neo-brutalist design system.

---

## Table of Contents

- [What IGERI AI Does](#what-igeri-ai-does)
- [Features](#features)
- [Age Tiers](#age-tiers)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Data Model & Security Rules](#data-model--security-rules)
- [Design System](#design-system)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Firebase Setup](#firebase-setup)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Known Limitations & Roadmap](#known-limitations--roadmap)

---

## What IGERI AI Does

A parent creates an account, adds a child profile (name + age), and the app assigns an age tier that shapes the AI's tone, vocabulary, and guardrails. The child then chats with **Igeri**, an AI companion mascot, picking a subject (Maths, English, Basic Science, Civic Ed, or free-form "General Learning"). Every conversation is visible to the parent from their own dashboard — nothing is private from the account holder.

The product is built around one core promise: **Igeri helps kids think, it doesn't do their homework for them.**

## Features

### For Kids
- **Chat with Igeri** — a warm, encouraging AI companion with a distinct personality per age tier.
- **Subject picker** — jump straight into Maths, English, Basic Science, or Civic Ed, or just chat freely.
- **Anti-dependency guardrails** — when a message looks like a homework question (detected via keyword/pattern matching — see [`src/lib/ai-logic.ts`](src/lib/ai-logic.ts)), Igeri responds with a guiding question instead of a direct answer.
- **English & Pidgin** — toggle the conversation language at any time.
- **"Get a Hint" / "Try a Different Way"** quick-actions in the chat composer.
- **Colorful, non-photographic avatars** — every user (kids, testimonials, chat participants) gets a generated initial-bubble avatar instead of a real stranger's photo, which is a deliberate child-safety/privacy choice (see [`src/components/AvatarBubble.tsx`](src/components/AvatarBubble.tsx)).

### For Parents
- **Real accounts** — Firebase Authentication (email + password), not a fake local-only login.
- **Parent Dashboard** — time spent today, total chat sessions, safety flag count.
- **Learning Activity feed** — every chat session your child has, with subject and message count.
- **Guardrail Controls** — toggle Homework Mode, set a daily time limit (UI is in place; enforcement is a roadmap item — see [Known Limitations](#known-limitations--roadmap)).
- **Multi-device** — sign in from any device; your child's profiles and chat history sync via Firestore in real time.

### For Schools & Teachers
- **Teacher Console** — a class roster view with per-student activity, status, and AI-generated insight cards.
- **Bulk licensing / institutional pages** — marketing pages for school partnerships and pilot programs (FCT Abuja).

### Platform-wide
- **NERDC-aligned subject coverage** for Primary (P1–P6) and JSS (JSS1–JSS3).
- **Safety & compliance messaging** — NDPA 2023, parental OTP verification, data encryption, no third-party ad tracking.
- **A playful custom cursor** — a green arrow by default, a gold sparkle over anything clickable (pure CSS, no JS/images).

## Age Tiers

A child's age is mapped to one of three tiers (`getTier()` in [`src/lib/store.ts`](src/lib/store.ts)), which changes Igeri's vocabulary, tone, and the UI's mode styling:

| Tier | Ages | Persona |
|---|---|---|
| 🌱 Buba Mode | 5–8 | Simple language, heavy encouragement, playful tone |
| 📚 Kemi Mode | 9–13 | Curriculum-focused, structured guidance |
| 🚀 Chike Mode | 14–17 | Analytical, exam/career-oriented tone |

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript, built with Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 + a custom neo-brutalist design layer (`src/index.css`) |
| UI primitives | shadcn/ui (Radix UI under the hood) |
| Animation | Framer Motion |
| Client state | Zustand (thin reactive cache over Firebase — see below) |
| Auth | Firebase Authentication (email/password) |
| Database | Cloud Firestore (realtime listeners) |
| Icons | lucide-react |
| Toasts | Sonner |

## Architecture

```
 ┌─────────────┐      onAuthStateChanged       ┌──────────────────┐
 │  Firebase   │ ─────────────────────────────▶ │  useStore()       │
 │  Auth       │                                 │  (Zustand)        │
 └─────────────┘                                 │                    │
       ▲                                          │  user, profile,    │
       │ signUp() / signIn()                      │  profiles[],       │
       │                                          │  sessions[],       │
 ┌─────┴───────┐      onSnapshot (realtime)       │  language          │
 │  Onboarding │ ◀──────────────────────────────  │                    │
 │  / Pages    │                                  └─────────┬─────────┘
 └─────────────┘                                            │ addProfile()
                                                              │ addSession()
                                                              │ addMessage()
                                                              ▼
                                                     ┌──────────────────┐
                                                     │   Firestore       │
                                                     │   (per-user data) │
                                                     └──────────────────┘
```

**Why Zustand *and* Firestore?** The Zustand store ([`src/lib/store.ts`](src/lib/store.ts)) keeps the exact same public API pages already relied on (`user`, `profile`, `profiles`, `sessions`, `addProfile`, `addSession`, `addMessage`, `clearAll`, …), but every mutating action now writes straight to Firestore, and `initAuth()` (called once from `App.tsx`) wires up:
1. A Firebase Auth listener that populates `user` whenever someone signs in or out.
2. Realtime Firestore listeners (`onSnapshot`) on that user's `profiles` and `sessions` subcollections, so any write is reflected in the UI immediately — including from another tab or device.

This means individual page components never talk to Firebase directly; they just call store actions and read store state, same as before the migration.

**Boot sequence:** `App.tsx` renders a spinner until `authReady` is true (i.e. until Firebase has resolved whether a session is already persisted), then routes normally. Protected routes (`/dashboard`, `/chat`, `/parent`) redirect to `/onboarding` if there's no signed-in user or no selected child profile.

**Firebase not configured yet?** The app doesn't crash — `firebaseEnabled` (in [`src/lib/firebase.ts`](src/lib/firebase.ts)) is `false` until real project keys are present in `.env`, and Onboarding shows an inline "Firebase isn't connected yet" notice instead of silently failing.

## Data Model & Security Rules

Firestore documents live entirely under each parent's own Auth `uid` — there is no shared/global collection of user data:

```
users/{uid}                        — { id, name, email, role: 'parent' }
users/{uid}/profiles/{profileId}   — { id, name, age, tier, language, subjects[] }
users/{uid}/sessions/{sessionId}   — { id, profileId, messages[], startTime, endTime?, summary? }
```

Security rules ([`firestore.rules`](firestore.rules)) enforce that a document under `users/{uid}/...` can only be read or written by a signed-in user whose Auth `uid` matches that path segment — nobody, including another signed-in parent, can read or write someone else's data. This has been verified end-to-end against a live Firebase project (real signup → write own doc → read own doc → write rejected for a different uid → read rejected with no token).

**⚠️ The `firestore.rules` file must be deployed** (via the Firebase Console's Rules tab, or `firebase deploy --only firestore:rules` with the Firebase CLI) — having it in the repo doesn't automatically apply it to your live database.

## Design System

**Mascot assets:** `public/mascot.png` and `public/mascot-face.png` are cropped locally from the app's logo lockup (the wordmark removed). The original template shipped two image URLs literally named "igeri-mascot-pro" and "nigerian-support-mascot" that, on inspection, depicted an unrelated landscape photo and a stock photo of a human call-center agent respectively — neither was actually the Igeri character. `src/lib/assets.ts` now points `MASCOT_PRO`/`SUPPORT_MASCOT` at the local crops instead.

The UI uses a **neo-brutalist** design language: thick ink-colored borders, flat saturated colors, and hard "offset" shadows (no blur) instead of soft glassmorphism. Buttons are physically "pressable" — the shadow grows on hover and collapses to zero on click, so the button appears to shift into its own shadow.

Core building blocks (all in [`src/index.css`](src/index.css)):

| Class | Use |
|---|---|
| `.brut-card` / `.brut-card-sm` | White card with a 3px ink border and a hard offset shadow |
| `.kid-button` | Pressable button — pair with your own `bg-*`/`text-*` and `rounded-xl` |
| `.sticker-badge` | Small bold eyebrow/label pill (white bg, ink border) |
| `.deco-mark` | Scattered decorative circle/square accents |

Brand colors (defined as CSS custom properties in `:root`, exposed as Tailwind utilities):

- `nigerian-green` `#009654` — primary actions, trust
- `adire-gold` `#E8A711` — secondary accent
- `earth-brown` `#331D0A` — ink color for all borders/shadows/headings
- `sky-blue` `#2563EB` and `berry-pink` `#E11D74` — decorative accent variety
- `parchment` `#FFFBF2` — page background

Shared layout components ([`src/components/site/`](src/components/site)) — `Navbar`, `Footer`, `AnnouncementBar`, `IconBadgeCard` — are reused across all marketing pages so the header/footer/card style only needs to change in one place.

## Project Structure

```
src/
├── App.tsx                 # Routing + Firebase auth bootstrap
├── main.tsx                # Entry point
├── index.css                # Design tokens + neo-brutalist utility classes
├── lib/
│   ├── firebase.ts          # Firebase app/auth/db initialization (env-driven)
│   ├── store.ts              # Zustand store, backed by Firebase Auth + Firestore
│   ├── ai-logic.ts           # Mock AI response generator (keyword-based, age-tiered)
│   ├── assets.ts              # Centralized image asset URLs
│   ├── types.ts                # Shared TypeScript types (User, Profile, Session, Message)
│   └── utils.ts                 # `cn()` class-merging helper
├── components/
│   ├── AvatarBubble.tsx      # Generated colorful avatar (no stranger photos)
│   ├── site/                  # Shared marketing-page chrome (Navbar, Footer, …)
│   └── ui/                     # shadcn/ui primitives
└── pages/
    ├── LandingPage.tsx, About.tsx, HowItWorks.tsx, Curriculum.tsx,
    │   Safety.tsx, SafetyCenter.tsx, ParentsGuide.tsx, Schools.tsx,
    │   ForSchools.tsx, Contact.tsx                    # Public marketing pages
    ├── Onboarding.tsx                                 # Sign up / log in / create child profile
    ├── ChildDashboard.tsx, ChatInterface.tsx           # Child-facing app
    └── ParentDashboard.tsx, TeacherDashboard.tsx        # Parent/teacher-facing app
```

## Getting Started

```bash
git clone <this-repo>
cd igeri-learning
npm install
cp .env.example .env   # then fill in your Firebase config — see below
npm run dev
```

The app runs at `http://localhost:3000`.

## Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com) and create (or open) a project.
2. **Register a web app**: Project settings (⚙) → "Your apps" → the `</>` icon. Copy the `firebaseConfig` values into your `.env` (see `.env.example` for the exact variable names).
3. **Enable Authentication**: Build → Authentication → Get started → enable the **Email/Password** provider.
4. **Enable Firestore**: Build → Firestore Database → Create database → pick a region → start in production mode.
5. **Deploy the security rules**: Firestore Database → Rules tab → paste the contents of [`firestore.rules`](firestore.rules) → Publish. *(This step is easy to miss — without it, every read/write will be rejected with `PERMISSION_DENIED`, even for a user's own data.)*

Optionally add `VITE_FIREBASE_MEASUREMENT_ID` to enable Firebase Analytics (it's wrapped in `isSupported()` + try/catch so it never blocks app startup if unavailable).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Type-check (`tsc -b`) then production-build with Vite |
| `npm run typecheck` | Type-check only, no build output |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Deployment

The repo is configured for **Netlify** (deploy previews are already wired up via GitHub — see the `netlify[bot]` checks on pull requests). Set the same `VITE_FIREBASE_*` environment variables in your Netlify site settings that you used locally.

## Known Limitations & Roadmap

Documenting these honestly rather than overstating what's implemented:

- **AI responses are currently mocked.** [`src/lib/ai-logic.ts`](src/lib/ai-logic.ts) uses keyword/pattern matching against a fixed pool of age-tiered, bilingual responses — it is not yet calling a real language model. Marketing copy on the "How it Works" page describes the intended Claude API integration as the product vision.
- **Guardrail controls (Homework Mode toggle, daily time limit) are UI-only** — the parent dashboard renders them, but there's no backend enforcement yet.
- **The Teacher Console uses static demo data** and has no auth gate — unlike `/dashboard` and `/parent`, `/teacher` doesn't currently require sign-in. Anyone with the URL can view it.
- **No password reset flow yet** for parent accounts.
- **Contact form** shows a success toast but doesn't send anywhere yet (no backend endpoint or email service wired up).
