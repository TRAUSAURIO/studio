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
  'parchment': {
    primary: '#8b4513',
    background: '#f4ecd8',
    text: '#2d1a12',
    accent: '#d4af37',
    secondary: '#cdaa6d'
  },
  'golden-roses': {
    primary: '#d4af37',
    background: 'linear-gradient(135deg, #450a0a 0%, #881337 100%)',
    text: '#fff1f2',
    accent: '#fb7185',
  },
  'love-galaxy': {
    primary: '#c084fc',
    background: 'radial-gradient(circle at center, #1e1b4b 0%, #020617 100%)',
    text: '#faf5ff',
    accent: '#a855f7',
  },
  'minimal-glow': {
    primary: '#ffd700',
    background: '#0a0a0a',
    text: '#ffffff',
    accent: '#ff69b4',
  },
  'vintage-ink': {
    primary: '#1e293b',
    background: '#e2e8f0',
    text: '#0f172a',
    accent: '#334155',
  },
  'cinematic-love': {
    primary: '#ffd700',
    background: 'linear-gradient(180deg, #1e1b4b 0%, #4c1d95 50%, #831843 100%)',
    text: '#ffffff',
    accent: '#f472b6',
    overlay: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)'
  }
};
