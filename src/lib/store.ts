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
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db, firebaseEnabled } from './firebase';
import { Admin, AgeTier, Message, Profile, Session, User } from './types';

const DEFAULT_ADMIN_KEY = '12291212';

interface AppState {
  authReady: boolean;
  user: User | null;
  profile: Profile | null;
  profiles: Profile[];
  sessions: Session[];
  language: 'English' | 'Pidgin';
  adminUser: Admin | null;

  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  setProfile: (profile: Profile | null) => void;
  addProfile: (profile: Omit<Profile, 'id'>) => Promise<Profile>;
  setLanguage: (lang: 'English' | 'Pidgin') => void;
  addSession: (session: Session) => Promise<void>;
  addMessage: (sessionId: string, message: Message) => Promise<void>;
  clearAll: () => Promise<void>;

  adminSignUp: (name: string, email: string, password: string, key: string) => Promise<void>;
  adminSignIn: (email: string, password: string) => Promise<void>;
  adminSignOut: () => Promise<void>;
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
  adminUser: null,

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
    set({ user: null, profile: null, profiles: [], sessions: [], adminUser: null });
  },

  adminSignUp: async (name, email, password, key) => {
    requireFirebase();
    // Idempotently seed the shared signup key the very first time this is
    // ever called against a fresh project. Once it exists, this write is
    // only permitted (by the security rules) for an admin rotating it, so
    // it fails harmlessly for every signup after the first — that failure
    // is expected and safe to ignore.
    try {
      await setDoc(doc(db!, 'config', 'adminSettings'), { signupKey: DEFAULT_ADMIN_KEY });
    } catch {
      // Already seeded — fine.
    }

    const cred = await createUserWithEmailAndPassword(auth!, email, password);
    await updateAuthProfile(cred.user, { displayName: name });

    const adminDoc: Admin = { id: cred.user.uid, name, email, createdAt: Date.now() };
    try {
      // signupKeyUsed only exists transiently so the security rule can
      // check it against config/adminSettings; it's scrubbed immediately
      // below and never persists.
      await setDoc(doc(db!, 'admins', cred.user.uid), { ...adminDoc, signupKeyUsed: key });
      await updateDoc(doc(db!, 'admins', cred.user.uid), { signupKeyUsed: deleteField() });
    } catch (err) {
      // Wrong key (or some other failure) — the auth account was already
      // created, so undo that rather than leaving an orphaned login.
      await cred.user.delete().catch(() => {});
      if ((err as { code?: string })?.code === 'permission-denied') {
        throw new Error('That admin key is incorrect.');
      }
      throw err;
    }

    set({ adminUser: adminDoc });
  },

  adminSignIn: async (email, password) => {
    requireFirebase();
    const cred = await signInWithEmailAndPassword(auth!, email, password);
    const snap = await getDoc(doc(db!, 'admins', cred.user.uid));
    if (!snap.exists()) {
      await signOut(auth!);
      throw new Error('That account is not an admin account.');
    }
    set({ adminUser: snap.data() as Admin });
  },

  adminSignOut: async () => {
    if (firebaseEnabled && auth) await signOut(auth);
    set({ adminUser: null });
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
      useStore.setState({ user: null, profile: null, profiles: [], sessions: [], adminUser: null, authReady: true });
      return;
    }

    getDoc(doc(db!, 'admins', fbUser.uid)).then((snap) => {
      useStore.setState({ adminUser: snap.exists() ? (snap.data() as Admin) : null });
    });

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

// --- Admin dashboard data access -------------------------------------
// These are plain one-shot reads/writes rather than store actions: the
// dashboard fetches on demand (with its own loading state and a refresh
// button) instead of holding every parent's data in realtime listeners.

export async function fetchAllUsers(): Promise<User[]> {
  requireFirebase();
  const snap = await getDocs(collection(db!, 'users'));
  return snap.docs.map((d) => d.data() as User);
}

export async function fetchUserProfiles(uid: string): Promise<Profile[]> {
  requireFirebase();
  const snap = await getDocs(collection(db!, 'users', uid, 'profiles'));
  return snap.docs.map((d) => d.data() as Profile);
}

export async function fetchUserSessions(uid: string): Promise<Session[]> {
  requireFirebase();
  const snap = await getDocs(collection(db!, 'users', uid, 'sessions'));
  return snap.docs.map((d) => d.data() as Session);
}

export async function deleteChildProfile(uid: string, profileId: string): Promise<void> {
  requireFirebase();
  await deleteDoc(doc(db!, 'users', uid, 'profiles', profileId));
}

export async function deleteChatSession(uid: string, sessionId: string): Promise<void> {
  requireFirebase();
  await deleteDoc(doc(db!, 'users', uid, 'sessions', sessionId));
}

// Wipes a parent's Firestore data (profiles, sessions, account doc). Their
// Firebase Auth login itself can't be deleted from a client SDK on another
// admin's behalf — that needs the Admin SDK / a Cloud Function — so this is
// a data-moderation action, not full account deletion.
export async function deleteUserData(uid: string): Promise<void> {
  requireFirebase();
  const [profiles, sessions] = await Promise.all([fetchUserProfiles(uid), fetchUserSessions(uid)]);
  await Promise.all([
    ...profiles.map((p) => deleteDoc(doc(db!, 'users', uid, 'profiles', p.id))),
    ...sessions.map((s) => deleteDoc(doc(db!, 'users', uid, 'sessions', s.id))),
  ]);
  await deleteDoc(doc(db!, 'users', uid));
}

export async function fetchAllAdmins(): Promise<Admin[]> {
  requireFirebase();
  const snap = await getDocs(collection(db!, 'admins'));
  return snap.docs.map((d) => d.data() as Admin);
}

// Directly grants admin status to any uid (e.g. a parent account) — no key
// needed, since only an existing admin's session can pass this write.
export async function promoteToAdmin(uid: string, name: string, email: string): Promise<void> {
  requireFirebase();
  const adminDoc: Admin = { id: uid, name, email, createdAt: Date.now() };
  await setDoc(doc(db!, 'admins', uid), adminDoc);
}

export async function demoteAdmin(uid: string): Promise<void> {
  requireFirebase();
  await deleteDoc(doc(db!, 'admins', uid));
}

export async function rotateAdminKey(newKey: string): Promise<void> {
  requireFirebase();
  await setDoc(doc(db!, 'config', 'adminSettings'), { signupKey: newKey });
}
