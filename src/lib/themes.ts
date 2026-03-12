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
  'midnight-romance': {
    primary: '#94a3b8',
    background: 'radial-gradient(circle at top, #020617 0%, #1e1b4b 50%, #020617 100%)',
    text: '#f8fafc',
    accent: '#cbd5e1',
    overlay: 'rgba(0,0,0,0.4)'
  },
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
  'starlit-night': {
    primary: '#e0e7ff',
    background: 'radial-gradient(circle at top, #0f172a 0%, #1e293b 100%)',
    text: '#f1f5f9',
    accent: '#38bdf8',
  },
  'rose-garden': {
    primary: '#f43f5e',
    background: 'linear-gradient(135deg, #4c0519 0%, #881337 100%)',
    text: '#fff1f2',
    accent: '#fda4af',
  },
  'romantic-aurora': {
    primary: '#2dd4bf',
    background: 'linear-gradient(to bottom, #064e3b, #0d9488, #2dd4bf)',
    text: '#f0fdfa',
    accent: '#99f6e4',
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
  }
};
