import { ThemeType } from './types';

export interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  accent: string;
}

export const THEMES: Record<ThemeType, ThemeColors> = {
  'starry-night': {
    primary: '#93c5fd',
    background: 'linear-gradient(to bottom, #020617, #1e1b4b, #312e81)',
    text: '#f8fafc',
    accent: '#38bdf8',
  },
  'rose-garden': {
    primary: '#fb7185',
    background: 'linear-gradient(to bottom, #450a0a, #881337, #be123c)',
    text: '#fff1f2',
    accent: '#f43f5e',
  },
  'aurora': {
    primary: '#4ade80',
    background: 'linear-gradient(to bottom, #064e3b, #065f46, #047857)',
    text: '#ecfdf5',
    accent: '#10b981',
  },
  'galaxy': {
    primary: '#c084fc',
    background: 'linear-gradient(to bottom, #2e1065, #4c1d95, #581c87)',
    text: '#faf5ff',
    accent: '#a855f7',
  },
  'minimalist': {
    primary: '#d4af37',
    background: 'linear-gradient(to bottom, #fafafa, #f5f5f5, #e5e5e5)',
    text: '#171717',
    accent: '#a16207',
  },
};
