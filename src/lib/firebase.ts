import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { isSupported, getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// True once real keys have been dropped into .env — lets the app boot (and
// show a friendly "not connected yet" state) before that happens instead of
// crashing at import time.
export const firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

const app = firebaseEnabled ? (getApps()[0] ?? initializeApp(firebaseConfig)) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

// Analytics needs a real browser (no SSR/test env) and a reachable Google
// endpoint, so probe support first and never let it block app startup.
if (app && firebaseConfig.measurementId) {
  isSupported()
    .then((supported) => {
      if (supported) getAnalytics(app);
    })
    .catch(() => {});
}
