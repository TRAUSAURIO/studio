import { ThemeType } from './types';

export interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  accent: string;
  secondary?: string;
  overlay?: string;
}

export const THEMES: Record<ThemeType, ThemeColors> = {
  'cinematic-love': {
    primary: '#ffd700',
    background: 'linear-gradient(180deg, #1e1b4b 0%, #4c1d95 50%, #831843 100%)',
    text: '#ffffff',
    accent: '#f472b6',
    overlay: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)'
  },
  'golden-hour': {
    primary: '#fbbf24',
    background: 'linear-gradient(to bottom, #7c2d12, #ea580c, #fbbf24)',
    text: '#fffbeb',
    accent: '#fde68a',
  },
  'midnight-romance': {
    primary: '#94a3b8',
    background: 'linear-gradient(to bottom, #020617, #1e1b4b, #312e81)',
    text: '#f8fafc',
    accent: '#cbd5e1',
  },
  'parchment': {
    primary: '#8b4513',
    background: '#f4ecd8',
    text: '#2d1a12',
    accent: '#d4af37',
    secondary: '#cdaa6d'
  },
  'luxury-white': {
    primary: '#1a1a1a',
    background: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
    text: '#111827',
    accent: '#ec4899',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.05))'
  },
  'deep-passion': {
    primary: '#ffffff',
    background: 'linear-gradient(45deg, #450a0a 0%, #991b1b 100%)',
    text: '#fef2f2',
    accent: '#fca5a5',
  },
  'starlight-indigo': {
    primary: '#e0e7ff',
    background: 'radial-gradient(circle at top, #312e81 0%, #1e1b4b 100%)',
    text: '#f5f3ff',
    accent: '#818cf8',
  }
};
