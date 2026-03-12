export type ThemeType = 'cinematic-love' | 'golden-hour' | 'midnight-romance' | 'parchment' | 'luxury-white' | 'deep-passion' | 'starlight-indigo';
export type ParticleType = 'petals' | 'hearts' | 'stars' | 'snow' | 'glitter' | 'sparks';
export type FontStyle = 'serif' | 'sans' | 'mono' | 'cursive';

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
  title: 'Para alguien especial',
  name: 'Mi Amor',
  message: 'Quería decirte lo mucho que significas para mí...',
  secretMessage: 'Eres mi mundo entero.',
  youtubeId: 'L_jWHffIx5E',
  theme: 'cinematic-love',
  particles: 'petals',
  fontStyle: 'cursive',
};
