import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Profile, Session, Message, AgeTier } from './types';

interface AppState {
  user: User | null;
  profile: Profile | null;
  profiles: Profile[];
  sessions: Session[];
  language: 'English' | 'Pidgin';
  
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  addProfile: (profile: Profile) => void;
  setLanguage: (lang: 'English' | 'Pidgin') => void;
  addSession: (session: Session) => void;
  addMessage: (sessionId: string, message: Message) => void;
  clearAll: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      profiles: [],
      sessions: [],
      language: 'English',
      
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      addProfile: (profile) => set((state) => ({ 
        profiles: [...state.profiles, profile] 
      })),
      setLanguage: (lang) => set({ language: lang }),
      addSession: (session) => set((state) => ({ 
        sessions: [...state.sessions, session] 
      })),
      addMessage: (sessionId, message) => set((state) => ({
        sessions: state.sessions.map(s => 
          s.id === sessionId 
            ? { ...s, messages: [...s.messages, message] } 
            : s
        )
      })),
      clearAll: () => set({ user: null, profile: null, profiles: [], sessions: [] }),
    }),
    {
      name: 'igeri-storage',
    }
  )
);

export const getTier = (age: number): AgeTier => {
  if (age <= 8) return '5-8';
  if (age <= 13) return '9-13';
  return '14-17';
};