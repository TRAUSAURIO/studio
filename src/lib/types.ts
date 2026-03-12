export type ThemeType = 'midnight-romance' | 'cinematic-love' | 'golden-hour' | 'starlit-night' | 'rose-garden' | 'romantic-aurora' | 'parchment' | 'luxury-white';
export type ParticleType = 'gold-dust' | 'hearts' | 'petals' | 'stars' | 'snow' | 'glitter' | 'sparks';
export type FontStyle = 'cursive' | 'parchment' | 'serif' | 'cinematic' | 'clean' | 'glow';

export interface ExperienceData {
  title: string;
  name: string;
  message: string;
  secretMessage: string;
  youtubeId: string;
  theme: ThemeType;
  particles: ParticleType;
  fontStyle: FontStyle;
}

export const DEFAULT_EXPERIENCE: ExperienceData = {
  title: 'Nuestra Eternidad',
  name: 'Mi Amor',
  message: 'Quería decirte lo mucho que significas para mí...',
  secretMessage: 'Eres mi mundo entero.',
  youtubeId: 'L_jWHffIx5E',
  theme: 'midnight-romance',
  particles: 'gold-dust',
  fontStyle: 'cursive',
};
