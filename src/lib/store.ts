import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile as updateAuthProfile,
} from 'firebase/auth';
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db, firebaseEnabled } from './firebase';
import { AgeTier, Message, Profile, Session, User } from './types';

interface AppState {
  authReady: boolean;
  user: User | null;
  profile: Profile | null;
  profiles: Profile[];
  sessions: Session[];
  language: 'English' | 'Pidgin';

  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  setProfile: (profile: Profile | null) => void;
  addProfile: (profile: Omit<Profile, 'id'>) => Promise<Profile>;
  setLanguage: (lang: 'English' | 'Pidgin') => void;
  addSession: (session: Session) => Promise<void>;
  addMessage: (sessionId: string, message: Message) => Promise<void>;
  clearAll: () => Promise<void>;
}

// Every parent's profiles/sessions are loaded via realtime Firestore
// listeners once they're signed in (see initAuth below). These handles let
// us tear the previous listeners down whenever the signed-in user changes.
let unsubProfiles: (() => void) | null = null;
let unsubSessions: (() => void) | null = null;

function requireFirebase(): void {
  if (!firebaseEnabled || !auth || !db) {
    throw new Error(
      "Firebase isn't connected yet. Add your project keys to .env (see .env.example) to enable accounts."
    );
  }
}

export const useStore = create<AppState>()((set, get) => ({
  authReady: false,
  user: null,
  profile: null,
  profiles: [],
  sessions: [],
  language: 'English',

  signUp: async (name, email, password) => {
    requireFirebase();
    const cred = await createUserWithEmailAndPassword(auth!, email, password);
    await updateAuthProfile(cred.user, { displayName: name });
    const userDoc: User = { id: cred.user.uid, name, email, role: 'parent' };
    await setDoc(doc(db!, 'users', cred.user.uid), userDoc);
    set({ user: userDoc });
  },

  signIn: async (email, password) => {
    requireFirebase();
    await signInWithEmailAndPassword(auth!, email, password);
    // user/profiles/sessions get populated by the onAuthStateChanged
    // listener started in initAuth() once the sign-in resolves.
  },

  setProfile: (profile) => set({ profile }),

  addProfile: async (profileInput) => {
    requireFirebase();
    const { user } = get();
    if (!user) throw new Error('Sign in first.');
    const ref = doc(collection(db!, 'users', user.id, 'profiles'));
    const profile: Profile = { ...profileInput, id: ref.id };
    await setDoc(ref, profile);
    set({ profile });
    return profile;
  },

  setLanguage: (lang) => set({ language: lang }),

  addSession: async (session) => {
    requireFirebase();
    const { user } = get();
    if (!user) throw new Error('Sign in first.');
    await setDoc(doc(db!, 'users', user.id, 'sessions', session.id), session);
  },

  addMessage: async (sessionId, message) => {
    requireFirebase();
    const { user } = get();
    if (!user) throw new Error('Sign in first.');
    await updateDoc(doc(db!, 'users', user.id, 'sessions', sessionId), {
      messages: arrayUnion(message),
    });
  },

  clearAll: async () => {
    unsubProfiles?.();
    unsubSessions?.();
    unsubProfiles = null;
    unsubSessions = null;
    if (firebaseEnabled && auth) await signOut(auth);
    set({ user: null, profile: null, profiles: [], sessions: [] });
  },
}));

/**
 * Wires up the Firebase Auth listener that keeps the store in sync with
 * whoever is signed in, plus realtime Firestore subscriptions for their
 * child profiles and chat sessions. Call once near the app root; returns an
 * unsubscribe function for cleanup.
 */
export function initAuth(): () => void {
  if (!firebaseEnabled || !auth || !db) {
    useStore.setState({ authReady: true });
    return () => {};
  }

  const unsubAuth = onAuthStateChanged(auth, (fbUser) => {
    unsubProfiles?.();
    unsubSessions?.();
    unsubProfiles = null;
    unsubSessions = null;

    if (!fbUser) {
      useStore.setState({ user: null, profile: null, profiles: [], sessions: [], authReady: true });
      return;
    }

    unsubProfiles = onSnapshot(collection(db!, 'users', fbUser.uid, 'profiles'), (snap) => {
      const profiles = snap.docs.map((d) => d.data() as Profile);
      useStore.setState((state) => ({
        profiles,
        profile: state.profile ? profiles.find((p) => p.id === state.profile!.id) ?? state.profile : state.profile,
      }));
    });

    unsubSessions = onSnapshot(
      query(collection(db!, 'users', fbUser.uid, 'sessions'), orderBy('startTime', 'asc')),
      (snap) => {
        const sessions = snap.docs.map((d) => d.data() as Session);
        useStore.setState({ sessions });
      }
    );

    useStore.setState({
      user: {
        id: fbUser.uid,
        name: fbUser.displayName || 'Parent',
        email: fbUser.email || '',
        role: 'parent',
      },
      authReady: true,
    });
  });

  return unsubAuth;
}

export const getTier = (age: number): AgeTier => {
  if (age <= 8) return '5-8';
  if (age <= 13) return '9-13';
  return '14-17';
};
