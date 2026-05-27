export type AgeTier = '5-8' | '9-13' | '14-17';

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
  language: 'English' | 'Pidgin';
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