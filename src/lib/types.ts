export type ThemeType = 'starry-night' | 'rose-garden' | 'aurora' | 'galaxy' | 'minimalist';
export type ParticleType = 'hearts' | 'stars' | 'petals' | 'snow' | 'glitter';
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
  youtubeId: 'L_jWHffIx5E', // Default romantic lo-fi
  theme: 'starry-night',
  particles: 'hearts',
  fontStyle: 'serif',
};
