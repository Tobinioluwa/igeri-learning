export type AgeTier = '5-8' | '9-13' | '14-17';

// Nigeria's major languages: English (official) and Nigerian Pidgin
// alongside the three largest indigenous languages by number of speakers.
export type Language = 'English' | 'Pidgin' | 'Yoruba' | 'Igbo' | 'Hausa';

export const LANGUAGES: { value: Language; label: string; flag: string }[] = [
  { value: 'English', label: 'English', flag: '🇬🇧' },
  { value: 'Pidgin', label: 'Pidgin', flag: '🇳🇬' },
  { value: 'Yoruba', label: 'Yorùbá', flag: '🇳🇬' },
  { value: 'Igbo', label: 'Igbo', flag: '🇳🇬' },
  { value: 'Hausa', label: 'Hausa', flag: '🇳🇬' },
];

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'teacher';
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  tier: AgeTier;
  language: Language;
  subjects: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  subject?: string;
  isHint?: boolean;
}

export interface Session {
  id: string;
  profileId: string;
  messages: Message[];
  startTime: number;
  endTime?: number;
  summary?: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  createdAt: number;
}